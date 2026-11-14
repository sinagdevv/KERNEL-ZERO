// Research content for the Projects, Ontology and NVIDIA sections.
// Every claim here is traceable to the project's public site / README (checked 2026-11-14)
// or is explicitly labelled as an illustrative research model.

export type Project = {
  id: string
  number: string
  name: string
  title: string
  category: string
  summary: string
  problem: string
  capabilities: string[]
  creators: string[]
  tech: string[]
  techNote?: string
  image: string
  imageAlt: string
  live: string
  repo: { kind: "public"; url: string } | { kind: "private" }
  overview: string
}

export const PROJECTS: Project[] = [
  {
    id: "cage",
    number: "01",
    name: "C.A.G.E.",
    title: "Causal Authorization and Governance Engine for AI Agents",
    category: "AI Agent Security / Authorization / Governance",
    summary:
      "Causal authorization and governance for safer AI agent execution.",
    problem:
      "An agent can hold permission for every tool it uses and still leak data, because checking each tool in isolation can miss where the data came from.",
    capabilities: [
      "Evaluates the whole action chain: human intent, action history and data provenance, not individual tools alone.",
      "Returns an ALLOW or DENY decision before an action executes.",
      "Public demo replays a recorded five-step attack in which every tool is permitted and the data leak is still blocked.",
    ],
    creators: ["John Ray Cacananta"],
    tech: [],
    techNote: "Implementation stack is not publicly documented.",
    image: "/projects/cage.png",
    imageAlt:
      "Screenshot of the C.A.G.E. website headline: Your AI agent has permission. But should it take this action?",
    live: "https://cage-agent-security.vercel.app/",
    repo: { kind: "private" },
    overview:
      "The public site is a static showcase: its decisions were recorded from the C.A.G.E. engine using synthetic data, with no live backend, database or tool calls. It is a demonstration of the idea, not a production security guarantee. Source code and internal architecture are intentionally not published.",
  },
  {
    id: "lumen",
    number: "02",
    name: "Lumen",
    title: "Multi-Tenant RAG Gateway",
    category: "Retrieval-Augmented Generation / Multi-Tenant AI Infrastructure",
    summary:
      "A multi-tenant RAG gateway that answers from a tenant's own documents and cites its sources.",
    problem:
      "Teams running a chatbot want answers drawn from their own handbooks and policies, without building retrieval, model routing, rate limits and request logging themselves.",
    capabilities: [
      "Document upload (PDF, plain text, Markdown) with every passage tied to its owner.",
      "Tenant isolation: a request can only search the documents of the API key that sent it.",
      "API-key access through a single /v1/chat endpoint.",
      "Cited answers that list the passages used, with match scores.",
      "Tiered model routing: easy questions to a cheaper model, hard ones escalate; no match means no model call.",
      "Dashboard with request logs, analytics and usage meters.",
    ],
    creators: ["Jee Daguman", "Jhon Bryan Castro"],
    tech: [
      "Express",
      "TypeScript",
      "FastAPI",
      "Python",
      "React",
      "Vite",
      "PostgreSQL + pgvector",
      "Better Auth",
    ],
    image: "/projects/lumen.png",
    imageAlt:
      "Screenshot of the Lumen website headline: Answers from your documents, from the smallest model that gets them right.",
    live: "https://lumen-roan-two.vercel.app/",
    repo: { kind: "public", url: "https://github.com/Aicyraa/lumen" },
    overview:
      "Per the public README, retrieval combines BM25 and vector search with a local reranker, models must return exact evidence quotes that the service validates, and tenants can bring their own provider keys, which are encrypted at rest. The README describes the web app on Vercel with a separate API and RAG service.",
  },
]

/** Researchers whose projects are confirmed above. Keys match FACILITATORS names. */
export const PROJECT_BY_PERSON: Record<string, string[]> = {
  "John Ray Cacananta": ["C.A.G.E."],
  "Jee Daguman": ["Lumen"],
  "Jhon Bryan Castro": ["Lumen"],
}

/**
 * NVIDIA credential metadata. Intentionally empty: nothing has been verified yet.
 * Add an entry only after the researcher and Professor Chughtai approve it.
 */
export type NvidiaCredential = {
  developerAccountVerified?: boolean
  researchInvolvement?: string
  architectureDesignation?: string
  publicProfileUrl?: string
}
export const NVIDIA_CREDENTIALS: Record<string, NvidiaCredential> = {}

// ---------- Ontology ----------

export type OntNode = {
  id: string
  name: string
  x: number
  y: number
  definition: string
  security: string
}
export type OntEdge = { from: string; to: string; label: string }

