'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import type { Imovel, ImovelImagem } from '@/types/imovel.types'
import { generateSlug } from '@/lib/utils'
import { uploadImagem, deleteImagem } from '@/services/imagens.service'
import { ImageUploader } from './ImageUploader'

const schema = z.object({
  titulo: z.string().min(5, 'Mínimo 5 caracteres'),
  descricao: z.string().optional(),
  preco: z.coerce.number().positive('Informe um preço válido'),
  tipo: z.enum(['casa', 'apartamento', 'terreno', 'comercial']),
  status: z.enum(['disponivel', 'vendido', 'alugado', 'reservado']),
  cidade: z.string().min(2, 'Informe a cidade'),
  bairro: z.string().optional(),
  endereco: z.string().optional(),
  quartos: z.coerce.number().int().min(0).optional().or(z.literal('')),
  banheiros: z.coerce.number().int().min(0).optional().or(z.literal('')),
  vagas: z.coerce.number().int().min(0).default(0),
  area_m2: z.coerce.number().positive().optional().or(z.literal('')),
  destaque: z.boolean().default(false),
  ativo: z.boolean().default(true),
  slug: z.string().min(3, 'Slug inválido'),
})

type FormData = z.infer<typeof schema>

interface Props {
  imovel?: Imovel
}

export function ImovelFormWrapper({ imovel }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [imagens, setImagens] = useState<ImovelImagem[]>(
    imovel?.imovel_imagens ?? []
  )
  const [filasUpload, setFilasUpload] = useState<File[]>([])

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      titulo: imovel?.titulo ?? '',
      descricao: imovel?.descricao ?? '',
      preco: imovel?.preco ?? ('' as unknown as number),
      tipo: imovel?.tipo ?? 'casa',
      status: imovel?.status ?? 'disponivel',
      cidade: imovel?.cidade ?? 'Quixadá',
      bairro: imovel?.bairro ?? '',
      endereco: imovel?.endereco ?? '',
      quartos: imovel?.quartos ?? ('' as unknown as number),
      banheiros: imovel?.banheiros ?? ('' as unknown as number),
      vagas: imovel?.vagas ?? 0,
      area_m2: imovel?.area_m2 ?? ('' as unknown as number),
      destaque: imovel?.destaque ?? false,
      ativo: imovel?.ativo ?? true,
      slug: imovel?.slug ?? '',
    },
  })

  const titulo = watch('titulo')

  // Auto-gera slug ao digitar o título (apenas criação)
  const handleTituloChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if (!imovel) setValue('slug', generateSlug(val))
  }

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const url = imovel
        ? `/api/imoveis/${imovel.id}`
        : '/api/imoveis'
      const method = imovel ? 'PUT' : 'POST'

      const payload = {
        ...data,
        quartos: data.quartos === '' ? null : data.quartos,
        banheiros: data.banheiros === '' ? null : data.banheiros,
        area_m2: data.area_m2 === '' ? null : data.area_m2,
      }

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? 'Erro ao salvar')

      const imovelId = json.id

      // Faz upload das imagens novas
      for (let i = 0; i < filasUpload.length; i++) {
        await uploadImagem(filasUpload[i], imovelId, imagens.length + i)
      }

      setSuccess('Imóvel salvo com sucesso!')
      setTimeout(() => router.push('/admin/imoveis'), 1200)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
    } finally {
      setLoading(false)
    }
  }

  const Field = ({
    label,
    error,
    children,
  }: {
    label: string
    error?: string
    children: React.ReactNode
  }) => (
    <div>
      <label className="label">{label}</label>
      {children}
      {error && <p className="error-msg">{error}</p>}
    </div>
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-4xl">
      {/* Seção: Informações básicas */}
      <div className="card p-6 space-y-5">
        <h2 className="font-bold text-green-300 text-lg border-b border-green-800/40 pb-3">
          📋 Informações Básicas
        </h2>

        <Field label="Título *" error={errors.titulo?.message}>
          <input
            {...register('titulo')}
            onChange={(e) => {
              register('titulo').onChange(e)
              handleTituloChange(e)
            }}
            className={`input ${errors.titulo ? 'input-error' : ''}`}
            placeholder="Ex: Casa moderna com 3 quartos"
          />
        </Field>

        <Field label="Slug (URL amigável) *" error={errors.slug?.message}>
          <input
            {...register('slug')}
            className={`input font-mono text-sm ${errors.slug ? 'input-error' : ''}`}
            placeholder="casa-moderna-3-quartos"
          />
          <p className="text-xs text-green-600 mt-1">
            URL: /imoveis/{watch('slug') || 'seu-slug-aqui'}
          </p>
        </Field>

        <Field label="Descrição">
          <textarea
            {...register('descricao')}
            rows={4}
            className="input resize-none"
            placeholder="Descreva o imóvel com detalhes..."
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Tipo *" error={errors.tipo?.message}>
            <select {...register('tipo')} className="input">
              <option value="casa">🏠 Casa</option>
              <option value="apartamento">🏢 Apartamento</option>
              <option value="terreno">🌿 Terreno</option>
              <option value="comercial">🏪 Comercial</option>
            </select>
          </Field>

          <Field label="Status *" error={errors.status?.message}>
            <select {...register('status')} className="input">
              <option value="disponivel">✅ Disponível</option>
              <option value="reservado">⏳ Reservado</option>
              <option value="vendido">🔴 Vendido</option>
              <option value="alugado">🔵 Alugado</option>
            </select>
          </Field>
        </div>

        <Field label="Preço (R$) *" error={errors.preco?.message}>
          <input
            {...register('preco')}
            type="number"
            min="0"
            step="0.01"
            className={`input ${errors.preco ? 'input-error' : ''}`}
            placeholder="350000"
          />
        </Field>
      </div>

      {/* Seção: Localização */}
      <div className="card p-6 space-y-5">
        <h2 className="font-bold text-green-300 text-lg border-b border-green-800/40 pb-3">
          📍 Localização
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Cidade *" error={errors.cidade?.message}>
            <input {...register('cidade')} className="input" placeholder="Quixadá" />
          </Field>
          <Field label="Bairro">
            <input {...register('bairro')} className="input" placeholder="Centro" />
          </Field>
        </div>
        <Field label="Endereço">
          <input
            {...register('endereco')}
            className="input"
            placeholder="Rua das Flores, 123"
          />
        </Field>
      </div>

      {/* Seção: Características */}
      <div className="card p-6 space-y-5">
        <h2 className="font-bold text-green-300 text-lg border-b border-green-800/40 pb-3">
          🏗️ Características
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Field label="Quartos">
            <input
              {...register('quartos')}
              type="number"
              min="0"
              className="input"
              placeholder="3"
            />
          </Field>
          <Field label="Banheiros">
            <input
              {...register('banheiros')}
              type="number"
              min="0"
              className="input"
              placeholder="2"
            />
          </Field>
          <Field label="Vagas">
            <input
              {...register('vagas')}
              type="number"
              min="0"
              className="input"
              placeholder="1"
            />
          </Field>
          <Field label="Área (m²)">
            <input
              {...register('area_m2')}
              type="number"
              min="0"
              step="0.01"
              className="input"
              placeholder="120"
            />
          </Field>
        </div>
      </div>

      {/* Seção: Imagens */}
      <div className="card p-6">
        <h2 className="font-bold text-green-300 text-lg border-b border-green-800/40 pb-3 mb-5">
          📷 Imagens
        </h2>
        <ImageUploader
          imovelId={imovel?.id}
          imagens={imagens}
          onImagensChange={setImagens}
          onFilesQueued={setFilasUpload}
        />
      </div>

      {/* Seção: Configurações */}
      <div className="card p-6 space-y-4">
        <h2 className="font-bold text-green-300 text-lg border-b border-green-800/40 pb-3">
          ⚙️ Configurações
        </h2>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...register('destaque')}
            className="w-5 h-5 rounded accent-green-400"
          />
          <div>
            <p className="font-semibold text-green-200">⭐ Imóvel em Destaque</p>
            <p className="text-xs text-green-500">Aparece na seção de destaques da homepage</p>
          </div>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...register('ativo')}
            className="w-5 h-5 rounded accent-green-400"
          />
          <div>
            <p className="font-semibold text-green-200">✅ Imóvel Ativo</p>
            <p className="text-xs text-green-500">Imóvel visível no site. Desative para ocultar sem excluir.</p>
          </div>
        </label>
      </div>

      {/* Feedback */}
      {error && (
        <div className="bg-red-900/30 border border-red-500/30 rounded-xl p-4 text-red-400">
          ❌ {error}
        </div>
      )}
      {success && (
        <div className="bg-green-900/30 border border-green-500/30 rounded-xl p-4 text-green-400">
          ✅ {success}
        </div>
      )}

      {/* Ações */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary text-base px-8"
        >
          {loading ? '⏳ Salvando...' : imovel ? '💾 Salvar Alterações' : '🏠 Criar Imóvel'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/imoveis')}
          className="btn-ghost"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}
