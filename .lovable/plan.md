
# Plano: Corrigir Problemas Visuais da Landing Page

## Problemas Identificados

### 1. Cards Brancos Sem Texto
Os componentes `Card` usam classes CSS que entram em conflito com o tema escuro. A classe `bg-card` do Tailwind aplica fundo branco (do CSS variables), sobrescrevendo a classe `card-tech` que deveria criar o visual escuro glassmorphism.

### 2. Barra Lateral Branca na Hero
A imagem do dashboard usada na Hero (`039c9c09-384f-4a6e-a325-10972460bfe1.png`) mostra uma sidebar branca que destoa do visual tech escuro. Como você mencionou na imagem 2, a Hero mostra "LeadHunter Pro" - precisamos atualizar isso.

### 3. Nome na Hero Incorreto
O nome precisa ser alterado para **RadarHunter Pro** (palavra unica composta).

---

## Solucoes

### Correcao 1: Forcar Estilos Escuros nos Cards

Modificar todos os componentes da landing para:
- Remover a dependencia do componente `Card` da UI library
- Usar divs com estilos inline/classes diretas que garantam o fundo escuro
- Aplicar `!important` ou especificidade maior nas classes

**Arquivos afetados:**
- `src/components/landing/BenefitsSection.tsx`
- `src/components/landing/FeaturesSection.tsx`
- `src/components/landing/PricingSection.tsx`
- `src/components/landing/TestimonialsSection.tsx`
- `src/components/landing/PainPointsSection.tsx`

**Solucao tecnica:** Substituir:
```jsx
<Card className="card-tech">
```
Por:
```jsx
<div className="bg-[#0a0f1c]/80 backdrop-blur-md border border-[#00f0ff]/20 rounded-lg hover:border-[#00f0ff]/50 transition-all">
```

### Correcao 2: Atualizar Nome na Hero

**Arquivo:** `src/components/landing/HeroSection.tsx`

Alterar o texto do headline e alt da imagem:
- De: "Radar Hunter Pro" ou "LeadHunter Pro"  
- Para: **"RadarHunter Pro"**

### Correcao 3: Remover Imagem da Sidebar Branca

Opcoes para a Hero:
1. **Remover a imagem do dashboard** temporariamente e usar visual abstrato
2. **Adicionar overlay escuro** sobre a imagem para disfarcar a sidebar
3. **Criar mockup visual com CSS** simulando um dashboard tech

Recomendacao: Opcao 2 - Aplicar overlay gradiente escuro sobre a imagem.

---

## Arquivos a Modificar

| Arquivo | Mudanca |
|---------|---------|
| `src/components/landing/HeroSection.tsx` | Corrigir nome para RadarHunter Pro, adicionar overlay na imagem |
| `src/components/landing/BenefitsSection.tsx` | Substituir Card por div com estilos diretos |
| `src/components/landing/FeaturesSection.tsx` | Substituir Card por div com estilos diretos |
| `src/components/landing/PricingSection.tsx` | Substituir Card por div com estilos diretos |
| `src/components/landing/TestimonialsSection.tsx` | Substituir Card por div com estilos diretos |
| `src/components/landing/PainPointsSection.tsx` | Substituir Card por div com estilos diretos |
| `src/components/landing/FAQSection.tsx` | Verificar e corrigir nome |
| `src/components/landing/CTASection.tsx` | Corrigir nome |
| `src/components/landing/LandingFooter.tsx` | Corrigir nome |
| `src/components/layout/Logo.tsx` | Corrigir nome |

---

## Ordem de Implementacao

1. Corrigir nome para RadarHunter Pro em HeroSection
2. Adicionar overlay escuro na imagem do dashboard na Hero
3. Substituir Cards por divs em BenefitsSection
4. Substituir Cards por divs em FeaturesSection  
5. Substituir Cards por divs em PricingSection
6. Substituir Cards por divs em TestimonialsSection
7. Substituir Cards por divs em PainPointsSection
8. Corrigir nome nos demais arquivos (FAQ, CTA, Footer, Logo)
9. Testar responsividade e visual

---

## Secao Tecnica

### Classe card-tech Atualizada

Garantir que a classe `card-tech` tenha especificidade suficiente no CSS:

```css
.card-tech {
  background: rgba(10, 15, 28, 0.9) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 240, 255, 0.2);
}
```

### Alternativa: Override Inline

Para garantir que funcione, usar estilos inline com Tailwind:

```jsx
<div 
  className="rounded-lg border backdrop-blur-md transition-all"
  style={{ 
    background: 'rgba(10, 15, 28, 0.9)', 
    borderColor: 'rgba(0, 240, 255, 0.2)' 
  }}
>
```

### Overlay na Imagem do Dashboard

```jsx
<div className="relative">
  <img src="..." className="..." />
  <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1c] via-transparent to-[#0a0f1c] rounded-xl" />
</div>
```

---

## Resultado Esperado

- Cards com fundo escuro e texto visivel em branco
- Imagem do dashboard com transicao suave para o fundo escuro
- Nome consistente "RadarHunter Pro" em toda a pagina
- Visual tech/radar mantido e funcional
