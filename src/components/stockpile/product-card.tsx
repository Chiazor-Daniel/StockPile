"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Pencil } from "lucide-react";
import type { Product } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
}

export function ProductCard({ product, onEdit }: ProductCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col group">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={product.image || "https://placehold.co/300x300.png"}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
            data-ai-hint="product image"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex flex-col flex-grow">
        <Badge variant="secondary" className="w-fit mb-2">{product.category}</Badge>
        <CardTitle className="text-lg font-semibold leading-snug tracking-tight flex-grow">{product.name}</CardTitle>
        <CardDescription className="mt-2 text-2xl font-bold text-primary">
          ₦{(product.price || 0).toFixed(2)}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-4 mt-auto bg-card">
        <Button variant="outline" className="w-full" onClick={() => onEdit(product)}>
          <Pencil className="mr-2 h-4 w-4" />
          Edit Product
        </Button>
      </CardFooter>
    </Card>
  );
}
