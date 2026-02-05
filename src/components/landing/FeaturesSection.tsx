 import { Card, CardContent } from "@/components/ui/card";
 import { 
   Globe, 
   Filter, 
   Zap, 
   Shield, 
   Smartphone, 
   RefreshCw,
   Database,
   Mail,
   Calendar,
   PieChart,
   Lock,
   Headphones
 } from "lucide-react";
 
 const features = [
   { icon: Globe, title: "Busca em todo Brasil", description: "Acesse milhões de empresas ativas" },
   { icon: Filter, title: "Filtros Avançados", description: "Segmente por CNAE, porte, região" },
   { icon: Zap, title: "Enriquecimento de Dados", description: "Emails, telefones e decisores" },
   { icon: Shield, title: "Conformidade LGPD", description: "100% adequado à legislação" },
   { icon: Smartphone, title: "Integração WhatsApp", description: "Disparo direto via API oficial" },
   { icon: RefreshCw, title: "Sync CRM", description: "Integre com Salesforce, Pipedrive" },
   { icon: Database, title: "Base Atualizada", description: "Dados verificados diariamente" },
   { icon: Mail, title: "Email Marketing", description: "Sequências automatizadas" },
   { icon: Calendar, title: "Agendamento", description: "Reuniões direto na agenda" },
   { icon: PieChart, title: "Relatórios", description: "Dashboards customizáveis" },
   { icon: Lock, title: "Segurança", description: "Criptografia de ponta a ponta" },
   { icon: Headphones, title: "Suporte Premium", description: "Atendimento humanizado" }
 ];
 
 export const FeaturesSection = () => {
   return (
     <section className="py-20 bg-leadhunter-gray">
       <div className="container mx-auto px-4">
         <div className="text-center max-w-3xl mx-auto mb-16">
           <h2 className="font-poppins text-3xl md:text-4xl font-bold text-leadhunter-blue-dark mb-4">
             Recursos Poderosos
           </h2>
           <p className="font-inter text-lg text-gray-600">
             Tudo que você precisa para dominar seu mercado em uma única plataforma.
           </p>
         </div>
         
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
           {features.map((feature, index) => (
             <Card 
               key={index}
               className="bg-white border-none shadow-sm hover:shadow-md transition-all duration-200 group"
             >
               <CardContent className="p-4 flex items-start gap-3">
                 <div className="w-10 h-10 bg-leadhunter-blue/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-leadhunter-blue/20 transition-colors">
                   <feature.icon className="h-5 w-5 text-leadhunter-blue" />
                 </div>
                 <div>
                   <h4 className="font-poppins font-semibold text-sm text-leadhunter-blue-dark">
                     {feature.title}
                   </h4>
                   <p className="font-inter text-xs text-gray-500 mt-0.5">
                     {feature.description}
                   </p>
                 </div>
               </CardContent>
             </Card>
           ))}
         </div>
       </div>
     </section>
   );
 };