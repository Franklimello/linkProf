import type { ReactNode, ReactElement } from "react"

interface SocialProps {
  url: string
  children: ReactNode
}

export function Social({ children, url }: SocialProps): ReactElement {
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="transition-opacity hover:opacity-80"
    >
      {children}
    </a>
  )
}
