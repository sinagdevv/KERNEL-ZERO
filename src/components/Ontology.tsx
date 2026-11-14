import { ArrowUpRight } from "lucide-react"
import { useState } from "react"
import {
  ONT_EDGES,
  ONT_LAYERS,
  ONT_NODES,
  ONT_STANDARDS,
  ONT_TOPICS,
} from "../research"
import { Marker, MaskLines, Reveal } from "./ui"

const W = 150
const H = 44
const node = (id: string) => ONT_NODES.find((n) => n.id === id)!

function Explorer() {
  const [sel, setSel] = useState("agent")
  const cur = node(sel)
  const links = ONT_EDGES.filter((e) => e.from === sel || e.to === sel)

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <svg
          viewBox="0 0 1000 600"
          className="hidden w-full border border-line bg-carbon/30 md:block"
          role="group"
          aria-label="Ontology graph. The same concepts are listed as buttons below."
        >
          {ONT_EDGES.map((e) => {
            const a = node(e.from)
            const b = node(e.to)
            const on = e.from === sel || e.to === sel
            return (
              <g key={e.from + e.to} aria-hidden>
                <line
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  strokeWidth={on ? 1.5 : 1}
                  className={`transition-[stroke] duration-300 ${on ? "stroke-lime" : "stroke-line"}`}
                />
                {on && (
                  <text
                    x={(a.x + b.x) / 2}
                    y={(a.y + b.y) / 2 - 8}
                    textAnchor="middle"
                    className="fill-lime font-mono text-[13px]"
                    paintOrder="stroke"
                    stroke="#050705"
                    strokeWidth="5"
                  >
                    {e.label}
                  </text>
                )}
              </g>
            )
          })}
          {ONT_NODES.map((n) => (
            <g
              key={n.id}
              role="button"
              tabIndex={0}
              aria-pressed={sel === n.id}
              aria-label={n.name}
              onClick={() => setSel(n.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  setSel(n.id)
                }
              }}
              className="cursor-pointer outline-none [&:focus-visible>rect]:stroke-lime"
            >
              <rect
                x={n.x - W / 2}
                y={n.y - H / 2}
                width={W}
                height={H}
                strokeWidth="1"
                className={`fill-obsidian transition-[stroke] duration-300 ${sel === n.id ? "stroke-nv" : "stroke-mute/60 hover:stroke-paper"}`}
              />
              <text
                x={n.x}
                y={n.y + 5}
                textAnchor="middle"
                className={`font-mono text-[13px] ${sel === n.id ? "fill-lime" : "fill-paper"}`}
              >
                {n.name}
              </text>
            </g>
          ))}
        </svg>

        <ul className="mt-4 flex flex-wrap gap-2 md:mt-5" aria-label="Concepts">
          {ONT_NODES.map((n) => (
            <li key={n.id}>
              <button
                aria-pressed={sel === n.id}
                onClick={() => setSel(n.id)}
                className={`border px-3 py-2 label !text-[10px] cursor-pointer transition-colors ${
                  sel === n.id
                    ? "border-nv text-lime"
                    : "border-line text-mute hover:text-paper"
                }`}
              >
                {n.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="lg:col-span-5" aria-live="polite">
        <p className="label text-nv">CONCEPT</p>
        <h3 className="mt-3 font-display text-[clamp(28px,3.4vw,44px)] font-semibold tracking-[-0.04em]">
          {cur.name}
        </h3>
        <p className="mt-4 text-[16px] leading-relaxed text-paper/90">
          {cur.definition}
        </p>
        <p className="label mt-8 text-mute">SECURITY IMPLICATION</p>
        <p className="mt-2 text-[15px] leading-relaxed text-paper/85">
          {cur.security}
        </p>
        <p className="label mt-8 text-mute">CONNECTED CONCEPTS</p>
        <ul className="mt-3 border-t border-line">
          {links.map((e) => {
            const other = e.from === sel ? e.to : e.from
            return (
              <li key={e.from + e.to} className="border-b border-line">
                <button
                  onClick={() => setSel(other)}
                  className="flex w-full flex-wrap items-baseline gap-x-2 py-3 text-left text-[14px] cursor-pointer hover:text-lime"
                >
                  <span>{node(e.from).name}</span>
                  <span className="label !text-[10px] text-nv">{e.label}</span>
                  <span>{node(e.to).name}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default function Ontology() {
  return (
    <>
      <section className="pt-28 md:pt-36">
        <div className="shell">
          <Marker>Ontology research</Marker>
          <h1 className="mt-10 font-display text-[clamp(38px,7vw,112px)] font-semibold leading-[0.88] tracking-[-0.06em]">
            <MaskLines
              animateNow
              lines={[
                "MODELING INTELLIGENCE",
                <span className="text-mute">THROUGH RELATIONSHIPS.</span>,
              ]}
            />
          </h1>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-[560px] text-[18px] leading-snug text-paper">
              Understanding how concepts, entities, actions, and policies
              connect.
            </p>
            <p className="mt-6 max-w-[560px] border-l border-line pl-4 text-[13px] leading-relaxed text-mute">
              Source note: this page is a standards-based foundation (W3C and
              NIST). Course-specific ontology video material has not been
              reviewed for this version and will be integrated after source
              review.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-28" aria-labelledby="topics">
        <div className="shell">
          <h2 id="topics" className="label text-nv">
            01 / FOUNDATIONS
          </h2>
          <ol className="mt-8 grid gap-x-16 md:grid-cols-2">
            {ONT_TOPICS.map((t, i) => (
              <li key={t.title} className="border-t border-line py-6">
                <p className="label text-mute">0{i + 1}</p>
                <h3 className="mt-2 font-display text-[22px] font-medium tracking-[-0.03em]">
                  {t.title}
                </h3>
                <p className="mt-3 max-w-[520px] text-[15px] leading-relaxed text-paper/80">
                  {t.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className="border-t border-line py-20 md:py-28"
        aria-labelledby="explorer"
      >
        <div className="shell">
          <h2 id="explorer" className="label text-nv">
            02 / ONTOLOGY EXPLORER
          </h2>
          <p className="mt-4 mb-10 max-w-[640px] text-[14px] leading-relaxed text-mute">
            An illustrative model of an agent-authorization domain. It is a
            teaching aid, not a formally validated ontology. Select a concept
            to see its definition, relationships and security implications.
          </p>
          <Explorer />
        </div>
      </section>

      <section
        className="border-t border-line py-20 md:py-28"
        aria-labelledby="layers"
      >
        <div className="shell">
          <h2 id="layers" className="label text-nv">
            03 / LAYERED RISK FRAMEWORK
          </h2>
          <p className="mt-4 mb-10 max-w-[640px] text-[14px] leading-relaxed text-mute">
            A proposed way to reason about where ontology-driven systems can
            fail. It is a threat-modeling framework, not a claim that every
            control exists in any system.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-[14px]">
              <caption className="sr-only">
                Six layers with a representative risk and control each
              </caption>
              <thead>
                <tr className="label !text-[10px] text-mute">
                  <th className="border-b border-line py-3 pr-4 font-normal">Layer</th>
                  <th className="border-b border-line py-3 pr-4 font-normal">Representative risk</th>
                  <th className="border-b border-line py-3 font-normal">Representative control</th>
                </tr>
              </thead>
              <tbody>
                {ONT_LAYERS.map((l) => (
                  <tr key={l.n} className="align-top">
                    <th scope="row" className="border-b border-line py-4 pr-4 font-display font-medium">
                      <span className="label mr-3 text-nv">{l.n}</span>
                      {l.name}
                    </th>
                    <td className="border-b border-line py-4 pr-4 text-paper/80">{l.risk}</td>
                    <td className="border-b border-line py-4 text-paper/80">{l.control}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-16" aria-labelledby="standards">
        <div className="shell">
          <h2 id="standards" className="label text-nv">
            04 / STANDARDS
          </h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {ONT_STANDARDS.map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-line px-4 py-3 text-[14px] transition-colors hover:border-nv"
                >
                  {s.label} <ArrowUpRight className="h-4 w-4 text-nv" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
