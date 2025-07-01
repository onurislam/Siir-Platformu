import { Link, useLocation } from "react-router-dom";
import { Home, TrendingUp, User, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/lib/store";

export function MobileNav() {
  const location = useLocation();
  const { isAuthenticated, user } = useAuthStore();
  
  const navItems = [
    {
      title: "Ana Sayfa",
      href: "/",
      icon: Home,
      active: location.pathname === "/"
    },
    {
      title: "Trend",
      href: "/trending",
      icon: TrendingUp,
      active: location.pathname === "/trending"
    },
    {
      title: "Profil",
      href: isAuthenticated ? `/profile/${user?.id}` : "/login",
      icon: User,
      active: location.pathname.startsWith("/profile")
    },
    {
      title: "Ayarlar",
      href: isAuthenticated ? "/settings" : "/login",
      icon: Settings,
      active: location.pathname === "/settings"
    }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t py-2">
      <div className="container mx-auto flex items-center justify-between">
        {navItems.map((item, index) => (
          <Link
            key={index}
            to={item.href}
            className={cn(
              "flex flex-col items-center justify-center flex-1 py-2 px-1",
              item.active 
                ? "text-primary" 
                : "text-muted-foreground hover:text-primary transition-colors"
            )}
          >
            <item.icon className="h-5 w-5 mb-1" />
            <span className="text-xs">{item.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}