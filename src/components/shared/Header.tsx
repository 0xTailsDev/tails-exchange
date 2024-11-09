import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Button } from "../ui/button"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch by only rendering theme toggle after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="flex items-center px-4 border-b h-14">
      <div className="flex items-center space-x-4">
        <span className="font-bold">UniDex</span>
        <nav className="flex items-center space-x-4">
          <Button variant="ghost">Portfolio</Button>
          <Button variant="ghost">Markets</Button>
          <Button variant="ghost">Trade</Button>
        </nav>
      </div>
      <div className="flex items-center ml-auto space-x-4">
        {mounted && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-8 h-8 px-0"
          >
            <span className="sr-only">Toggle theme</span>
            {theme === 'dark' ? (
              // Sun icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                />
              </svg>
            ) : (
              // Moon icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                />
              </svg>
            )}
          </Button>
        )}
        <ConnectButton showBalance={false} />
      </div>
    </header>
  )
}
