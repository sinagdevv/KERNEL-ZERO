import { ArrowUpRight } from "lucide-react"
import { NVIDIA_CREDENTIALS } from "../research"
import { Marker, Reveal } from "./ui"

export default function Nvidia() {
  const verified = Object.entries(NVIDIA_CREDENTIALS)

  return (
    <section
      id="nvidia"
      className="border-b border-line py-20 md:py-28"
      aria-labelledby="nvidia-heading"
    >
      <div className="shell grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Marker>NVIDIA research & development</Marker>
          <h2
            id="nvidia-heading"
            className="mt-8 font-display text-[clamp(32px,4.4vw,64px)] font-semibold leading-[0.92] tracking-[-0.05em]"
          >
            ACCELERATED COMPUTING, STUDIED CLOSELY.
          </h2>
        </div>
        <Reveal className="lg:col-span-7" delay={0.1}>
          <p className="max-w-[560px] text-[16px] leading-relaxed text-paper/85">
            The program's GPU &amp; Accelerated Computing module covers
            parallelism, CUDA fundamentals, tensor operations and the memory
            hierarchy. This section will list researchers whose NVIDIA-related
            work has been verified.
          </p>

          {verified.length ? (
            <ul className="mt-8 border-t border-line">
              {verified.map(([name, c]) => (
                <li key={name} className="border-b border-line py-4 text-[14px]">
                  <p className="font-display text-[20px] tracking-[-0.02em]">{name}</p>
                  <p className="mt-1 text-mute">
                    {[
                      c.developerAccountVerified && "NVIDIA developer account verified",
                      c.researchInvolvement,
                      c.architectureDesignation,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                  {c.publicProfileUrl && (
                    <a
                      href={c.publicProfileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-nv hover:text-lime"
                    >
                      Public profile <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-8 border-l border-nv pl-4 label leading-relaxed text-paper">
              RESEARCHER DESIGNATIONS: PENDING VERIFICATION
            </p>
          )}

          <p className="mt-8 max-w-[560px] text-[13px] leading-relaxed text-mute">
            KERNEL//ZERO is a class project. It is not affiliated with,
            sponsored, or endorsed by NVIDIA. NVIDIA is a trademark of NVIDIA
            Corporation.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
