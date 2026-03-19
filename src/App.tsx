import Button from './components/Button'
import Input from './components/Input'
import Badge from './components/Badge'

function App() {
  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '400px' }}>
      <h2 style={{ margin: 0, fontSize: '20px' }}>Meu Design System</h2>

      <div style={{ display: 'flex', gap: '8px' }}>
        <Badge label="Novo" />
        <Badge label="Erro" variant="danger" />
        <Badge label="Ativo" variant="success" />
        <Badge label="Rascunho" variant="neutral" />
      </div>

      <Input label="Email" placeholder="seu@email.com" type="email" />
      <Input label="Senha" placeholder="••••••••" type="password" />
      <Input label="Desabilitado" placeholder="Não editável" disabled />

      <div style={{ display: 'flex', gap: '12px' }}>
        <Button label="Brand" />
        <Button label="Danger" variant="danger" />
        <Button label="Success" variant="success" />
      </div>
    </div>
  )
}

export default App