"use client";

import * as React from "react";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  Plus,
  Minus,
  Loader2,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onUpdateStock: (id: string, change: number) => void;
  recentlyUpdated: string | null;
}

const StockManager = ({ onUpdateStock }: { onUpdateStock: (change: number) => void }) => {
  const [amount, setAmount] = React.useState(1);
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="stock-amount">Amount</Label>
        <Input
          id="stock-amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(Math.max(1, parseInt(e.target.value, 10) || 1))}
          className="w-full"
        />
      </div>
      <div className="flex justify-between gap-2">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => onUpdateStock(amount)}
        >
          <Plus className="mr-2 h-4 w-4" /> Stock In
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => onUpdateStock(-amount)}
        >
          <Minus className="mr-2 h-4 w-4" /> Stock Out
        </Button>
      </div>
    </div>
  );
};

export function ProductTable({
  products,
  onEdit,
  onDelete,
  onUpdateStock,
  recentlyUpdated,
}: ProductTableProps) {
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
    <div className="rounded-lg border shadow-sm bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40%]">Product Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Quantity</TableHead>
            <TableHead className="w-[100px] text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell
                className={cn(
                  "text-right font-mono transition-colors duration-1000",
                  recentlyUpdated === product.id && "text-accent-foreground bg-accent/30"
                )}
              >
                {product.quantity}
              </TableCell>
              <TableCell className="text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" className="w-full justify-start font-normal h-8 px-2">Manage Stock</Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-64" align="end">
                         <StockManager onUpdateStock={(change) => onUpdateStock(product.id, change)} />
                      </PopoverContent>
                    </Popover>
                    <DropdownMenuItem onClick={() => onEdit(product)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-start font-normal h-8 px-2 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete the product "{product.name}".
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => onDelete(product.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
