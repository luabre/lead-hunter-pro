 import { Button } from "@/components/ui/button";
 import { Card, CardContent, CardHeader } from "@/components/ui/card";
 import { Badge } from "@/components/ui/badge";
 import { Check, Star } from "lucide-react";
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
     <section id="precos" className="py-20 bg-white">
       <div className="container mx-auto px-4">
         <div className="text-center max-w-3xl mx-auto mb-16">
           <Badge className="bg-leadhunter-teal/10 text-leadhunter-teal border-leadhunter-teal/20 mb-4">
             Planos Flexíveis
           </Badge>
           <h2 className="font-poppins text-3xl md:text-4xl font-bold text-leadhunter-blue-dark mb-4">
             Escolha o Plano Ideal Para Você
           </h2>
           <p className="font-inter text-lg text-gray-600">
             Comece gratuitamente e escale conforme sua necessidade. Cancele quando quiser.
           </p>
         </div>
         
         <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
           {plans.map((plan, index) => (
             <Card 
               key={index}
               className={`relative overflow-hidden transition-all duration-300 hover:-translate-y-2 ${
                 plan.recommended 
                   ? 'border-2 border-leadhunter-teal shadow-xl scale-105' 
                   : 'border border-gray-200 shadow-md'
               }`}
             >
               {plan.recommended && (
                 <div className="absolute top-0 right-0 bg-leadhunter-teal text-white text-xs font-semibold px-4 py-1 rounded-bl-lg flex items-center gap-1">
                   <Star className="h-3 w-3" /> Mais Popular
                 </div>
               )}
               
               <CardHeader className="text-center pb-4">
                 <h3 className="font-poppins font-bold text-2xl text-leadhunter-blue-dark">
                   {plan.name}
                 </h3>
                 <div className="mt-4">
                   {plan.price === "Sob consulta" ? (
                     <span className="font-poppins text-3xl font-bold text-leadhunter-blue-dark">
                       Sob consulta
                     </span>
                   ) : (
                     <div className="flex items-baseline justify-center gap-1">
                       <span className="text-gray-500">R$</span>
                       <span className="font-poppins text-5xl font-bold text-leadhunter-blue-dark">
                         {plan.price}
                       </span>
                       <span className="text-gray-500">/mês</span>
                     </div>
                   )}
                 </div>
                 <p className="font-inter text-sm text-gray-500 mt-2">
                   {plan.description}
                 </p>
               </CardHeader>
               
               <CardContent className="pt-0">
                 <ul className="space-y-3 mb-8">
                   {plan.features.map((feature, featureIndex) => (
                     <li key={featureIndex} className="flex items-start gap-3">
                       <div className="w-5 h-5 bg-leadhunter-teal/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                         <Check className="h-3 w-3 text-leadhunter-teal" />
                       </div>
                       <span className="font-inter text-sm text-gray-600">
                         {feature}
                       </span>
                     </li>
                   ))}
                 </ul>
                 
                 <Button 
                   className={`w-full py-6 font-semibold ${
                     plan.recommended 
                       ? 'bg-leadhunter-teal hover:bg-leadhunter-teal/90 text-white' 
                       : 'bg-leadhunter-blue-dark hover:bg-leadhunter-blue-dark/90 text-white'
                   }`}
                   asChild
                 >
                   <Link to="/login">
                     {plan.cta}
                   </Link>
                 </Button>
               </CardContent>
             </Card>
           ))}
         </div>
         
         <p className="text-center mt-8 text-gray-500 text-sm">
           ✓ 7 dias de teste grátis em todos os planos • ✓ Sem taxa de setup • ✓ Cancele quando quiser
         </p>
       </div>
     </section>
   );
 };