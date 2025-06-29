"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Palette, Briefcase, Minimize, Moon } from "lucide-react"

interface ThemeSelectorProps {
  theme: string
  onThemeChange: (theme: string) => void
}

export function ThemeSelector({ theme, onThemeChange }: ThemeSelectorProps) {
  const themes = [
    { id: "corporate", name: "Corporate", icon: Briefcase, color: "#2563eb", description: "Professional & Clean" },
    { id: "minimal", name: "Minimal", icon: Minimize, color: "#64748b", description: "Simple & Focused" },
    { id: "dark", name: "Dark", icon: Moon, color: "#6366f1", description: "Modern & Sleek" },
  ]

  return (
    <Card className="p-6 shadow-lg backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-4">
        <Palette className="w-5 h-5 text-gray-600" />
        <div>
          <h3 className="font-semibold text-gray-900">Theme</h3>
          <p className="text-xs text-gray-500">Choose your style</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {themes.map((themeOption) => (
          <motion.div key={themeOption.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant={theme === themeOption.id ? "default" : "outline"}
              size="sm"
              onClick={() => onThemeChange(themeOption.id)}
              className="flex flex-col gap-2 h-auto p-3 w-full"
              style={{
                backgroundColor: theme === themeOption.id ? themeOption.color : undefined,
                borderColor: theme === themeOption.id ? themeOption.color : undefined,
              }}
            >
              <themeOption.icon className="w-4 h-4" />
              <div className="text-center">
                <div className="text-xs font-medium">{themeOption.name}</div>
                <div className="text-[10px] opacity-75">{themeOption.description}</div>
              </div>
            </Button>
          </motion.div>
        ))}
      </div>
    </Card>
  )
}
