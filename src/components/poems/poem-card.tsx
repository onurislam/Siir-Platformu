import { useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { Poem } from "@/types";
import { useAuthStore, usePoemStore } from "@/lib/store";
import { CommentList } from "@/components/poems/comment-list";

interface PoemCardProps {
  poem: Poem;
}

export function PoemCard({ poem }: PoemCardProps) {
  const { user } = useAuthStore();
  const { likePoem } = usePoemStore();
  const [showFullContent, setShowFullContent] = useState(false);
  const [showComments, setShowComments] = useState(false);
  
  const hasLiked = user && poem.likes.includes(user.id);
  const formattedDate = format(new Date(poem.createdAt), "d MMMM yyyy");
  const isLongPoem = poem.content.length > 300;
  
  const displayContent = showFullContent || !isLongPoem 
    ? poem.content 
    : poem.content.substring(0, 300) + "...";

  return (
    <Card className="mb-4 hover:border-primary/50 transition-all">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar className="h-10 w-10">
          <AvatarImage src={poem.author.avatar} />
          <AvatarFallback>{poem.author.displayName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <Link 
              to={`/profile/${poem.author.id}`}
              className="font-semibold hover:underline"
            >
              {poem.author.displayName}
            </Link>
            <span className="text-muted-foreground text-xs">@{poem.author.username}</span>
          </div>
          <span className="text-muted-foreground text-xs">{formattedDate}</span>
        </div>
      </CardHeader>
      <CardContent className="py-2 whitespace-pre-wrap">
        <p>{displayContent}</p>
        {isLongPoem && (
          <Button 
            variant="link" 
            className="p-0 h-auto mt-1 text-primary" 
            onClick={() => setShowFullContent(!showFullContent)}
          >
            {showFullContent ? "Daha az göster" : "Devamını oku"}
          </Button>
        )}
      </CardContent>
      <CardFooter className="pt-2 flex flex-col">
        <div className="flex gap-6 mb-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className={`gap-1 hover:text-red-500 ${hasLiked ? 'text-red-500' : ''}`}
            onClick={() => likePoem(poem.id)}
          >
            <Heart className={`h-4 w-4 ${hasLiked ? 'fill-red-500' : ''}`} />
            {poem.likes.length > 0 && poem.likes.length}
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-1"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle className="h-4 w-4" />
            Yorum
          </Button>
          <Button variant="ghost" size="sm" className="gap-1">
            <Share2 className="h-4 w-4" />
            Paylaş
          </Button>
        </div>
        {showComments && <CommentList poemId={poem.id} initialShow={true} />}
      </CardFooter>
    </Card>
  );
}