import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { useAuthStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

export default function Settings() {
  const { user, isAuthenticated } = useAuthStore();
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");

  const handleSave = () => {
    // In a real application, we would update the user in the database
    // For now, just show a success toast
    toast.success("Profil güncellendi!");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-background pb-16 md:pb-0">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Giriş yapmanız gerekiyor</CardTitle>
              <CardDescription>
                Bu sayfayı görüntülemek için lütfen giriş yapın.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" asChild>
                <a href="/login">Giriş Yap</a>
              </Button>
            </CardContent>
          </Card>
        </main>
        <MobileNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background pb-16 md:pb-0">
      <Navbar />
      <main className="flex-1">
        <div className="container max-w-3xl mx-auto py-6 px-4 sm:px-6">
          <h1 className="text-3xl font-bold mb-6">Ayarlar</h1>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Profil</CardTitle>
              <CardDescription>Profil bilgilerinizi güncelleyin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center mb-6">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={avatar} />
                  <AvatarFallback>{user?.displayName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-2 w-full max-w-sm">
                  <Label htmlFor="avatar">Profil Resmi URL</Label>
                  <Input 
                    id="avatar" 
                    value={avatar} 
                    onChange={(e) => setAvatar(e.target.value)}
                    placeholder="https://example.com/avatar.png"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="displayName">Görünen Ad</Label>
                <Input 
                  id="displayName" 
                  value={displayName} 
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="username">Kullanıcı Adı</Label>
                <Input 
                  id="username" 
                  value={user?.username} 
                  disabled
                />
                <p className="text-xs text-muted-foreground">
                  Kullanıcı adı değiştirilemez.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Biyografi</Label>
                <Textarea 
                  id="bio" 
                  value={bio} 
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Kendiniz hakkında bir şeyler yazın..."
                  className="min-h-[100px]"
                />
              </div>
              
              <Button onClick={handleSave}>Değişiklikleri Kaydet</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Hesap</CardTitle>
              <CardDescription>Hesap ayarlarınızı yönetin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">E-posta</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value="kullanici@example.com"
                  disabled
                />
                <p className="text-xs text-muted-foreground">
                  Demo sürümünde e-posta değiştirilemez.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Şifre</Label>
                <Button variant="outline" className="w-full justify-start">
                  Şifremi Değiştir
                </Button>
              </div>
              
              <Button variant="destructive">Hesabımı Sil</Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <MobileNav />
    </div>
  );
}