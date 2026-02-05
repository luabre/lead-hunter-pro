 import { Bot, Target, Brain, Search, Users, BarChart3, Radar } from "lucide-react";
 
 const benefits = [
   {
     icon: Bot,
     title: "IA SDR",
     subtitle: "Prospecção Automatizada",
     description: "Agente de IA que identifica, qualifica e engaja leads automaticamente 24/7.",
     gradient: "from-radar-cyan to-radar-indigo"
   },
   {
     icon: Target,
     title: "IA Closer",
     subtitle: "Fechamento Inteligente",
     description: "IA especializada em conduzir negociações e aumentar sua taxa de fechamento.",
     gradient: "from-radar-indigo to-radar-purple"
   },
   {
     icon: Brain,
     title: "IA Manager",
     subtitle: "Gestão Estratégica",
     description: "Insights automatizados e recomendações para otimizar sua operação de vendas.",
     gradient: "from-radar-purple to-radar-cyan"
   },
   {
     icon: Search,
     title: "Busca Inteligente",
     subtitle: "Descoberta de Empresas",
     description: "Encontre empresas ideais com filtros avançados e dados enriquecidos em tempo real.",
     gradient: "from-radar-accent to-radar-cyan"
   },
   {
     icon: Users,
     title: "Campanhas PJ/PF",
     subtitle: "Flexibilidade Total",
     description: "Gerencie campanhas para empresas e pessoas físicas em uma única plataforma.",
     gradient: "from-radar-cyan to-radar-accent"
   },
   {
     icon: BarChart3,
     title: "Analytics Avançado",
     subtitle: "Métricas em Tempo Real",
     description: "Dashboard completo com KPIs, funis e previsões de vendas baseadas em dados.",
     gradient: "from-radar-indigo to-radar-accent"
   }
 ];
 
 export const BenefitsSection = () => {
   return (
     <section className="py-20 radar-bg relative overflow-hidden">
       {/* Grid Background */}
       <div className="absolute inset-0 radar-grid opacity-20" />
       
       <div className="container mx-auto px-4 relative z-10">
         <div className="text-center max-w-3xl mx-auto mb-16">
           <div className="inline-flex items-center gap-2 text-radar-cyan mb-4">
             <Radar className="h-5 w-5 animate-pulse-soft" />
             <span className="font-inter text-sm uppercase tracking-wider">Arsenal Completo</span>
           </div>
           <h2 className="font-poppins text-3xl md:text-4xl font-bold text-white mb-4">
             Tudo Que Você Precisa Para <span className="gradient-text-radar">Vender Mais</span>
           </h2>
           <p className="font-inter text-lg text-white/60">
             Uma suíte completa de ferramentas de IA projetadas para transformar sua operação de vendas.
           </p>
         </div>
         
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
           {benefits.map((benefit, index) => (
              <div 
               key={index}
                className="group transition-all duration-300 hover:-translate-y-2 overflow-hidden rounded-lg"
                style={{ background: 'rgba(10, 15, 28, 0.9)', border: '1px solid rgba(0, 240, 255, 0.2)' }}
             >
                <div className="p-8">
                 <div className={`w-14 h-14 bg-gradient-to-br ${benefit.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform group-hover:shadow-lg group-hover:shadow-radar-cyan/20`}>
                   <benefit.icon className="h-7 w-7 text-white" />
                 </div>
                 
                 <div className="space-y-2 mb-4">
                   <h3 className="font-poppins font-bold text-xl text-white">
                     {benefit.title}
                   </h3>
                   <p className="font-inter font-medium text-sm text-radar-cyan">
                     {benefit.subtitle}
                   </p>
                 </div>
                 
                 <p className="font-inter text-white/60">
                   {benefit.description}
                 </p>
                </div>
              </div>
           ))}
         </div>
       </div>
     </section>
   );
 };