import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

type BadgeVariant = 'green' | 'red' | 'blue' | 'yellow' | 'gray' | 'disponivel' | 'vendido' | 'alugado' | 'reservado'

interface BadgeProps {
  variant?: BadgeVariant
  children: ReactNode
  className?: string
}

const badgeVariants: Record<BadgeVariant, string> = {
  green:      'badge badge-green',
  red:        'badge badge-red',
  blue:       'badge badge-blue',
  yellow:     'badge badge-yellow',
  gray:       'badge badge-gray',
  disponivel: 'badge badge-disponivel',
  vendido:    'badge badge-vendido',
  alugado:    'badge badge-alugado',
  reservado:  'badge badge-reservado',
}

export function Badge({ variant = 'gray', children, className }: BadgeProps) {
  return (
    <span className={cn(badgeVariants[variant], className)}>
      {children}
    </span>
  )
}