

# Plano: Ajustar Botao Ver Demo e Posicao do Card Detectado

## Problemas Identificados

### 1. Botao "Ver Demo" com Fundo Branco/Cinza
O botao atualmente tem um fundo que nao deveria ter. Precisa ser transparente com borda sutil e texto branco.

### 2. Card "Detectado +47% hoje" Posicionado Alto Demais
O card flutuante esta em `top-1/4` (25% do topo), bloqueando a visao do nome "RadarHunter Pro" no dashboard CSS.

---

## Solucoes

### Correcao 1: Botao Ver Demo

**Arquivo:** `src/components/landing/HeroSection.tsx`

**De (linha 72-78):**
```jsx
<Button 
  size="lg" 
  variant="outline" 
  className="border-radar-cyan/30 text-radar-cyan hover:bg-radar-cyan/10 px-8 py-6 text-lg rounded-lg"
>
  <Play className="mr-2 h-5 w-5" /> Ver Demo
</Button>
```

**Para:**
```jsx
<Button 
  size="lg" 
  variant="outline" 
  className="bg-transparent border-radar-cyan/30 text-white hover:bg-radar-cyan/10 hover:text-white px-8 py-6 text-lg rounded-lg"
>
  <Play className="mr-2 h-5 w-5" /> Ver Demo
</Button>
```

**Mudancas:**
- Adicionar `bg-transparent` para garantir fundo transparente
- Mudar `text-radar-cyan` para `text-white` (texto branco)
- Adicionar `hover:text-white` para manter texto branco no hover

---

### Correcao 2: Reposicionar Card "Detectado"

**Arquivo:** `src/components/landing/HeroSection.tsx`

**De (linha 181):**
```jsx
<div className="absolute -left-6 top-1/4 rounded-lg p-4 animate-float z-10" ...>
```

**Para:**
```jsx
<div className="absolute -left-6 top-[55%] rounded-lg p-4 animate-float z-10" ...>
```

**Mudanca:**
- Alterar `top-1/4` (25%) para `top-[55%]` (55%) para mover o card para baixo
- Isso deixa o nome "RadarHunter Pro" visivel no topo do dashboard

---

## Arquivo a Modificar

| Arquivo | Linha | Mudanca |
|---------|-------|---------|
| `src/components/landing/HeroSection.tsx` | 74-75 | Adicionar `bg-transparent` e `text-white` no botao |
| `src/components/landing/HeroSection.tsx` | 181 | Mudar `top-1/4` para `top-[55%]` |

---

## Resultado Esperado

- Botao "Ver Demo" com fundo transparente e texto branco
- Card "Detectado +47% hoje" posicionado mais abaixo, sem bloquear o nome do produto

