import { useCallback, useEffect, useState } from "react"

import Closing from "./components/Closing"

import Cohort from "./components/Cohort"

import Faculty from "./components/Faculty"

import Facilitators from "./components/Facilitators"

import Hero from "./components/Hero"

import Lab from "./components/Lab"

import Manifesto from "./components/Manifesto"

import Modules from "./components/Modules"

import Nav from "./components/Nav"

import Principles from "./components/Principles"

import Roadmap from "./components/Roadmap"

import Ontology from "./components/Ontology"

import Patents from "./components/Patents"

import Projects from "./components/Projects"

import Nvidia from "./components/Nvidia"

import { TAB_META, TAB_PATH, tabFromLocation, type Tab } from "./data"

export default function App() {
  const [tab, setTabState] = useState<Tab>(tabFromLocation)

  const setTab = useCallback((t: Tab) => {
    setTabState(t)

    window.history.pushState(null, "", TAB_PATH[t])

    window.scrollTo({ top: 0 })
  }, [])

  useEffect(() => {
    // scrollToId asks for the tab that owns a section; popstate handles back/forward.
    const onTab = (e: Event) => {
      const t = (e as CustomEvent<Tab>).detail

      setTabState(t)

      window.history.pushState(null, "", TAB_PATH[t])
    }

    const onPop = () => setTabState(tabFromLocation())

    window.addEventListener("kz:tab", onTab)

    window.addEventListener("popstate", onPop)

    return () => {
      window.removeEventListener("kz:tab", onTab)

      window.removeEventListener("popstate", onPop)
    }
  }, [])

  useEffect(() => {
    document.title = TAB_META[tab].title

    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", TAB_META[tab].description)
  }, [tab])

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[200] bg-nv px-4 py-3 text-obsidian focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Nav tab={tab} setTab={setTab} />
      <main id="main">
        {tab === "program" ? (
          <>
            <Hero />
            <Manifesto />
            <Modules />
            <Lab />
            <Principles />
            <Roadmap />
          </>
        ) : tab === "people" ? (
          <div className="pt-16 md:pt-20">
            <h1 className="sr-only">Researchers</h1>
            <Faculty />
            <Facilitators />
            <Nvidia />
            <Cohort />
          </div>
        ) : tab === "projects" ? (
          <Projects />
        ) : tab === "ontology" ? (
          <Ontology />
        ) : (
          <Patents />
        )}
      </main>
      <Closing />
    </>
  )
}
