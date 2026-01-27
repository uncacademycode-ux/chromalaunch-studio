import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Template {
  id: string;
  title: string;
  description: string | null;
  category: string;
  price: number;
  extended_price: number | null;
  image_url: string;
  gallery_images: string[];
  rating: number;
  sales: number;
  featured: boolean;
  tech_stack: string[];
  features: string[];
  demo_url: string | null;
  created_at: string;
  updated_at: string;
}

export const useTemplates = (options?: { featured?: boolean; category?: string; limit?: number }) => {
  return useQuery({
    queryKey: ["templates", options],
    queryFn: async () => {
      let query = supabase.from("templates").select("*");
      
      if (options?.featured) {
        query = query.eq("featured", true);
      }
      
      if (options?.category) {
        query = query.eq("category", options.category);
      }
      
      if (options?.limit) {
        query = query.limit(options.limit);
      }
      
      query = query.order("sales", { ascending: false });
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as Template[];
    },
  });
};

export const useTemplate = (id: string) => {
  return useQuery({
    queryKey: ["template", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("templates")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      
      if (error) throw error;
      return data as Template | null;
    },
    enabled: !!id,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["template-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("templates")
        .select("category");
      
      if (error) throw error;
      
      const categories = [...new Set(data.map(t => t.category))];
      return categories;
    },
  });
};
