
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, Plus, Wand2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Define the form schema
const formSchema = z.object({
  name: z.string().min(1, { message: "Nome obrigatório" }),
  fantasyName: z.string(),
  website: z.string(),
  cnpj: z.string(),
  city: z.string(),
  state: z.string(),
  segment: z.string(),
  employees: z.string(),
  companyType: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

interface AddCompanyDialogProps {
  onAddCompany: (company: any) => void;
}

const AddCompanyDialog = ({ onAddCompany }: AddCompanyDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isEnriching, setIsEnriching] = useState(false);
  
  // Mock current user - in a real app, this would come from authentication
  const currentUser = {
    email: "joao.sdr@empresa.com",
    name: "João Silva"
  };
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      fantasyName: "",
      website: "",
      cnpj: "",
      city: "",
      state: "",
      segment: "",
      employees: "",
      companyType: "",
    },
  });

  const handleEnrichData = async () => {
    const nameOrWebsite = form.getValues("name") || form.getValues("website");
    
    if (!nameOrWebsite) {
      toast({
        title: "Informação insuficiente",
        description: "Informe pelo menos o nome da empresa ou o website para enriquecimento.",
        variant: "destructive",
      });
      return;
    }

    setIsEnriching(true);

    try {
      // Simulate AI enrichment with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock enrichment data based on input
      const companyName = form.getValues("name");
      const mockEnrichment = {
        fantasyName: companyName ? `${companyName.split(' ')[0]}` : "Nome Fantasia",
        cnpj: "12.345.678/0001-99",
        city: "São Paulo",
        state: "SP",
        segment: "Tecnologia",
        employees: "50-100",
        companyType: "LTDA",
      };
      
      // Update form with enriched data
      Object.entries(mockEnrichment).forEach(([key, value]) => {
        if (!form.getValues(key as keyof FormValues)) {
          form.setValue(key as keyof FormValues, value as string);
        }
      });
      
      toast({
        title: "Dados enriquecidos",
        description: "A IA enriqueceu os dados da empresa com base nas informações fornecidas.",
      });
    } catch (error) {
      toast({
        title: "Erro ao enriquecer dados",
        description: "Não foi possível enriquecer os dados. Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsEnriching(false);
    }
  };

  const onSubmit = (data: FormValues) => {
    // Get current date and time in ISO format
    const now = new Date().toISOString();
    
    // Create a new company with the form data and creator information
    const newCompany = {
      id: Math.random().toString(36).substring(2, 9),
      ...data,
      opportunity: "warm" as const,
      aiDetected: false,
      // Add creator information with proper field names
      creator: {
        email: currentUser.email,
        name: currentUser.name,
        origin: "manual",
        createdAt: now,
      }
    };

    onAddCompany(newCompany);
    setOpen(false);
    form.reset();
    
    toast({
      title: "Empresa adicionada",
      description: "A empresa foi adicionada com sucesso e registrada como sua inserção manual.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Empresa
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Adicionar Empresa Manualmente</DialogTitle>
          <DialogDescription>
            Insira os dados básicos da empresa. Utilize o botão "Enriquecer com IA" para completar automaticamente.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 col-span-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="name">Nome da Empresa</Label>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={handleEnrichData}
                    disabled={isEnriching}
                  >
                    {isEnriching ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        <span>Enriquecendo...</span>
                      </>
                    ) : (
                      <>
                        <Wand2 className="mr-2 h-4 w-4" />
                        <span>Enriquecer com IA</span>
                      </>
                    )}
                  </Button>
                </div>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Insira o nome da empresa" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="fantasyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Fantasia</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome fantasia" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input placeholder="www.empresa.com.br" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="cnpj"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CNPJ</FormLabel>
                    <FormControl>
                      <Input placeholder="XX.XXX.XXX/0001-XX" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="segment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Segmento</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Tecnologia, Saúde" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="companyType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Empresa</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: LTDA, S.A., MEI" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cidade</FormLabel>
                    <FormControl>
                      <Input placeholder="Cidade" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <FormControl>
                      <Input placeholder="UF" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="employees"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Funcionários</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 50-100" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">Adicionar Empresa</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCompanyDialog;
