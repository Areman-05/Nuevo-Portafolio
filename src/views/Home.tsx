import { sound } from "../utils/audio"
import Process from "../components/Process"

export default function Home() {
  return (
    <>
      <div className="relative flex min-h-[calc(100vh-8rem)] items-center justify-center overflow-hidden pt-10">
      <div className="grid w-full max-w-6xl grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center animate-in">
        <div className="relative z-10 flex flex-col items-end gap-7 pr-3 font-mono text-xs uppercase leading-none text-[#d8d5ce] sm:gap-10 sm:pr-8 sm:text-sm md:pr-14 md:text-base">
          <span className="self-center tracking-[0.5em]">DIS E ÑO</span>
          <span className="self-end tracking-[0.3em]">INTER FAZ</span>
          <span className="self-center tracking-[0.42em]">EXPE RIENCIA</span>
        </div>

        <div
          className="group relative h-72 w-44 cursor-crosshair overflow-visible sm:h-96 sm:w-60 md:h-[28rem] md:w-72"
          onMouseEnter={() => sound.playTick()}
          onClick={() => sound.playSelect()}
        >
          <svg
            viewBox="0 0 240 384"
            role="img"
            aria-label="Composición abstracta animada en negro y gris"
            className="h-full w-full bg-[#030303] transition-all duration-700 group-hover:scale-[1.015] group-hover:contrast-125"
          >
            <defs>
              <linearGradient id="chrome-ring" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#111" />
                <stop offset="0.22" stopColor="#8c8c8c" />
                <stop offset="0.38" stopColor="#1a1a1a" />
                <stop offset="0.64" stopColor="#d0d0d0" />
                <stop offset="0.78" stopColor="#292929" />
                <stop offset="1" stopColor="#090909" />
              </linearGradient>
              <radialGradient id="eclipse" cx="38%" cy="32%">
                <stop offset="0" stopColor="#666" />
                <stop offset="0.12" stopColor="#252525" />
                <stop offset="0.64" stopColor="#070707" />
                <stop offset="0.86" stopColor="#010101" />
                <stop offset="1" stopColor="#383838" />
              </radialGradient>
              <filter
                id="field-distortion"
                x="-30%"
                y="-30%"
                width="160%"
                height="160%"
                colorInterpolationFilters="sRGB"
              >
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.008 0.026"
                  numOctaves="3"
                  seed="8"
                  result="noise"
                >
                  <animate
                    attributeName="baseFrequency"
                    values="0.008 0.026;0.014 0.018;0.006 0.032;0.008 0.026"
                    dur="12s"
                    repeatCount="indefinite"
                  />
                </feTurbulence>
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  scale="18"
                  xChannelSelector="R"
                  yChannelSelector="B"
                >
                  <animate
                    attributeName="scale"
                    values="10;26;14;30;10"
                    dur="10s"
                    repeatCount="indefinite"
                  />
                </feDisplacementMap>
              </filter>
              <filter id="soft-glow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="grain">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.8"
                  numOctaves="3"
                  seed="4"
                />
                <feColorMatrix
                  type="matrix"
                  values="0.25 0 0 0 0
                          0 0.25 0 0 0
                          0 0 0.25 0 0
                          0 0 0 0.42 0"
                />
              </filter>
            </defs>

            <rect width="240" height="384" fill="#030303" />
            <ellipse
              cx="120"
              cy="192"
              rx="102"
              ry="166"
              fill="none"
              stroke="#555"
              strokeWidth="0.6"
              opacity="0.22"
            />
            <g filter="url(#field-distortion)">
              {Array.from({ length: 13 }).map((_, index) => (
                <ellipse
                  key={index}
                  cx="120"
                  cy="192"
                  rx={28 + index * 7.4}
                  ry={54 + index * 10.2}
                  fill="none"
                  stroke={index % 3 === 0 ? "#b4b4b4" : "#575757"}
                  strokeWidth={index % 3 === 0 ? "1" : "0.55"}
                  opacity={0.72 - index * 0.035}
                >
                  <animate
                    attributeName="rx"
                    values={`${26 + index * 7.4};${34 + index * 7.4};${28 + index * 7.4};${26 + index * 7.4}`}
                    dur={`${6.5 + index * 0.32}s`}
                    repeatCount="indefinite"
                  />
                </ellipse>
              ))}
              <path
                d="M120 25 C167 68 205 122 200 194 C196 267 161 329 120 359 C78 329 43 267 40 194 C35 122 73 68 120 25 Z"
                fill="none"
                stroke="url(#chrome-ring)"
                strokeWidth="5"
                opacity="0.8"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values="-3 120 192;4 120 192;-3 120 192"
                  dur="13s"
                  repeatCount="indefinite"
                />
              </path>
            </g>

            <g filter="url(#soft-glow)" opacity="0.6">
              <ellipse
                cx="120"
                cy="192"
                rx="66"
                ry="92"
                fill="none"
                stroke="#777"
                strokeWidth="1.5"
              >
                <animate
                  attributeName="rx"
                  values="62;69;64;62"
                  dur="5s"
                  repeatCount="indefinite"
                />
              </ellipse>
            </g>

            <ellipse
              cx="120"
              cy="192"
              rx="55"
              ry="79"
              fill="url(#eclipse)"
              stroke="url(#chrome-ring)"
              strokeWidth="2.4"
            >
              <animate
                attributeName="ry"
                values="76;84;78;76"
                dur="7s"
                repeatCount="indefinite"
              />
            </ellipse>
            <ellipse
              cx="120"
              cy="192"
              rx="43"
              ry="65"
              fill="#010101"
              opacity="0.92"
            >
              <animate
                attributeName="rx"
                values="40;46;42;40"
                dur="6s"
                repeatCount="indefinite"
              />
            </ellipse>

            <path
              d="M39 192 C75 171 166 170 202 192 C165 217 76 216 39 192 Z"
              fill="none"
              stroke="url(#chrome-ring)"
              strokeWidth="3.5"
              opacity="0.9"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="0 120 192;9 120 192;0 120 192"
                dur="8s"
                repeatCount="indefinite"
              />
            </path>
            <line
              x1="120"
              x2="120"
              y1="32"
              y2="352"
              stroke="#b7b7b7"
              strokeWidth="0.7"
              opacity="0.32"
            >
              <animate
                attributeName="opacity"
                values="0.08;0.42;0.08"
                dur="3.5s"
                repeatCount="indefinite"
              />
            </line>
            <g opacity="0.28">
              <path
                d="M20 112 H220 M20 272 H220"
                stroke="#8a8a8a"
                strokeWidth="0.5"
                strokeDasharray="2 7"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="0;36"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </path>
            </g>
            <rect
              width="240"
              height="384"
              filter="url(#grain)"
              opacity="0.38"
              className="mix-blend-screen"
            />
          </svg>

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-5 font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-[#8f1018] sm:gap-7 sm:text-xs">
            <span className="-translate-x-8 whitespace-nowrap">
              Desarrollador web
            </span>
            <span className="translate-x-7">Barcelona</span>
            <span className="-translate-x-2">2026</span>
          </div>
          <div className="pointer-events-none absolute inset-0 border border-white/15 transition-all duration-700 group-hover:scale-[1.025] group-hover:border-white/30" />
        </div>

        <div className="relative z-10 flex flex-col items-start gap-7 pl-3 font-mono text-xs uppercase leading-none text-[#d8d5ce] sm:gap-10 sm:pl-8 sm:text-sm md:pl-14 md:text-base">
          <span className="self-center tracking-[0.42em]">CÓ D IGO</span>
          <span className="self-start tracking-[0.32em]">SIS TEMA</span>
          <span className="self-center tracking-[0.54em]">FU TURO</span>
        </div>
      </div>
    </div>
    
    <Process />
    </>
  )
}
