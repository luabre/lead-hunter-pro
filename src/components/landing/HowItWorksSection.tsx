 import { Upload, Bot, MessageSquare, TrendingUp } from "lucide-react";
 
 const steps = [
   {
     number: "01",
     icon: Upload,
     title: "Importe seus Leads",
     description: "Faça upload da sua base ou deixe nossa IA buscar leads qualificados automaticamente."
   },
   {
     number: "02",
     icon: Bot,
     title: "IA Qualifica e Prioriza",
     description: "Nossos agentes de IA analisam e classificam cada lead por potencial de conversão."
   },
   {
     number: "03",
     icon: MessageSquare,
     title: "Engajamento Automático",
     description: "Campanhas personalizadas são executadas automaticamente via email, WhatsApp e mais."
   },
   {
     number: "04",
     icon: TrendingUp,
     title: "Feche Mais Negócios",
     description: "Receba leads prontos para comprar e acompanhe métricas de performance em tempo real."
   }
 ];
 
 export const HowItWorksSection = () => {
   return (
     <section className="py-20 bg-gradient-to-b from-leadhunter-blue-dark to-leadhunter-blue">
       <div className="container mx-auto px-4">
         <div className="text-center max-w-3xl mx-auto mb-16">
           <h2 className="font-poppins text-3xl md:text-4xl font-bold text-white mb-4">
             Como Funciona
           </h2>
           <p className="font-inter text-lg text-white/80">
             Em 4 passos simples, você transforma sua prospecção e acelera suas vendas.
           </p>
         </div>
         
         <div className="relative">
           {/* Connection Line - Desktop */}
           <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-leadhunter-teal/30 -translate-y-1/2" />
           
           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
             {steps.map((step, index) => (
               <div key={index} className="relative">
                 <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 h-full">
                   {/* Step Number */}
                   <div className="absolute -top-4 left-8 bg-leadhunter-teal text-white font-poppins font-bold text-sm px-4 py-1 rounded-full">
                     Passo {step.number}
                   </div>
                   
                   {/* Icon */}
                   <div className="w-16 h-16 bg-leadhunter-teal/20 rounded-full flex items-center justify-center mb-6 mt-4">
                     <step.icon className="h-8 w-8 text-leadhunter-teal" />
                   </div>
                   
                   <h3 className="font-poppins font-bold text-xl text-white mb-3">
                     {step.title}
                   </h3>
                   
                   <p className="font-inter text-white/70">
                     {step.description}
                   </p>
                 </div>
                 
                 {/* Connection Dot - Desktop */}
                 {index < steps.length - 1 && (
                   <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8 bg-leadhunter-teal rounded-full border-4 border-leadhunter-blue-dark -translate-y-1/2 z-10" />
                 )}
               </div>
             ))}
           </div>
         </div>
       </div>
     </section>
   );
 };