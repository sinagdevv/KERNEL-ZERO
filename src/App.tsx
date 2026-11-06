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

import type { Tab } from "./data"

const fromHash = (): Tab =>
  window.location.hash === "#people" ? "people" : "program"

export default function App() {
  const [tab, setTabState] = useState<Tab>(fromHash)

  const setTab = useCallback((t: Tab) => {
    setTabState(t)

    window.history.replaceState(
      null,
      "",
      t === "people" ? "#people" : window.location.pathname,
    )

    window.scrollTo({ top: 0 })
  }, [])

  useEffect(() => {
    const onTab = (e: Event) => {
      const t = (e as CustomEvent<Tab>).detail

      setTabState(t)

      window.history.replaceState(
        null,
        "",
        t === "people" ? "#people" : window.location.pathname,
      )
    }

    window.addEventListener("kz:tab", onTab)

    return () => window.removeEventListener("kz:tab", onTab)
  }, [])

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
        ) : (
          <div className="pt-16 md:pt-20">
            <Faculty />
            <Facilitators />
            <Cohort />
          </div>
        )}
      </main>
      <Closing />
    </>
  )
}
