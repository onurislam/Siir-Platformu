import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Home, PenSquare, User, LogOut, TrendingUp } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-mobile";

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link to="/" className="flex items-center space-x-2 mr-4">
          <PenSquare className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">ŞiirPlatformu</span>
        </Link>
        
        {!isMobile && (
          <nav className="flex items-center space-x-6 text-sm font-medium flex-1">
            <Link to="/" className="flex items-center hover:text-primary transition-colors">
              <Home className="h-5 w-5 mr-1" />
              <span>Ana Sayfa</span>
            </Link>
            <Link to="/trending" className="flex items-center hover:text-primary transition-colors">
              <TrendingUp className="h-5 w-5 mr-1" />
              <span>Trend</span>
            </Link>
          </nav>
        )}
        
        <div className="flex items-center space-x-2 ml-auto">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar} alt={user?.displayName} />
                    <AvatarFallback>{user?.displayName.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user?.displayName}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      @{user?.username}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to={`/profile/${user?.id}`} className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profilim</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-red-600 focus:text-red-600"
                  onClick={logout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Çıkış Yap</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              {!isMobile && (
                <>
                  <Button variant="ghost" asChild>
                    <Link to="/login">Giriş</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/register">Kayıt Ol</Link>
                  </Button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}