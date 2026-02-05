 import { Upload, Bot, MessageSquare, TrendingUp, Radar } from "lucide-react";
 
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
     <section className="py-20 radar-bg relative overflow-hidden">
       {/* Grid Background */}
       <div className="absolute inset-0 radar-grid opacity-20" />
       
       {/* Radar Pulse Background Effect */}
       <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-10">
         <div className="absolute inset-0 border border-radar-cyan/30 rounded-full animate-radar-pulse" />
         <div className="absolute inset-0 border border-radar-cyan/30 rounded-full animate-radar-pulse" style={{ animationDelay: '1s' }} />
       </div>
       
       <div className="container mx-auto px-4 relative z-10">
         <div className="text-center max-w-3xl mx-auto mb-16">
           <div className="inline-flex items-center gap-2 text-radar-cyan mb-4">
             <Radar className="h-5 w-5 animate-pulse-soft" />
             <span className="font-inter text-sm uppercase tracking-wider">Processo Simplificado</span>
           </div>
           <h2 className="font-poppins text-3xl md:text-4xl font-bold text-white mb-4">
             Como o <span className="gradient-text-radar">Radar</span> Funciona
           </h2>
           <p className="font-inter text-lg text-white/60">
             Em 4 passos simples, você transforma sua prospecção e acelera suas vendas.
           </p>
         </div>
         
         <div className="relative">
           {/* Connection Line - Desktop */}
           <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-radar-cyan via-radar-indigo to-radar-purple -translate-y-1/2 opacity-50" />
           
           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
             {steps.map((step, index) => (
               <div key={index} className="relative">
                 <div className="card-tech rounded-2xl p-8 hover:border-radar-cyan/50 transition-all duration-300 h-full">
                   {/* Step Number */}
                   <div className="absolute -top-4 left-8 bg-gradient-to-r from-radar-cyan to-radar-indigo text-white font-poppins font-bold text-sm px-4 py-1 rounded-full shadow-lg shadow-radar-cyan/20">
                     Passo {step.number}
                   </div>
                   
                   {/* Icon */}
                   <div className="w-16 h-16 bg-radar-cyan/10 rounded-full flex items-center justify-center mb-6 mt-4 border border-radar-cyan/20">
                     <step.icon className="h-8 w-8 text-radar-cyan" />
                   </div>
                   
                   <h3 className="font-poppins font-bold text-xl text-white mb-3">
                     {step.title}
                   </h3>
                   
                   <p className="font-inter text-white/60">
                     {step.description}
                   </p>
                 </div>
                 
                 {/* Connection Dot - Desktop */}
                 {index < steps.length - 1 && (
                   <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8 bg-gradient-to-br from-radar-cyan to-radar-indigo rounded-full border-4 border-radar-dark -translate-y-1/2 z-10 shadow-lg shadow-radar-cyan/30" />
                 )}
               </div>
             ))}
           </div>
         </div>
       </div>
     </section>
   );
 };