import { Star } from "lucide-react";
import type { ReviewResponse } from "@shared/routes";
import { Card, CardContent } from "@/components/ui/card";

export function ReviewCard({ review }: { review: ReviewResponse }) {
  return (
    <Card className="min-w-[280px] w-[280px] bg-card border-none shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-5 flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < review.rating ? "fill-accent text-accent" : "fill-muted text-muted"}`} 
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">{review.date}</span>
        </div>
        
        <p className="text-sm text-foreground/80 line-clamp-3 leading-relaxed italic">
          "{review.comment}"
        </p>
        
        <div className="flex items-center gap-3 pt-2 border-t mt-1">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
            {review.name.charAt(0)}
          </div>
          <span className="font-semibold text-sm">{review.name}</span>
        </div>
      </CardContent>
    </Card>
  );
}
