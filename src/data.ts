export type Tab = 'program' | 'people'

export const TABS: { id: Tab; label: string }[] = [
  { id: 'program', label: 'Program' },
  { id: 'people', label: 'People' },
]

export const NAV: Record<Tab, { id: string; label: string }[]> = {
  program: [
    { id: 'overview', label: 'Overview' },
    { id: 'learn', label: 'What We Learn' },
    { id: 'lab', label: 'The Lab' },
    { id: 'roadmap', label: 'Road Ahead' },
  ],
  people: [
    { id: 'professor', label: 'Our Professor' },
    { id: 'cohort', label: 'The Cohort' },
  ],
}

export const PROFESSOR_LINKEDIN = 'https://www.linkedin.com/in/samchughtai/'

const SECTION_TAB: Record<string, Tab> = { professor: 'people', cohort: 'people' }

export type Module = {
  name: string
  tag: string
  desc: string
  concepts: string[]
  viz: 'net' | 'attn' | 'loop' | 'shield' | 'vector' | 'grid'
}

export const MODULES: Module[] = [
  {
    name: 'Artificial Intelligence',
    tag: 'AI / FOUNDATIONS',
    desc: 'Explore machine learning fundamentals, neural networks, model architectures, and how machines learn from data.',
    concepts: ['Supervised & unsupervised learning', 'Neural network layers', 'Loss functions & gradient descent', 'Model architectures'],
    viz: 'net',
  },
  {
    name: 'Large Language Models',
    tag: 'LLM / TRANSFORMERS',
    desc: 'Study transformers, tokens, embeddings, inference, prompting, and how modern language models generate responses.',
    concepts: ['Tokenization', 'Embeddings', 'Self-attention', 'Inference & prompting'],
    viz: 'attn',
  },
  {
    name: 'AI Agents & Automation',
    tag: 'AGENTS / ORCHESTRATION',
    desc: 'Understand tool-using agents, agent workflows, reasoning loops, orchestration, and model-connected systems.',
    concepts: ['Tool use', 'Reasoning loops', 'Multi-step workflows', 'Orchestration'],
    viz: 'loop',
  },
  {
    name: 'AI Security',
    tag: 'SECURITY / DEFENSE',
    desc: 'Explore prompt injection, adversarial inputs, model misuse, access control, secure agent execution, and AI guardrails.',
    concepts: ['Prompt injection', 'Adversarial inputs', 'Access control', 'Guardrails'],
    viz: 'shield',
  },
  {
    name: 'Retrieval-Augmented Generation',
    tag: 'RAG / RETRIEVAL',
    desc: 'Study embeddings, vector retrieval, grounding, context management, and knowledge-connected AI applications.',
    concepts: ['Vector search', 'Grounding', 'Chunking & context windows', 'Knowledge-connected apps'],
    viz: 'vector',
  },
  {
    name: 'GPU & Accelerated Computing',
    tag: 'GPU / ACCELERATION',
    desc: 'Explore parallel computing, GPUs, CUDA fundamentals, tensor operations, and the hardware behind AI acceleration.',
    concepts: ['Parallelism', 'CUDA fundamentals', 'Tensor operations', 'Memory hierarchy'],
    viz: 'grid',
  },
]

export const STUDENTS = [
  'Ares Yael Garcia',
  'Chloe Marcelo',
  'Jee Daguman',
  'Jhon Bryan Castro',
  'John Benedict',
  'John Ray Cacananta',
  'Josh Matthew Mirador',
  'Kenneth',
  'Kim Villar',
  'Mercado Brian',
  'Myka Gonzales',
  'Raphael Isaac',
  'Sai Adalim',
  'Shaina Reign Coloma',
]

export const ROADMAP = [
  {
    title: 'AI Foundations',
    summary: 'Building intuition for how machines learn patterns from data, starting from first principles.',
    concepts: ['Datasets', 'Features', 'Training', 'Evaluation'],
    viz: 'net' as const,
  },
  {
    title: 'Language Models',
    summary: 'Understanding how transformers turn text into tokens, tokens into vectors, and vectors into language.',
    concepts: ['Tokens', 'Attention', 'Context', 'Decoding'],
    viz: 'attn' as const,
  },
  {
    title: 'Intelligent Agents',
    summary: 'Examining systems that plan, call tools, observe results, and iterate toward a goal.',
    concepts: ['Planning', 'Tool calls', 'Memory', 'Feedback loops'],
    viz: 'loop' as const,
  },
  {
    title: 'Retrieval Systems',
    summary: 'Connecting models to external knowledge so their answers can be grounded in real sources.',
    concepts: ['Embeddings', 'Indexes', 'Similarity', 'Grounding'],
    viz: 'vector' as const,
  },
  {
    title: 'AI Security',
    summary: 'Asking how intelligent systems fail, how they can be misused, and how to defend them.',
    concepts: ['Threat models', 'Injection', 'Policies', 'Auditing'],
    viz: 'shield' as const,
  },
  {
    title: 'Accelerated Computing',
    summary: 'Exploring the parallel hardware that makes training and running modern models possible.',
    concepts: ['GPUs', 'Kernels', 'Throughput', 'Tensors'],
    viz: 'grid' as const,
  },
]

export function initials(name: string) {
  const p = name.split(' ')
  return (p[0][0] + (p.length > 1 ? p[p.length - 1][0] : p[0][1] ?? '')).toUpperCase()
}

export function scrollToId(id: string) {
  const tab = SECTION_TAB[id] ?? 'program'
  const go = () => {
    if (id === 'top') window.scrollTo({ top: 0, behavior: 'smooth' })
    else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  if (document.getElementById(id) || id === 'top') return go()
  window.dispatchEvent(new CustomEvent('nv:tab', { detail: tab }))
  setTimeout(go, 80)
}
