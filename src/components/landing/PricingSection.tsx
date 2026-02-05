 import { Button } from "@/components/ui/button";
 import { Badge } from "@/components/ui/badge";
 import { Check, Star, Zap } from "lucide-react";
 import { Link } from "react-router-dom";
 
 const plans = [
   {
     name: "Starter",
     price: "197",
     description: "Ideal para pequenas equipes começando com IA",
     features: [
       "Até 500 leads/mês",
       "IA SDR básica",
       "1 usuário",
       "Busca inteligente",
       "Suporte por email",
       "Dashboard básico"
     ],
     recommended: false,
     cta: "Começar Agora"
   },
   {
     name: "Professional",
     price: "497",
     description: "Para equipes que querem escalar vendas",
     features: [
       "Até 2.000 leads/mês",
       "IA SDR + IA Closer",
       "5 usuários",
       "Campanhas PJ/PF",
       "Integrações CRM",
       "Suporte prioritário",
       "Analytics avançado",
       "API access"
     ],
     recommended: true,
     cta: "Escolher Professional"
   },
   {
     name: "Enterprise",
     price: "Sob consulta",
     description: "Solução completa para grandes operações",
     features: [
       "Leads ilimitados",
       "IA SDR + Closer + Manager",
       "Usuários ilimitados",
       "White label disponível",
       "Gerente de sucesso dedicado",
       "SLA garantido",
       "Treinamento personalizado",
       "Customizações sob demanda"
     ],
     recommended: false,
     cta: "Falar com Vendas"
   }
 ];
 
 export const PricingSection = () => {
   return (
     <section id="precos" className="py-20 radar-bg relative overflow-hidden">
       {/* Grid Background */}
       <div className="absolute inset-0 radar-grid opacity-20" />
       
       <div className="container mx-auto px-4 relative z-10">
         <div className="text-center max-w-3xl mx-auto mb-16">
           <Badge className="bg-radar-cyan/10 text-radar-cyan border-radar-cyan/30 mb-4">
             <Zap className="w-4 h-4 mr-2" />
             Planos Flexíveis
           </Badge>
           <h2 className="font-poppins text-3xl md:text-4xl font-bold text-white mb-4">
             Escolha o <span className="gradient-text-radar">Plano Ideal</span> Para Você
           </h2>
           <p className="font-inter text-lg text-white/60">
             Comece gratuitamente e escale conforme sua necessidade. Cancele quando quiser.
           </p>
         </div>
         
         <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
           {plans.map((plan, index) => (
              <div 
               key={index}
                className={`relative overflow-hidden transition-all duration-300 hover:-translate-y-2 rounded-lg ${
                 plan.recommended 
                    ? 'radar-glow-intense scale-105' 
                    : ''
               }`}
                style={{ 
                  background: 'rgba(10, 15, 28, 0.9)', 
                  border: plan.recommended ? '1px solid rgba(0, 240, 255, 0.5)' : '1px solid rgba(0, 240, 255, 0.2)' 
                }}
             >
               {plan.recommended && (
                 <div className="absolute top-0 right-0 bg-gradient-to-r from-radar-cyan to-radar-indigo text-white text-xs font-semibold px-4 py-1 rounded-bl-lg flex items-center gap-1">
                   <Star className="h-3 w-3" /> Mais Popular
                 </div>
               )}
               
                <div className="text-center pb-4 pt-6 px-6">
                 <h3 className="font-poppins font-bold text-2xl text-white">
                   {plan.name}
                 </h3>
                 <div className="mt-4">
                   {plan.price === "Sob consulta" ? (
                     <span className="font-poppins text-3xl font-bold text-white">
                       Sob consulta
                     </span>
                   ) : (
                     <div className="flex items-baseline justify-center gap-1">
                       <span className="text-white/50">R$</span>
                       <span className="font-poppins text-5xl font-bold gradient-text-radar">
                         {plan.price}
                       </span>
                       <span className="text-white/50">/mês</span>
                     </div>
                   )}
                 </div>
                 <p className="font-inter text-sm text-white/50 mt-2">
                   {plan.description}
                 </p>
                </div>
               
                <div className="pt-0 px-6 pb-6">
                 <ul className="space-y-3 mb-8">
                   {plan.features.map((feature, featureIndex) => (
                     <li key={featureIndex} className="flex items-start gap-3">
                       <div className="w-5 h-5 bg-radar-cyan/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 border border-radar-cyan/30">
                         <Check className="h-3 w-3 text-radar-cyan" />
                       </div>
                       <span className="font-inter text-sm text-white/70">
                         {feature}
                       </span>
                     </li>
                   ))}
                 </ul>
                 
                 <Button 
                   className={`w-full py-6 font-semibold ${
                     plan.recommended 
                       ? 'btn-radar text-white' 
                       : 'bg-radar-grid hover:bg-radar-grid/80 text-white border border-radar-cyan/30'
                   }`}
                   asChild
                 >
                   <Link to="/login">
                     {plan.cta}
                   </Link>
                 </Button>
                </div>
              </div>
           ))}
         </div>
         
         <p className="text-center mt-8 text-white/50 text-sm">
           ✓ 7 dias de teste grátis em todos os planos • ✓ Sem taxa de setup • ✓ Cancele quando quiser
         </p>
       </div>
     </section>
   );
 };