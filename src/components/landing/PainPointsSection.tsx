 import { Card, CardContent } from "@/components/ui/card";
 import { Clock, Users, TrendingDown, Target } from "lucide-react";
 
 const painPoints = [
   {
     icon: Clock,
     title: "Tempo Perdido em Prospecção Manual",
     description: "Sua equipe gasta horas buscando leads sem garantia de qualificação, desperdiçando recursos valiosos."
   },
   {
     icon: TrendingDown,
     title: "Baixa Taxa de Conversão",
     description: "Leads frios e não qualificados resultam em reuniões improdutivas e metas não atingidas."
   },
   {
     icon: Users,
     title: "Equipe Sobrecarregada",
     description: "Vendedores focados em tarefas operacionais ao invés de fechar negócios."
   },
   {
     icon: Target,
     title: "Falta de Dados Estratégicos",
     description: "Decisões baseadas em intuição, sem inteligência de mercado para guiar a prospecção."
   }
 ];
 
 export const PainPointsSection = () => {
   return (
     <section className="py-20 bg-leadhunter-gray">
       <div className="container mx-auto px-4">
         <div className="text-center max-w-3xl mx-auto mb-16">
           <h2 className="font-poppins text-3xl md:text-4xl font-bold text-leadhunter-blue-dark mb-4">
             Você Enfrenta Esses Desafios?
           </h2>
           <p className="font-inter text-lg text-gray-600">
             Sabemos como é difícil escalar vendas quando você está preso em processos manuais e ineficientes.
           </p>
         </div>
         
         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
           {painPoints.map((point, index) => (
             <Card 
               key={index} 
               className="bg-white border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
             >
               <CardContent className="p-6 text-center">
                 <div className="w-16 h-16 bg-leadhunter-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                   <point.icon className="h-8 w-8 text-leadhunter-red" />
                 </div>
                 <h3 className="font-poppins font-semibold text-lg text-leadhunter-blue-dark mb-2">
                   {point.title}
                 </h3>
                 <p className="font-inter text-gray-600 text-sm">
                   {point.description}
                 </p>
               </CardContent>
             </Card>
           ))}
         </div>
         
         <div className="text-center mt-12">
           <p className="font-poppins text-2xl font-semibold text-leadhunter-blue-dark">
             🎯 E se você pudesse resolver tudo isso com <span className="text-leadhunter-teal">uma única plataforma</span>?
           </p>
         </div>
       </div>
     </section>
   );
 };