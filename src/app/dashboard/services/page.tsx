'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { Service } from '@/types/service';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ServiceForm } from '@/components/Form/ServiceForm';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';

export default function DashboardServicesPage() {
  const { user } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<Service | null>(null);

  const fetchServices = () => {
    api
      .get<Service[]>('/api/services')
      .then((res) => {
        const mine = res.data.filter((s) => s.providerId === user?.id);
        setServices(mine);
      })
      .catch(() => setServices([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (user) fetchServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await api.delete(`/api/services/${deleteTarget.id}`);
      toast.success('Service deleted');
      setDeleteTarget(null);
      fetchServices();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">
          {services.length} service{services.length !== 1 && 's'}
        </p>
        <ServiceForm
          onSuccess={fetchServices}
          trigger={
            <Button size="sm">
              <Plus className="h-4 w-4" /> Add Service
            </Button>
          }
        />
      </div>

      {loading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-20 rounded-lg bg-muted animate-pulse" />
          ))}
        </div>
      ) : services.length === 0 ? (
        <p className="text-sm text-muted-foreground py-10 text-center">
          You haven&apos;t added any service yet.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {services.map((s) => (
            <Card key={s.id}>
              <CardContent className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{s.title}</p>
                    {s.category && (
                      <Badge variant="secondary" className="text-xs">
                        {s.category.name}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-teal-600 font-medium mt-1">
                    ৳{Number(s.price).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <ServiceForm
                    service={s}
                    onSuccess={fetchServices}
                    trigger={
                      <Button size="icon" variant="outline">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    }
                  />
                  <Button size="icon" variant="outline" onClick={() => setDeleteTarget(s)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this service?</AlertDialogTitle>
            <AlertDialogDescription>
              &quot;{deleteTarget?.title}&quot; will be removed from listings. This can be reversed by an admin later.
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