import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Star, Trash2, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface AdminReview {
  id: string;
  user_id: string;
  template_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  display_name: string;
  template_title: string;
}

const useAdminReviews = () => {
  return useQuery({
    queryKey: ["admin-reviews"],
    queryFn: async () => {
      const { data: reviews, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const userIds = [...new Set((reviews || []).map((r: any) => r.user_id))];
      const templateIds = [...new Set((reviews || []).map((r: any) => r.template_id))];

      const [profilesRes, templatesRes] = await Promise.all([
        userIds.length > 0
          ? supabase.from("profiles").select("user_id, display_name").in("user_id", userIds)
          : { data: [] },
        templateIds.length > 0
          ? supabase.from("templates").select("id, title").in("id", templateIds)
          : { data: [] },
      ]);

      const profileMap = new Map((profilesRes.data || []).map((p: any) => [p.user_id, p.display_name]));
      const templateMap = new Map((templatesRes.data || []).map((t: any) => [t.id, t.title]));

      return (reviews || []).map((r: any) => ({
        ...r,
        display_name: profileMap.get(r.user_id) || "Anonymous",
        template_title: templateMap.get(r.template_id) || "Unknown Template",
      })) as AdminReview[];
    },
  });
};

export const ReviewList = () => {
  const { data: reviews = [], isLoading } = useAdminReviews();
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      setDeletingId(id);
      const { error } = await supabase.from("reviews").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      toast({ title: "Review deleted successfully" });
      setDeletingId(null);
    },
    onError: (error: Error) => {
      toast({ title: "Error deleting review", description: error.message, variant: "destructive" });
      setDeletingId(null);
    },
  });

  const filtered = reviews.filter(
    (r) =>
      r.display_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.template_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.comment || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search reviews..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          {searchQuery ? "No reviews match your search." : "No reviews yet."}
        </div>
      ) : (
        <div className="glass-card rounded-xl border border-border/50 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Template</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="hidden md:table-cell">Comment</TableHead>
                <TableHead className="hidden sm:table-cell">Date</TableHead>
                <TableHead className="w-[60px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((review) => (
                <TableRow key={review.id}>
                  <TableCell className="font-medium">{review.display_name}</TableCell>
                  <TableCell className="max-w-[150px] truncate">{review.template_title}</TableCell>
                  <TableCell>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 ${
                            s <= review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground/30"
                          }`}
                        />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell max-w-[250px] truncate text-muted-foreground text-sm">
                    {review.comment || "—"}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-muted-foreground text-sm">
                    {new Date(review.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-destructive hover:text-destructive"
                          disabled={deletingId === review.id}
                        >
                          {deletingId === review.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Review</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete the review by {review.display_name} on "{review.template_title}". This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteMutation.mutate(review.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
