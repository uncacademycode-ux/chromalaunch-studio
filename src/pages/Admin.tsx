import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useAdminRole } from "@/hooks/useAdminRole";
import { useTemplates, Template } from "@/hooks/useTemplates";
import { useOrders, useUpdateOrderStatus, useDeleteOrder, Order, OrderStatus } from "@/hooks/useOrders";
import { useToast } from "@/hooks/use-toast";
import { TemplateForm } from "@/components/admin/TemplateForm";
import { TemplateList } from "@/components/admin/TemplateList";
import { OrderList } from "@/components/admin/OrderList";
import { OrderDetails } from "@/components/admin/OrderDetails";
import { AdminTabs, TabsContent } from "@/components/admin/AdminTabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Plus, Search, LayoutDashboard, Loader2, ShieldAlert, Package, DollarSign } from "lucide-react";

const Admin = () => {
  const { user, loading: authLoading } = useAuth();
  const { data: isAdmin, isLoading: roleLoading } = useAdminRole();
  const { data: templates = [], isLoading: templatesLoading } = useTemplates();
  const { data: orders = [], isLoading: ordersLoading } = useOrders();
  
  const [activeTab, setActiveTab] = useState("templates");
  const [showForm, setShowForm] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [deletingOrderId, setDeletingOrderId] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const updateOrderStatus = useUpdateOrderStatus();
  const deleteOrder = useDeleteOrder();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  const createMutation = useMutation({
    mutationFn: async (data: Partial<Template>) => {
      const insertData = {
        title: data.title!,
        category: data.category!,
        image_url: data.image_url!,
        price: data.price ?? 0,
        description: data.description,
        extended_price: data.extended_price,
        demo_url: data.demo_url,
        featured: data.featured ?? false,
        tech_stack: data.tech_stack,
        features: data.features,
        gallery_images: data.gallery_images,
      };
      const { error } = await supabase.from("templates").insert([insertData]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["templates"] });
      toast({ title: "Template created successfully!" });
      setShowForm(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Error creating template",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Template> }) => {
      const { error } = await supabase.from("templates").update(data).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["templates"] });
      toast({ title: "Template updated successfully!" });
      setEditingTemplate(null);
      setShowForm(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Error updating template",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      setDeletingId(id);
      const { error } = await supabase.from("templates").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["templates"] });
      toast({ title: "Template deleted successfully!" });
      setDeletingId(null);
    },
    onError: (error: Error) => {
      toast({
        title: "Error deleting template",
        description: error.message,
        variant: "destructive",
      });
      setDeletingId(null);
    },
  });

  const handleSubmit = async (data: Partial<Template>) => {
    if (editingTemplate) {
      await updateMutation.mutateAsync({ id: editingTemplate.id, data });
    } else {
      await createMutation.mutateAsync(data);
    }
  };

  const handleEdit = (template: Template) => {
    setEditingTemplate(template);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingTemplate(null);
  };

  const handleUpdateOrderStatus = (orderId: string, status: OrderStatus) => {
    updateOrderStatus.mutate(
      { orderId, status },
      {
        onSuccess: () => {
          toast({ title: "Order status updated!" });
        },
        onError: (error) => {
          toast({
            title: "Error updating order",
            description: error.message,
            variant: "destructive",
          });
        },
      }
    );
  };

  const handleDeleteOrder = (orderId: string) => {
    setDeletingOrderId(orderId);
    deleteOrder.mutate(orderId, {
      onSuccess: () => {
        toast({ title: "Order deleted successfully!" });
        setDeletingOrderId(null);
      },
      onError: (error) => {
        toast({
          title: "Error deleting order",
          description: error.message,
          variant: "destructive",
        });
        setDeletingOrderId(null);
      },
    });
  };

  const handleViewOrderDetails = async (order: Order) => {
    // Fetch order items
    const { data: items } = await supabase
      .from("order_items")
      .select("*")
      .eq("order_id", order.id);
    
    setSelectedOrder({ ...order, items: items || [] });
  };

  const filteredTemplates = templates.filter((template) =>
    template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredOrders = orders.filter((order) =>
    order.user_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate order stats
  const totalRevenue = orders.reduce((sum, order) => 
    order.status === "completed" ? sum + order.total_amount : sum, 0
  );
  const pendingOrders = orders.filter((o) => o.status === "pending").length;

  const isLoading = authLoading || roleLoading;

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto text-center">
              <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldAlert className="w-10 h-10 text-destructive" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Access Denied</h1>
              <p className="text-muted-foreground mb-6">
                You don't have permission to access the admin dashboard. Please contact an administrator if you believe this is an error.
              </p>
              <Button onClick={() => navigate("/")}>Return Home</Button>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <LayoutDashboard className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                  Admin Dashboard
                </h1>
                <p className="text-muted-foreground">Manage templates and orders</p>
              </div>
            </div>

            {activeTab === "templates" && !showForm && (
              <Button onClick={() => setShowForm(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                Add Template
              </Button>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
            <div className="glass-card p-4 rounded-xl border border-border/50">
              <div className="text-2xl font-bold text-foreground">{templates.length}</div>
              <div className="text-sm text-muted-foreground">Total Templates</div>
            </div>
            <div className="glass-card p-4 rounded-xl border border-border/50">
              <div className="text-2xl font-bold text-foreground">
                {templates.filter((t) => t.featured).length}
              </div>
              <div className="text-sm text-muted-foreground">Featured</div>
            </div>
            <div className="glass-card p-4 rounded-xl border border-border/50">
              <div className="text-2xl font-bold text-foreground">
                {templates.reduce((acc, t) => acc + t.sales, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Template Sales</div>
            </div>
            <div className="glass-card p-4 rounded-xl border border-border/50">
              <div className="text-2xl font-bold text-foreground flex items-center gap-1">
                <Package className="w-5 h-5" />
                {orders.length}
              </div>
              <div className="text-sm text-muted-foreground">Total Orders</div>
            </div>
            <div className="glass-card p-4 rounded-xl border border-border/50">
              <div className="text-2xl font-bold text-yellow-600">{pendingOrders}</div>
              <div className="text-sm text-muted-foreground">Pending Orders</div>
            </div>
            <div className="glass-card p-4 rounded-xl border border-border/50">
              <div className="text-2xl font-bold text-green-600 flex items-center gap-1">
                <DollarSign className="w-5 h-5" />
                {totalRevenue.toFixed(0)}
              </div>
              <div className="text-sm text-muted-foreground">Revenue</div>
            </div>
          </div>

          <AdminTabs activeTab={activeTab} onTabChange={setActiveTab}>
            {/* Templates Tab */}
            <TabsContent value="templates">
              {showForm ? (
                <div className="glass-card p-6 rounded-2xl border border-border/50">
                  <h2 className="text-xl font-semibold mb-6">
                    {editingTemplate ? "Edit Template" : "Create New Template"}
                  </h2>
                  <TemplateForm
                    template={editingTemplate}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    isLoading={createMutation.isPending || updateMutation.isPending}
                  />
                </div>
              ) : (
                <>
                  {/* Search */}
                  <div className="mb-6">
                    <div className="relative max-w-md">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        placeholder="Search templates..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Template List */}
                  {templatesLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                  ) : (
                    <TemplateList
                      templates={filteredTemplates}
                      onEdit={handleEdit}
                      onDelete={(id) => deleteMutation.mutate(id)}
                      isDeleting={deletingId}
                    />
                  )}
                </>
              )}
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders">
              {/* Search */}
              <div className="mb-6">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search orders by email or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Order List */}
              {ordersLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : (
                <OrderList
                  orders={filteredOrders}
                  onViewDetails={handleViewOrderDetails}
                  onUpdateStatus={handleUpdateOrderStatus}
                  onDelete={handleDeleteOrder}
                  isUpdating={updateOrderStatus.isPending}
                  isDeleting={deletingOrderId}
                />
              )}
            </TabsContent>
          </AdminTabs>

          {/* Order Details Modal */}
          <OrderDetails
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
          />
        </div>
      </div>
      
      <Footer />
    </main>
  );
};

export default Admin;
