"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Paintbrush } from "lucide-react"

interface ColorPickerProps {
  color: string
  onColorChange: (color: string) => void
}

export function ColorPicker({ color, onColorChange }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false)

  const presetColors = [
    "#3b82f6",
    "#ef4444",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#ec4899",
    "#06b6d4",
    "#84cc16",
    "#f97316",
    "#6366f1",
    "#14b8a6",
    "#eab308",
  ]

  return (
    <Card className="p-4 shadow-lg">
      <div className="flex items-center gap-2 mb-3">
        <Paintbrush className="w-4 h-4" />
        <span className="text-sm font-medium">Brand Color</span>
      </div>

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full gap-2 bg-transparent">
            <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: color }} />
            Custom
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-4">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-4"
            >
              <div>
                <label className="text-sm font-medium mb-2 block">Choose a color</label>
                <input
                  type="color"
                  value={color}
                  onChange={(e) => onColorChange(e.target.value)}
                  className="w-full h-10 rounded-md border cursor-pointer"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Presets</label>
                <div className="grid grid-cols-6 gap-2">
                  {presetColors.map((presetColor) => (
                    <motion.button
                      key={presetColor}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        onColorChange(presetColor)
                        setIsOpen(false)
                      }}
                      className={`w-8 h-8 rounded-full border-2 ${
                        color === presetColor ? "border-gray-900" : "border-gray-300"
                      }`}
                      style={{ backgroundColor: presetColor }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </PopoverContent>
      </Popover>
    </Card>
  )
}
