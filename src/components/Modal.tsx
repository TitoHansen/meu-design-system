import React, { useEffect } from 'react'
import { tokens } from '../tokens'

export interface ModalProps {
  open?: boolean
  onClose?: () => void
  title?: string
  children?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
}

const SIZE_W: Record<NonNullable<ModalProps['size']>, number> = {
  sm: 400,
  md: 560,
  lg: 720,
}

function Modal({ open = false, onClose, title, children, size = 'md' }: ModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose?.() }
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.55)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: tokens.espacamento[4].valor,
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose?.() }}
    >
      <div style={{
        width: '100%',
        maxWidth: SIZE_W[size],
        backgroundColor: 'var(--ds-component-bg)',
        borderRadius: tokens.raio.xl,
        border: '1px solid var(--ds-border)',
        boxShadow: '0 24px 64px rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: `${tokens.espacamento[4].valor}px ${tokens.espacamento[6].valor}px`,
          borderBottom: '1px solid var(--ds-border)',
        }}>
          {title && (
            <h2 style={{
              margin: 0,
              fontSize: tokens.tipografia.escala.h4.tamanho,
              fontWeight: 700,
              fontFamily: tokens.tipografia.familia.primaria,
              color: 'var(--ds-component-text)',
            }}>{title}</h2>
          )}
          {onClose && (
            <button
              onClick={onClose}
              aria-label="Fechar"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--ds-component-muted)',
                fontSize: 22,
                lineHeight: 1,
                padding: `${tokens.espacamento[1].valor}px ${tokens.espacamento[2].valor}px`,
                borderRadius: tokens.raio.sm,
                fontFamily: tokens.tipografia.familia.primaria,
              }}
            >×</button>
          )}
        </div>

        <div style={{
          padding: tokens.espacamento[6].valor,
          fontFamily: tokens.tipografia.familia.primaria,
          fontSize: tokens.tipografia.escala.body.tamanho,
          color: 'var(--ds-component-text)',
          lineHeight: tokens.tipografia.escala.body.lineHeight,
        }}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
