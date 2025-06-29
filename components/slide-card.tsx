"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface SlideCardProps {
  slide: {
    key: string
    data: any
    title: string
  }
  theme: string
  brandColor: string
  themeConfig: any
  logo?: string
  isSmall?: boolean
}

export function SlideCard({ slide, theme, brandColor, themeConfig, logo, isSmall = false }: SlideCardProps) {
  const cardClass = `${isSmall ? "aspect-video" : "aspect-[16/10]"} ${themeConfig.cardStyle} ${themeConfig.borderRadius} overflow-hidden ${
    theme === "dark" ? "bg-gray-800" : "bg-white"
  }`

  const headerStyle = {
    background: `linear-gradient(135deg, ${brandColor}, ${brandColor}dd)`,
  }

  return (
    <motion.div
      whileHover={{
        scale: isSmall ? 1.03 : 1.01,
        y: -2,
      }}
      transition={{ duration: 0.2 }}
    >
      <Card className={cardClass}>
        <CardContent className="p-0 h-full relative">
          {/* Header */}
          <div
            className={`p-4 text-white relative overflow-hidden ${theme === "minimal" ? "rounded-none" : ""}`}
            style={headerStyle}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {logo && (
                  <div
                    className={`w-8 h-8 ${themeConfig.borderRadius} bg-white/20 backdrop-blur-sm flex items-center justify-center overflow-hidden`}
                  >
                    <Image
                      src={logo || "/placeholder.svg"}
                      alt="Logo"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                )}
                <h3 className={`font-bold ${isSmall ? "text-sm" : "text-lg"} ${themeConfig.fontFamily}`}>
                  {slide.data?.title || slide.title}
                </h3>
              </div>
              <Badge
                variant="secondary"
                className={`bg-white/20 text-white border-0 ${themeConfig.borderRadius} ${themeConfig.fontFamily} text-xs`}
              >
                {slide.title}
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 flex-1 flex flex-col justify-between h-full">
            <div className="space-y-3">
              {slide.data?.content && (
                <p
                  className={`${isSmall ? "text-xs" : "text-sm"} leading-relaxed ${themeConfig.fontFamily} ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {slide.data.content}
                </p>
              )}

              {slide.data?.image && (
                <div className={`${isSmall ? "h-16" : "h-24"} bg-gray-100 ${themeConfig.borderRadius} overflow-hidden`}>
                  <Image
                    src={slide.data.image || "/placeholder.svg"}
                    alt={slide.title}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center mt-4">
              <div className="flex gap-1">
                {theme === "minimal" ? (
                  <div className="w-4 h-0.5 opacity-60" style={{ backgroundColor: brandColor }} />
                ) : (
                  <div className="w-2 h-2 rounded-full opacity-60" style={{ backgroundColor: brandColor }} />
                )}
              </div>
              <div className={`text-xs ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>Slide {slide.key}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
