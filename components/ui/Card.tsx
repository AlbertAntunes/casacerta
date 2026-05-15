
import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type CardVariant = 'default' | 'glass' | 'elevated' | 'featured'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  padded?: boolean
}

const cardVariants: Record<CardVariant, string> = {
  default:  'card',
  glass:    'card card-glass',
  elevated: 'card card-elevated',
  featured: 'card card-featured',
}

export function Card({ variant = 'default', padded = false, children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(cardVariants[variant], padded && 'card-padded', className)}
      {...props}
    >
      {children}
    </div>
  )
}