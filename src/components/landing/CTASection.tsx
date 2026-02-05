 import { Button } from "@/components/ui/button";
 import { ArrowRight, Shield, Clock, CreditCard } from "lucide-react";
 import { Link } from "react-router-dom";
 
 export const CTASection = () => {
   return (
     <section className="py-20 bg-gradient-to-r from-leadhunter-blue to-leadhunter-teal">
       <div className="container mx-auto px-4">
         <div className="max-w-4xl mx-auto text-center">
           <h2 className="font-poppins text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
             Pronto Para Transformar Suas Vendas?
           </h2>
           
           <p className="font-inter text-xl text-white/90 mb-8 max-w-2xl mx-auto">
             Junte-se a mais de 5.000 empresas que já estão fechando mais negócios com o Lead Hunter Pro.
           </p>
           
           <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
             <Button 
               size="lg" 
               className="bg-white text-leadhunter-blue hover:bg-white/90 font-semibold px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all"
               asChild
             >
               <Link to="/login">
                 Comece Grátis Agora <ArrowRight className="ml-2 h-5 w-5" />
               </Link>
             </Button>
             
             <Button 
               size="lg" 
               variant="outline" 
               className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-lg"
             >
               Agendar Demonstração
             </Button>
           </div>
           
           <div className="flex flex-wrap justify-center gap-8 text-white/80">
             <div className="flex items-center gap-2">
               <Clock className="h-5 w-5" />
               <span className="font-inter text-sm">Setup em 5 minutos</span>
             </div>
             <div className="flex items-center gap-2">
               <CreditCard className="h-5 w-5" />
               <span className="font-inter text-sm">Sem cartão de crédito</span>
             </div>
             <div className="flex items-center gap-2">
               <Shield className="h-5 w-5" />
               <span className="font-inter text-sm">7 dias grátis</span>
             </div>
           </div>
         </div>
       </div>
     </section>
   );
 };