import { ArrowUpRight, Lock } from "lucide-react"
import { Corners, Marker, MaskLines, Reveal } from "./ui"
import { PROJECTS, type Project } from "../research"

const linkBase =
  "inline-flex items-center gap-2 px-5 py-3 label !text-[12px] transition-colors cursor-pointer"

function Entry({ p }: { p: Project }) {
  return (
    <article
      aria-labelledby={`project-${p.id}`}
      className="border-t border-line py-16 md:py-24"
    >
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="label text-nv">
            PROJECT {p.number} / {p.category}
          </p>
          <h2
            id={`project-${p.id}`}
            className="mt-6 font-display text-[clamp(44px,7vw,104px)] font-semibold leading-[0.88] tracking-[-0.06em]"
          >
            {p.name}
          </h2>
          <p className="label mt-4 text-mute">{p.title}</p>
          <p className="mt-8 max-w-[440px] text-[18px] leading-snug text-paper">
            {p.summary}
          </p>

          <dl className="mt-10 grid gap-6 border-t border-line pt-6 text-[14px]">
            <div>
              <dt className="label text-mute">Problem</dt>
              <dd className="mt-2 max-w-[440px] leading-relaxed text-paper/85">
                {p.problem}
              </dd>
            </div>
            <div>
              <dt className="label text-mute">Created by</dt>
              <dd className="mt-2 font-display text-[20px] leading-tight tracking-[-0.02em]">
                {p.creators.map((c) => (
                  <span key={c} className="block">
                    {c}
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt className="label text-mute">Technology</dt>
              <dd className="mt-2">
                {p.tech.length ? (
                  <ul className="flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <li
                        key={t}
                        className="border border-line px-2.5 py-1 label !text-[10px] text-paper"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-mute">{p.techNote}</span>
                )}
              </dd>
            </div>
          </dl>
        </div>

        <div className="lg:col-span-7">
          <a
            href={p.live}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open the ${p.name} live demo in a new tab`}
            className="group relative block border border-line bg-carbon transition-colors duration-300 hover:border-nv focus-visible:border-nv"
          >
            <img
              src={p.image}
              alt={p.imageAlt}
              width={1440}
              height={900}
              loading="lazy"
              decoding="async"
              className="aspect-[16/10] w-full object-cover object-top opacity-90 transition-[opacity,transform] duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 motion-safe:group-hover:scale-[1.01]"
            />
            <Corners />
            <span className="absolute bottom-3 left-3 bg-obsidian/90 px-2 py-1 label !text-[10px] text-mute">
              LIVE CAPTURE / {new URL(p.live).host}
            </span>
          </a>

          <ul className="mt-8 grid gap-3 text-[15px] leading-relaxed text-paper/85 md:grid-cols-2">
            {p.capabilities.map((c) => (
              <li key={c} className="flex gap-3 border-t border-line pt-3">
                <span className="mt-2 h-px w-4 shrink-0 bg-nv" />
                {c}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={p.live}
              target="_blank"
              rel="noopener noreferrer"
              className={`${linkBase} chamfer bg-nv text-obsidian hover:bg-lime`}
            >
              LIVE DEMO <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
            {p.repo.kind === "public" ? (
              <a
                href={p.repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkBase} text-paper shadow-[inset_0_0_0_1px_var(--color-line)] hover:shadow-[inset_0_0_0_1px_var(--color-mute)]`}
              >
                SOURCE ON GITHUB <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            ) : (
              <span
                className={`${linkBase} cursor-default text-mute shadow-[inset_0_0_0_1px_var(--color-line)]`}
              >
                <Lock className="h-3.5 w-3.5" aria-hidden /> PRIVATE REPOSITORY
              </span>
            )}
          </div>

          <details className="group mt-8 border-t border-line pt-4">
            <summary className="label flex cursor-pointer list-none items-center justify-between text-mute hover:text-paper">
              <span>Technical overview</span>
              <span className="text-nv transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-4 max-w-[620px] text-[15px] leading-relaxed text-paper/85">
              {p.overview}
            </p>
          </details>
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  return (
    <section className="pt-28 md:pt-36">
      <div className="shell">
        <Marker>Research projects</Marker>
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <h1 className="font-display text-[clamp(42px,8vw,128px)] font-semibold leading-[0.86] tracking-[-0.06em] lg:col-span-8">
            <MaskLines
              animateNow
              lines={[
                "BUILT BY THE",
                <span className="text-mute">COHORT.</span>,
              ]}
            />
          </h1>
          <Reveal className="lg:col-span-4 lg:pb-2" delay={0.1}>
            <p className="max-w-[340px] text-[16px] leading-relaxed text-mute">
              Completed student research, with live demonstrations and the
              people who made them.
            </p>
            <p className="label mt-6 text-nv">
              0{PROJECTS.length} / COMPLETED PROJECTS
            </p>
          </Reveal>
        </div>

        <div className="mt-16 md:mt-24">
          {PROJECTS.map((p) => (
            <Entry key={p.id} p={p} />
          ))}
        </div>
        <p className="label border-t border-line py-10 !text-[10px] text-mute">
          DESCRIPTIONS ARE BASED ON EACH PROJECT'S PUBLIC SITE OR README AND
          WERE CHECKED ON 14 NOV 2026.
        </p>
      </div>
    </section>
  )
}
