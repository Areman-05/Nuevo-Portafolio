import { useEffect, useRef, useState } from "react";

const MEDIA = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=900&auto=format&fit=crop", // abstract liquid
  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=900&auto=format&fit=crop", // abstract lines
  "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=900&auto=format&fit=crop", // glitch / tech
];

type ContentItem = 
  | { type: "text"; value: string }
  | { type: "media"; index: number };

export default function HugeTextScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const totalScrollable = rect.height - windowHeight;
      const scrolled = -rect.top;
      
      let p = scrolled / totalScrollable;
      p = Math.max(0, Math.min(1, p));
      
      setProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const content: ContentItem[] = [
    { type: "text", value: "SI PUEDES" },
    { type: "media", index: 0 },
    { type: "text", value: "DISEÑAR" },
    { type: "text", value: "UNA COSA," },
    { type: "text", value: "PUEDES" },
    { type: "media", index: 1 },
    { type: "text", value: "DISEÑARLO" },
    { type: "text", value: "TODO." },
  ];

  let totalChars = 0;
  content.forEach((item) => {
    if (item.type === "text") {
      totalChars += item.value.replace(/\s/g, "").length;
    } else {
      totalChars += 1;
    }
  });

  let charIndex = 0;

  return (
    <div ref={containerRef} className="relative w-full h-[350vh]">
      <div className="sticky top-0 left-0 w-full h-screen flex flex-col justify-center overflow-hidden">
        <div className="flex flex-wrap justify-center gap-x-[3vw] gap-y-[2vw] px-4 md:px-12 w-full max-w-[1600px] mx-auto">
          {content.map((item, i) => {
            if (item.type === "media") {
              const threshold = charIndex / totalChars;
              charIndex++;
              // A smooth ramp for opacity
              const diff = progress - threshold;
              const isActive = diff > 0;
              const opacity = isActive ? Math.min(1, diff * 10) : 0;
              
              return (
                <div 
                  key={i} 
                  className="relative h-[1.1em] w-[2.2em] shrink-0 overflow-hidden rounded-sm self-center"
                  style={{ opacity, filter: `blur(${isActive ? 0 : 4}px)`, transform: `scale(${isActive ? 1 : 0.8})`, transition: 'opacity 0.1s, filter 0.1s, transform 0.1s' }}
                >
                  <img 
                    src={MEDIA[item.index]} 
                    alt="" 
                    className="absolute inset-0 h-full w-full object-cover grayscale mix-blend-screen"
                  />
                </div>
              );
            }

            const words = item.value.split(" ");
            return (
              <div key={i} className="flex gap-[2vw]">
                {words.map((word, wi) => (
                  <div key={wi} className="flex">
                    {word.split("").map((char, ci) => {
                      const threshold = charIndex / totalChars;
                      charIndex++;
                      const diff = progress - threshold;
                      const isActive = diff > 0;
                      // Smooth reveal
                      const opacity = isActive ? Math.min(1, diff * 15) : 0.1;
                      
                      return (
                        <span
                          key={ci}
                          className="text-[14vw] uppercase leading-[0.8] tracking-[-0.04em] md:text-[9vw] font-bold inline-block"
                          style={{ 
                            color: item.value.includes('TODO.') ? '#8f1018' : '#d8d5ce',
                            opacity: isActive ? opacity : 0.05,
                            filter: `blur(${isActive ? 0 : 8}px)`,
                            transform: `translateY(${isActive ? 0 : 10}px)`,
                            transition: 'opacity 0.2s ease-out, filter 0.2s ease-out, transform 0.2s ease-out'
                          }}
                        >
                          {char}
                        </span>
                      );
                    })}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
