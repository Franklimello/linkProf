import { useState, useEffect } from "react"
import type { ReactNode, ReactElement } from "react"
import { auth } from "../services/firebaseConnection"
import { onAuthStateChanged } from "firebase/auth"
import { Navigate } from "react-router-dom"

interface PrivateProps {
  children: ReactNode
}

export function Private({ children }: PrivateProps): ReactElement {
  const [loading, setLoading] = useState(true)
  const [signed, setSigned] = useState<boolean | null>(null)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          uid: user.uid,
          email: user.email,
        }
        localStorage.setItem("@detailUser", JSON.stringify(userData))
        setSigned(true)
      } else {
        setSigned(false)
      }
      setLoading(false)
    })

    return () => unsub() // ✅ cleanup
  }, [])

  if (loading) {
    return <div>Carregando...</div>
  }

  if (!signed) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
