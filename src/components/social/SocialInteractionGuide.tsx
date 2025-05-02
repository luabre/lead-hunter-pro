
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Check, 
  Clock, 
  ThumbsUp, 
  MessageSquare, 
  UserPlus, 
  Calendar 
} from 'lucide-react';

interface InteractionStep {
  id: string;
  title: string;
  description: string;
  type: 'like' | 'comment' | 'connect' | 'message';
  completed: boolean;
  scheduled?: Date | null;
  url?: string;
}

interface SocialInteractionGuideProps {
  contactName: string;
  steps: InteractionStep[];
  onComplete: (stepId: string) => void;
  onSchedule: (stepId: string) => void;
}

const SocialInteractionGuide = ({ 
  contactName, 
  steps, 
  onComplete, 
  onSchedule 
}: SocialInteractionGuideProps) => {
  const [activeStepId, setActiveStepId] = useState<string | null>(
    steps.find(step => !step.completed)?.id || null
  );
  
  const getStepIcon = (type: string) => {
    switch (type) {
      case 'like': return <ThumbsUp className="h-4 w-4" />;
      case 'comment': return <MessageSquare className="h-4 w-4" />;
      case 'connect': return <UserPlus className="h-4 w-4" />;
      case 'message': return <MessageSquare className="h-4 w-4" />;
      default: return null;
    }
  };
  
  const getStepAction = (type: string) => {
    switch (type) {
      case 'like': return 'Curtir';
      case 'comment': return 'Comentar';
      case 'connect': return 'Conectar';
      case 'message': return 'Mensagem';
      default: return 'Ação';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Roteiro de Interação Social</CardTitle>
        <CardDescription>
          Estratégia personalizada para engajar {contactName}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div 
              key={step.id}
              className={`p-4 border rounded-lg transition-all ${
                step.completed 
                  ? 'bg-green-50 border-green-100' 
                  : activeStepId === step.id
                  ? 'bg-blue-50 border-blue-100 shadow-sm'
                  : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  step.completed 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step.completed ? <Check className="h-4 w-4" /> : (index + 1)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{step.title}</h4>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100">
                      {getStepAction(step.type)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mt-1">
                    {step.description}
                  </p>
                  
                  {step.url && !step.completed && (
                    <a 
                      href={step.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-600 text-sm mt-2 inline-block hover:underline"
                    >
                      Abrir link
                    </a>
                  )}
                  
                  {!step.completed && activeStepId === step.id && (
                    <div className="flex gap-2 mt-3">
                      <Button 
                        size="sm"
                        onClick={() => onComplete(step.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Check className="h-4 w-4 mr-1" /> Concluído
                      </Button>
                      <Button 
                        size="sm"
                        variant="outline"
                        onClick={() => onSchedule(step.id)}
                      >
                        <Clock className="h-4 w-4 mr-1" /> Agendar
                      </Button>
                    </div>
                  )}
                  
                  {step.scheduled && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                      <Calendar className="h-3 w-3" />
                      <span>Agendado para {step.scheduled.toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          <div className="mt-4">
            <div className="text-center text-sm text-muted-foreground">
              <span className="inline-block bg-leadhunter-teal text-white px-2 py-1 rounded-md text-xs mb-2">
                IA LeadHunter Pro
              </span>
              <p>
                Esta estratégia foi personalizada com base no perfil 
                do decisor e nos padrões de engajamento do setor.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialInteractionGuide;
