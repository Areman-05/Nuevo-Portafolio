import { sound } from "../utils/audio"

interface ShowreelTriptychProps {
  onOpenReel: () => void
}

export default function ShowreelTriptych({
  onOpenReel,
}: ShowreelTriptychProps) {
  
  // A curated mix of abstract GIF URLs to mimic the user's requested horizontal carousel aesthetic
  const mediaItems = [
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3Z6cWwyN2FucHZjcXlybjUyMjlzMXpyZWhqZjZ0MXV1MTlyMnlkNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT9Ighs4iLqYyKzIHK/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGJxbzE4dHZnbHl5b2p3NnYyaGNrcDZsOTFwZnQ3bzBnbXRocTgydSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKo6fiHVzGijHpe/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWwyaDRndnR2YzRxbnVqdzAxeXRwNTVveDBweHBqc3I5cWlxNjdrNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26tnb7hlpeCJiavM4/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbDVnbTFwcHBhcmpycGdyMjhzMHQ2NHJ5YzBnZTFveTF0dHp1YngwaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0HlMG1EX2H38cZeE/giphy.gif"
  ]

  return (
    <section className="py-24 border-y border-white/[0.05] overflow-hidden w-full bg-[#060606] mt-24">
      <div
        onClick={() => {
          sound.playSelect()
          onOpenReel()
        }}
        onMouseEnter={() => sound.playTick()}
        className="group relative cursor-pointer block w-full overflow-hidden"
        role="button"
        tabIndex={0}
      >
        {/* Continuous horizontal row mimicking the screenshot */}
        <div className="flex items-center gap-12 sm:gap-16 w-max opacity-40 group-hover:opacity-100 transition-opacity duration-700 -ml-[5vw]">
          
          <div className="w-[18vw] min-w-[200px] aspect-[4/3] shrink-0 bg-black overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700">
             <img src={mediaItems[0]} alt="abstract 1" className="w-full h-full object-cover mix-blend-screen" />
          </div>
          
          <div className="w-[15vw] min-w-[150px] aspect-[4/3] shrink-0 bg-[#111] overflow-hidden relative">
             <img src={mediaItems[1]} alt="abstract 2" className="w-full h-full object-cover opacity-80" />
          </div>

          <div className="w-[22vw] min-w-[250px] aspect-video shrink-0 bg-black overflow-hidden relative">
             <img src={mediaItems[3]} alt="abstract 3" className="w-full h-full object-cover invert opacity-90" />
          </div>

          {/* Blank space for the center floating text */}
          <div className="w-[25vw] min-w-[280px] shrink-0 h-1" />

          {/* Poster style block similar to "ALL ARTISTS" in the image */}
          <div className="w-[18vw] min-w-[200px] aspect-square shrink-0 bg-[#e0e0e0] overflow-hidden relative group-hover:scale-105 transition-transform duration-1000">
             <div className="w-full h-full flex flex-col justify-center items-center text-black font-serif uppercase leading-[0.8] text-[3vw] font-bold tracking-tighter">
                <span>ALL</span>
                <span>FEELINGS</span>
             </div>
          </div>

          {/* Red tinted block similar to the red portrait in the image */}
          <div className="w-[22vw] min-w-[250px] aspect-video shrink-0 bg-[#8f1018] overflow-hidden relative opacity-80 grayscale group-hover:grayscale-0 transition-all duration-700">
             <img src={mediaItems[2]} alt="abstract 4" className="w-full h-full object-cover mix-blend-overlay opacity-80" />
          </div>
          
          <div className="w-[15vw] min-w-[180px] aspect-[3/4] shrink-0 bg-[#090909] overflow-hidden relative">
             <img src={mediaItems[0]} alt="abstract 5" className="w-full h-full object-cover" />
          </div>

        </div>

        {/* Floating ( PLAY SHOWREEL ) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="font-mono text-sm tracking-[0.4em] text-[#d8d5ce] group-hover:text-white group-hover:tracking-[0.6em] transition-all duration-700 whitespace-nowrap bg-[#060606] px-4 py-2">
             ( PLAY SHOWREEL )
          </div>
        </div>
      </div>
    </section>
  )
}
