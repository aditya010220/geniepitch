"use client"

import { useState, useEffect } from "react"

// Updated theme configurations without fun theme
const themeConfigs = {
  corporate: {
    name: "Corporate",
    defaultColor: "#2563eb",
    background: "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50",
    darkBackground: "bg-gray-900",
    cardStyle: "shadow-lg border-0 backdrop-blur-sm",
    fontFamily: "font-sans",
    borderRadius: "rounded-xl",
  },
  minimal: {
    name: "Minimal",
    defaultColor: "#64748b",
    background: "bg-gray-50",
    darkBackground: "bg-gray-950",
    cardStyle: "shadow-sm border border-gray-200/50",
    fontFamily: "font-mono",
    borderRadius: "rounded-lg",
  },
  dark: {
    name: "Dark",
    defaultColor: "#6366f1",
    background: "bg-gray-900",
    darkBackground: "bg-gray-900",
    cardStyle: "shadow-xl border border-gray-700/50",
    fontFamily: "font-sans",
    borderRadius: "rounded-xl",
  },
}

export function useTheme() {
  const [theme, setTheme] = useState("corporate")
  const [brandColor, setBrandColor] = useState("#2563eb")

  // Load from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("pitchDeckTheme")
    const savedColor = localStorage.getItem("pitchDeckBrandColor")

    if (savedTheme && savedTheme !== "fun") {
      setTheme(savedTheme)
      if (!savedColor) {
        setBrandColor(themeConfigs[savedTheme as keyof typeof themeConfigs]?.defaultColor || "#2563eb")
      }
    }
    if (savedColor) setBrandColor(savedColor)
  }, [])

  // Save to localStorage and update default color when theme changes
  useEffect(() => {
    localStorage.setItem("pitchDeckTheme", theme)
    const currentConfig = themeConfigs[theme as keyof typeof themeConfigs]
    if (currentConfig && Object.values(themeConfigs).some((config) => config.defaultColor === brandColor)) {
      setBrandColor(currentConfig.defaultColor)
    }
  }, [theme])

  useEffect(() => {
    localStorage.setItem("pitchDeckBrandColor", brandColor)
  }, [brandColor])

  const getThemeConfig = () => themeConfigs[theme as keyof typeof themeConfigs] || themeConfigs.corporate

  return {
    theme,
    setTheme,
    brandColor,
    setBrandColor,
    themeConfig: getThemeConfig(),
  }
}
