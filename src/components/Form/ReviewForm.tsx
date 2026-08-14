'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export function ReviewForm({
  serviceId,
  onSuccess,
}: {
  serviceId: number;
  onSuccess: () => void;
}) {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  if (!user || user.role !== 'CUSTOMER') {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error('Please select a rating.');
      return;
    }
    setLoading(true);
    try {
      await api.post('/api/reviews', { rating, comment, serviceId });
      toast.success('Review submitted!');
      setRating(0);
      setComment('');
      onSuccess();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not submit review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 rounded-lg border p-4 mb-2">
      <span className="text-sm font-medium">Leave a review</span>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
          >
            <Star
              className={`h-6 w-6 ${
                star <= (hoverRating || rating) ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'
              }`}
            />
          </button>
        ))}
      </div>
      <Textarea
        placeholder="Share your experience (optional)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={3}
      />
      <Button type="submit" size="sm" className="w-fit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Review'}
      </Button>
    </form>
  );
}