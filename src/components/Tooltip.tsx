import React, { useState } from 'react'
import { tokens } from '../tokens'

export interface TooltipProps {
  content: string
  children: React.ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
}

const GAP = 8

function Tooltip({ content, children, position = 'top' }: TooltipProps) {
  const [visible, setVisible] = useState(false)

  const posStyle: React.CSSProperties =
    position === 'top'    ? { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: GAP } :
    position === 'bottom' ? { top: '100%',    left: '50%', transform: 'translateX(-50%)', marginTop: GAP    } :
    position === 'left'   ? { right: '100%',  top: '50%',  transform: 'translateY(-50%)', marginRight: GAP  } :
                            { left: '100%',   top: '50%',  transform: 'translateY(-50%)', marginLeft: GAP   }

  return (
    <span
      style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <span
          role="tooltip"
          style={{
            position: 'absolute',
            ...posStyle,
            backgroundColor: tokens.cores.bgPrimary,
            color: tokens.cores.textPrimary,
            fontSize: tokens.tipografia.escala.caption.tamanho,
            fontFamily: tokens.tipografia.familia.primaria,
            fontWeight: 600,
            padding: `${tokens.espacamento[1].valor}px ${tokens.espacamento[3].valor}px`,
            borderRadius: tokens.raio.sm,
            whiteSpace: 'nowrap' as const,
            zIndex: 200,
            boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
            pointerEvents: 'none' as const,
            lineHeight: 1.8,
          }}
        >
          {content}
        </span>
      )}
    </span>
  )
}

export default Tooltip
