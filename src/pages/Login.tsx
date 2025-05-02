
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

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

    // This is just a placeholder for demonstration - replace with actual auth
    setTimeout(() => {
      // Simulating successful login for demonstration
      toast({
        title: "Login bem-sucedido",
        description: "Redirecionando para o dashboard...",
      });
      onLoginSuccess();
      navigate("/");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side with login form */}
      <div className="w-full md:w-6/12 flex flex-col p-6 md:p-10 justify-center">
        <div className="mb-8">
          <h1 className="font-bold text-2xl text-blue-600">LeadHunter Pro</h1>
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

      {/* Right side with illustration and tagline */}
      <div className="hidden md:flex w-6/12 flex-col bg-blue-50 p-10 justify-between">
        <div className="mt-8">
          <h1 className="font-bold text-2xl text-blue-600">LeadHunter Pro</h1>
        </div>
        <div className="flex flex-col items-start">
          <img 
            src="/lovable-uploads/17b4a589-6394-459b-b81d-18b299c5042f.png" 
            alt="Ilustração de prospecção inteligente" 
            className="max-w-[80%] mx-auto mb-8"
          />
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 max-w-md">
            Inteligência comercial em ação.
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-md mt-2">
            Acesse sua conta e comece a caçar oportunidades.
          </p>
        </div>
        <div className="opacity-0">Placeholder para espaçamento</div>
      </div>
    </div>
  );
};

export default Login;
