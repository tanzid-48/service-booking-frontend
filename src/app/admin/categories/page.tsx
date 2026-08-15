"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { Category } from "@/types/service";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CategoryForm } from "@/components/Form/CategoryForm";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);

  const fetchCategories = () => {
    api
      .get<Category[]>("/api/categories")
      .then((res) => setCategories(res.data))
      .catch(() => setCategories([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await api.delete(`/api/categories/${deleteTarget.id}`);
      toast.success("Category deleted");
      setDeleteTarget(null);
      fetchCategories();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-16 rounded-lg bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">
          {categories.length} categor{categories.length !== 1 ? "ies" : "y"}
        </p>
        <CategoryForm
          onSuccess={fetchCategories}
          trigger={
            <Button size="sm">
              <Plus className="h-4 w-4" /> Add Category
            </Button>
          }
        />
      </div>

      {categories.length === 0 ? (
        <p className="text-sm text-muted-foreground py-10 text-center">
          No categories yet.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {categories.map((c) => (
            <Card key={c.id}>
              <CardContent className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{c.name}</p>
                  {c.description && (
                    <p className="text-sm text-muted-foreground">
                      {c.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <CategoryForm
                    category={c}
                    onSuccess={fetchCategories}
                    trigger={
                      <Button size="icon" variant="outline">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    }
                  />
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setDeleteTarget(c)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this category?</AlertDialogTitle>
            <AlertDialogDescription>
              &quot;{deleteTarget?.name}&quot; will be hidden from services and
              filters.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
