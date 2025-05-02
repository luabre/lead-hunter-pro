
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
import { enrichCompanyWithGPT, EnrichedCompanyData } from "@/utils/companyEnrichment";

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
  digitalPresence: z.string().optional(),
  revenue: z.string().optional(),
  decisionMakerName: z.string().optional(),
  decisionMakerPosition: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface AddCompanyDialogProps {
  onAddCompany: (company: any) => void;
}

const AddCompanyDialog = ({ onAddCompany }: AddCompanyDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isEnriching, setIsEnriching] = useState(false);
  const [enrichmentData, setEnrichmentData] = useState<EnrichedCompanyData | null>(null);
  
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
      digitalPresence: "",
      revenue: "",
      decisionMakerName: "",
      decisionMakerPosition: "",
    },
  });

  const handleEnrichData = async () => {
    const companyName = form.getValues("name");
    const city = form.getValues("city");
    const segment = form.getValues("segment");
    
    if (!companyName) {
      toast({
        title: "Informação insuficiente",
        description: "Informe pelo menos o nome da empresa para enriquecimento.",
        variant: "destructive",
      });
      return;
    }

    setIsEnriching(true);
    setEnrichmentData(null);

    try {
      const enrichedData = await enrichCompanyWithGPT(companyName, city, segment);
      
      if (enrichedData) {
        setEnrichmentData(enrichedData);
        
        // Update form with enriched data
        if (enrichedData.website) 
          form.setValue("website", enrichedData.website);
          
        if (enrichedData.companyType) 
          form.setValue("companyType", enrichedData.companyType);
          
        if (enrichedData.employees) 
          form.setValue("employees", enrichedData.employees);
          
        if (enrichedData.digitalPresence) 
          form.setValue("digitalPresence", enrichedData.digitalPresence);
          
        if (enrichedData.revenue) 
          form.setValue("revenue", enrichedData.revenue);
          
        if (enrichedData.decisionMaker?.name) 
          form.setValue("decisionMakerName", enrichedData.decisionMaker.name);
          
        if (enrichedData.decisionMaker?.position) 
          form.setValue("decisionMakerPosition", enrichedData.decisionMaker.position);
          
        // Set fantasy name if it's not already set
        if (!form.getValues("fantasyName") && companyName) {
          // Extract potential fantasy name from the company name
          const parts = companyName.split(' ');
          if (parts.length > 1) {
            form.setValue("fantasyName", parts[0]);
          } else {
            form.setValue("fantasyName", companyName);
          }
        }
        
        toast({
          title: "Dados enriquecidos",
          description: "A IA enriqueceu os dados da empresa com base nas informações fornecidas.",
        });
      }
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
      aiDetected: !!enrichmentData, // Mark as AI-detected if enrichment was used
      // Add creator information with proper field names
      creator: {
        email: currentUser.email,
        name: currentUser.name,
        origin: "manual",
        createdAt: now,
      },
      // Add additional enriched data if available
      ...(enrichmentData?.opportunitySignals && { 
        opportunitySignals: enrichmentData.opportunitySignals 
      }),
      ...(enrichmentData?.observations && { 
        observations: enrichmentData.observations 
      }),
      ...(enrichmentData?.recommendedChannels && { 
        recommendedChannels: enrichmentData.recommendedChannels 
      }),
    };

    onAddCompany(newCompany);
    setOpen(false);
    form.reset();
    setEnrichmentData(null);
    
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

              <FormField
                control={form.control}
                name="revenue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Faturamento Estimado</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: R$ 1-5 milhões/ano" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="digitalPresence"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Presença Digital</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Alta, Média, Baixa" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="decisionMakerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Decisor</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: João Silva" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="decisionMakerPosition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cargo do Decisor</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Diretor de Tecnologia" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {enrichmentData?.opportunitySignals && enrichmentData.opportunitySignals.length > 0 && (
              <div>
                <Label>Sinais de Oportunidade Detectados</Label>
                <p className="mt-1 text-sm text-muted-foreground">
                  {enrichmentData.opportunitySignals.join(', ')}
                </p>
              </div>
            )}

            {enrichmentData?.recommendedChannels && enrichmentData.recommendedChannels.length > 0 && (
              <div>
                <Label>Canais Recomendados</Label>
                <p className="mt-1 text-sm text-muted-foreground">
                  {enrichmentData.recommendedChannels.join(', ')}
                </p>
              </div>
            )}

            {enrichmentData?.observations && (
              <div>
                <Label>Observações Relevantes</Label>
                <p className="mt-1 text-sm text-muted-foreground">
                  {enrichmentData.observations}
                </p>
              </div>
            )}
            
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
