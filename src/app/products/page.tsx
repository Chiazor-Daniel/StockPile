"use client";

import * as React from "react";
import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
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
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-gray-800 dark:text-white">
          Products
        </h1>
        <Button onClick={() => handleOpenDialog()}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Item
        </Button>
      </header>
      <main>
        {isLoading ? (
          <div className="w-full space-y-2">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : (
          <ProductTable
            products={products}
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
