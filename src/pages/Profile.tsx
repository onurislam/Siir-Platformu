import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/navbar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { PoemCard } from "@/components/poems/poem-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuthStore, usePoemStore } from "@/lib/store";
import { User, Poem } from "@/types";
import { ArrowLeft } from "lucide-react";

export default function Profile() {
  const { userId } = useParams();
  const { user: currentUser } = useAuthStore();
  const { poems, getUserPoems } = usePoemStore();
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [userPoems, setUserPoems] = useState<Poem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user data
  useEffect(() => {
    setIsLoading(true);
    // In a real app, you'd make an API call here
    // For now, we'll simulate by using localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find((u: User & { password: string }) => u.id === userId);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setProfileUser(userWithoutPassword);
    }
    
    // Get user's poems
    const userPoemsList = getUserPoems(userId || '');
    setUserPoems(userPoemsList.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ));
    
    setIsLoading(false);
  }, [userId, poems, getUserPoems]);

  // Check if it's the current user's profile
  const isOwnProfile = currentUser?.id === userId;

  return (
    <div className="min-h-screen flex flex-col bg-background pb-16 md:pb-0">
      <Navbar />
      <main className="flex-1">
        <div className="container max-w-3xl mx-auto py-6 px-4 sm:px-6">
          <Button 
            variant="ghost" 
            size="sm" 
            asChild 
            className="mb-4"
          >
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Geri Dön
            </Link>
          </Button>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <p>Yükleniyor...</p>
            </div>
          ) : profileUser ? (
            <>
              <div className="pb-8 mb-8 border-b">
                <div className="flex items-center mb-4">
                  <Avatar className="h-24 w-24 mr-4">
                    <AvatarImage src={profileUser.avatar} />
                    <AvatarFallback>{profileUser.displayName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-2xl font-bold">{profileUser.displayName}</h1>
                    <p className="text-muted-foreground">@{profileUser.username}</p>
                  </div>
                </div>
                
                {profileUser.bio && (
                  <p className="mb-4">{profileUser.bio}</p>
                )}
                
                <div className="flex items-center gap-4">
                  <div>
                    <span className="font-medium">{userPoems.length}</span>{" "}
                    <span className="text-muted-foreground">Şiir</span>
                  </div>
                  
                  {isOwnProfile && (
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/settings">Profili Düzenle</Link>
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-4">Şiirler</h2>
                
                {userPoems.length > 0 ? (
                  <div>
                    {userPoems.map((poem) => (
                      <PoemCard key={poem.id} poem={poem} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-muted/40 rounded-lg">
                    <p className="text-muted-foreground">Henüz şiir paylaşılmamış</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">Kullanıcı bulunamadı</h3>
              <p className="text-muted-foreground">
                Aradığınız kullanıcı mevcut değil
              </p>
            </div>
          )}
        </div>
      </main>
      <MobileNav />
    </div>
  );
}