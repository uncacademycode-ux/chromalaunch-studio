import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutTemplate, ShoppingCart, Tag, MessageCircle, Star, ImageIcon } from "lucide-react";

interface AdminTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  children: React.ReactNode;
}

export const AdminTabs = ({ activeTab, onTabChange, children }: AdminTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="mb-6 flex-wrap">
        <TabsTrigger value="templates" className="gap-2">
          <LayoutTemplate className="w-4 h-4" />
          Templates
        </TabsTrigger>
        <TabsTrigger value="orders" className="gap-2">
          <ShoppingCart className="w-4 h-4" />
          Orders
        </TabsTrigger>
        <TabsTrigger value="coupons" className="gap-2">
          <Tag className="w-4 h-4" />
          Coupons
        </TabsTrigger>
        <TabsTrigger value="reviews" className="gap-2">
          <Star className="w-4 h-4" />
          Reviews
        </TabsTrigger>
        <TabsTrigger value="contacts" className="gap-2">
          <MessageCircle className="w-4 h-4" />
          Contacts
        </TabsTrigger>
        <TabsTrigger value="hero" className="gap-2">
          <ImageIcon className="w-4 h-4" />
          Hero Banner
        </TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
};

export { TabsContent };
