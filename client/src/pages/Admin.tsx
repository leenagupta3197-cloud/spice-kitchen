import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useMenu } from "@/hooks/use-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Plus, Edit, Trash2, ChefHat, LogOut } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const menuItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().min(1, "Price must be at least 1"),
  category: z.enum(["Thali", "Sweets", "Achar", "Catering"]),
  imageUrl: z.string().min(1, "Image is required"),
});

type MenuItemFormData = z.infer<typeof menuItemSchema>;

export default function Admin() {
  const [, setLocation] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // All hooks must be called before any conditional logic
  const { data: menuItems, isLoading } = useMenu();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<MenuItemFormData>({
    resolver: zodResolver(menuItemSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "Thali",
      imageUrl: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: MenuItemFormData) =>
      apiRequest("POST", "/api/menu", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/menu"] });
      form.reset();
      setIsDialogOpen(false);
      toast({ title: "Success", description: "Menu item created!" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create menu item" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: MenuItemFormData) =>
      apiRequest("PATCH", `/api/menu/${editingId}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/menu"] });
      form.reset();
      setEditingId(null);
      setIsDialogOpen(false);
      toast({ title: "Success", description: "Menu item updated!" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update menu item" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      apiRequest("DELETE", `/api/menu/${id}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/menu"] });
      toast({ title: "Success", description: "Menu item deleted!" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete menu item" });
    },
  });

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (!auth) {
      setLocation("/admin-login");
    } else {
      setIsAuthenticated(true);
    }
  }, [setLocation]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    setLocation("/");
  };

  if (!isAuthenticated) {
    return null;
  }

  const onSubmit = (data: MenuItemFormData) => {
    if (editingId) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (item: any) => {
    form.reset({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      imageUrl: item.imageUrl,
    });
    setEditingId(item.id);
    setIsDialogOpen(true);
  };

  const handleNewItem = () => {
    form.reset();
    setEditingId(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-secondary/30 p-4 md:p-8 pb-24 md:pb-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <ChefHat className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold">Staff Panel</h1>
              <p className="text-muted-foreground">Manage your menu catalog</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleLogout}
            className="gap-2"
            data-testid="button-admin-logout"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        {/* Add Button */}
        <div className="mb-8">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" onClick={handleNewItem} className="gap-2">
                <Plus className="w-5 h-5" />
                Add New Item
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? "Edit Menu Item" : "Add New Menu Item"}
                </DialogTitle>
              </DialogHeader>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Item Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Paneer Thali" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Describe the dish..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price (₹)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="250" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Thali">Thali</SelectItem>
                            <SelectItem value="Sweets">Sweets</SelectItem>
                            <SelectItem value="Achar">Achar</SelectItem>
                            <SelectItem value="Catering">Catering</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field: { value, ...field } }) => (
                      <FormItem>
                        <FormLabel>Upload Image</FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = (event) => {
                                    const base64 = event.target?.result as string;
                                    field.onChange(base64);
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                              className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                            />
                            {value && value.startsWith('data:') && (
                              <img src={value} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-3 pt-4">
                    <Button
                      type="submit"
                      disabled={createMutation.isPending || updateMutation.isPending}
                      className="flex-1"
                    >
                      {editingId ? "Update" : "Create"} Item
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Menu Items Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-80 bg-muted animate-pulse rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems?.map((item) => (
              <Card key={item.id} className="overflow-hidden flex flex-col">
                <div className="aspect-video overflow-hidden bg-muted">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-4 space-y-3">
                  <div>
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t">
                    <div>
                      <p className="text-sm text-muted-foreground">₹{item.price}</p>
                      <p className="text-xs text-muted-foreground">{item.category}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(item)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteMutation.mutate(String(item.id))}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {!isLoading && menuItems?.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">No menu items yet</p>
            <Button onClick={handleNewItem}>Create First Item</Button>
          </div>
        )}
      </div>
    </div>
  );
}
