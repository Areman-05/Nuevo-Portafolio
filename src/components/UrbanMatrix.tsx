import { useState, useEffect } from "react"
import { UrbanNode } from "../types"
import { sound } from "../utils/audio"

interface UrbanMatrixProps {
  nodes: UrbanNode[]
}

export default function UrbanMatrix({ nodes }: UrbanMatrixProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string>("bcn")
  const [cityTimes, setCityTimes] = useState<Record<string, string>>({})

  // Live clocks for each node
  useEffect(() => {
    const updateTimes = () => {
      const now = new Date()
      const updated: Record<string, string> = {}

      nodes.forEach((node) => {
        try {
          const str = now.toLocaleTimeString("en-GB", {
            timeZone: node.timezone,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })
          updated[node.id] = str
        } catch {
          updated[node.id] = "--:--:--"
        }
      })
      setCityTimes(updated)
    }

    updateTimes()
    const interval = setInterval(updateTimes, 1000)
    return () => clearInterval(interval)
  }, [nodes])

  const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0]

  return (
    <section
      id="urban-nodes"
      className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-b border-white/[0.08]"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline text-xs font-mono uppercase pb-6 mb-12 border-b border-white/[0.08] gap-2">
        <div className="flex items-center gap-3">
          <span className="tracking-widest">NODES // 004</span>
          <span className="u-g">
            (&nbsp;Urban Geography &amp; Subcultural Identity&nbsp;)
          </span>
        </div>
        <div className="text-[#828079]">
          <span>5 CREATIVE COORDINATES</span>
        </div>
      </div>

      {/* Main Interactive Matrix Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Interactive Node Selector Tabs */}
        <div className="lg:col-span-5 space-y-2">
          <div className="text-[11px] font-mono text-[#828079] mb-4 uppercase tracking-widest">
            Select Cultural Frequency :
          </div>

          <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {nodes.map((node) => {
              const isSelected = node.id === selectedNodeId
              return (
                <div
                  key={node.id}
                  onClick={() => {
                    sound.playSelect()
                    setSelectedNodeId(node.id)
                  }}
                  onMouseEnter={() => sound.playTick()}
                  className={`group cursor-pointer py-4 px-2 transition-all duration-200 flex items-center justify-between ${
                    isSelected
                      ? "bg-white/[0.04] text-white"
                      : "hover:bg-white/[0.02] text-[#828079]"
                  }`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") setSelectedNodeId(node.id)
                  }}
                >
                  <div className="flex items-baseline gap-3">
                    <span
                      className={`text-xs font-mono ${
                        isSelected ? "text-white font-bold" : "text-[#4a4944]"
                      }`}
                    >
                      {node.code}
                    </span>
                    <div>
                      <span
                        className={`font-serif italic text-lg transition-colors ${
                          isSelected
                            ? "text-white"
                            : "group-hover:text-[#f0ede6]"
                        }`}
                      >
                        {node.city}
                      </span>
                      <span className="text-[10px] font-mono text-[#828079] ml-2 block sm:inline">
                        {node.district}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono">
                    <span className="tabular-nums text-[11px] text-[#f0ede6]">
                      {cityTimes[node.id] || "..."}
                    </span>
                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-transform ${
                        isSelected
                          ? "bg-white scale-125"
                          : "bg-white/20 group-hover:bg-white/50"
                      }`}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          <div className="pt-4 text-[11px] font-mono text-[#828079] flex justify-between items-center">
            <span>COORDINATE LOCK</span>
            <span className="text-[#f0ede6]">{activeNode.coords}</span>
          </div>
        </div>

        {/* Right Column: Detailed Node Manifesto & Aesthetic Canvas */}
        <div className="lg:col-span-7 bg-[#0c0c0c] border border-white/10 p-6 md:p-8 space-y-6">
          <div className="flex justify-between items-start border-b border-white/[0.08] pb-4">
            <div>
              <span className="text-[11px] font-mono text-[#828079] uppercase block mb-1">
                Active Node // {activeNode.code}
              </span>
              <h3 className="font-serif italic text-3xl md:text-4xl text-[#f0ede6]">
                {activeNode.city} — {activeNode.district}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-[#828079] block uppercase">
                Live Local Time
              </span>
              <span className="text-sm font-mono text-white tabular-nums font-semibold">
                {cityTimes[activeNode.id] || "..."}
              </span>
            </div>
          </div>

          {/* Visual image frame for the node */}
          <div className="relative aspect-[16/9] overflow-hidden bg-neutral-900 border border-white/[0.06]">
            <img
              src={activeNode.image}
              alt={activeNode.city}
              className="w-full h-full object-cover grayscale contrast-125 brightness-90 hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end text-[11px] font-mono text-white/80">
              <span className="bg-black/60 px-2 py-0.5 border border-white/20">
                {activeNode.coords}
              </span>
              <span className="text-white/60 hidden sm:inline">
                {activeNode.aesthetic}
              </span>
            </div>
          </div>

          {/* Ethos & Influence */}
          <div className="space-y-3 font-mono text-xs">
            <span className="text-[10px] text-[#828079] uppercase tracking-widest block">
              Ethos &amp; Visual Tension
            </span>
            <p className="text-[#f0ede6] leading-relaxed text-sm">
              "{activeNode.ethos}"
            </p>
          </div>

          {/* Tag tokens */}
          <div className="pt-2 flex flex-wrap gap-2 font-mono text-[11px]">
            {activeNode.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-sm bg-white/[0.04] border border-white/10 text-[#828079]"
              >
                # {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
