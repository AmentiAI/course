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
    
    console.log('Wishlist button clicked', { session, status, courseId });
    
    if (status === 'loading') {
      console.log('Session still loading...');
      return;
    }
    
    if (!session?.user?.id) {
      console.log('Not logged in, redirecting to signin');
      router.push('/auth/signin?redirect=' + window.location.pathname);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      console.log('Calling wishlist API with courseId:', courseId);
      
      const res = await fetch('/api/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId }),
      });

      console.log('Wishlist API response:', res.status);
      
      const data = await res.json();
      console.log('Wishlist API response:', data);
      
      if (!res.ok) {
        console.error('Wishlist API error:', data);
        const errorMsg = data.details 
          ? `${data.error}: ${data.details}` 
          : data.error || 'Failed to update wishlist';
        throw new Error(errorMsg);
      }

      if (data.wishlisted !== undefined) {
        console.log('Wishlist updated successfully:', data.wishlisted);
        setWishlisted(data.wishlisted);
        // Refresh the page data to update counts
        router.refresh();
      } else {
        console.error('Invalid response:', data);
        throw new Error('Invalid response from server');
      }
    } catch (error: any) {
      console.error('Wishlist error:', error);
      setError(error.message);
      // Show error for 3 seconds
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
          className={`flex items-center gap-2 rounded-lg border transition-colors ${sizeClasses[size]} ${
            wishlisted
              ? 'bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20'
              : 'bg-zinc-800/50 border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-white'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
          title={!session ? 'Sign in to save to wishlist' : ''}
        >
          {loading ? (
            <Loader2 className={`${iconSizes[size]} animate-spin`} />
          ) : (
            <Heart
              className={`${iconSizes[size]} transition-colors ${
                wishlisted ? 'fill-red-400' : ''
              }`}
            />
          )}
          {wishlisted ? 'Wishlisted' : (session ? 'Add to Wishlist' : 'Sign in to save')}
        </button>
        {error && (
          <div className="absolute top-full left-0 mt-1 text-xs text-red-400 bg-red-900/50 px-2 py-1 rounded whitespace-nowrap">
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
        className={`rounded-lg bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses[size]}`}
        title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        {loading ? (
          <Loader2 className={`${iconSizes[size]} animate-spin text-white`} />
        ) : (
          <Heart
            className={`${iconSizes[size]} transition-colors ${
              wishlisted ? 'fill-red-400 text-red-400' : 'text-white'
            }`}
          />
        )}
      </button>
      {error && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 text-xs text-red-400 bg-red-900/90 px-2 py-1 rounded whitespace-nowrap z-50">
          {error}
        </div>
      )}
    </div>
  );
}
