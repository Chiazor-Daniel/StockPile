"use client";

import * as React from "react";
import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProductDialog } from "@/components/stockpile/product-dialog";
import { useProducts } from "@/hooks/use-products";
import type { Product } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductCard } from "@/components/stockpile/product-card";

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

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
        <h3 className="text-xl font-medium text-gray-900">No Products Found</h3>
        <p className="mt-2 text-sm text-gray-500">
          Get started by adding a new product.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-gray-800 dark:text-white">
          Popular Product
        </h1>
        <Button onClick={() => handleOpenDialog()}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Item
        </Button>
      </header>
      <main>
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-64 w-full" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={handleOpenDialog}
              />
            ))}
          </div>
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
