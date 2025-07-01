import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PenSquare } from "lucide-react";
import { MobileNav } from "@/components/layout/mobile-nav";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-background pb-16 md:pb-0">
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="space-y-6 max-w-md">
          <div className="flex justify-center">
            <PenSquare className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold">404 - Sayfa Bulunamadı</h1>
          <p className="text-muted-foreground">
            Aradığınız sayfa bulunamadı. Ana sayfaya dönmek için aşağıdaki butona tıklayın.
          </p>
          <Button asChild>
            <Link to="/">Ana Sayfaya Dön</Link>
          </Button>
        </div>
      </div>
      <MobileNav />
    </div>
  );
}