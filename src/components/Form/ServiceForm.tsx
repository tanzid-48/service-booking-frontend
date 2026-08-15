"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { Category, Service } from "@/types/service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

type ServiceFormProps = {
  service?: Service;
  onSuccess: () => void;
  trigger: React.ReactNode;
};

export function ServiceForm({ service, onSuccess, trigger }: ServiceFormProps) {
  const isEdit = !!service;
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState(service?.title || "");
  const [description, setDescription] = useState(service?.description || "");
  const [price, setPrice] = useState(service ? String(service.price) : "");
  const [categoryId, setCategoryId] = useState(
    service ? String(service.categoryId) : "",
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      api
        .get<Category[]>("/api/categories")
        .then((res) => setCategories(res.data))
        .catch(() => setCategories([]));
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !categoryId) {
      toast.error("Please fill in title, price and category.");
      return;
    }
    setLoading(true);
    try {
      if (isEdit) {
        await api.put(`/api/services/${service!.id}`, {
          title,
          description,
          price: Number(price),
          categoryId: Number(categoryId),
        });
        toast.success("Service updated!");
      } else {
        await api.post("/api/services", {
          title,
          description,
          price: Number(price),
          categoryId: Number(categoryId),
        });
        toast.success("Service created!");
        setTitle("");
        setDescription("");
        setPrice("");
        setCategoryId("");
      }
      setOpen(false);
      onSuccess();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <span onClick={() => setOpen(true)}>{trigger}</span>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Service" : "Add New Service"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="price">Price (৳)</Label>
              <Input
                id="price"
                type="number"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={categoryId}
                onValueChange={(v) => setCategoryId(v as string)}
              >
                <SelectTrigger id="category" className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={String(c.id)}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose render={<Button type="button" variant="outline" />}>
              Cancel
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading
                ? "Saving..."
                : isEdit
                  ? "Save Changes"
                  : "Create Service"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
