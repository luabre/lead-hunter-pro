
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login = ({ onLoginSuccess }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validações básicas
      if (!email.trim()) {
        toast({ 
          title: "Campo obrigatório", 
          description: "Por favor, informe seu e-mail." 
        });
        setIsLoading(false);
        return;
      }

      if (!password) {
        toast({ 
          title: "Campo obrigatório", 
          description: "Por favor, informe sua senha." 
        });
        setIsLoading(false);
        return;
      }

      // Attempt to login with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error("Erro ao fazer login:", error);
        
        // Specific error handling for common cases
        if (error.message.includes("Invalid login")) {
          toast({
            title: "Credenciais inválidas",
            description: "Email ou senha incorretos. Por favor, tente novamente.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Erro ao fazer login",
            description: error.message || "Verifique suas credenciais e tente novamente.",
            variant: "destructive",
          });
        }
        setIsLoading(false);
        return;
      }

      // Successful login
      localStorage.setItem('isAuthenticated', 'true');
      
      toast({
        title: "Login bem-sucedido",
        description: "Redirecionando para o dashboard...",
      });
      
      onLoginSuccess();
      navigate("/", { replace: true });
    } catch (error: any) {
      console.error("Erro ao fazer login:", error);
      toast({
        title: "Erro ao fazer login",
        description: "Verifique suas credenciais e tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // For demo purposes - allow quick login
  const handleDemoLogin = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      localStorage.setItem('isAuthenticated', 'true');
      toast({
        title: "Login de demonstração",
        description: "Você está entrando no modo demonstração.",
      });
      onLoginSuccess();
      navigate("/", { replace: true });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side with login form - now with white background */}
      <div className="w-full md:w-6/12 flex flex-col p-6 md:p-10 justify-center bg-white">
        <div className="mb-8">
          <img 
            src="/lovable-uploads/039c9c09-384f-4a6e-a325-10972460bfe1.png" 
            alt="LeadHunter Pro Logo" 
            className="h-12 mb-3"
          />
          <p className="text-gray-700 mt-2">
            Inteligência comercial em ação. Acesse sua conta e comece a caçar oportunidades.
          </p>
        </div>

        <div className="max-w-md w-full mx-auto">
          <h2 className="text-2xl font-bold mb-6">Login</h2>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input 
                id="email"
                type="email" 
                placeholder="seu@email.com" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input 
                id="password"
                type="password" 
                placeholder="********" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
          
          <div className="mt-4">
            <Button 
              type="button" 
              variant="outline" 
              className="w-full mt-2" 
              onClick={handleDemoLogin}
              disabled={isLoading}
            >
              Entrar no modo demonstração
            </Button>
          </div>
          
          <div className="flex justify-between text-sm mt-4">
            <button 
              className="text-blue-600 hover:underline"
              onClick={() => toast({
                title: "Funcionalidade em desenvolvimento",
                description: "A recuperação de senha será implementada em breve.",
              })}
            >
              Esqueci minha senha
            </button>
            
            <button 
              className="text-blue-600 hover:underline"
              onClick={() => toast({
                title: "Funcionalidade em desenvolvimento",
                description: "A criação de conta será implementada em breve.",
              })}
            >
              Criar conta
            </button>
          </div>

          <div className="mt-12">
            <p className="text-xs text-gray-500 mb-4">
              Este sistema utiliza cookies e tecnologias similares para otimizar sua 
              navegação e proteger seus dados. Saiba mais em nossa Política de Privacidade.
            </p>
            
            <div className="flex justify-center text-xs text-gray-500 space-x-4">
              <a href="#" className="hover:text-blue-600 hover:underline">Política de Privacidade</a>
              <a href="#" className="hover:text-blue-600 hover:underline">Termos de Uso</a>
            </div>
          </div>
        </div>
      </div>

      {/* Right side with better illustration */}
      <div className="hidden md:flex w-6/12 flex-col bg-blue-50 p-10 justify-between">
        <div className="flex flex-col items-start h-full justify-center">
          <img 
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80" 
            alt="Ilustração de ambiente de trabalho moderno" 
            className="max-w-[90%] rounded-xl shadow-lg mx-auto mb-8"
          />
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 max-w-md">
            Inteligência comercial em ação.
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-md mt-2">
            Acesse sua conta e comece a caçar oportunidades.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
