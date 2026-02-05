

# Plano: Landing Page de Vendas Profissional para Lead Hunter Pro

## Visao Geral

Criar uma landing page de vendas completa e profissional que converte visitantes em clientes, seguindo os padroes visuais do projeto (azul/teal, fontes Poppins/Inter) e as melhores praticas de conversao.

---

## Estrutura da Pagina

A landing page tera as seguintes secoes:

### 1. Hero Section (Cabecalho Principal)
- Logo do Lead Hunter Pro
- Headline impactante: "Transforme Leads em Vendas com Inteligencia Artificial"
- Subheadline explicando o valor
- CTA principal: "Comece Gratis" / "Agendar Demo"
- Imagem ou ilustracao do dashboard
- Estatisticas rapidas (ex: "+5.000 empresas", "300% mais conversao")

### 2. Secao de Problemas/Dores
- 3-4 cards com dores comuns dos clientes
- Icones ilustrativos
- Transicao para a solucao

### 3. Secao de Beneficios
- 6 beneficios principais com icones
- IA SDR - Prospeccao automatizada
- IA Closer - Fechamento inteligente
- IA Manager - Gestao estrategica
- Busca Inteligente - Descoberta de empresas
- Campanhas PJ/PF - Flexibilidade total
- Analytics - Metricas em tempo real

### 4. Como Funciona (Passo a Passo)
- 4 passos visuais com icones numerados
- Linha de conexao entre passos
- Animacoes suaves

### 5. Secao de Recursos/Features
- Grid com principais funcionalidades
- Screenshots ou mockups do sistema
- Destaque para diferenciais

### 6. Planos de Precos
- 3 planos: Starter, Professional, Enterprise
- Comparativo de features
- Destaque no plano recomendado
- CTAs em cada plano

### 7. Depoimentos
- Carrossel com 4-6 depoimentos
- Foto, nome, cargo, empresa
- Estrelas de avaliacao
- Logos de empresas clientes

### 8. FAQ (Perguntas Frequentes)
- Accordion com 6-8 perguntas comuns
- Respostas claras e objetivas

### 9. CTA Final
- Banner de conversao
- Headline de urgencia
- Botao de acao principal
- Garantia ou trial gratuito

### 10. Footer
- Links uteis
- Redes sociais
- Informacoes de contato
- Termos e Politica de Privacidade

---

## Arquivos a Criar

```text
src/pages/LandingPage.tsx          # Pagina principal
src/components/landing/
  ├── HeroSection.tsx              # Hero com CTA
  ├── PainPointsSection.tsx        # Secao de dores
  ├── BenefitsSection.tsx          # Beneficios do produto
  ├── HowItWorksSection.tsx        # Passo a passo
  ├── FeaturesSection.tsx          # Recursos principais
  ├── PricingSection.tsx           # Planos e precos
  ├── TestimonialsSection.tsx      # Depoimentos de clientes
  ├── FAQSection.tsx               # Perguntas frequentes
  ├── CTASection.tsx               # CTA final
  └── LandingFooter.tsx            # Footer da landing
```

---

## Alteracao de Rotas

Atualizar `src/App.tsx` para adicionar a rota `/vendas`:

```text
/vendas -> LandingPage.tsx
```

---

## Design e Estilo

### Cores
- Primaria: Azul (#1E88E5)
- Secundaria: Teal (#00BFA5)
- Accent: Dourado (#FFC107)
- Fundo: Gradientes suaves (branco para azul claro)
- Textos: Azul escuro (#0A2540)

### Tipografia
- Titulos: Poppins (bold/semibold)
- Corpo: Inter (regular/medium)

### Elementos Visuais
- Cards com sombras suaves
- Icones do Lucide React
- Bordas arredondadas (8px)
- Animacoes de entrada suaves
- Botoes com hover effects

---

## Conteudo dos Planos de Precos

| Plano | Preco | Features |
|-------|-------|----------|
| Starter | R$ 197/mes | Ate 500 leads, IA SDR basica, 1 usuario |
| Professional | R$ 497/mes | Ate 2.000 leads, IA SDR + Closer, 5 usuarios, Campanhas PJ/PF |
| Enterprise | Sob consulta | Leads ilimitados, IA completa, Usuarios ilimitados, Suporte dedicado |

---

## Depoimentos (Mock Data)

1. "O Lead Hunter Pro triplicou nossa taxa de conversao em apenas 2 meses!"
   - Maria Silva, Diretora Comercial, TechCorp

2. "A IA SDR e como ter um time de 10 vendedores trabalhando 24/7"
   - Carlos Mendes, CEO, Agencia Digital

3. "Finalmente uma ferramenta que entende o mercado brasileiro"
   - Ana Costa, Head de Vendas, StartupXYZ

4. "Reducao de 70% no tempo de prospeccao. Impressionante!"
   - Pedro Santos, Gerente Comercial, ConsultoriaPro

---

## Responsividade

- Mobile-first design
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Menu hamburger no mobile
- Cards empilhados em telas menores
- Carrossel touch-friendly

---

## Secao Tecnica

### Dependencias Utilizadas
- Componentes UI existentes (Button, Card, Badge, etc.)
- Lucide React para icones
- Embla Carousel para depoimentos
- Radix UI Accordion para FAQ
- React Router para navegacao

### Performance
- Lazy loading de imagens
- Componentes otimizados
- Minimo de re-renders

### SEO
- Tags semanticas (h1, h2, section, article)
- Meta description adequada
- Alt text em imagens

---

## Ordem de Implementacao

1. Criar estrutura da pagina LandingPage.tsx
2. Implementar HeroSection com logo e CTAs
3. Adicionar secao de dores/problemas
4. Criar secao de beneficios com cards
5. Implementar "Como Funciona" visual
6. Criar grid de features
7. Implementar tabela de precos comparativa
8. Adicionar carrossel de depoimentos
9. Criar FAQ com accordion
10. Implementar CTA final e footer
11. Adicionar rota no App.tsx
12. Testar responsividade

