"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PitchDeckForm } from "@/components/pitch-deck-form"
import { SlidePreview } from "@/components/slide-preview"
import { ThemeSelector } from "@/components/theme-selector"
import { ColorPicker } from "@/components/color-picker"
import { Header } from "@/components/header"
import { usePitchDeck } from "@/hooks/use-pitch-deck"
import { useTheme } from "@/hooks/use-theme"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const { pitchData, updatePitchData, reorderSlides } = usePitchDeck()
  const { theme, setTheme, brandColor, setBrandColor, themeConfig } = useTheme()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div
      className={`min-h-screen transition-all duration-700 ${themeConfig.fontFamily} ${
        theme === "dark" ? themeConfig.darkBackground : themeConfig.background
      }`}
    >
      <AnimatePresence>
        {isLoaded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="min-h-screen"
          >
            <Header />

            <main className="container mx-auto px-6 py-8">
              {/* Control Panel */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex flex-wrap gap-6 mb-10 justify-center"
              >
                <ThemeSelector theme={theme} onThemeChange={setTheme} />
                <ColorPicker color={brandColor} onColorChange={setBrandColor} />
              </motion.div>

              {/* Main Content Grid */}
              <div className="grid xl:grid-cols-5 lg:grid-cols-3 gap-8 max-w-[1400px] mx-auto">
                {/* Form Panel - Takes up more space */}
                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="xl:col-span-2 lg:col-span-1"
                >
                  <PitchDeckForm
                    pitchData={pitchData}
                    onUpdate={updatePitchData}
                    theme={theme}
                    brandColor={brandColor}
                    themeConfig={themeConfig}
                  />
                </motion.div>

                {/* Preview Panel - Takes up remaining space */}
                <motion.div
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="xl:col-span-3 lg:col-span-2"
                >
                  <SlidePreview
                    pitchData={pitchData}
                    theme={theme}
                    brandColor={brandColor}
                    themeConfig={themeConfig}
                    onReorder={reorderSlides}
                  />
                </motion.div>
              </div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
