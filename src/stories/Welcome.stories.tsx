import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Overview/Welcome',
};

export default meta;

export const Default: StoryObj = {
  render: () => (
    <div style={{ padding: 40, maxWidth: 900, fontFamily: 'sans-serif' }}>
      
      {/* HERO */}
      <h1>Whansen Design System</h1>
      <p style={{ fontSize: 18 }}>
        Um design system para escalar produtos digitais com consistência, eficiência e governança.
      </p>

      {/* VALOR */}
      <h2>Por que usar</h2>
      <ul>
        <li>⚙️ Escalabilidade com tokens e arquitetura modular</li>
        <li>🎯 Consistência entre interfaces</li>
        <li>🚀 Acelera desenvolvimento e design</li>
      </ul>

      {/* NAVEGAÇÃO */}
      <h2>Como navegar</h2>
      <ul>
        <li>Foundations → cores, tipografia e tokens</li>
        <li>Components → elementos reutilizáveis</li>
        <li>Patterns → soluções de UX</li>
      </ul>

      {/* CTA */}
      <h2>Começar</h2>
      <code>npm install whansen-ds</code>

    </div>
  ),
};