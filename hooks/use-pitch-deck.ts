"use client"

import { useState, useEffect } from "react"
import type { PitchData } from "@/types/pitch-deck"

const initialData: PitchData = {
  logo: "",
  problem: { title: "", content: "", image: "" },
  solution: { title: "", content: "", image: "" },
  team: { title: "", content: "", image: "" },
  businessModel: { title: "", content: "", image: "" },
  market: { title: "", content: "", image: "" },
}

export function usePitchDeck() {
  const [pitchData, setPitchData] = useState<PitchData>(initialData)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("pitchDeckData")
    if (saved) {
      try {
        setPitchData(JSON.parse(saved))
      } catch (error) {
        console.error("Failed to load saved data:", error)
      }
    }
  }, [])

  // Auto-save to localStorage
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem("pitchDeckData", JSON.stringify(pitchData))
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [pitchData])

  const updatePitchData = (updates: Partial<PitchData>) => {
    setPitchData((prev) => ({ ...prev, ...updates }))
  }

  const reorderSlides = (startIndex: number, endIndex: number) => {
    // This would reorder slides if we had a slides array
    // For now, we'll keep the current structure
    console.log("Reorder slides:", startIndex, endIndex)
  }

  return {
    pitchData,
    updatePitchData,
    reorderSlides,
  }
}
