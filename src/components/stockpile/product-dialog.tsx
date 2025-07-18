"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Sparkles, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { productSchema } from "./product-schema";
import type { Product } from "@/lib/types";
import { suggestProductCategory } from "@/ai/flows/suggest-product-category";
import { useToast } from "@/hooks/use-toast";

interface ProductDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (product: Product) => void;
  productToEdit: Product | null;
}

type ProductFormData = z.infer<typeof productSchema>;

export function ProductDialog({
  isOpen,
  onOpenChange,
  onSave,
  productToEdit,
}: ProductDialogProps) {
  const [isSuggesting, setIsSuggesting] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      id: "",
      name: "",
      category: "",
      quantity: 0,
    },
  });

  React.useEffect(() => {
    if (productToEdit) {
      form.reset(productToEdit);
    } else {
      form.reset({
        id: "",
        name: "",
        category: "",
        quantity: 0,
      });
    }
  }, [productToEdit, form, isOpen]);

  const handleSuggestCategory = async () => {
    const productName = form.getValues("name");
    if (!productName) {
      form.setError("name", {
        type: "manual",
        message: "Please enter a product name first.",
      });
      return;
    }
    setIsSuggesting(true);
    try {
      const result = await suggestProductCategory({ productName });
      if (result.categorySuggestion) {
        form.setValue("category", result.categorySuggestion, {
          shouldValidate: true,
        });
      }
    } catch (error) {
      console.error("AI suggestion failed", error);
      toast({
        title: "AI Suggestion Failed",
        description: "Could not suggest a category. Please enter one manually.",
        variant: "destructive",
      });
    } finally {
      setIsSuggesting(false);
    }
  };

  const onSubmit = (data: ProductFormData) => {
    const product: Product = {
      id: productToEdit?.id || new Date().toISOString(),
      ...data,
    };
    onSave(product);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {productToEdit ? "Edit Product" : "Add New Product"}
          </DialogTitle>
          <DialogDescription>
            {productToEdit
              ? "Update the details of your product."
              : "Fill in the details for the new product."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Wireless Keyboard" {...field} />
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
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Input placeholder="e.g. Electronics" {...field} />
                    </FormControl>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={handleSuggestCategory}
                      disabled={isSuggesting}
                      aria-label="Suggest Category"
                    >
                      {isSuggesting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Sparkles className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value, 10) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save Product</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
