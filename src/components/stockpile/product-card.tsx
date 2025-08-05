"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Pencil } from "lucide-react";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
}

export function ProductCard({ product, onEdit }: ProductCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
      <CardContent className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={product.image || "https://placehold.co/300x300.png"}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            data-ai-hint="product image"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.category}</p>
          <p className="mt-2 text-xl font-semibold">
            ${(product.price || 0).toFixed(2)}
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <Button className="w-full" onClick={() => onEdit(product)}>
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </CardFooter>
    </Card>
  );
}
