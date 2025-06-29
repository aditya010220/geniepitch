"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SlideCard } from "@/components/slide-card"
import type { PitchData } from "@/types/pitch-deck"
import { ChevronLeft, ChevronRight, Grid, Play, Eye } from "lucide-react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"

interface SlidePreviewProps {
  pitchData: PitchData
  theme: string
  brandColor: string
  themeConfig: any
  onReorder: (startIndex: number, endIndex: number) => void
}

export function SlidePreview({ pitchData, theme, brandColor, themeConfig, onReorder }: SlidePreviewProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel")

  const slides = [
    { key: "problem", data: pitchData.problem, title: "Problem" },
    { key: "solution", data: pitchData.solution, title: "Solution" },
    { key: "team", data: pitchData.team, title: "Team" },
    { key: "businessModel", data: pitchData.businessModel, title: "Business Model" },
    { key: "market", data: pitchData.market, title: "Market" },
  ].filter((slide) => {
    if (!slide.data) return false
    const hasTitle = slide.data.title && slide.data.title.trim().length > 0
    const hasContent = slide.data.content && slide.data.content.trim().length > 0
    const hasImage = slide.data.image && slide.data.image.length > 0
    return hasTitle || hasContent || hasImage
  })

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const handleDragEnd = (result: any) => {
    if (!result.destination) return
    onReorder(result.source.index, result.destination.index)
  }

  const getEmptyStateClassName = () => {
    let baseClass = `p-12 text-center ${themeConfig.cardStyle} ${themeConfig.borderRadius}`

    if (theme === "dark") {
      baseClass += " bg-gray-800/50 text-white"
    } else if (theme === "minimal") {
      baseClass += " bg-white"
    } else {
      baseClass += " bg-white/70"
    }

    return baseClass
  }

  if (slides.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className={getEmptyStateClassName()}>
          <div className="space-y-6">
            <motion.div
              className={`w-20 h-20 mx-auto ${themeConfig.borderRadius} bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center`}
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            >
              <Eye className="w-10 h-10 text-gray-400" />
            </motion.div>
            <div>
              <h3 className={`text-xl font-semibold mb-2 ${themeConfig.fontFamily}`}>Preview Your Slides</h3>
              <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"} max-w-md mx-auto`}>
                Start filling out the form sections to see your pitch deck come to life. Each completed section will
                appear as a professional slide here.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Auto-save enabled</span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex justify-between items-center">
        <div>
          <h2
            className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"} ${themeConfig.fontFamily}`}
          >
            Live Preview
          </h2>
          <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            {slides.length} slide{slides.length !== 1 ? "s" : ""} ready
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "carousel" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("carousel")}
            className={`gap-2 ${themeConfig.borderRadius}`}
            style={{
              backgroundColor: viewMode === "carousel" ? brandColor : undefined,
              borderColor: brandColor,
            }}
          >
            <Play className="w-4 h-4" />
            Slideshow
          </Button>
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className={`gap-2 ${themeConfig.borderRadius}`}
            style={{
              backgroundColor: viewMode === "grid" ? brandColor : undefined,
              borderColor: brandColor,
            }}
          >
            <Grid className="w-4 h-4" />
            Grid
          </Button>
        </div>
      </div>

      {viewMode === "carousel" ? (
        <div className="space-y-6">
          {/* Carousel View */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <SlideCard
                  slide={slides[currentSlide]}
                  theme={theme}
                  brandColor={brandColor}
                  themeConfig={themeConfig}
                  logo={pitchData.logo}
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            {slides.length > 1 && (
              <div className="flex justify-between items-center mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevSlide}
                  disabled={slides.length <= 1}
                  className={`gap-2 ${themeConfig.borderRadius}`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>

                <div className="flex gap-2">
                  {slides.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-2 rounded-full transition-all duration-200 ${
                        index === currentSlide ? "w-8 opacity-100" : "w-2 opacity-50 hover:opacity-75"
                      } ${theme === "minimal" ? "rounded-none" : ""}`}
                      style={{ backgroundColor: brandColor }}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextSlide}
                  disabled={slides.length <= 1}
                  className={`gap-2 ${themeConfig.borderRadius}`}
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Grid View with Drag & Drop */
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="slides">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="grid gap-6">
                {slides.map((slide, index) => (
                  <Draggable key={slide.key} draggableId={slide.key} index={index}>
                    {(provided, snapshot) => (
                      <motion.div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`transform transition-all duration-200 ${
                          snapshot.isDragging ? "scale-105 shadow-2xl rotate-2" : ""
                        }`}
                      >
                        <SlideCard
                          slide={slide}
                          theme={theme}
                          brandColor={brandColor}
                          themeConfig={themeConfig}
                          logo={pitchData.logo}
                          isSmall
                        />
                      </motion.div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  )
}
