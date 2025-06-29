"use client"

import { useState } from "react"
import type { PitchData } from "@/types/pitch-deck"

export function usePDFDownload() {
  const [isGenerating, setIsGenerating] = useState(false)

  const downloadPDF = async (pitchData: PitchData, theme: string, brandColor: string) => {
    setIsGenerating(true)

    try {
      // Enhanced debugging
      console.log("=== PDF Generation Debug ===")
      console.log("Full pitchData:", JSON.stringify(pitchData, null, 2))
      console.log("Theme:", theme)
      console.log("Brand Color:", brandColor)

      // Import jsPDF dynamically
      const { jsPDF } = await import("jspdf")
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      })

      // Convert hex color to RGB
      const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
        return result
          ? {
              r: Number.parseInt(result[1], 16),
              g: Number.parseInt(result[2], 16),
              b: Number.parseInt(result[3], 16),
            }
          : { r: 37, g: 99, b: 235 }
      }

      const brandRgb = hexToRgb(brandColor)
      console.log("Brand RGB:", brandRgb)

      // Improved slide collection - check for ANY content
      const allSlides = []
      const sections = [
        { key: "problem", title: "Problem", data: pitchData.problem },
        { key: "solution", title: "Solution", data: pitchData.solution },
        { key: "team", title: "Team", data: pitchData.team },
        { key: "businessModel", title: "Business Model", data: pitchData.businessModel },
        { key: "market", title: "Market", data: pitchData.market },
      ]

      sections.forEach((section) => {
        console.log(`Checking ${section.key}:`, section.data)

        // More flexible content detection
        const hasTitle = section.data?.title && section.data.title.trim().length > 0
        const hasContent = section.data?.content && section.data.content.trim().length > 0
        const hasImage = section.data?.image && section.data.image.length > 0

        if (hasTitle || hasContent || hasImage) {
          allSlides.push({
            sectionTitle: section.title,
            title: section.data?.title?.trim() || section.title,
            content: section.data?.content?.trim() || "",
            image: section.data?.image || "",
            hasTitle,
            hasContent,
            hasImage,
          })
          console.log(
            `✅ Added slide: ${section.title} (Title: ${hasTitle}, Content: ${hasContent}, Image: ${hasImage})`,
          )
        } else {
          console.log(`❌ Skipped slide: ${section.title} - no content found`)
        }
      })

      console.log("Total slides to generate:", allSlides.length)

      if (allSlides.length === 0) {
        // Create a helpful instruction page
        doc.setFillColor(brandRgb.r, brandRgb.g, brandRgb.b)
        doc.rect(0, 0, 297, 70, "F")

        // Header
        doc.setTextColor(255, 255, 255)
        doc.setFontSize(32)
        doc.setFont("helvetica", "bold")
        doc.text("PitchDeck Genie", 20, 40)

        // Instructions
        doc.setTextColor(0, 0, 0)
        doc.setFontSize(18)
        doc.setFont("helvetica", "bold")
        doc.text("Getting Started with Your Pitch Deck", 20, 90)

        doc.setFontSize(14)
        doc.setFont("helvetica", "normal")
        const instructions = [
          "1. Fill out the form sections on the left side of the screen",
          "2. Add at least a title OR content to each section you want to include",
          "3. Optionally add images to make your slides more engaging",
          "4. Watch the live preview update as you type",
          "5. Click 'Download PDF' again once you've added content",
        ]

        let yPos = 110
        instructions.forEach((instruction) => {
          doc.text(instruction, 30, yPos)
          yPos += 20
        })

        // Footer
        doc.setFontSize(10)
        doc.setTextColor(100, 100, 100)
        doc.text(`Generated on ${new Date().toLocaleDateString()}`, 20, 190)
        doc.text("PitchDeck Genie - Professional Pitch Decks Made Easy", 150, 190)
      } else {
        // Generate slides with content
        allSlides.forEach((slide, index) => {
          console.log(`Generating slide ${index + 1}: ${slide.sectionTitle}`)

          if (index > 0) {
            doc.addPage()
          }

          // Header background
          doc.setFillColor(brandRgb.r, brandRgb.g, brandRgb.b)
          doc.rect(0, 0, 297, 65, "F")

          // Logo area (if available)
          if (pitchData.logo && index === 0) {
            doc.setFillColor(255, 255, 255, 0.2)
            doc.rect(240, 15, 40, 35, "F")
            doc.setTextColor(255, 255, 255)
            doc.setFontSize(8)
            doc.text("LOGO", 257, 35)
          }

          // Section badge
          doc.setFillColor(255, 255, 255)
          doc.rect(20, 15, 70, 18, "F")
          doc.setTextColor(brandRgb.r, brandRgb.g, brandRgb.b)
          doc.setFontSize(11)
          doc.setFont("helvetica", "bold")
          doc.text(slide.sectionTitle.toUpperCase(), 25, 27)

          // Main title
          doc.setTextColor(255, 255, 255)
          doc.setFontSize(26)
          doc.setFont("helvetica", "bold")
          const titleText = slide.title || slide.sectionTitle
          doc.text(titleText, 20, 50)

          // Page number
          doc.setFontSize(12)
          doc.setFont("helvetica", "normal")
          doc.text(`${index + 1} / ${allSlides.length}`, 250, 50)

          // Content area background
          doc.setFillColor(248, 250, 252)
          doc.rect(20, 75, 257, 105, "F")

          // Content border
          doc.setDrawColor(brandRgb.r, brandRgb.g, brandRgb.b)
          doc.setLineWidth(0.5)
          doc.rect(20, 75, 257, 105)

          // Content text
          doc.setTextColor(40, 40, 40)
          doc.setFontSize(13)
          doc.setFont("helvetica", "normal")

          if (slide.hasContent && slide.content) {
            const contentLines = doc.splitTextToSize(slide.content, 240)
            let yPos = 90

            contentLines.forEach((line: string) => {
              if (yPos < 170) {
                doc.text(line, 30, yPos)
                yPos += 6
              }
            })
            console.log(`✅ Added content for ${slide.sectionTitle}`)
          } else if (slide.hasTitle) {
            doc.setTextColor(120, 120, 120)
            doc.setFont("helvetica", "italic")
            doc.text("Content will be added here when you fill out the form.", 30, 90)
          }

          // Image placeholder if image exists
          if (slide.hasImage) {
            doc.setFillColor(220, 220, 220)
            doc.rect(200, 85, 60, 40, "F")
            doc.setTextColor(100, 100, 100)
            doc.setFontSize(8)
            doc.text("IMAGE", 225, 107)
          }

          // Footer
          doc.setTextColor(120, 120, 120)
          doc.setFontSize(8)
          doc.text(`Generated on ${new Date().toLocaleDateString()}`, 20, 190)
          doc.text("PitchDeck Genie", 230, 190)
        })
      }

      // Trigger confetti
      triggerConfetti()

      // Save PDF
      const fileName = `pitch-deck-${new Date().toISOString().slice(0, 10)}.pdf`
      doc.save(fileName)

      console.log("✅ PDF saved as:", fileName)
      console.log("=== PDF Generation Complete ===")
    } catch (error) {
      console.error("❌ PDF Generation Error:", error)
      alert(`Failed to generate PDF: ${error.message}`)
    } finally {
      setIsGenerating(false)
    }
  }

  const triggerConfetti = () => {
    // Simple confetti effect using DOM manipulation
    const colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#ffeaa7"]

    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement("div")
      confetti.style.position = "fixed"
      confetti.style.width = "10px"
      confetti.style.height = "10px"
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
      confetti.style.left = Math.random() * window.innerWidth + "px"
      confetti.style.top = "-10px"
      confetti.style.zIndex = "9999"
      confetti.style.borderRadius = "50%"
      confetti.style.pointerEvents = "none"

      document.body.appendChild(confetti)

      const animation = confetti.animate(
        [
          { transform: "translateY(0px) rotate(0deg)", opacity: 1 },
          { transform: `translateY(${window.innerHeight + 100}px) rotate(360deg)`, opacity: 0 },
        ],
        {
          duration: Math.random() * 2000 + 1000,
          easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        },
      )

      animation.onfinish = () => confetti.remove()
    }
  }

  return {
    downloadPDF,
    isGenerating,
  }
}
