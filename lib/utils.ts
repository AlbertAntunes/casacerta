import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPreco(preco: number): string {
  return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function generateSlug(titulo: string): string {
  return titulo
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function whatsappLink(numero: string, mensagem: string): string {
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`
}

export function whatsappImovel(
  numero: string,
  tituloImovel: string,
  slug: string
): string {
  const msg = `Olá! Vi o imóvel "${tituloImovel}" no site da Casa Certa e gostaria de mais informações. ${process.env.NEXT_PUBLIC_SITE_URL}/imoveis/${slug}`
  return whatsappLink(numero, msg)
}
