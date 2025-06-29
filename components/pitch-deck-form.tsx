"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ImageUpload } from "@/components/image-upload"
import type { PitchData } from "@/types/pitch-deck"
import { Lightbulb, Target, Users, DollarSign, TrendingUp, Upload, AlertCircle } from "lucide-react"

interface PitchDeckFormProps {
  pitchData: PitchData
  onUpdate: (data: Partial<PitchData>) => void
  theme: string
  brandColor: string
  themeConfig: any
}

export function PitchDeckForm({ pitchData, onUpdate, theme, brandColor, themeConfig }: PitchDeckFormProps) {
  const sections = [
    {
      key: "problem" as keyof PitchData,
      title: "Problem",
      icon: Lightbulb,
      placeholder: "What problem are you solving?",
      description: "Identify the pain point your audience faces",
      color: "#ef4444",
    },
    {
      key: "solution" as keyof PitchData,
      title: "Solution",
      icon: Target,
      placeholder: "How do you solve this problem?",
      description: "Explain your unique approach and value proposition",
      color: "#10b981",
    },
    {
      key: "team" as keyof PitchData,
      title: "Team",
      icon: Users,
      placeholder: "Who is behind this project?",
      description: "Introduce your key team members and expertise",
      color: "#8b5cf6",
    },
    {
      key: "businessModel" as keyof PitchData,
      title: "Business Model",
      icon: DollarSign,
      placeholder: "How will you make money?",
      description: "Outline your revenue strategy and monetization",
      color: "#f59e0b",
    },
    {
      key: "market" as keyof PitchData,
      title: "Market",
      icon: TrendingUp,
      placeholder: "What is your target market?",
      description: "Define your market opportunity and size",
      color: "#06b6d4",
    },
  ]

  const getCardClassName = () => {
    let baseClass = `${themeConfig.cardStyle} ${themeConfig.borderRadius} transition-all duration-300 hover:shadow-xl group`

    if (theme === "dark") {
      baseClass += " bg-gray-800/50 text-white hover:bg-gray-800/70"
    } else if (theme === "minimal") {
      baseClass += " bg-white hover:shadow-lg hover:border-gray-300"
    } else {
      baseClass += " bg-white/70 hover:bg-white/90"
    }

    return baseClass
  }

  const getInputClassName = () => {
    let baseClass = "transition-all duration-200 focus:ring-2 focus:ring-offset-2"

    if (theme === "dark") {
      baseClass += " bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
    } else if (theme === "minimal") {
      baseClass += " bg-white border-gray-300 focus:border-gray-400"
    } else {
      baseClass += " bg-white/80 border-gray-200 focus:bg-white"
    }

    return baseClass
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2
          className={`text-2xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"} ${themeConfig.fontFamily}`}
        >
          Build Your Pitch Deck
        </h2>
        <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          Fill out each section to create professional slides
        </p>
      </motion.div>

      {/* Logo Upload */}
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
        <Card className={getCardClassName()}>
          <CardHeader className="pb-4">
            <CardTitle className={`flex items-center gap-3 ${themeConfig.fontFamily}`}>
              <div className={`p-2 ${themeConfig.borderRadius} text-white`} style={{ backgroundColor: brandColor }}>
                <Upload className="w-4 h-4" />
              </div>
              <div>
                <div>Company Logo</div>
                <div className={`text-xs font-normal ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                  Optional - Add your brand identity
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ImageUpload
              value={pitchData.logo}
              onChange={(logo) => onUpdate({ logo })}
              theme={theme}
              brandColor={brandColor}
              themeConfig={themeConfig}
            />
          </CardContent>
        </Card>
      </motion.div>

      {/* Form Sections */}
      {sections.map((section, index) => {
        const hasContent = pitchData[section.key]?.title || pitchData[section.key]?.content

        return (
          <motion.div
            key={section.key}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className={getCardClassName()}>
              <CardHeader className="pb-4">
                <CardTitle className={`flex items-center gap-3 ${themeConfig.fontFamily}`}>
                  <div
                    className={`p-2 ${themeConfig.borderRadius} text-white`}
                    style={{ backgroundColor: section.color }}
                  >
                    <section.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {section.title}
                      {hasContent && <div className="w-2 h-2 rounded-full bg-green-500" />}
                      {!hasContent && <AlertCircle className="w-4 h-4 text-amber-500" />}
                    </div>
                    <div className={`text-xs font-normal ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                      {section.description}
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor={`${section.key}-title`} className={`text-sm font-medium ${themeConfig.fontFamily}`}>
                      Section Title *
                    </Label>
                    <motion.div whileFocus={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                      <Input
                        id={`${section.key}-title`}
                        value={pitchData[section.key]?.title || ""}
                        onChange={(e) =>
                          onUpdate({
                            [section.key]: {
                              ...pitchData[section.key],
                              title: e.target.value,
                            },
                          })
                        }
                        placeholder={`${section.title} title`}
                        className={`${getInputClassName()} ${themeConfig.borderRadius}`}
                        style={
                          {
                            "--tw-ring-color": brandColor + "40",
                            borderColor: pitchData[section.key]?.title ? brandColor : undefined,
                          } as React.CSSProperties
                        }
                      />
                    </motion.div>
                  </div>

                  <div>
                    <Label
                      htmlFor={`${section.key}-content`}
                      className={`text-sm font-medium ${themeConfig.fontFamily}`}
                    >
                      Content *
                    </Label>
                    <motion.div whileFocus={{ scale: 1.005 }} transition={{ duration: 0.2 }}>
                      <Textarea
                        id={`${section.key}-content`}
                        value={pitchData[section.key]?.content || ""}
                        onChange={(e) =>
                          onUpdate({
                            [section.key]: {
                              ...pitchData[section.key],
                              content: e.target.value,
                            },
                          })
                        }
                        placeholder={section.placeholder}
                        rows={4}
                        className={`${getInputClassName()} ${themeConfig.borderRadius} resize-none`}
                        style={
                          {
                            "--tw-ring-color": brandColor + "40",
                            borderColor: pitchData[section.key]?.content ? brandColor : undefined,
                          } as React.CSSProperties
                        }
                      />
                    </motion.div>
                  </div>

                  <div>
                    <Label className={`text-sm font-medium ${themeConfig.fontFamily}`}>
                      Supporting Image
                      <span
                        className={`text-xs font-normal ml-2 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
                      >
                        (Optional)
                      </span>
                    </Label>
                    <ImageUpload
                      value={pitchData[section.key]?.image}
                      onChange={(image) =>
                        onUpdate({
                          [section.key]: {
                            ...pitchData[section.key],
                            image,
                          },
                        })
                      }
                      theme={theme}
                      brandColor={brandColor}
                      themeConfig={themeConfig}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}
