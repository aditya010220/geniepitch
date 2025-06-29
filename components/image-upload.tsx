"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, X, FileImage } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
  value?: string
  onChange: (value: string) => void
  theme: string
  brandColor: string
  themeConfig: any
}

export function ImageUpload({ value, onChange, theme, brandColor, themeConfig }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        onChange(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    handleFileSelect(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemove = () => {
    onChange("")
  }

  const getCardClassName = () => {
    let baseClass = `border-2 border-dashed cursor-pointer transition-all duration-200 ${themeConfig.borderRadius}`

    if (isDragging) {
      baseClass += " border-blue-500 bg-blue-50/50"
    } else if (theme === "dark") {
      baseClass += " border-gray-600 bg-gray-700/30 hover:border-gray-500 hover:bg-gray-700/50"
    } else if (theme === "minimal") {
      baseClass += " border-gray-300 bg-gray-50 hover:border-gray-400"
    } else {
      baseClass += " border-gray-300 bg-gray-50/50 hover:border-gray-400 hover:bg-gray-50"
    }

    return baseClass
  }

  return (
    <div className="space-y-2">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFileSelect(file)
        }}
        className="hidden"
      />

      {value ? (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative group">
          <Card
            className={`overflow-hidden ${themeConfig.borderRadius} ${theme === "dark" ? "bg-gray-700" : "bg-gray-50"}`}
          >
            <div className="aspect-video relative">
              <Image src={value || "/placeholder.svg"} alt="Uploaded image" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleRemove}
                  className={`gap-2 ${themeConfig.borderRadius}`}
                >
                  <X className="w-4 h-4" />
                  Remove
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      ) : (
        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
          <Card
            className={getCardClassName()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={handleClick}
          >
            <div className="p-6 text-center">
              <div className="space-y-4">
                <motion.div
                  className={`w-12 h-12 mx-auto ${themeConfig.borderRadius} flex items-center justify-center`}
                  style={{ backgroundColor: brandColor + "15" }}
                  whileHover={{ scale: 1.1 }}
                >
                  <FileImage className="w-6 h-6" style={{ color: brandColor }} />
                </motion.div>
                <div>
                  <p
                    className={`font-medium ${themeConfig.fontFamily} ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                  >
                    Drop image here
                  </p>
                  <p
                    className={`text-sm ${themeConfig.fontFamily} ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                  >
                    or click to browse files
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className={`gap-2 bg-transparent ${themeConfig.borderRadius}`}
                  style={{ borderColor: brandColor, color: brandColor }}
                >
                  <Upload className="w-4 h-4" />
                  Choose File
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
