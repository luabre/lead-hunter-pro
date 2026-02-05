 import { Button } from "@/components/ui/button";
 import { ArrowRight, Shield, Clock, CreditCard, Radar } from "lucide-react";
 import { Link } from "react-router-dom";
 
 export const CTASection = () => {
   return (
     <section className="py-20 radar-bg relative overflow-hidden">
       {/* Grid Background */}
       <div className="absolute inset-0 radar-grid opacity-20" />
       
       {/* Radar Animation */}
       <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-20">
         <div className="absolute inset-0 border border-radar-cyan/30 rounded-full animate-radar-pulse" />
         <div className="absolute inset-0 border border-radar-cyan/30 rounded-full animate-radar-pulse" style={{ animationDelay: '1s' }} />
         <div className="absolute inset-0 border border-radar-cyan/30 rounded-full animate-radar-pulse" style={{ animationDelay: '2s' }} />
       </div>
       
       <div className="container mx-auto px-4 relative z-10">
         <div className="max-w-4xl mx-auto text-center">
           <div className="inline-flex items-center gap-2 text-radar-cyan mb-6">
             <Radar className="h-6 w-6 animate-pulse-soft" />
           </div>
           
           <h2 className="font-poppins text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
             Pronto Para <span className="gradient-text-radar text-glow-cyan">Ativar seu Radar</span>?
           </h2>
           
           <p className="font-inter text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Junte-se a mais de 5.000 empresas que já estão fechando mais negócios com o RadarHunter Pro.
           </p>
           
           <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
             <Button 
               size="lg" 
               className="btn-radar text-white font-semibold px-8 py-6 text-lg rounded-lg"
               asChild
             >
               <Link to="/login">
                 Ativar Radar Agora <ArrowRight className="ml-2 h-5 w-5" />
               </Link>
             </Button>
             
             <Button 
               size="lg" 
               variant="outline" 
               className="border-radar-cyan/30 text-radar-cyan hover:bg-radar-cyan/10 px-8 py-6 text-lg rounded-lg"
             >
               Agendar Demonstração
             </Button>
           </div>
           
           <div className="flex flex-wrap justify-center gap-8 text-white/60">
             <div className="flex items-center gap-2">
               <Clock className="h-5 w-5 text-radar-cyan" />
               <span className="font-inter text-sm">Setup em 5 minutos</span>
             </div>
             <div className="flex items-center gap-2">
               <CreditCard className="h-5 w-5 text-radar-cyan" />
               <span className="font-inter text-sm">Sem cartão de crédito</span>
             </div>
             <div className="flex items-center gap-2">
               <Shield className="h-5 w-5 text-radar-cyan" />
               <span className="font-inter text-sm">7 dias grátis</span>
             </div>
           </div>
         </div>
       </div>
     </section>
   );
 };