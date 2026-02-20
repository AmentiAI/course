'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
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
  const { data: session } = useSession();
  const router = useRouter();
  const [wishlisted, setWishlisted] = useState(initialWishlisted);
  const [loading, setLoading] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!session) {
      router.push('/auth/signin');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId }),
      });

      if (res.ok) {
        const data = await res.json();
        setWishlisted(data.wishlisted);
      }
    } catch (error) {
      console.error('Wishlist error:', error);
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
      <button
        onClick={handleClick}
        disabled={loading}
        className={`flex items-center gap-2 rounded-lg border transition-colors ${sizeClasses[size]} ${
          wishlisted
            ? 'bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20'
            : 'bg-zinc-800/50 border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-white'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <Heart
          className={`${iconSizes[size]} transition-colors ${
            wishlisted ? 'fill-red-400' : ''
          }`}
        />
        {wishlisted ? 'Wishlisted' : 'Add to Wishlist'}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`rounded-lg bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses[size]}`}
      title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <Heart
        className={`${iconSizes[size]} transition-colors ${
          wishlisted ? 'fill-red-400 text-red-400' : 'text-white'
        }`}
      />
    </button>
  );
}
