 import { Card, CardContent } from "@/components/ui/card";
 import { Star, Quote, MessageSquare } from "lucide-react";
 import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
 } from "@/components/ui/carousel";
 
 const testimonials = [
   {
     quote: "O Radar Hunter Pro triplicou nossa taxa de conversão em apenas 2 meses! A IA SDR é simplesmente incrível.",
     author: "Maria Silva",
     role: "Diretora Comercial",
     company: "TechCorp",
     rating: 5,
     image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
   },
   {
     quote: "A IA SDR é como ter um time de 10 vendedores trabalhando 24/7. Nossa prospecção nunca foi tão eficiente.",
     author: "Carlos Mendes",
     role: "CEO",
     company: "Agência Digital",
     rating: 5,
     image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
   },
   {
     quote: "Finalmente uma ferramenta que entende o mercado brasileiro. Os dados são precisos e atualizados.",
     author: "Ana Costa",
     role: "Head de Vendas",
     company: "StartupXYZ",
     rating: 5,
     image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
   },
   {
     quote: "Redução de 70% no tempo de prospecção. Impressionante! Minha equipe agora foca só em fechar negócios.",
     author: "Pedro Santos",
     role: "Gerente Comercial",
     company: "ConsultoriaPro",
     rating: 5,
     image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
   },
   {
     quote: "O ROI veio no primeiro mês. Fechamos 3x mais contratos com menos esforço da equipe.",
     author: "Fernanda Lima",
     role: "VP de Vendas",
     company: "GlobalTech",
     rating: 5,
     image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face"
   },
   {
     quote: "A integração com nosso CRM foi perfeita. Os leads chegam qualificados e prontos para abordagem.",
     author: "Ricardo Oliveira",
     role: "Diretor de Operações",
     company: "VendaMais",
     rating: 5,
     image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop&crop=face"
   }
 ];
 
 export const TestimonialsSection = () => {
   return (
     <section className="py-20 radar-bg relative overflow-hidden">
       {/* Grid Background */}
       <div className="absolute inset-0 radar-grid opacity-20" />
       
       <div className="container mx-auto px-4 relative z-10">
         <div className="text-center max-w-3xl mx-auto mb-16">
           <div className="inline-flex items-center gap-2 text-radar-cyan mb-4">
             <MessageSquare className="h-5 w-5 animate-pulse-soft" />
             <span className="font-inter text-sm uppercase tracking-wider">Depoimentos</span>
           </div>
           <h2 className="font-poppins text-3xl md:text-4xl font-bold text-white mb-4">
             O Que Nossos <span className="gradient-text-radar">Clientes Dizem</span>
           </h2>
           <p className="font-inter text-lg text-white/60">
             Mais de 5.000 empresas já transformaram suas vendas com o Radar Hunter Pro.
           </p>
         </div>
         
         <Carousel
           opts={{
             align: "start",
             loop: true,
           }}
           className="w-full max-w-6xl mx-auto"
         >
           <CarouselContent className="-ml-4">
             {testimonials.map((testimonial, index) => (
               <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                 <Card className="card-tech h-full">
                   <CardContent className="p-6 flex flex-col h-full">
                     <Quote className="h-8 w-8 text-radar-cyan mb-4" />
                     
                     <p className="font-inter text-white/80 flex-grow mb-6">
                       "{testimonial.quote}"
                     </p>
                     
                     <div className="flex items-center gap-1 mb-4">
                       {[...Array(testimonial.rating)].map((_, i) => (
                         <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                       ))}
                     </div>
                     
                     <div className="flex items-center gap-3">
                       <img 
                         src={testimonial.image} 
                         alt={testimonial.author}
                         className="w-12 h-12 rounded-full object-cover border-2 border-radar-cyan/30"
                       />
                       <div>
                         <p className="font-poppins font-semibold text-white">
                           {testimonial.author}
                         </p>
                         <p className="font-inter text-sm text-white/50">
                           {testimonial.role}, {testimonial.company}
                         </p>
                       </div>
                     </div>
                   </CardContent>
                 </Card>
               </CarouselItem>
             ))}
           </CarouselContent>
           <CarouselPrevious className="hidden md:flex -left-4 bg-radar-grid border-radar-cyan/30 text-radar-cyan hover:bg-radar-cyan/20" />
           <CarouselNext className="hidden md:flex -right-4 bg-radar-grid border-radar-cyan/30 text-radar-cyan hover:bg-radar-cyan/20" />
         </Carousel>
       </div>
     </section>
   );
 };