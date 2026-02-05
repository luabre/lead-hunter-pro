
# Plano: Corrigir Imagem LeadHunter e Faixa Branca Lateral

## Problemas Identificados

### 1. Imagem com "LeadHunter Pro"
A imagem do dashboard `/lovable-uploads/039c9c09-384f-4a6e-a325-10972460bfe1.png` e uma imagem estatica que mostra "LeadHunter Pro" no texto. Nao e possivel editar o texto dentro de uma imagem PNG via codigo.

**Solucao**: Ocultar completamente a imagem com um overlay mais forte e/ou substituir por um visual puramente CSS que mostre "RadarHunter Pro".

### 2. Faixa Branca Lateral
A faixa branca vem de multiplas camadas:
- `App.tsx` tem `<div className="flex flex-col min-h-screen">` sem fundo escuro
- `LandingPage.tsx` tem `<main className="min-h-screen">` sem fundo escuro
- A variavel CSS `--background` no modo light e clara

**Solucao**: Adicionar fundo escuro forcado no `LandingPage.tsx` e garantir que todas as secoes tenham o background radar.

---

## Arquivos a Modificar

### 1. src/pages/LandingPage.tsx
Adicionar classe de fundo escuro no `<main>`:
```jsx
<main className="min-h-screen bg-[#0a0f1c]">
```

### 2. src/components/landing/HeroSection.tsx
Duas opcoes para resolver a imagem com LeadHunter:

**Opcao A - Overlay Total (Recomendada)**
Cobrir a imagem completamente com um overlay escuro e criar um visual CSS simulando um dashboard tech com o texto "RadarHunter Pro".

**Opcao B - Remover Imagem**
Remover a imagem do dashboard e manter apenas os floating cards animados com efeito radar visual.

**Implementacao Opcao A:**
- Adicionar overlay com opacidade 100% sobre a imagem
- Criar um visual de "terminal/dashboard" com CSS puro
- Exibir "RadarHunter Pro" em texto estilizado
- Manter os floating cards animados

---

## Detalhes Tecnicos

### LandingPage.tsx - Novo codigo
```jsx
const LandingPage = () => {
  return (
    <main className="min-h-screen bg-[#0a0f1c]">
      <HeroSection />
      <PainPointsSection />
      ...
    </main>
  );
};
```

### HeroSection.tsx - Dashboard Visual Substituido

Substituir a imagem do dashboard por:
1. Um container escuro com borda neon
2. Texto "RadarHunter Pro" com efeito gradient
3. Linhas simulando interface de dashboard
4. Animacoes de radar/pulse

---

## Ordem de Implementacao

1. Adicionar fundo escuro forcado em `LandingPage.tsx`
2. Modificar `HeroSection.tsx`:
   - Remover/ocultar imagem PNG
   - Criar visual CSS do "dashboard" com RadarHunter Pro
   - Manter floating cards animados
3. Testar e verificar se a faixa branca desapareceu

---

## Resultado Esperado

- Fundo totalmente escuro em toda a landing page
- Nenhuma faixa branca lateral visivel
- Card do dashboard mostrando "RadarHunter Pro" em vez da imagem antiga
- Visual tech/radar mantido e impactante
