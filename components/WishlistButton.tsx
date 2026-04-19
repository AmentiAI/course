'use client';

import { useState } from 'react';
import { Heart, Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface WishlistButtonProps {
  courseId: string;
  initialWishlisted?: boolean;
  variant?: 'icon' | 'full';
  size?: 'sm' | 'md' | 'lg';
}

export default function WishlistButton({
  courseId,
  initialWishlisted = false,
  variant = 'icon',
  size = 'md',
}: WishlistButtonProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [wishlisted, setWishlisted] = useState(initialWishlisted);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (status === 'loading') return;

    if (!session?.user?.id) {
      router.push('/auth/signin?redirect=' + window.location.pathname);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId }),
      });

      const data = await res.json();

      if (!res.ok) {
        const errorMsg = data.details
          ? `${data.error}: ${data.details}`
          : data.error || 'Failed to update wishlist';
        throw new Error(errorMsg);
      }

      if (data.wishlisted !== undefined) {
        setWishlisted(data.wishlisted);
        router.refresh();
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err: any) {
      setError(err.message);
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  const sizeClasses = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3',
  };

  const iconSizes = {
    sm: 'h-3.5 w-3.5',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  if (variant === 'full') {
    return (
      <div className="relative">
        <button
          onClick={handleClick}
          disabled={loading || status === 'loading'}
          className={`flex items-center gap-2 rounded-xl border font-medium transition-colors ${sizeClasses[size]} ${
            wishlisted
              ? 'bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100'
              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
          title={!session ? 'Sign in to save to wishlist' : ''}
        >
          {loading ? (
            <Loader2 className={`${iconSizes[size]} animate-spin`} />
          ) : (
            <Heart
              className={`${iconSizes[size]} transition-colors ${
                wishlisted ? 'fill-rose-500 text-rose-500' : ''
              }`}
            />
          )}
          {wishlisted ? 'Saved' : session ? 'Save for later' : 'Sign in to save'}
        </button>
        {error && (
          <div className="absolute top-full left-0 mt-1 text-xs text-rose-600 bg-rose-50 border border-rose-200 px-2 py-1 rounded whitespace-nowrap">
            {error}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        disabled={loading || status === 'loading'}
        className={`rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses[size]}`}
        title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        {loading ? (
          <Loader2 className={`${iconSizes[size]} animate-spin text-slate-700`} />
        ) : (
          <Heart
            className={`${iconSizes[size]} transition-colors ${
              wishlisted ? 'fill-rose-500 text-rose-500' : 'text-slate-700'
            }`}
          />
        )}
      </button>
      {error && (
        <div className="absolute top-full right-0 mt-1 text-xs text-rose-700 bg-white border border-rose-200 shadow-lg px-2 py-1 rounded whitespace-nowrap z-50">
          {error}
        </div>
      )}
    </div>
  );
}
