import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useAuthStore, usePoemStore } from "@/lib/store";
import { useToast } from "@/components/ui/use-toast";

export function PoemComposer() {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, isAuthenticated } = useAuthStore();
  const { addPoem } = usePoemStore();
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!isAuthenticated) {
      toast({
        title: "Giriş Yapmalısınız",
        description: "Şiir paylaşmak için lütfen giriş yapın.",
        variant: "destructive",
      });
      return;
    }

    if (!content.trim()) {
      toast({
        title: "Boş Şiir",
        description: "Lütfen bir şiir yazın.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      addPoem(content);
      setContent("");
      toast({
        title: "Şiir Paylaşıldı",
        description: "Şiiriniz başarıyla paylaşıldı!",
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Şiir paylaşılırken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="mb-6 border-primary/20">
      <CardContent className="pt-6">
        {isAuthenticated ? (
          <div className="flex gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback>{user?.displayName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder="Şiirinizi yazın..."
                className="resize-none min-h-[120px] border-0 focus-visible:ring-0 p-0 text-base"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="mb-2 text-muted-foreground">Şiir paylaşmak için giriş yapmalısınız</p>
            <Button asChild variant="outline">
              <a href="/login">Giriş Yap</a>
            </Button>
          </div>
        )}
      </CardContent>
      {isAuthenticated && (
        <CardFooter className="flex justify-end border-t px-6 py-3">
          <Button 
            onClick={handleSubmit} 
            disabled={!content.trim() || isSubmitting}
          >
            {isSubmitting ? "Paylaşılıyor..." : "Şiiri Paylaş"}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}