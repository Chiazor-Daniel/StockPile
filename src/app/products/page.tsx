"use client";

import * as React from "react";
import { Plus, Search, Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductDialog } from "@/components/stockpile/product-dialog";
import { ProductTable } from "@/components/stockpile/product-table";
import { useProducts } from "@/hooks/use-products";
import type { Product } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsPage() {
  const {
    products,
    addProduct,
    editProduct,
    updateStock,
    deleteProduct,
    isLoading,
  } = useProducts();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [productToEdit, setProductToEdit] = React.useState<Product | null>(
    null
  );
  const [recentlyUpdated, setRecentlyUpdated] = React.useState<string | null>(
    null
  );
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredProducts = React.useMemo(() => {
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const handleOpenDialog = (product?: Product) => {
    setProductToEdit(product || null);
    setIsDialogOpen(true);
  };

  const handleSaveProduct = (productData: Product) => {
    if (productToEdit) {
      editProduct(productData);
    } else {
      const newProduct = {
        ...productData,
        id: new Date().toISOString(),
        price: productData.price || 0,
      };
      addProduct(newProduct);
    }
    setIsDialogOpen(false);
    setProductToEdit(null);
  };

  const handleUpdateStock = (productId: string, change: number) => {
    updateStock(productId, change);
    setRecentlyUpdated(productId);
    setTimeout(() => setRecentlyUpdated(null), 1500);
  };

  return (
    <div className="space-y-8">
      <header className="space-y-6 animate-fade-in">
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-200 via-pink-100 to-rose-100 flex items-center justify-center shadow-inner border border-pink-100">
        <span className="text-pink-600 font-bold text-lg">U</span>
      </div>
      <div>
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-pink-600 via-rose-400 to-fuchsia-400 bg-clip-text text-transparent mb-2 tracking-tight drop-shadow-sm">Products</h1>
        <p className="text-pink-700 dark:text-pink-200 text-lg font-medium">Curate your collection with style and ease</p>
      </div>
    </div>
    <Button
      onClick={() => handleOpenDialog()}
      className="rounded-xl bg-gradient-to-r from-pink-400 to-rose-300 text-white font-semibold shadow-lg hover:from-pink-500 hover:to-rose-400 focus:ring-2 focus:ring-pink-300 animate-pop px-6 py-3 transition-all"
      aria-label="Add Product"
    >
      <Plus className="mr-2 h-5 w-5 text-white/90" />
      Add Product
    </Button>
  </div>
  <div className="flex items-center gap-4 max-w-md animate-fade-in-up delay-150">
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-300 h-4 w-4" />
      <Input
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10 bg-white/70 dark:bg-pink-950/30 border-pink-100 dark:border-pink-900 rounded-xl focus:ring-2 focus:ring-pink-300 text-pink-900 dark:text-pink-200 placeholder:text-pink-300"
        aria-label="Search products"
      />
    </div>
    <Button variant="outline" className="rounded-xl border-pink-100 dark:border-pink-900 bg-white/30 dark:bg-pink-950/20 hover:bg-pink-100/30 dark:hover:bg-pink-900/30 text-pink-600 dark:text-pink-200 transition-all shadow-sm" aria-label="Filter products">
      <Filter className="h-4 w-4" />
    </Button>
  </div>
</header>
      
      <main>
        {isLoading ? (
          <div className="glass-card rounded-2xl p-8 space-y-4">
            <Skeleton className="h-12 w-full rounded-xl" />
            <Skeleton className="h-16 w-full rounded-xl" />
            <Skeleton className="h-16 w-full rounded-xl" />
            <Skeleton className="h-16 w-full rounded-xl" />
            <Skeleton className="h-16 w-full rounded-xl" />
          </div>
        ) : (
          <ProductTable
            products={filteredProducts}
            onEdit={handleOpenDialog}
            onDelete={deleteProduct}
            onUpdateStock={handleUpdateStock}
            recentlyUpdated={recentlyUpdated}
          />
        )}
      </main>

      <ProductDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={handleSaveProduct}
        productToEdit={productToEdit}
      />
    </div>
  );
}
