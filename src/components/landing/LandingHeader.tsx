 import { Button } from "@/components/ui/button";
 import { Radar, Menu, X } from "lucide-react";
 import { Link } from "react-router-dom";
 import { useState } from "react";
 
 export const LandingHeader = () => {
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
 
   const navLinks = [
     { href: "#beneficios", label: "Benefícios" },
     { href: "#como-funciona", label: "Como Funciona" },
     { href: "#recursos", label: "Recursos" },
     { href: "#precos", label: "Preços" },
   ];
 
   return (
     <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f1c]/80 backdrop-blur-md border-b border-radar-cyan/10">
       <div className="container mx-auto px-4 h-16 flex items-center justify-between">
         {/* Logo */}
         <div className="flex items-center gap-2">
           <Radar className="h-6 w-6 text-radar-cyan" />
           <span className="font-poppins font-bold text-xl gradient-text-radar">RadarHunter Pro</span>
         </div>
         
         {/* Navigation Links - Desktop */}
         <nav className="hidden md:flex items-center gap-8">
           {navLinks.map((link) => (
             <a 
               key={link.href}
               href={link.href} 
               className="text-white/70 hover:text-white transition-colors duration-200"
             >
               {link.label}
             </a>
           ))}
         </nav>
         
         {/* CTA Button - Desktop */}
         <Button className="hidden md:inline-flex btn-radar" asChild>
           <Link to="/login">Acessar</Link>
         </Button>
 
         {/* Mobile Menu Button */}
         <button
           className="md:hidden text-white p-2"
           onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
         >
           {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
         </button>
       </div>
 
       {/* Mobile Menu */}
       {mobileMenuOpen && (
         <div className="md:hidden bg-[#0a0f1c]/95 backdrop-blur-md border-t border-radar-cyan/10">
           <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
             {navLinks.map((link) => (
               <a 
                 key={link.href}
                 href={link.href} 
                 className="text-white/70 hover:text-white transition-colors duration-200 py-2"
                 onClick={() => setMobileMenuOpen(false)}
               >
                 {link.label}
               </a>
             ))}
             <Button className="btn-radar w-full mt-2" asChild>
               <Link to="/login">Acessar</Link>
             </Button>
           </nav>
         </div>
       )}
     </header>
   );
 };