 import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
 } from "@/components/ui/accordion";
 import { HelpCircle } from "lucide-react";
 
 const faqs = [
   {
     question: "Como funciona o período de teste gratuito?",
     answer: "Você tem acesso completo a todas as funcionalidades do plano escolhido por 7 dias, sem precisar de cartão de crédito. Ao final do período, você pode escolher continuar com um plano pago ou cancelar sem custos."
   },
   {
     question: "Os dados são atualizados com que frequência?",
     answer: "Nossa base de dados de empresas é atualizada diariamente com informações da Receita Federal e outras fontes oficiais. Isso garante que você sempre tenha acesso a dados precisos e confiáveis."
   },
   {
     question: "A plataforma está em conformidade com a LGPD?",
     answer: "Sim! O Radar Hunter Pro foi desenvolvido 100% em conformidade com a LGPD. Todos os dados são tratados de forma segura, e oferecemos ferramentas para gestão de consentimento e opt-out."
   },
   {
     question: "Posso integrar com meu CRM atual?",
     answer: "Sim, oferecemos integrações nativas com Salesforce, Pipedrive, HubSpot, RD Station e outros. Também disponibilizamos API completa para integrações customizadas."
   },
   {
     question: "Como funciona a IA SDR?",
     answer: "Nossa IA SDR atua como um representante de vendas virtual. Ela identifica leads qualificados, personaliza abordagens, envia mensagens automatizadas e agenda reuniões - tudo de forma autônoma e escalável."
   },
   {
     question: "Qual é o SLA de suporte?",
     answer: "Clientes Starter têm suporte por email com resposta em até 24h. Professional conta com suporte prioritário via chat com resposta em até 4h. Enterprise tem gerente de sucesso dedicado e SLA personalizado."
   },
   {
     question: "Posso cancelar a qualquer momento?",
     answer: "Sim! Não temos fidelidade. Você pode cancelar sua assinatura a qualquer momento diretamente pelo painel. O acesso continua até o final do período pago."
   },
   {
     question: "Vocês oferecem treinamento?",
     answer: "Todos os planos incluem acesso à nossa base de conhecimento e tutoriais em vídeo. Planos Professional e Enterprise contam com onboarding guiado e treinamentos personalizados."
   }
 ];
 
 export const FAQSection = () => {
   return (
     <section className="py-20 radar-bg relative overflow-hidden">
       {/* Grid Background */}
       <div className="absolute inset-0 radar-grid opacity-20" />
       
       <div className="container mx-auto px-4 relative z-10">
         <div className="text-center max-w-3xl mx-auto mb-16">
           <div className="inline-flex items-center gap-2 text-radar-cyan mb-4">
             <HelpCircle className="h-5 w-5 animate-pulse-soft" />
             <span className="font-inter text-sm uppercase tracking-wider">FAQ</span>
           </div>
           <h2 className="font-poppins text-3xl md:text-4xl font-bold text-white mb-4">
             Perguntas <span className="gradient-text-radar">Frequentes</span>
           </h2>
           <p className="font-inter text-lg text-white/60">
             Tire suas dúvidas sobre o Radar Hunter Pro.
           </p>
         </div>
         
         <div className="max-w-3xl mx-auto">
           <Accordion type="single" collapsible className="space-y-4">
             {faqs.map((faq, index) => (
               <AccordionItem 
                 key={index} 
                 value={`item-${index}`}
                 className="card-tech rounded-lg px-6"
               >
                 <AccordionTrigger className="font-poppins font-semibold text-left text-white hover:text-radar-cyan hover:no-underline">
                   {faq.question}
                 </AccordionTrigger>
                 <AccordionContent className="font-inter text-white/60">
                   {faq.answer}
                 </AccordionContent>
               </AccordionItem>
             ))}
           </Accordion>
         </div>
       </div>
     </section>
   );
 };