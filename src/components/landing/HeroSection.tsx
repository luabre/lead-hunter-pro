 import { Button } from "@/components/ui/button";
 import { Badge } from "@/components/ui/badge";
 import { ArrowRight, Play, Users, TrendingUp, Target, Radar } from "lucide-react";
 import { Link } from "react-router-dom";
 
 export const HeroSection = () => {
   return (
     <section className="relative min-h-screen flex items-center justify-center overflow-hidden radar-bg">
       {/* Radar Grid Background */}
       <div className="absolute inset-0 radar-grid opacity-30" />
       
       {/* Radar Animation Container */}
       <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20">
         {/* Radar Circles */}
         <div className="absolute inset-0 border-2 border-radar-cyan/30 rounded-full" />
         <div className="absolute inset-[15%] border border-radar-cyan/20 rounded-full" />
         <div className="absolute inset-[30%] border border-radar-cyan/15 rounded-full" />
         <div className="absolute inset-[45%] border border-radar-cyan/10 rounded-full" />
         
         {/* Radar Sweep Line */}
         <div className="absolute inset-0 animate-radar-sweep origin-center">
           <div className="absolute top-1/2 left-1/2 w-1/2 h-0.5 bg-gradient-to-r from-radar-cyan to-transparent origin-left" />
         </div>
         
         {/* Pulsing Circles */}
         <div className="absolute inset-[20%] border border-radar-cyan/40 rounded-full animate-radar-pulse" style={{ animationDelay: '0s' }} />
         <div className="absolute inset-[20%] border border-radar-cyan/40 rounded-full animate-radar-pulse" style={{ animationDelay: '1s' }} />
         <div className="absolute inset-[20%] border border-radar-cyan/40 rounded-full animate-radar-pulse" style={{ animationDelay: '2s' }} />
       </div>
       
       {/* Floating Dots (detected leads) */}
       <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <div className="absolute top-[20%] left-[15%] w-2 h-2 bg-radar-cyan rounded-full animate-glow-pulse" />
         <div className="absolute top-[35%] left-[25%] w-1.5 h-1.5 bg-radar-accent rounded-full animate-pulse-soft" />
         <div className="absolute top-[60%] left-[10%] w-2 h-2 bg-radar-indigo rounded-full animate-float" />
         <div className="absolute top-[25%] right-[20%] w-2.5 h-2.5 bg-radar-cyan rounded-full animate-glow-pulse" style={{ animationDelay: '0.5s' }} />
         <div className="absolute top-[45%] right-[15%] w-1.5 h-1.5 bg-radar-purple rounded-full animate-pulse-soft" />
         <div className="absolute top-[70%] right-[25%] w-2 h-2 bg-radar-accent rounded-full animate-float" style={{ animationDelay: '1s' }} />
         <div className="absolute bottom-[20%] left-[30%] w-1.5 h-1.5 bg-radar-cyan rounded-full animate-pulse-soft" />
         <div className="absolute bottom-[30%] right-[35%] w-2 h-2 bg-radar-indigo rounded-full animate-glow-pulse" style={{ animationDelay: '1.5s' }} />
       </div>
       
       <div className="container mx-auto px-4 py-20 relative z-10">
         <div className="grid lg:grid-cols-2 gap-12 items-center">
           {/* Left Content */}
           <div className="text-center lg:text-left space-y-8">
             <Badge className="bg-radar-cyan/10 text-radar-cyan border-radar-cyan/30 hover:bg-radar-cyan/20 font-medium">
               <Radar className="w-4 h-4 mr-2 animate-pulse-soft" />
               Tecnologia de Detecção Avançada
             </Badge>
             
             <h1 className="font-poppins text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
               Detecte Leads com{" "}
              <span className="gradient-text-radar text-glow-cyan">RadarHunter Pro</span>
             </h1>
             
             <p className="font-inter text-lg md:text-xl text-white/70 max-w-xl">
               Nossa IA varre o mercado em tempo real, identifica oportunidades e qualifica leads automaticamente. Como um radar, nada escapa.
             </p>
             
             <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
               <Button 
                 size="lg" 
                 className="btn-radar text-white font-semibold px-8 py-6 text-lg rounded-lg"
                 asChild
               >
                 <Link to="/login">
                   Ativar Radar <ArrowRight className="ml-2 h-5 w-5" />
                 </Link>
               </Button>
               
               <Button 
                 size="lg" 
                 variant="outline" 
                 className="border-radar-cyan/30 text-radar-cyan hover:bg-radar-cyan/10 px-8 py-6 text-lg rounded-lg"
               >
                 <Play className="mr-2 h-5 w-5" /> Ver Demo
               </Button>
             </div>
             
             {/* Stats */}
             <div className="grid grid-cols-3 gap-6 pt-8 border-t border-radar-grid">
               <div className="text-center lg:text-left">
                 <div className="flex items-center justify-center lg:justify-start gap-2">
                   <Users className="h-5 w-5 text-radar-cyan" />
                   <span className="font-poppins text-2xl md:text-3xl font-bold text-white">5.000+</span>
                 </div>
                 <p className="text-white/50 text-sm mt-1">Empresas ativas</p>
               </div>
               <div className="text-center lg:text-left">
                 <div className="flex items-center justify-center lg:justify-start gap-2">
                   <TrendingUp className="h-5 w-5 text-radar-accent" />
                   <span className="font-poppins text-2xl md:text-3xl font-bold text-white">300%</span>
                 </div>
                 <p className="text-white/50 text-sm mt-1">Mais conversão</p>
               </div>
               <div className="text-center lg:text-left">
                 <div className="flex items-center justify-center lg:justify-start gap-2">
                   <Target className="h-5 w-5 text-radar-indigo" />
                   <span className="font-poppins text-2xl md:text-3xl font-bold text-white">2M+</span>
                 </div>
                 <p className="text-white/50 text-sm mt-1">Leads detectados</p>
               </div>
             </div>
           </div>
           
           {/* Right Content - Dashboard Preview */}
           <div className="relative hidden lg:block">
            <div className="relative rounded-2xl p-4 radar-glow overflow-hidden" style={{ background: 'rgba(10, 15, 28, 0.9)', border: '1px solid rgba(0, 240, 255, 0.2)' }}>
               <img 
                 src="/lovable-uploads/039c9c09-384f-4a6e-a325-10972460bfe1.png" 
                alt="RadarHunter Pro Dashboard Preview"
                 className="rounded-xl shadow-lg w-full"
               />
              {/* Dark overlay to blend sidebar */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1c] via-transparent to-[#0a0f1c] rounded-xl pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c]/80 via-transparent to-[#0a0f1c]/50 rounded-xl pointer-events-none" />
               
               {/* Floating Cards */}
              <div className="absolute -left-8 top-1/4 rounded-lg p-4 animate-float" style={{ background: 'rgba(10, 15, 28, 0.95)', border: '1px solid rgba(0, 240, 255, 0.3)' }}>
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-radar-cyan/20 rounded-full flex items-center justify-center">
                     <TrendingUp className="h-5 w-5 text-radar-cyan" />
                   </div>
                   <div>
                     <p className="text-xs text-white/50">Detectado</p>
                     <p className="font-semibold text-radar-cyan">+47% hoje</p>
                   </div>
                 </div>
               </div>
               
              <div className="absolute -right-8 bottom-1/4 rounded-lg p-4 animate-float" style={{ background: 'rgba(10, 15, 28, 0.95)', border: '1px solid rgba(0, 240, 255, 0.3)', animationDelay: '1.5s' }}>
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-radar-indigo/20 rounded-full flex items-center justify-center">
                     <Target className="h-5 w-5 text-radar-indigo" />
                   </div>
                   <div>
                     <p className="text-xs text-white/50">Leads no radar</p>
                     <p className="font-semibold text-radar-accent">128 novos</p>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
       
       {/* Scroll Indicator */}
       <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
         <div className="w-6 h-10 border-2 border-radar-cyan/30 rounded-full flex justify-center">
           <div className="w-1 h-3 bg-radar-cyan/50 rounded-full mt-2" />
         </div>
       </div>
     </section>
   );
 };