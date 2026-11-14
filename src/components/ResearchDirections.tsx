import OntologyModule from "./OntologyModule"
import { Reveal } from "./ui"
import { scrollToId } from "../data"

const DIRECTIONS = [
  {
    n: "01",
    title: "Ontology-Driven Intelligence",
    body: "Explore how entities, relationships, policies, and semantic structures support AI reasoning.",
    tags: ["Knowledge representation", "Concept & relationship modeling", "Knowledge graphs", "Semantic reasoning", "Context-aware AI systems"],
  },
  {
    n: "02",
    title: "Multi-Layer Ontology Security",
    body: "Investigate security risks in ontology-driven agent systems.",
    tags: ["Identity & access control", "Ontology integrity & poisoning", "Knowledge retrieval protection", "Reasoning & inference security", "Agent & tool authorization", "Audit evidence & governance"],
  },
  {
    n: "03",
    title: "Agentic AI Security & Governance",
    body: "Explore how policy enforcement, authorization, and auditable decisions support more trustworthy autonomous systems.",
    tags: ["Policy enforcement", "Authorization", "Auditable decisions"],
  },
]

const toProjects = () => {
  window.dispatchEvent(new CustomEvent("kz:tab", { detail: "projects" }))
  window.scrollTo({ top: 0 })
}

export default function ResearchDirections() {
  return (
    <div className="mt-24 border-t border-line pt-14 md:mt-32">
      <p className="label text-nv">THE ROAD AHEAD / RESEARCH DIRECTIONS</p>
      <Reveal>
        <p className="mt-6 max-w-[620px] text-[18px] leading-snug text-paper">
          Our research continues beyond individual projects, exploring how
          structured knowledge, secure agentic systems, and accelerated
          computing can shape more trustworthy AI.
        </p>
      </Reveal>

      <ol className="mt-12 grid gap-px border border-line bg-line lg:grid-cols-3">
        {DIRECTIONS.map((d) => (
          <li key={d.n} className="bg-obsidian p-6 md:p-8">
            <p className="label text-nv">{d.n}</p>
            <h3 className="mt-4 font-display text-[clamp(22px,2.2vw,30px)] font-semibold leading-[1.05] tracking-[-0.035em]">
              {d.title}
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-paper/80">{d.body}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {d.tags.map((t) => (
                <li key={t} className="border border-line px-2.5 py-1.5 label !text-[10px] text-paper">
                  {t}
                </li>
              ))}
            </ul>
            {d.n === "03" && (
              <p className="mt-6 text-[13px] leading-relaxed text-mute">
                A related student project, C.A.G.E., demonstrates pre-execution
                allow/deny decisions on agent action chains.{" "}
                <button onClick={toProjects} className="text-nv underline-offset-4 hover:underline cursor-pointer">
                  See Projects
                </button>
              </p>
            )}
          </li>
        ))}
      </ol>

      <OntologyModule />

      <p className="mt-6 text-[13px] text-mute">
        Accelerated computing research:{" "}
        <button onClick={() => scrollToId("nvidia")} className="text-nv underline-offset-4 hover:underline cursor-pointer">
          NVIDIA research &amp; the developer ecosystem
        </button>
      </p>
    </div>
  )
}
