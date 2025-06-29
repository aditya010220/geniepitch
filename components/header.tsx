"use client"

import { motion } from "framer-motion"
import { Sparkles, Download, FileText, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { usePDFDownload } from "@/hooks/use-pdf-download"
import { usePitchDeck } from "@/hooks/use-pitch-deck"
import { useTheme } from "@/hooks/use-theme"

export function Header() {
  const { pitchData } = usePitchDeck()
  const { theme, brandColor, themeConfig } = useTheme()
  const { downloadPDF, isGenerating } = usePDFDownload()

  const handleDownload = () => {
    downloadPDF(pitchData, theme, brandColor)
  }

  // Count slides with content - more flexible detection
  const slideCount = [
    pitchData.problem,
    pitchData.solution,
    pitchData.team,
    pitchData.businessModel,
    pitchData.market,
  ].filter((slide) => {
    if (!slide) return false
    const hasTitle = slide.title && slide.title.trim().length > 0
    const hasContent = slide.content && slide.content.trim().length > 0
    const hasImage = slide.image && slide.image.length > 0
    return hasTitle || hasContent || hasImage
  }).length

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`border-b backdrop-blur-md sticky top-0 z-50 ${
        theme === "dark" ? "bg-gray-900/90 border-gray-700/50" : "bg-white/80 border-gray-200/50 shadow-sm"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <motion.div className="flex items-center gap-4" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <div
              className={`p-3 ${themeConfig.borderRadius} shadow-lg relative overflow-hidden`}
              style={{ backgroundColor: brandColor }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
              <Sparkles className="w-7 h-7 text-white relative z-10" />
            </div>
            <div>
              <h1
                className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"} ${themeConfig.fontFamily}`}
              >
                PitchDeck Genie
              </h1>
              <div className="flex items-center gap-3 mt-1">
                <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  Create professional pitch decks instantly
                </p>
                {slideCount > 0 && (
                  <Badge
                    variant="secondary"
                    className={`${themeConfig.borderRadius} text-xs`}
                    style={{ backgroundColor: brandColor + "20", color: brandColor }}
                  >
                    <FileText className="w-3 h-3 mr-1" />
                    {slideCount} slides
                  </Badge>
                )}
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Quick Stats */}
            <div
              className={`hidden md:flex items-center gap-4 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
            >
              <div className="flex items-center gap-1">
                <Zap className="w-4 h-4" style={{ color: brandColor }} />
                <span>Auto-save enabled</span>
              </div>
            </div>

            {/* Download Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleDownload}
                disabled={isGenerating}
                className={`gap-2 shadow-lg hover:shadow-xl transition-all duration-200 ${themeConfig.borderRadius}`}
                style={{ backgroundColor: brandColor }}
                size="lg"
              >
                <Download className="w-4 h-4" />
                {isGenerating
                  ? "Generating PDF..."
                  : slideCount === 0
                    ? "Add Content to Generate PDF"
                    : `Download PDF (${slideCount} slides)`}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
