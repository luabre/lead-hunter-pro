 import { Link } from "react-router-dom";
 import { Linkedin, Instagram, Youtube, Mail, Phone, MapPin, Radar } from "lucide-react";
 
 export const LandingFooter = () => {
   return (
     <footer className="radar-bg relative overflow-hidden border-t border-radar-grid">
       {/* Grid Background */}
       <div className="absolute inset-0 radar-grid opacity-10" />
       
       <div className="container mx-auto px-4 py-16 relative z-10">
         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
           {/* Brand */}
           <div className="space-y-4">
             <div className="flex items-center gap-2">
               <div className="w-10 h-10 bg-gradient-to-br from-radar-cyan to-radar-indigo rounded-lg flex items-center justify-center">
                 <Radar className="h-6 w-6 text-white" />
               </div>
                <span className="font-poppins font-semibold text-lg text-white">RadarHunter Pro</span>
             </div>
             <p className="font-inter text-white/50 text-sm">
               A plataforma de vendas com IA mais completa do Brasil. Detecte leads com precisão de radar.
             </p>
             <div className="flex gap-4">
               <a href="#" className="w-10 h-10 bg-radar-grid rounded-full flex items-center justify-center hover:bg-radar-cyan/20 transition-colors border border-radar-cyan/20">
                 <Linkedin className="h-5 w-5 text-radar-cyan" />
               </a>
               <a href="#" className="w-10 h-10 bg-radar-grid rounded-full flex items-center justify-center hover:bg-radar-cyan/20 transition-colors border border-radar-cyan/20">
                 <Instagram className="h-5 w-5 text-radar-cyan" />
               </a>
               <a href="#" className="w-10 h-10 bg-radar-grid rounded-full flex items-center justify-center hover:bg-radar-cyan/20 transition-colors border border-radar-cyan/20">
                 <Youtube className="h-5 w-5 text-radar-cyan" />
               </a>
             </div>
           </div>
           
           {/* Product */}
           <div>
             <h4 className="font-poppins font-semibold mb-4 text-white">Produto</h4>
             <ul className="space-y-3">
               <li><a href="#" className="font-inter text-white/50 hover:text-radar-cyan transition-colors text-sm">IA SDR</a></li>
               <li><a href="#" className="font-inter text-white/50 hover:text-radar-cyan transition-colors text-sm">IA Closer</a></li>
               <li><a href="#" className="font-inter text-white/50 hover:text-radar-cyan transition-colors text-sm">IA Manager</a></li>
               <li><a href="#" className="font-inter text-white/50 hover:text-radar-cyan transition-colors text-sm">Busca Inteligente</a></li>
               <li><a href="#precos" className="font-inter text-white/50 hover:text-radar-cyan transition-colors text-sm">Preços</a></li>
             </ul>
           </div>
           
           {/* Resources */}
           <div>
             <h4 className="font-poppins font-semibold mb-4 text-white">Recursos</h4>
             <ul className="space-y-3">
               <li><a href="#" className="font-inter text-white/50 hover:text-radar-cyan transition-colors text-sm">Blog</a></li>
               <li><a href="#" className="font-inter text-white/50 hover:text-radar-cyan transition-colors text-sm">Central de Ajuda</a></li>
               <li><a href="#" className="font-inter text-white/50 hover:text-radar-cyan transition-colors text-sm">API Docs</a></li>
               <li><a href="#" className="font-inter text-white/50 hover:text-radar-cyan transition-colors text-sm">Status</a></li>
               <li><a href="#" className="font-inter text-white/50 hover:text-radar-cyan transition-colors text-sm">Integrações</a></li>
             </ul>
           </div>
           
           {/* Contact */}
           <div>
             <h4 className="font-poppins font-semibold mb-4 text-white">Contato</h4>
             <ul className="space-y-3">
               <li className="flex items-center gap-2">
                 <Mail className="h-4 w-4 text-radar-cyan" />
                 <a href="mailto:contato@radarhunterpro.com.br" className="font-inter text-white/50 hover:text-radar-cyan transition-colors text-sm">
                   contato@radarhunterpro.com.br
                 </a>
               </li>
               <li className="flex items-center gap-2">
                 <Phone className="h-4 w-4 text-radar-cyan" />
                 <a href="tel:+5511999999999" className="font-inter text-white/50 hover:text-radar-cyan transition-colors text-sm">
                   (11) 99999-9999
                 </a>
               </li>
               <li className="flex items-start gap-2">
                 <MapPin className="h-4 w-4 text-radar-cyan mt-0.5" />
                 <span className="font-inter text-white/50 text-sm">
                   São Paulo, SP - Brasil
                 </span>
               </li>
             </ul>
           </div>
         </div>
         
         <div className="border-t border-radar-grid mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
           <p className="font-inter text-white/40 text-sm">
              © 2024 RadarHunter Pro. Todos os direitos reservados.
           </p>
           <div className="flex gap-6">
             <a href="#" className="font-inter text-white/40 hover:text-radar-cyan text-sm transition-colors">
               Termos de Uso
             </a>
             <a href="#" className="font-inter text-white/40 hover:text-radar-cyan text-sm transition-colors">
               Política de Privacidade
             </a>
             <a href="#" className="font-inter text-white/40 hover:text-radar-cyan text-sm transition-colors">
               LGPD
             </a>
           </div>
         </div>
       </div>
     </footer>
   );
 };