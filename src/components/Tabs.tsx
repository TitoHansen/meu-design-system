import React, { useState } from 'react'
import { tokens } from '../tokens'

export interface TabItem {
  label: string
  content: React.ReactNode
}

export interface TabsProps {
  tabs: TabItem[]
  defaultIndex?: number
}

function Tabs({ tabs, defaultIndex = 0 }: TabsProps) {
  const [active, setActive] = useState(defaultIndex)

  return (
    <div style={{ fontFamily: tokens.tipografia.familia.primaria }}>
      <div role="tablist" style={{
        display: 'flex',
        borderBottom: '2px solid var(--ds-border)',
      }}>
        {tabs.map((tab, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            style={{
              padding: `${tokens.espacamento[3].valor}px ${tokens.espacamento[4].valor}px`,
              background: 'none',
              border: 'none',
              borderBottom: `2px solid ${active === i ? tokens.cores.actionPrimary : 'transparent'}`,
              marginBottom: -2,
              fontFamily: tokens.tipografia.familia.primaria,
              fontSize: tokens.tipografia.escala.body.tamanho,
              fontWeight: active === i ? 700 : 400,
              color: active === i ? tokens.cores.actionPrimary : 'var(--ds-component-muted)',
              cursor: 'pointer',
              transition: `all ${tokens.motion.duracao.fast}ms ${tokens.motion.easing.standard}`,
              userSelect: 'none' as const,
            }}
          >{tab.label}</button>
        ))}
      </div>

      <div role="tabpanel" style={{
        paddingTop: tokens.espacamento[4].valor,
        color: 'var(--ds-component-text)',
        fontSize: tokens.tipografia.escala.body.tamanho,
        lineHeight: tokens.tipografia.escala.body.lineHeight,
      }}>
        {tabs[active]?.content}
      </div>
    </div>
  )
}

export default Tabs
