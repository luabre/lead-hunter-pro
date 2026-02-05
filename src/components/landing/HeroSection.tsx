 import { Button } from "@/components/ui/button";
 import { Badge } from "@/components/ui/badge";
 import { ArrowRight, Play, Users, TrendingUp, Target } from "lucide-react";
 import { Link } from "react-router-dom";
 
 export const HeroSection = () => {
   return (
     <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-leadhunter-blue-dark via-leadhunter-blue to-leadhunter-teal">
       {/* Background Pattern */}
       <div className="absolute inset-0 opacity-10">
         <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
         <div className="absolute bottom-20 right-10 w-96 h-96 bg-leadhunter-teal rounded-full blur-3xl" />
       </div>
       
       <div className="container mx-auto px-4 py-20 relative z-10">
         <div className="grid lg:grid-cols-2 gap-12 items-center">
           {/* Left Content */}
           <div className="text-center lg:text-left space-y-8">
             <Badge className="bg-leadhunter-gold/20 text-leadhunter-gold border-leadhunter-gold/30 hover:bg-leadhunter-gold/30">
               🚀 Plataforma #1 em Prospecção com IA
             </Badge>
             
             <h1 className="font-poppins text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
               Transforme Leads em <span className="text-leadhunter-teal">Vendas</span> com Inteligência Artificial
             </h1>
             
             <p className="font-inter text-lg md:text-xl text-white/80 max-w-xl">
               Automatize sua prospecção, qualifique leads automaticamente e feche mais negócios com nossa plataforma de vendas inteligente.
             </p>
             
             <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
               <Button 
                 size="lg" 
                 className="bg-leadhunter-teal hover:bg-leadhunter-teal/90 text-white font-semibold px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all"
                 asChild
               >
                 <Link to="/login">
                   Comece Grátis <ArrowRight className="ml-2 h-5 w-5" />
                 </Link>
               </Button>
               
               <Button 
                 size="lg" 
                 variant="outline" 
                 className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-lg"
               >
                 <Play className="mr-2 h-5 w-5" /> Ver Demo
               </Button>
             </div>
             
             {/* Stats */}
             <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
               <div className="text-center lg:text-left">
                 <div className="flex items-center justify-center lg:justify-start gap-2">
                   <Users className="h-5 w-5 text-leadhunter-teal" />
                   <span className="font-poppins text-2xl md:text-3xl font-bold text-white">5.000+</span>
                 </div>
                 <p className="text-white/60 text-sm mt-1">Empresas ativas</p>
               </div>
               <div className="text-center lg:text-left">
                 <div className="flex items-center justify-center lg:justify-start gap-2">
                   <TrendingUp className="h-5 w-5 text-leadhunter-teal" />
                   <span className="font-poppins text-2xl md:text-3xl font-bold text-white">300%</span>
                 </div>
                 <p className="text-white/60 text-sm mt-1">Mais conversão</p>
               </div>
               <div className="text-center lg:text-left">
                 <div className="flex items-center justify-center lg:justify-start gap-2">
                   <Target className="h-5 w-5 text-leadhunter-teal" />
                   <span className="font-poppins text-2xl md:text-3xl font-bold text-white">2M+</span>
                 </div>
                 <p className="text-white/60 text-sm mt-1">Leads qualificados</p>
               </div>
             </div>
           </div>
           
           {/* Right Content - Dashboard Preview */}
           <div className="relative hidden lg:block">
             <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-4 shadow-2xl border border-white/20">
               <img 
                 src="/lovable-uploads/039c9c09-384f-4a6e-a325-10972460bfe1.png" 
                 alt="Lead Hunter Pro Dashboard Preview"
                 className="rounded-xl shadow-lg w-full"
               />
               
               {/* Floating Cards */}
               <div className="absolute -left-8 top-1/4 bg-white rounded-lg p-4 shadow-xl animate-fade-in">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-leadhunter-green/20 rounded-full flex items-center justify-center">
                     <TrendingUp className="h-5 w-5 text-leadhunter-green" />
                   </div>
                   <div>
                     <p className="text-xs text-gray-500">Conversão</p>
                     <p className="font-semibold text-leadhunter-blue-dark">+47% hoje</p>
                   </div>
                 </div>
               </div>
               
               <div className="absolute -right-8 bottom-1/4 bg-white rounded-lg p-4 shadow-xl animate-fade-in">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-leadhunter-teal/20 rounded-full flex items-center justify-center">
                     <Target className="h-5 w-5 text-leadhunter-teal" />
                   </div>
                   <div>
                     <p className="text-xs text-gray-500">Leads qualificados</p>
                     <p className="font-semibold text-leadhunter-blue-dark">128 novos</p>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
       
       {/* Scroll Indicator */}
       <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
         <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
           <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
         </div>
       </div>
     </section>
   );
 };