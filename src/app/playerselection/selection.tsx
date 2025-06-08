"use client"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Check } from "lucide-react"
import Image from "next/image"

const colors = [
  { id: "orange", value: "#FF8C42", name: "Orange" },
  { id: "cyan", value: "#00D4FF", name: "Cyan" },
  { id: "purple", value: "#A855F7", name: "Purple" },
  { id: "teal", value: "#0F766E", name: "Teal" },
  { id: "red", value: "#EF4444", name: "Red" },
  { id: "blue", value: "#3B82F6", name: "Blue" },
  { id: "yellow", value: "#EAB308", name: "Yellow" },
  { id: "pink", value: "#EC4899", name: "Pink" },
  { id: "lime", value: "#84CC16", name: "Lime" },
  { id: "white", value: "#FFFFFF", name: "White" },
  { id: "brown", value: "#92400E", name: "Brown" },
  { id: "maroon", value: "#B91C1C", name: "Maroon" },
]

export default function ColorSelection() {
  const [selectedColor, setSelectedColor] = useState<string>("yellow")
  const [takenColors] = useState<string[]>(["blue", "lime", "pink"]) // Simulated taken colors
  const [showConflictDialog, setShowConflictDialog] = useState(false)
  const [, setAttemptedColor] = useState<string>("")

  const handleColorSelect = (colorId: string) => {
    if (takenColors.includes(colorId)) {
      setAttemptedColor(colorId)
      setShowConflictDialog(true)
      return
    }
    setSelectedColor(colorId)
  }

  const handleCloseDialog = () => {
    setShowConflictDialog(false)
    setAttemptedColor("")
  }

  const getColorStatus = (colorId: string) => {
    if (selectedColor === colorId) return "selected"
    if (takenColors.includes(colorId)) return "taken"
    return "available"
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-white text-xl font-medium text-center mb-8">Select your appearance</h1>

        <div className="grid grid-cols-4 gap-4 mb-8">
          {colors.map((color) => {
            const status = getColorStatus(color.id)

            return (
              <button
                key={color.id}
                onClick={() => handleColorSelect(color.id)}
                className="w-16 h-16 rounded-full relative transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                style={{ backgroundColor: color.value }}
                aria-label={`Select ${color.name} color`}
              >
                {status === "selected" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-black font-bold text-lg px-2 py-1 rounded-full">You</span>
                  </div>
                )}
                {status === "taken" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center">
                      <Image src="/X.svg" alt="" width="40" height="40" />
                    </div>
                  </div>
                )}
              </button>
            )
          })}
        </div>

        <Button className="w-full bg-cyan-400 hover:bg-cyan-500 text-black font-bold py-4 text-lg rounded-xl" size="lg">
          Let&apos;s Go!
        </Button>
      </div>

      <Dialog open={showConflictDialog} onOpenChange={setShowConflictDialog}>
        <DialogContent className="bg-slate-800 border-cyan-400 border-2 text-white w-[350px] mx-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">Oops!</DialogTitle>
            <DialogDescription className="text-gray-300 text-center mt-4">
              This appearance has been selected by another player. Choose another appearance.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-6">
            <Button
              onClick={handleCloseDialog}
              className="bg-transparent hover:bg-slate-700 text-white border border-gray-600 px-6"
              variant="outline"
            >
              <Check className="w-4 h-4 mr-2" />
              Got it
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