export const ONT_NODES: OntNode[] = [
  { id: "principal", name: "Human Principal", x: 110, y: 100, definition: "The accountable person or organisation on whose behalf an agent acts.", security: "Identity must be authenticated; impersonating a principal is the root of privilege escalation." },
  { id: "agent", name: "AI Agent", x: 400, y: 100, definition: "A software system that plans and requests actions to pursue a principal's goal.", security: "An agent is not its principal: it needs its own identity and an explicit mapping to who it serves." },
  { id: "action", name: "Action", x: 690, y: 100, definition: "A specific operation an agent proposes, such as reading a record or sending a message.", security: "The decision point. Authorization should be evaluated before an action executes, and fail closed." },
  { id: "tool", name: "Tool", x: 900, y: 100, definition: "A capability, such as an API or function, through which actions are carried out.", security: "Holding a tool is not permission to use it for every purpose; tools need their own restrictions." },
  { id: "source", name: "Knowledge Source", x: 400, y: 300, definition: "Documents, databases or graphs that supply facts to an agent.", security: "Untrusted content can carry malicious instructions, and retrieval must respect source-level access." },
  { id: "policy", name: "Authorization Policy", x: 690, y: 300, definition: "Rules stating which principals and agents may perform which actions on which resources.", security: "Policies must be interpreted consistently across layers, including for derived results." },
  { id: "resource", name: "Resource", x: 900, y: 300, definition: "Data, a system or an asset that actions operate on.", security: "The thing being protected. Inference over related data can disclose a resource indirectly." },
  { id: "evidence", name: "Audit Evidence", x: 400, y: 500, definition: "A reviewable record of what was requested, decided and executed, and why.", security: "Without it, violations go unnoticed and incidents cannot be traced." },
  { id: "mitigation", name: "Mitigation Control", x: 690, y: 500, definition: "A safeguard that reduces the likelihood or impact of a risk.", security: "A control only counts once it is tested; a planned control is not an implemented one." },
  { id: "risk", name: "Security Risk", x: 900, y: 500, definition: "A way an asset could be harmed, such as leakage, poisoning or misuse.", security: "Risks should be named explicitly in the model so controls can be mapped to them." },
]

export const ONT_EDGES: OntEdge[] = [
  { from: "principal", to: "agent", label: "operates" },
  { from: "agent", to: "action", label: "requests" },
  { from: "action", to: "resource", label: "targets" },
  { from: "policy", to: "action", label: "governs" },
  { from: "tool", to: "action", label: "executes if authorized" },
  { from: "source", to: "agent", label: "informs" },
  { from: "risk", to: "resource", label: "threatens" },
  { from: "mitigation", to: "risk", label: "addresses" },
  { from: "evidence", to: "action", label: "records decision on" },
]

export const ONT_TOPICS: { title: string; body: string }[] = [
  { title: "What an ontology is", body: "An ontology is an explicit, machine-readable description of the concepts in a domain and how they relate. It fixes a shared vocabulary so that people and software mean the same thing by the same term." },
  { title: "Classes, entities, properties, relationships", body: "In OWL 2 terms, classes group things (Agent), individuals are specific members (one particular agent), and properties describe individuals or link them to each other (operates, targets)." },
  { title: "Ontology versus a database schema", body: "A schema defines how records are stored and validated. An ontology states what the terms mean, so a reasoner can derive facts that were never stored. The first constrains data; the second describes knowledge." },
  { title: "Knowledge graphs and semantic reasoning", body: "A knowledge graph stores entities and relationships as a graph. Paired with an ontology, a reasoner can infer implicit facts, for example that anything an agent may read through a delegated tool is also reachable by its principal." },
  { title: "Why it matters for AI agents", body: "Agents act on goals, tools and data. A shared model of who may do what to which resource gives retrieval, reasoning and authorization a common language instead of ad hoc strings." },
  { title: "Authorization, provenance and governance", body: "PROV-O models where information came from: entities, the activities that produced them and the agents responsible. Authorization decides what may happen; provenance and audit records explain what did." },
  { title: "Risks of ontology-driven reasoning", body: "Inference can expose what no single record reveals; edited relationships can silently change what a policy permits; retrieved content can smuggle in instructions. The model itself becomes an asset to protect." },
  { title: "Security measures", body: "Authenticate principals, validate and version changes to the ontology, filter retrieval by tenant and source, check authorization on derived results, gate actions before execution, and keep reviewable evidence." },
]

export const ONT_LAYERS: { n: string; name: string; risk: string; control: string }[] = [
  { n: "01", name: "Identity & Trust", risk: "Impersonating a principal or confusing agent identities", control: "Authenticated principals, explicit identity-to-agent mapping, least privilege" },
  { n: "02", name: "Ontology Integrity", risk: "Unauthorized or poisoned relationship changes", control: "Schema validation, versioning, reviewed and authorized updates" },
  { n: "03", name: "Knowledge & Retrieval", risk: "Cross-tenant leakage, restricted or poisoned sources", control: "Tenant and source-level access control, filtering before release" },
  { n: "04", name: "Reasoning & Inference", risk: "Derived conclusions that reveal restricted facts", control: "Policy-aware inference boundaries, checks on derived results" },
  { n: "05", name: "Agent Actions & Tools", risk: "Tool misuse, privilege inheritance, multi-step bypass", control: "Pre-execution checks, fail-closed decisions, human approval for sensitive actions" },
  { n: "06", name: "Evidence & Governance", risk: "Missing or tampered audit records", control: "Structured logging, decision traces, security regression testing" },
]

export const ONT_STANDARDS = [
  { label: "W3C OWL 2 Overview", url: "https://www.w3.org/TR/owl2-overview/" },
  { label: "W3C PROV-O", url: "https://www.w3.org/TR/prov-o/" },
  { label: "NIST AI RMF", url: "https://airc.nist.gov/" },
]
