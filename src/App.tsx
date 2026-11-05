import Closing from './components/Closing'
import Cohort from './components/Cohort'
import Faculty from './components/Faculty'
import Hero from './components/Hero'
import Lab from './components/Lab'
import Manifesto from './components/Manifesto'
import Modules from './components/Modules'
import Nav from './components/Nav'
import Principles from './components/Principles'
import Roadmap from './components/Roadmap'
import { Cursor } from './components/ui'

export default function App() {
  return (
    <>
      <a href="#overview" className="label sr-only z-[200] bg-nv px-4 py-3 text-obsidian focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <Manifesto />
        <Modules />
        <Lab />
        <Faculty />
        <Cohort />
        <Principles />
        <Roadmap />
        <Closing />
      </main>
      <Cursor />
    </>
  )
}
