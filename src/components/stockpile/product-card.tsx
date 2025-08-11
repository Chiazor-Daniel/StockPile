"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Pencil } from "lucide-react";
import type { Product } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
}

export function ProductCard({ product, onEdit }: ProductCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col">
      <CardContent className="p-0 flex flex-col flex-grow">
        <div className="relative h-48 w-full">
          <Image
            src={product.image || "https://placehold.co/300x300.png"}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            data-ai-hint="product image"
          />
           <Badge variant="secondary" className="absolute top-2 right-2">{product.category}</Badge>
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-bold flex-grow">{product.name}</h3>
          <p className="mt-2 text-xl font-semibold">
            ${(product.price || 0).toFixed(2)}
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-4 mt-auto">
        <Button variant="outline" className="w-full" onClick={() => onEdit(product)}>
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </CardFooter>
    </Card>
  );
}
