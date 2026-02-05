 import { Card, CardContent } from "@/components/ui/card";
 import { Bot, Target, Brain, Search, Users, BarChart3 } from "lucide-react";
 
 const benefits = [
   {
     icon: Bot,
     title: "IA SDR",
     subtitle: "Prospecção Automatizada",
     description: "Agente de IA que identifica, qualifica e engaja leads automaticamente 24/7.",
     color: "bg-blue-500"
   },
   {
     icon: Target,
     title: "IA Closer",
     subtitle: "Fechamento Inteligente",
     description: "IA especializada em conduzir negociações e aumentar sua taxa de fechamento.",
     color: "bg-teal-500"
   },
   {
     icon: Brain,
     title: "IA Manager",
     subtitle: "Gestão Estratégica",
     description: "Insights automatizados e recomendações para otimizar sua operação de vendas.",
     color: "bg-purple-500"
   },
   {
     icon: Search,
     title: "Busca Inteligente",
     subtitle: "Descoberta de Empresas",
     description: "Encontre empresas ideais com filtros avançados e dados enriquecidos em tempo real.",
     color: "bg-orange-500"
   },
   {
     icon: Users,
     title: "Campanhas PJ/PF",
     subtitle: "Flexibilidade Total",
     description: "Gerencie campanhas para empresas e pessoas físicas em uma única plataforma.",
     color: "bg-pink-500"
   },
   {
     icon: BarChart3,
     title: "Analytics Avançado",
     subtitle: "Métricas em Tempo Real",
     description: "Dashboard completo com KPIs, funis e previsões de vendas baseadas em dados.",
     color: "bg-green-500"
   }
 ];
 
 export const BenefitsSection = () => {
   return (
     <section className="py-20 bg-white">
       <div className="container mx-auto px-4">
         <div className="text-center max-w-3xl mx-auto mb-16">
           <h2 className="font-poppins text-3xl md:text-4xl font-bold text-leadhunter-blue-dark mb-4">
             Tudo Que Você Precisa Para Vender Mais
           </h2>
           <p className="font-inter text-lg text-gray-600">
             Uma suíte completa de ferramentas de IA projetadas para transformar sua operação de vendas.
           </p>
         </div>
         
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
           {benefits.map((benefit, index) => (
             <Card 
               key={index}
               className="group bg-white border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
             >
               <CardContent className="p-8">
                 <div className={`w-14 h-14 ${benefit.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                   <benefit.icon className="h-7 w-7 text-white" />
                 </div>
                 
                 <div className="space-y-2 mb-4">
                   <h3 className="font-poppins font-bold text-xl text-leadhunter-blue-dark">
                     {benefit.title}
                   </h3>
                   <p className="font-inter font-medium text-sm text-leadhunter-teal">
                     {benefit.subtitle}
                   </p>
                 </div>
                 
                 <p className="font-inter text-gray-600">
                   {benefit.description}
                 </p>
               </CardContent>
             </Card>
           ))}
         </div>
       </div>
     </section>
   );
 };