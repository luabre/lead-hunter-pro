
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, ThumbsUp, MessageSquare, Share2 } from 'lucide-react';

interface SocialPost {
  id: string;
  title: string;
  date: string;
  type: 'article' | 'post' | 'share';
  engagement: number;
  url: string;
}

interface SocialActivityProps {
  posts: SocialPost[];
  engagementScore: number;
  onActivateSocialSelling?: () => void;
}

const SocialActivity = ({ posts, engagementScore, onActivateSocialSelling }: SocialActivityProps) => {
  const getAiSuggestion = () => {
    if (posts.length === 0) return null;
    
    // This would be more sophisticated in production with real AI
    const suggestedPost = posts[0];
    return (
      <div className="mt-4 bg-blue-50 p-3 rounded-lg border border-blue-100">
        <p className="text-sm font-medium flex items-center gap-1 text-blue-800">
          <span className="text-xl">🧠</span> Dica da IA:
        </p>
        <p className="text-sm text-blue-700 mt-1">
          "Comece curtindo o post sobre {suggestedPost.title.toLowerCase()}"
        </p>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Badge className="bg-green-600 text-white">🟢 Socialmente ativo</Badge>
          <span className="text-sm text-muted-foreground">
            Engajamento médio: <span className="font-medium">{engagementScore}/100</span>
          </span>
        </div>
        <Button 
          onClick={onActivateSocialSelling} 
          className="bg-blue-600 hover:bg-blue-700"
        >
          Ativar Social Selling
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Últimas atividades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {posts.map(post => (
              <div key={post.id} className="border-b pb-3 last:border-0 last:pb-0">
                <div className="flex justify-between">
                  <h4 className="font-medium text-sm">{post.title}</h4>
                  <Badge variant="outline" className="text-xs">
                    {post.type === 'article' ? 'Artigo' : 
                     post.type === 'post' ? 'Post' : 'Compartilhamento'}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Publicado em {post.date}
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1 text-xs">
                    <ThumbsUp className="h-3 w-3" /> 
                    <span>{Math.floor(post.engagement * 0.6)}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <MessageSquare className="h-3 w-3" /> 
                    <span>{Math.floor(post.engagement * 0.3)}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <Share2 className="h-3 w-3" /> 
                    <span>{Math.floor(post.engagement * 0.1)}</span>
                  </div>
                  <a 
                    href={post.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 text-xs ml-auto flex items-center gap-1 hover:underline"
                  >
                    Ver post <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          {getAiSuggestion()}
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialActivity;
