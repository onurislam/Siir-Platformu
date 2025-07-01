import { useState } from "react";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { Comment } from "@/types";
import { useAuthStore, usePoemStore } from "@/lib/store";

interface CommentListProps {
  poemId: string;
  initialShow?: boolean;
}

export function CommentList({ poemId, initialShow = false }: CommentListProps) {
  const [showComments, setShowComments] = useState(initialShow);
  const [comment, setComment] = useState("");
  const { isAuthenticated, user } = useAuthStore();
  const { addComment, getComments } = usePoemStore();
  const comments = getComments(poemId);

  const handleAddComment = () => {
    if (comment.trim()) {
      addComment(poemId, comment);
      setComment("");
    }
  };

  if (!showComments) {
    return (
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => setShowComments(true)}
        className="mt-2 text-sm text-muted-foreground hover:text-primary"
      >
        {comments.length > 0 ? `${comments.length} yorumu göster` : "Yorum ekle"}
      </Button>
    );
  }

  return (
    <div className="mt-4 border-t pt-4">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-sm font-medium">Yorumlar {comments.length > 0 && `(${comments.length})`}</h4>
        {comments.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowComments(false)}
            className="text-xs"
          >
            Gizle
          </Button>
        )}
      </div>
      
      {isAuthenticated ? (
        <div className="flex gap-3 mb-6">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback>{user?.displayName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea 
              placeholder="Bir yorum yazın..."
              className="text-sm resize-none min-h-[60px]"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="flex justify-end mt-2">
              <Button 
                size="sm"
                onClick={handleAddComment}
                disabled={!comment.trim()}
              >
                Gönder
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-4 text-sm text-muted-foreground">
          Yorum yapmak için <Link to="/login" className="text-primary underline">giriş</Link> yapmalısınız.
        </div>
      )}
      
      {comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <Avatar className="h-6 w-6">
                <AvatarImage src={comment.author.avatar} />
                <AvatarFallback>{comment.author.displayName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex gap-2 items-baseline">
                  <Link 
                    to={`/profile/${comment.author.id}`}
                    className="font-medium text-sm hover:underline"
                  >
                    {comment.author.displayName}
                  </Link>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(comment.createdAt), "d MMM")}
                  </span>
                </div>
                <p className="text-sm mt-1">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">Henüz yorum yok.</p>
      )}
    </div>
  );
}