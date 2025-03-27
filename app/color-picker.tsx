"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
}

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Draw color gradient
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !isOpen) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Create color gradient
    const gradientH = ctx.createLinearGradient(0, 0, canvas.width, 0)
    gradientH.addColorStop(0, "#FF0000")
    gradientH.addColorStop(1 / 6, "#FFFF00")
    gradientH.addColorStop(2 / 6, "#00FF00")
    gradientH.addColorStop(3 / 6, "#00FFFF")
    gradientH.addColorStop(4 / 6, "#0000FF")
    gradientH.addColorStop(5 / 6, "#FF00FF")
    gradientH.addColorStop(1, "#FF0000")

    ctx.fillStyle = gradientH
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Create white to transparent gradient
    const gradientV = ctx.createLinearGradient(0, 0, 0, canvas.height)
    gradientV.addColorStop(0, "rgba(255, 255, 255, 1)")
    gradientV.addColorStop(0.5, "rgba(255, 255, 255, 0.5)")
    gradientV.addColorStop(1, "rgba(0, 0, 0, 1)")

    ctx.fillStyle = gradientV
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [isOpen])

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const pixel = ctx.getImageData(x, y, 1, 1).data
    const hex = rgbToHex(pixel[0], pixel[1], pixel[2])

    onChange(hex)
  }

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md border cursor-pointer" style={{ backgroundColor: color }} />
          <Input value={color} onChange={(e) => onChange(e.target.value)} className="w-28 font-mono" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="start">
        <canvas
          ref={canvasRef}
          width={256}
          height={150}
          onClick={handleCanvasClick}
          className="w-full h-auto cursor-crosshair"
        />
      </PopoverContent>
    </Popover>
  )
}

