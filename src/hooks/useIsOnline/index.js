import { useEffect, useState } from "react"

export const useIsOnline = () => {
  const [isOnline, setIsOnline] = useState(true)

  const setOffline = () => setIsOnline(false)
  const setOnline = () => setIsOnline(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener("offline", setOffline)
      window.addEventListener("online", () => setOnline)
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener("offline", setOffline)
        window.removeEventListener("online", () => setOnline)
      }
    }
  }, [isOnline])

  return isOnline
}
