"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ColorPicker } from "./color-picker"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Upload, Type, ImageIcon, Layers, Sparkles } from "lucide-react"
import { Switch } from "@/components/ui/switch"

export default function ThumbnailCreator() {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null)
  const [text, setText] = useState("AWESOME THUMBNAIL")
  const [textColor, setTextColor] = useState("#ffffff")
  const [textSize, setTextSize] = useState(60)
  const [textX, setTextX] = useState(50)
  const [textY, setTextY] = useState(50)
  const [textShadow, setTextShadow] = useState(true)
  const [textShadowColor, setTextShadowColor] = useState("#000000")
  const [textShadowBlur, setTextShadowBlur] = useState(10)
  const [textShadowOffsetX, setTextShadowOffsetX] = useState(2)
  const [textShadowOffsetY, setTextShadowOffsetY] = useState(2)
  const [textOutline, setTextOutline] = useState(false)
  const [textOutlineColor, setTextOutlineColor] = useState("#ff0000")
  const [textOutlineWidth, setTextOutlineWidth] = useState(3)
  const [font, setFont] = useState("Impact")
  const [overlay, setOverlay] = useState("none")
  const [overlayColor, setOverlayColor] = useState("#ff0000")
  const [overlayOpacity, setOverlayOpacity] = useState(0.3)
  const [brightness, setBrightness] = useState(100)
  const [contrast, setContrast] = useState(100)
  const [saturation, setSaturation] = useState(100)
  const [blur, setBlur] = useState(0)
  const [sticker, setSticker] = useState("none")
  const [stickerSize, setStickerSize] = useState(30)
  const [stickerX, setStickerX] = useState(80)
  const [stickerY, setStickerY] = useState(20)
  const [stickerRotation, setStickerRotation] = useState(0)
  const [textGradient, setTextGradient] = useState(false)
  const [textGradientStart, setTextGradientStart] = useState("#ff0000")
  const [textGradientEnd, setTextGradientEnd] = useState("#ffff00")
  const [textGradientDirection, setTextGradientDirection] = useState("horizontal")
  const [textTransform, setTextTransform] = useState("none")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const fonts = [
    "Impact",
    "Arial",
    "Verdana",
    "Helvetica",
    "Tahoma",
    "Trebuchet MS",
    "Georgia",
    "Times New Roman",
    "Comic Sans MS",
    "Bangers",
    "Bebas Neue",
    "Anton",
    "Oswald",
    "Montserrat",
    "Roboto",
  ]

  const overlays = [
    { name: "None", value: "none" },
    { name: "Dark Gradient", value: "dark-gradient" },
    { name: "Light Vignette", value: "light-vignette" },
    { name: "Color Overlay", value: "color-overlay" },
    { name: "Duotone", value: "duotone" },
    { name: "Diagonal Gradient", value: "diagonal-gradient" },
    { name: "Radial Burst", value: "radial-burst" },
    { name: "Noise Texture", value: "noise" },
    { name: "Halftone", value: "halftone" },
    { name: "Glitch Effect", value: "glitch" },
  ]

  const stickers = [
    { name: "None", value: "none" },
    { name: "Fire", value: "fire" },
    { name: "Star", value: "star" },
    { name: "Lightning", value: "lightning" },
    { name: "Arrow", value: "arrow" },
    { name: "Circle", value: "circle" },
    { name: "Explosion", value: "explosion" },
    { name: "Trophy", value: "trophy" },
    { name: "Heart", value: "heart" },
    { name: "NEW", value: "new" },
    { name: "HOT", value: "hot" },
    { name: "SALE", value: "sale" },
    { name: "100%", value: "100" },
  ]

  const textTransforms = [
    { name: "None", value: "none" },
    { name: "3D Effect", value: "3d" },
    { name: "Perspective", value: "perspective" },
    { name: "Distorted", value: "distorted" },
    { name: "Wavy", value: "wavy" },
    { name: "Rotated", value: "rotated" },
  ]

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setBackgroundImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const drawThumbnail = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw background
    if (backgroundImage) {
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = () => {
        // Draw the image to fit the canvas while maintaining aspect ratio
        const imgRatio = img.width / img.height
        const canvasRatio = canvas.width / canvas.height

        let drawWidth,
          drawHeight,
          offsetX = 0,
          offsetY = 0

        if (imgRatio > canvasRatio) {
          // Image is wider than canvas (relative to height)
          drawHeight = canvas.height
          drawWidth = img.width * (canvas.height / img.height)
          offsetX = (canvas.width - drawWidth) / 2
        } else {
          // Image is taller than canvas (relative to width)
          drawWidth = canvas.width
          drawHeight = img.height * (canvas.width / img.width)
          offsetY = (canvas.height - drawHeight) / 2
        }

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)

        // Apply image adjustments
        applyImageAdjustments(ctx, canvas)

        // Apply overlay
        applyOverlay(ctx, canvas)

        // Draw sticker
        drawSticker(ctx, canvas)

        // Draw text
        drawText(ctx, canvas)
      }
      img.src = backgroundImage
    } else {
      // Draw placeholder background
      ctx.fillStyle = "#333333"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Apply overlay
      applyOverlay(ctx, canvas)

      // Draw sticker
      drawSticker(ctx, canvas)

      // Draw text
      drawText(ctx, canvas)
    }
  }

  const applyImageAdjustments = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    // This is a simplified version - in a real app, you'd use WebGL or a library for better performance
    if (brightness !== 100 || contrast !== 100 || saturation !== 100 || blur > 0) {
      // Get image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data

      // Apply brightness, contrast, saturation
      for (let i = 0; i < data.length; i += 4) {
        // Brightness
        const brightnessValue = brightness / 100
        data[i] = data[i] * brightnessValue
        data[i + 1] = data[i + 1] * brightnessValue
        data[i + 2] = data[i + 2] * brightnessValue

        // Contrast
        const contrastFactor = (contrast / 100) * 2
        const contrastAdjust = 128 * (1 - contrastFactor)

        data[i] = data[i] * contrastFactor + contrastAdjust
        data[i + 1] = data[i + 1] * contrastFactor + contrastAdjust
        data[i + 2] = data[i + 2] * contrastFactor + contrastAdjust

        // Saturation (simplified)
        if (saturation !== 100) {
          const gray = 0.2989 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
          const satFactor = saturation / 100

          data[i] = gray * (1 - satFactor) + data[i] * satFactor
          data[i + 1] = gray * (1 - satFactor) + data[i + 1] * satFactor
          data[i + 2] = gray * (1 - satFactor) + data[i + 2] * satFactor
        }
      }

      ctx.putImageData(imageData, 0, 0)

      // Apply blur (simplified)
      if (blur > 0) {
        // Note: This is just a visual approximation of blur
        // Real blur would require a convolution filter
        ctx.filter = `blur(${blur}px)`
        ctx.drawImage(canvas, 0, 0)
        ctx.filter = "none"
      }
    }
  }

  const applyOverlay = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    switch (overlay) {
      case "dark-gradient":
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
        gradient.addColorStop(0, "rgba(0, 0, 0, 0.7)")
        gradient.addColorStop(0.5, "rgba(0, 0, 0, 0.3)")
        gradient.addColorStop(1, "rgba(0, 0, 0, 0.7)")
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        break
      case "light-vignette":
        const radialGradient = ctx.createRadialGradient(
          canvas.width / 2,
          canvas.height / 2,
          canvas.width / 10,
          canvas.width / 2,
          canvas.height / 2,
          canvas.width / 1.5,
        )
        radialGradient.addColorStop(0, "rgba(255, 255, 255, 0)")
        radialGradient.addColorStop(1, "rgba(0, 0, 0, 0.7)")
        ctx.fillStyle = radialGradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        break
      case "color-overlay":
        ctx.fillStyle = `rgba(${Number.parseInt(overlayColor.slice(1, 3), 16)}, ${Number.parseInt(overlayColor.slice(3, 5), 16)}, ${Number.parseInt(overlayColor.slice(5, 7), 16)}, ${overlayOpacity})`
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        break
      case "duotone":
        // Simplified duotone effect
        ctx.fillStyle = `rgba(${Number.parseInt(overlayColor.slice(1, 3), 16)}, ${Number.parseInt(overlayColor.slice(3, 5), 16)}, ${Number.parseInt(overlayColor.slice(5, 7), 16)}, 0.5)`
        ctx.globalCompositeOperation = "color"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.globalCompositeOperation = "source-over"
        break
      case "diagonal-gradient":
        const diagonalGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
        diagonalGradient.addColorStop(
          0,
          `rgba(${Number.parseInt(overlayColor.slice(1, 3), 16)}, ${Number.parseInt(overlayColor.slice(3, 5), 16)}, ${Number.parseInt(overlayColor.slice(5, 7), 16)}, ${overlayOpacity})`,
        )
        diagonalGradient.addColorStop(1, "rgba(0, 0, 0, 0)")
        ctx.fillStyle = diagonalGradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        break
      case "radial-burst":
        const burstGradient = ctx.createRadialGradient(
          canvas.width / 2,
          canvas.height / 2,
          0,
          canvas.width / 2,
          canvas.height / 2,
          canvas.width / 1.5,
        )
        burstGradient.addColorStop(
          0,
          `rgba(${Number.parseInt(overlayColor.slice(1, 3), 16)}, ${Number.parseInt(overlayColor.slice(3, 5), 16)}, ${Number.parseInt(overlayColor.slice(5, 7), 16)}, ${overlayOpacity})`,
        )
        burstGradient.addColorStop(0.7, "rgba(0, 0, 0, 0)")
        ctx.fillStyle = burstGradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        break
      case "noise":
        // Create noise texture
        const noiseData = ctx.createImageData(canvas.width, canvas.height)
        const noise = noiseData.data

        for (let i = 0; i < noise.length; i += 4) {
          const value = Math.floor(Math.random() * 255)
          noise[i] = noise[i + 1] = noise[i + 2] = value
          noise[i + 3] = Math.floor(overlayOpacity * 50) // Adjust opacity
        }

        ctx.putImageData(noiseData, 0, 0)
        ctx.globalCompositeOperation = "overlay"
        ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.globalCompositeOperation = "source-over"
        break
      case "halftone":
        // Simplified halftone effect
        const dotSize = 10
        const dotSpacing = 20

        ctx.fillStyle = `rgba(${Number.parseInt(overlayColor.slice(1, 3), 16)}, ${Number.parseInt(overlayColor.slice(3, 5), 16)}, ${Number.parseInt(overlayColor.slice(5, 7), 16)}, ${overlayOpacity})`

        for (let x = 0; x < canvas.width; x += dotSpacing) {
          for (let y = 0; y < canvas.height; y += dotSpacing) {
            ctx.beginPath()
            ctx.arc(x, y, dotSize / 2, 0, Math.PI * 2)
            ctx.fill()
          }
        }
        break
      case "glitch":
        // Simplified glitch effect
        const glitchHeight = 20
        const numGlitches = 10

        for (let i = 0; i < numGlitches; i++) {
          const y = Math.random() * canvas.height
          const width = Math.random() * 100 + 50
          const height = Math.random() * glitchHeight + 5
          const opacity = Math.random() * 0.5 + 0.1

          ctx.fillStyle = `rgba(${Number.parseInt(overlayColor.slice(1, 3), 16)}, ${Number.parseInt(overlayColor.slice(3, 5), 16)}, ${Number.parseInt(overlayColor.slice(5, 7), 16)}, ${opacity})`
          ctx.fillRect(Math.random() * canvas.width, y, width, height)
        }
        break
    }
  }

  const drawSticker = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    if (sticker === "none") return

    // Calculate position based on percentages
    const x = (stickerX / 100) * canvas.width
    const y = (stickerY / 100) * canvas.height
    const size = (stickerSize / 100) * canvas.width

    // Save context state
    ctx.save()

    // Translate to the sticker position
    ctx.translate(x, y)

    // Rotate if needed
    if (stickerRotation !== 0) {
      ctx.rotate((stickerRotation * Math.PI) / 180)
    }

    // Draw the appropriate sticker
    switch (sticker) {
      case "fire":
        drawFireSticker(ctx, size)
        break
      case "star":
        drawStarSticker(ctx, size)
        break
      case "lightning":
        drawLightningSticker(ctx, size)
        break
      case "arrow":
        drawArrowSticker(ctx, size)
        break
      case "circle":
        drawCircleSticker(ctx, size)
        break
      case "explosion":
        drawExplosionSticker(ctx, size)
        break
      case "trophy":
        drawTrophySticker(ctx, size)
        break
      case "heart":
        drawHeartSticker(ctx, size)
        break
      case "new":
      case "hot":
      case "sale":
      case "100":
        drawTextBadge(ctx, size, sticker.toUpperCase())
        break
    }

    // Restore context state
    ctx.restore()
  }

  const drawFireSticker = (ctx: CanvasRenderingContext2D, size: number) => {
    const halfSize = size / 2

    // Draw a simple fire shape
    ctx.beginPath()
    ctx.moveTo(-halfSize, halfSize)
    ctx.quadraticCurveTo(-halfSize * 0.5, 0, 0, -halfSize)
    ctx.quadraticCurveTo(halfSize * 0.5, 0, halfSize, halfSize)
    ctx.quadraticCurveTo(0, halfSize * 0.5, -halfSize, halfSize)
    ctx.closePath()

    // Fill with gradient
    const gradient = ctx.createLinearGradient(0, -halfSize, 0, halfSize)
    gradient.addColorStop(0, "#ff0000")
    gradient.addColorStop(0.5, "#ff6600")
    gradient.addColorStop(1, "#ffcc00")
    ctx.fillStyle = gradient
    ctx.fill()
  }

  const drawStarSticker = (ctx: CanvasRenderingContext2D, size: number) => {
    const outerRadius = size / 2
    const innerRadius = outerRadius * 0.4
    const spikes = 5

    ctx.beginPath()
    ctx.moveTo(0, -outerRadius)

    for (let i = 0; i < spikes * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius
      const angle = (Math.PI * i) / spikes
      ctx.lineTo(Math.sin(angle) * radius, -Math.cos(angle) * radius)
    }

    ctx.closePath()

    // Fill with gradient
    const gradient = ctx.createRadialGradient(0, 0, innerRadius, 0, 0, outerRadius)
    gradient.addColorStop(0, "#ffff00")
    gradient.addColorStop(1, "#ff9900")
    ctx.fillStyle = gradient
    ctx.fill()
  }

  const drawLightningSticker = (ctx: CanvasRenderingContext2D, size: number) => {
    const halfSize = size / 2

    ctx.beginPath()
    ctx.moveTo(0, -halfSize)
    ctx.lineTo(halfSize * 0.5, -halfSize * 0.2)
    ctx.lineTo(0, halfSize * 0.2)
    ctx.lineTo(halfSize, halfSize)
    ctx.lineTo(0, halfSize * 0.4)
    ctx.lineTo(-halfSize * 0.5, halfSize * 0.8)
    ctx.lineTo(0, 0)
    ctx.lineTo(-halfSize, -halfSize * 0.6)
    ctx.closePath()

    // Fill with gradient
    const gradient = ctx.createLinearGradient(0, -halfSize, 0, halfSize)
    gradient.addColorStop(0, "#ffff00")
    gradient.addColorStop(1, "#ff9900")
    ctx.fillStyle = gradient
    ctx.fill()
  }

  const drawArrowSticker = (ctx: CanvasRenderingContext2D, size: number) => {
    const halfSize = size / 2

    ctx.beginPath()
    ctx.moveTo(halfSize, 0)
    ctx.lineTo(0, -halfSize * 0.6)
    ctx.lineTo(0, -halfSize * 0.2)
    ctx.lineTo(-halfSize, -halfSize * 0.2)
    ctx.lineTo(-halfSize, halfSize * 0.2)
    ctx.lineTo(0, halfSize * 0.2)
    ctx.lineTo(0, halfSize * 0.6)
    ctx.closePath()

    // Fill with gradient
    const gradient = ctx.createLinearGradient(-halfSize, 0, halfSize, 0)
    gradient.addColorStop(0, "#ff0000")
    gradient.addColorStop(1, "#ff6600")
    ctx.fillStyle = gradient
    ctx.fill()
  }

  const drawCircleSticker = (ctx: CanvasRenderingContext2D, size: number) => {
    const radius = size / 2

    ctx.beginPath()
    ctx.arc(0, 0, radius, 0, Math.PI * 2)
    ctx.closePath()

    // Fill with gradient
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius)
    gradient.addColorStop(0, "#ff0000")
    gradient.addColorStop(1, "#990000")
    ctx.fillStyle = gradient
    ctx.fill()
  }

  const drawExplosionSticker = (ctx: CanvasRenderingContext2D, size: number) => {
    const outerRadius = size / 2
    const innerRadius = outerRadius * 0.6
    const spikes = 12

    ctx.beginPath()

    for (let i = 0; i < spikes * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius
      const angle = (Math.PI * 2 * i) / (spikes * 2)

      if (i === 0) {
        ctx.moveTo(Math.cos(angle) * radius, Math.sin(angle) * radius)
      } else {
        ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius)
      }
    }

    ctx.closePath()

    // Fill with gradient
    const gradient = ctx.createRadialGradient(0, 0, innerRadius, 0, 0, outerRadius)
    gradient.addColorStop(0, "#ffff00")
    gradient.addColorStop(0.7, "#ff6600")
    gradient.addColorStop(1, "#ff0000")
    ctx.fillStyle = gradient
    ctx.fill()
  }

  const drawTrophySticker = (ctx: CanvasRenderingContext2D, size: number) => {
    const halfSize = size / 2

    // Trophy cup
    ctx.beginPath()
    ctx.moveTo(-halfSize * 0.6, -halfSize)
    ctx.lineTo(halfSize * 0.6, -halfSize)
    ctx.lineTo(halfSize * 0.7, -halfSize * 0.7)
    ctx.lineTo(halfSize * 0.7, -halfSize * 0.3)
    ctx.quadraticCurveTo(halfSize * 0.7, halfSize * 0.3, 0, halfSize * 0.5)
    ctx.quadraticCurveTo(-halfSize * 0.7, halfSize * 0.3, -halfSize * 0.7, -halfSize * 0.3)
    ctx.lineTo(-halfSize * 0.7, -halfSize * 0.7)
    ctx.closePath()

    // Fill with gradient
    const gradient = ctx.createLinearGradient(0, -halfSize, 0, halfSize)
    gradient.addColorStop(0, "#ffcc00")
    gradient.addColorStop(1, "#ff9900")
    ctx.fillStyle = gradient
    ctx.fill()

    // Trophy base
    ctx.beginPath()
    ctx.moveTo(-halfSize * 0.4, halfSize * 0.5)
    ctx.lineTo(halfSize * 0.4, halfSize * 0.5)
    ctx.lineTo(halfSize * 0.5, halfSize)
    ctx.lineTo(-halfSize * 0.5, halfSize)
    ctx.closePath()
    ctx.fillStyle = "#ffcc00"
    ctx.fill()
  }

  const drawHeartSticker = (ctx: CanvasRenderingContext2D, size: number) => {
    const halfSize = size / 2

    ctx.beginPath()
    ctx.moveTo(0, halfSize * 0.8)
    ctx.bezierCurveTo(halfSize, 0, halfSize, -halfSize * 0.7, 0, -halfSize)
    ctx.bezierCurveTo(-halfSize, -halfSize * 0.7, -halfSize, 0, 0, halfSize * 0.8)
    ctx.closePath()

    // Fill with gradient
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, halfSize)
    gradient.addColorStop(0, "#ff3366")
    gradient.addColorStop(1, "#cc0033")
    ctx.fillStyle = gradient
    ctx.fill()
  }

  const drawTextBadge = (ctx: CanvasRenderingContext2D, size: number, text: string) => {
    const halfSize = size / 2

    // Draw badge background
    ctx.beginPath()
    ctx.ellipse(0, 0, halfSize, halfSize * 0.7, 0, 0, Math.PI * 2)
    ctx.closePath()

    // Fill with gradient
    let gradient

    switch (text) {
      case "NEW":
        gradient = ctx.createLinearGradient(0, -halfSize, 0, halfSize)
        gradient.addColorStop(0, "#3366ff")
        gradient.addColorStop(1, "#0033cc")
        break
      case "HOT":
        gradient = ctx.createLinearGradient(0, -halfSize, 0, halfSize)
        gradient.addColorStop(0, "#ff3300")
        gradient.addColorStop(1, "#cc0000")
        break
      case "SALE":
        gradient = ctx.createLinearGradient(0, -halfSize, 0, halfSize)
        gradient.addColorStop(0, "#33cc33")
        gradient.addColorStop(1, "#009900")
        break
      case "100%":
        gradient = ctx.createLinearGradient(0, -halfSize, 0, halfSize)
        gradient.addColorStop(0, "#ffcc00")
        gradient.addColorStop(1, "#ff9900")
        break
      default:
        gradient = ctx.createLinearGradient(0, -halfSize, 0, halfSize)
        gradient.addColorStop(0, "#ff6600")
        gradient.addColorStop(1, "#cc3300")
    }

    ctx.fillStyle = gradient
    ctx.fill()

    // Draw text
    ctx.fillStyle = "#ffffff"
    ctx.font = `bold ${halfSize * 0.8}px Arial`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(text, 0, 0)
  }

  const drawText = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.font = `bold ${textSize}px ${font}`

    // Calculate position based on percentages
    const x = (textX / 100) * canvas.width
    const y = (textY / 100) * canvas.height

    // Handle multi-line text
    const lines = text.split("\n")
    const lineHeight = textSize * 1.2

    // Apply text transformations
    ctx.save()

    // Apply rotation or other transformations based on textTransform
    if (textTransform === "rotated") {
      ctx.translate(x, y)
      ctx.rotate((-15 * Math.PI) / 180)
      ctx.translate(-x, -y)
    } else if (textTransform === "perspective") {
      // Apply a simple perspective transform
      ctx.setTransform(1, 0, 0.3, 1, 0, 0)
    } else if (textTransform === "distorted") {
      // Apply a slight distortion
      ctx.setTransform(1.1, 0.1, 0.1, 0.9, 0, 0)
    } else if (textTransform === "wavy") {
      // We'll handle wavy text differently below
    }

    // Draw each line of text
    lines.forEach((line, index) => {
      const yPos = y + (index - (lines.length - 1) / 2) * lineHeight

      // Apply text outline if enabled
      if (textOutline) {
        ctx.strokeStyle = textOutlineColor
        ctx.lineWidth = textOutlineWidth
        ctx.lineJoin = "round"

        if (textTransform === "3d") {
          // Create 3D effect with multiple outlines
          for (let i = 1; i <= textOutlineWidth; i++) {
            ctx.strokeText(line, x - i, yPos + i)
          }
        } else {
          ctx.strokeText(line, x, yPos)
        }
      }

      // Apply text shadow if enabled
      if (textShadow) {
        ctx.shadowColor = textShadowColor
        ctx.shadowBlur = textShadowBlur
        ctx.shadowOffsetX = textShadowOffsetX
        ctx.shadowOffsetY = textShadowOffsetY
      } else {
        ctx.shadowColor = "transparent"
        ctx.shadowBlur = 0
        ctx.shadowOffsetX = 0
        ctx.shadowOffsetY = 0
      }

      // Draw text with gradient if enabled
      if (textGradient) {
        const gradientHeight = textSize * 1.5
        let textGrad

        if (textGradientDirection === "horizontal") {
          textGrad = ctx.createLinearGradient(x - textSize * 2, yPos, x + textSize * 2, yPos)
        } else {
          textGrad = ctx.createLinearGradient(x, yPos - gradientHeight / 2, x, yPos + gradientHeight / 2)
        }

        textGrad.addColorStop(0, textGradientStart)
        textGrad.addColorStop(1, textGradientEnd)
        ctx.fillStyle = textGrad
      } else {
        ctx.fillStyle = textColor
      }

      // Draw wavy text
      if (textTransform === "wavy") {
        const characters = line.split("")
        const waveHeight = textSize / 10
        const waveFrequency = 0.15

        let xPos = x - ctx.measureText(line).width / 2

        characters.forEach((char) => {
          const charWidth = ctx.measureText(char).width
          const middleX = xPos + charWidth / 2
          const waveY = Math.sin(middleX * waveFrequency) * waveHeight

          ctx.fillText(char, xPos, yPos + waveY)
          xPos += charWidth
        })
      } else {
        ctx.fillText(line, x, yPos)
      }
    })

    ctx.restore()
  }

  const downloadThumbnail = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Create a temporary link
    const link = document.createElement("a")
    link.download = "youtube-thumbnail.png"
    link.href = canvas.toDataURL("image/png")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Redraw the thumbnail whenever any parameter changes
  useEffect(() => {
    drawThumbnail()
  }, [
    backgroundImage,
    text,
    textColor,
    textSize,
    textX,
    textY,
    textShadow,
    textShadowColor,
    textShadowBlur,
    textShadowOffsetX,
    textShadowOffsetY,
    textOutline,
    textOutlineColor,
    textOutlineWidth,
    font,
    overlay,
    overlayColor,
    overlayOpacity,
    brightness,
    contrast,
    saturation,
    blur,
    sticker,
    stickerSize,
    stickerX,
    stickerY,
    stickerRotation,
    textGradient,
    textGradientStart,
    textGradientEnd,
    textGradientDirection,
    textTransform,
  ])

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">YouTube Thumbnail Creator</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-black p-4 rounded-lg flex items-center justify-center">
            <canvas
              ref={canvasRef}
              width={1280}
              height={720}
              className="w-full h-auto border border-gray-700 rounded"
            />
          </div>

          <div className="mt-4 flex justify-center">
            <Button onClick={downloadThumbnail} className="flex items-center gap-2">
              <Download size={16} />
              Download Thumbnail
            </Button>
          </div>
        </div>

        <div>
          <Card>
            <CardContent className="pt-6">
              <Tabs defaultValue="background">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="background" className="flex items-center gap-1">
                    <ImageIcon size={16} />
                    Background
                  </TabsTrigger>
                  <TabsTrigger value="text" className="flex items-center gap-1">
                    <Type size={16} />
                    Text
                  </TabsTrigger>
                  <TabsTrigger value="effects" className="flex items-center gap-1">
                    <Layers size={16} />
                    Effects
                  </TabsTrigger>
                  <TabsTrigger value="stickers" className="flex items-center gap-1">
                    <Sparkles size={16} />
                    Stickers
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="background" className="space-y-4">
                  <div>
                    <Label htmlFor="background-upload">Upload Background Image</Label>
                    <div className="mt-2">
                      <Input
                        id="background-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="cursor-pointer"
                      />
                    </div>
                  </div>

                  {!backgroundImage && (
                    <div className="flex items-center justify-center h-40 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <div className="text-center text-gray-500 dark:text-gray-400">
                        <Upload className="mx-auto h-12 w-12 mb-2" />
                        <p>Upload an image or use the default background</p>
                      </div>
                    </div>
                  )}

                  {backgroundImage && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="brightness">Brightness: {brightness}%</Label>
                        <Slider
                          id="brightness"
                          min={0}
                          max={200}
                          step={1}
                          value={[brightness]}
                          onValueChange={(value) => setBrightness(value[0])}
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="contrast">Contrast: {contrast}%</Label>
                        <Slider
                          id="contrast"
                          min={0}
                          max={200}
                          step={1}
                          value={[contrast]}
                          onValueChange={(value) => setContrast(value[0])}
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="saturation">Saturation: {saturation}%</Label>
                        <Slider
                          id="saturation"
                          min={0}
                          max={200}
                          step={1}
                          value={[saturation]}
                          onValueChange={(value) => setSaturation(value[0])}
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="blur">Blur: {blur}px</Label>
                        <Slider
                          id="blur"
                          min={0}
                          max={10}
                          step={0.5}
                          value={[blur]}
                          onValueChange={(value) => setBlur(value[0])}
                          className="mt-2"
                        />
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="text" className="space-y-4">
                  <div>
                    <Label htmlFor="text-input">Thumbnail Text</Label>
                    <textarea
                      id="text-input"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      className="w-full mt-2 p-2 border rounded-md bg-background"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="font-select">Font</Label>
                    <Select value={font} onValueChange={setFont}>
                      <SelectTrigger id="font-select" className="mt-2">
                        <SelectValue placeholder="Select font" />
                      </SelectTrigger>
                      <SelectContent>
                        {fonts.map((f) => (
                          <SelectItem key={f} value={f} style={{ fontFamily: f }}>
                            {f}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="text-transform">Text Effect</Label>
                    <Select value={textTransform} onValueChange={setTextTransform}>
                      <SelectTrigger id="text-transform" className="mt-2">
                        <SelectValue placeholder="Select text effect" />
                      </SelectTrigger>
                      <SelectContent>
                        {textTransforms.map((t) => (
                          <SelectItem key={t.value} value={t.value}>
                            {t.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="text-color">Text Color</Label>
                        <div className="flex items-center space-x-2">
                          <Label htmlFor="text-gradient">Gradient</Label>
                          <Switch id="text-gradient" checked={textGradient} onCheckedChange={setTextGradient} />
                        </div>
                      </div>

                      {!textGradient ? (
                        <div className="mt-2">
                          <ColorPicker color={textColor} onChange={setTextColor} />
                        </div>
                      ) : (
                        <div className="space-y-2 mt-2">
                          <div>
                            <Label htmlFor="gradient-start">Start Color</Label>
                            <ColorPicker color={textGradientStart} onChange={setTextGradientStart} />
                          </div>
                          <div>
                            <Label htmlFor="gradient-end">End Color</Label>
                            <ColorPicker color={textGradientEnd} onChange={setTextGradientEnd} />
                          </div>
                          <div>
                            <Label htmlFor="gradient-direction">Direction</Label>
                            <Select value={textGradientDirection} onValueChange={setTextGradientDirection}>
                              <SelectTrigger id="gradient-direction">
                                <SelectValue placeholder="Direction" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="horizontal">Horizontal</SelectItem>
                                <SelectItem value="vertical">Vertical</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="text-size">Text Size: {textSize}px</Label>
                      <Slider
                        id="text-size"
                        min={20}
                        max={120}
                        step={1}
                        value={[textSize]}
                        onValueChange={(value) => setTextSize(value[0])}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="text-x">Horizontal Position: {textX}%</Label>
                      <Slider
                        id="text-x"
                        min={0}
                        max={100}
                        step={1}
                        value={[textX]}
                        onValueChange={(value) => setTextX(value[0])}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="text-y">Vertical Position: {textY}%</Label>
                      <Slider
                        id="text-y"
                        min={0}
                        max={100}
                        step={1}
                        value={[textY]}
                        onValueChange={(value) => setTextY(value[0])}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="text-shadow">Text Shadow</Label>
                      <Switch id="text-shadow" checked={textShadow} onCheckedChange={setTextShadow} />
                    </div>

                    {textShadow && (
                      <div className="space-y-2 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                        <div>
                          <Label htmlFor="shadow-color">Shadow Color</Label>
                          <div className="mt-1">
                            <ColorPicker color={textShadowColor} onChange={setTextShadowColor} />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="shadow-blur">Blur: {textShadowBlur}px</Label>
                          <Slider
                            id="shadow-blur"
                            min={0}
                            max={30}
                            step={1}
                            value={[textShadowBlur]}
                            onValueChange={(value) => setTextShadowBlur(value[0])}
                            className="mt-1"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Label htmlFor="shadow-x">Offset X: {textShadowOffsetX}px</Label>
                            <Slider
                              id="shadow-x"
                              min={-20}
                              max={20}
                              step={1}
                              value={[textShadowOffsetX]}
                              onValueChange={(value) => setTextShadowOffsetX(value[0])}
                              className="mt-1"
                            />
                          </div>

                          <div>
                            <Label htmlFor="shadow-y">Offset Y: {textShadowOffsetY}px</Label>
                            <Slider
                              id="shadow-y"
                              min={-20}
                              max={20}
                              step={1}
                              value={[textShadowOffsetY]}
                              onValueChange={(value) => setTextShadowOffsetY(value[0])}
                              className="mt-1"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="text-outline">Text Outline</Label>
                      <Switch id="text-outline" checked={textOutline} onCheckedChange={setTextOutline} />
                    </div>

                    {textOutline && (
                      <div className="space-y-2 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                        <div>
                          <Label htmlFor="outline-color">Outline Color</Label>
                          <div className="mt-1">
                            <ColorPicker color={textOutlineColor} onChange={setTextOutlineColor} />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="outline-width">Width: {textOutlineWidth}px</Label>
                          <Slider
                            id="outline-width"
                            min={1}
                            max={10}
                            step={1}
                            value={[textOutlineWidth]}
                            onValueChange={(value) => setTextOutlineWidth(value[0])}
                            className="mt-1"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="effects" className="space-y-4">
                  <div>
                    <Label htmlFor="overlay-select">Background Overlay</Label>
                    <Select value={overlay} onValueChange={setOverlay}>
                      <SelectTrigger id="overlay-select" className="mt-2">
                        <SelectValue placeholder="Select overlay" />
                      </SelectTrigger>
                      <SelectContent>
                        {overlays.map((o) => (
                          <SelectItem key={o.value} value={o.value}>
                            {o.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {overlay !== "none" && (
                    <div className="space-y-4 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                      {overlay !== "dark-gradient" && overlay !== "light-vignette" && (
                        <div>
                          <Label htmlFor="overlay-color">Overlay Color</Label>
                          <div className="mt-2">
                            <ColorPicker color={overlayColor} onChange={setOverlayColor} />
                          </div>
                        </div>
                      )}

                      <div>
                        <Label htmlFor="overlay-opacity">Opacity: {Math.round(overlayOpacity * 100)}%</Label>
                        <Slider
                          id="overlay-opacity"
                          min={0}
                          max={1}
                          step={0.01}
                          value={[overlayOpacity]}
                          onValueChange={(value) => setOverlayOpacity(value[0])}
                          className="mt-2"
                        />
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="stickers" className="space-y-4">
                  <div>
                    <Label htmlFor="sticker-select">Sticker</Label>
                    <Select value={sticker} onValueChange={setSticker}>
                      <SelectTrigger id="sticker-select" className="mt-2">
                        <SelectValue placeholder="Select sticker" />
                      </SelectTrigger>
                      <SelectContent>
                        {stickers.map((s) => (
                          <SelectItem key={s.value} value={s.value}>
                            {s.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {sticker !== "none" && (
                    <div className="space-y-4 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                      <div>
                        <Label htmlFor="sticker-size">Size: {stickerSize}%</Label>
                        <Slider
                          id="sticker-size"
                          min={5}
                          max={50}
                          step={1}
                          value={[stickerSize]}
                          onValueChange={(value) => setStickerSize(value[0])}
                          className="mt-2"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="sticker-x">Horizontal Position: {stickerX}%</Label>
                          <Slider
                            id="sticker-x"
                            min={0}
                            max={100}
                            step={1}
                            value={[stickerX]}
                            onValueChange={(value) => setStickerX(value[0])}
                            className="mt-2"
                          />
                        </div>

                        <div>
                          <Label htmlFor="sticker-y">Vertical Position: {stickerY}%</Label>
                          <Slider
                            id="sticker-y"
                            min={0}
                            max={100}
                            step={1}
                            value={[stickerY]}
                            onValueChange={(value) => setStickerY(value[0])}
                            className="mt-2"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="sticker-rotation">Rotation: {stickerRotation}°</Label>
                        <Slider
                          id="sticker-rotation"
                          min={-180}
                          max={180}
                          step={5}
                          value={[stickerRotation]}
                          onValueChange={(value) => setStickerRotation(value[0])}
                          className="mt-2"
                        />
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

