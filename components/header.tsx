"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Globe } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export default function Header() {
  const { setTheme, theme } = useTheme()
  const { language, setLanguage } = useLanguage()

  return (
    <header className="py-4 px-6 bg-gradient-to-r from-primary to-secondary">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Property Management System</h1>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setLanguage(language === "en" ? "zh" : "en")}
          >
            <Globe className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </div>
      </div>
    </header>
  )
}