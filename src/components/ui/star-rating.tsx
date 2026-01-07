'use client';

import * as React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'framer-motion';

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  showLabel?: boolean;
  label?: string;
  className?: string;
}

const sizeClasses = {
  sm: 'size-4',
  md: 'size-5',
  lg: 'size-6',
};

const labels = ['Not rated', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

export function StarRating({
  value,
  onChange,
  max = 5,
  size = 'md',
  disabled = false,
  showLabel = true,
  label,
  className,
}: StarRatingProps) {
  const [hoverValue, setHoverValue] = React.useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const displayValue = hoverValue !== null ? hoverValue : value;

  const handleClick = (starValue: number) => {
    if (!disabled && onChange) {
      onChange(starValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, starValue: number) => {
    if (disabled) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(starValue);
    } else if (e.key === 'ArrowRight' && onChange && value < max) {
      e.preventDefault();
      onChange(value + 1);
    } else if (e.key === 'ArrowLeft' && onChange && value > 0) {
      e.preventDefault();
      onChange(value - 1);
    }
  };

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {label && (
        <span className="text-sm font-medium text-foreground">{label}</span>
      )}
      <div className="flex items-center gap-1">
        <div
          className="flex items-center gap-0.5"
          role="radiogroup"
          aria-label={label || 'Star rating'}
        >
          {Array.from({ length: max }, (_, i) => i + 1).map((starValue) => {
            const isFilled = starValue <= displayValue;
            const isActive = starValue === displayValue && hoverValue !== null;

            return (
              <motion.button
                key={starValue}
                type="button"
                role="radio"
                aria-checked={starValue === value}
                aria-label={`${starValue} out of ${max} stars`}
                disabled={disabled}
                onClick={() => handleClick(starValue)}
                onMouseEnter={() => !disabled && setHoverValue(starValue)}
                onMouseLeave={() => setHoverValue(null)}
                onKeyDown={(e) => handleKeyDown(e, starValue)}
                className={cn(
                  'relative p-0.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background rounded-sm',
                  disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                )}
                whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                animate={
                  isActive && !prefersReducedMotion
                    ? { scale: [1, 1.2, 1] }
                    : { scale: 1 }
                }
                transition={{ duration: 0.2 }}
              >
                <Star
                  className={cn(
                    sizeClasses[size],
                    'transition-colors duration-150',
                    isFilled
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'fill-transparent text-muted-foreground/50 hover:text-muted-foreground'
                  )}
                />
              </motion.button>
            );
          })}
        </div>
        {showLabel && (
          <span className="ml-2 text-sm text-muted-foreground min-w-[80px]">
            {labels[displayValue] || labels[0]}
          </span>
        )}
      </div>
    </div>
  );
}
