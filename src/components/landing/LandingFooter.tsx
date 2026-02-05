 import { Link } from "react-router-dom";
 import { Linkedin, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
 
 export const LandingFooter = () => {
   return (
     <footer className="bg-leadhunter-blue-dark text-white">
       <div className="container mx-auto px-4 py-16">
         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
           {/* Brand */}
           <div className="space-y-4">
             <div className="flex items-center gap-2">
               <img 
                 src="/lovable-uploads/f0e9edb7-59e3-486c-b794-16df510819f5.png" 
                 alt="Lead Hunter Pro" 
                 className="h-10 w-auto"
               />
               <span className="font-poppins font-semibold text-lg">Lead Hunter Pro</span>
             </div>
             <p className="font-inter text-white/70 text-sm">
               A plataforma de vendas com IA mais completa do Brasil. Transforme leads em clientes de forma inteligente e escalável.
             </p>
             <div className="flex gap-4">
               <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                 <Linkedin className="h-5 w-5" />
               </a>
               <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                 <Instagram className="h-5 w-5" />
               </a>
               <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                 <Youtube className="h-5 w-5" />
               </a>
             </div>
           </div>
           
           {/* Product */}
           <div>
             <h4 className="font-poppins font-semibold mb-4">Produto</h4>
             <ul className="space-y-3">
               <li><a href="#" className="font-inter text-white/70 hover:text-white transition-colors text-sm">IA SDR</a></li>
               <li><a href="#" className="font-inter text-white/70 hover:text-white transition-colors text-sm">IA Closer</a></li>
               <li><a href="#" className="font-inter text-white/70 hover:text-white transition-colors text-sm">IA Manager</a></li>
               <li><a href="#" className="font-inter text-white/70 hover:text-white transition-colors text-sm">Busca Inteligente</a></li>
               <li><a href="#precos" className="font-inter text-white/70 hover:text-white transition-colors text-sm">Preços</a></li>
             </ul>
           </div>
           
           {/* Resources */}
           <div>
             <h4 className="font-poppins font-semibold mb-4">Recursos</h4>
             <ul className="space-y-3">
               <li><a href="#" className="font-inter text-white/70 hover:text-white transition-colors text-sm">Blog</a></li>
               <li><a href="#" className="font-inter text-white/70 hover:text-white transition-colors text-sm">Central de Ajuda</a></li>
               <li><a href="#" className="font-inter text-white/70 hover:text-white transition-colors text-sm">API Docs</a></li>
               <li><a href="#" className="font-inter text-white/70 hover:text-white transition-colors text-sm">Status</a></li>
               <li><a href="#" className="font-inter text-white/70 hover:text-white transition-colors text-sm">Integrações</a></li>
             </ul>
           </div>
           
           {/* Contact */}
           <div>
             <h4 className="font-poppins font-semibold mb-4">Contato</h4>
             <ul className="space-y-3">
               <li className="flex items-center gap-2">
                 <Mail className="h-4 w-4 text-leadhunter-teal" />
                 <a href="mailto:contato@leadhunterpro.com.br" className="font-inter text-white/70 hover:text-white transition-colors text-sm">
                   contato@leadhunterpro.com.br
                 </a>
               </li>
               <li className="flex items-center gap-2">
                 <Phone className="h-4 w-4 text-leadhunter-teal" />
                 <a href="tel:+5511999999999" className="font-inter text-white/70 hover:text-white transition-colors text-sm">
                   (11) 99999-9999
                 </a>
               </li>
               <li className="flex items-start gap-2">
                 <MapPin className="h-4 w-4 text-leadhunter-teal mt-0.5" />
                 <span className="font-inter text-white/70 text-sm">
                   São Paulo, SP - Brasil
                 </span>
               </li>
             </ul>
           </div>
         </div>
         
         <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
           <p className="font-inter text-white/50 text-sm">
             © 2024 Lead Hunter Pro. Todos os direitos reservados.
           </p>
           <div className="flex gap-6">
             <a href="#" className="font-inter text-white/50 hover:text-white text-sm transition-colors">
               Termos de Uso
             </a>
             <a href="#" className="font-inter text-white/50 hover:text-white text-sm transition-colors">
               Política de Privacidade
             </a>
             <a href="#" className="font-inter text-white/50 hover:text-white text-sm transition-colors">
               LGPD
             </a>
           </div>
         </div>
       </div>
     </footer>
   );
 };