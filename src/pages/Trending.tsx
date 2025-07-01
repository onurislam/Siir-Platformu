import { useEffect, useState } from "react";
import { PoemCard } from "@/components/poems/poem-card";
import { Navbar } from "@/components/layout/navbar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { usePoemStore } from "@/lib/store";
import { Poem } from "@/types";

export default function Trending() {
  const { getTrendingPoems } = usePoemStore();
  const [trendingPoems, setTrendingPoems] = useState<Poem[]>([]);
  
  useEffect(() => {
    const poems = getTrendingPoems();
    setTrendingPoems(poems);
  }, [getTrendingPoems]);

  return (
    <div className="min-h-screen flex flex-col bg-background pb-16 md:pb-0">
      <Navbar />
      <main className="flex-1">
        <div className="container max-w-3xl mx-auto py-6 px-4 sm:px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Trend</h1>
            <p className="text-muted-foreground">En popüler şiirler burada</p>
          </div>
          
          {trendingPoems.length > 0 ? (
            <div>
              {trendingPoems.map((poem) => (
                <PoemCard key={poem.id} poem={poem} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">Henüz trend olan şiir yok</h3>
              <p className="text-muted-foreground">İlk trend olacak şiir sizinki olabilir!</p>
            </div>
          )}
        </div>
      </main>
      <MobileNav />
    </div>
  );
}