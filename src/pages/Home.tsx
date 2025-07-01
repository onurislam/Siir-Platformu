import { useEffect, useState } from "react";
import { PoemComposer } from "@/components/poems/poem-composer";
import { PoemCard } from "@/components/poems/poem-card";
import { Navbar } from "@/components/layout/navbar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { usePoemStore } from "@/lib/store";
import { Poem } from "@/types";

export default function Home() {
  const { poems } = usePoemStore();
  const [sortedPoems, setSortedPoems] = useState<Poem[]>([]);
  
  // Sort poems by date (newest first)
  useEffect(() => {
    const sorted = [...poems].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setSortedPoems(sorted);
  }, [poems]);

  return (
    <div className="min-h-screen flex flex-col bg-background pb-16 md:pb-0">
      <Navbar />
      <main className="flex-1">
        <div className="container max-w-3xl mx-auto py-6 px-4 sm:px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Şiirler</h1>
            <p className="text-muted-foreground">Düşüncelerinizi paylaşın, şiirlerinizi yazın</p>
          </div>
          
          <PoemComposer />
          
          {sortedPoems.length > 0 ? (
            <div>
              {sortedPoems.map((poem) => (
                <PoemCard key={poem.id} poem={poem} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">Henüz paylaşılmış bir şiir yok</h3>
              <p className="text-muted-foreground">İlk şiiri siz paylaşın!</p>
            </div>
          )}
        </div>
      </main>
      <MobileNav />
    </div>
  );
}