import React from 'react';
import { cn, buttonVariants } from '../../styles/designSystem';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'base' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'base',
  loading = false,
  icon,
  children,
  className,
  disabled,
  ...props
}) => {
  const baseClasses = buttonVariants[variant][size];
  
  return (
    <button
      className={cn(
        baseClasses,
        loading && 'opacity-75 cursor-not-allowed',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      <div className="flex items-center justify-center space-x-2">
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          icon && <span>{icon}</span>
        )}
        <span>{children}</span>
      </div>
    </button>
  );
};

interface CardProps {
  variant?: 'default' | 'elevated' | 'interactive';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  children,
  className,
  onClick,
}) => {
  const baseClasses = variant === 'default' 
    ? 'bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 transition-all duration-200 hover:border-pink-500/30 hover:shadow-lg hover:shadow-pink-500/10'
    : variant === 'elevated'
    ? 'bg-gray-800/60 backdrop-blur-sm border border-gray-600/50 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-pink-500/40'
    : 'bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 cursor-pointer transition-all duration-200 hover:border-pink-500/50 hover:shadow-lg hover:shadow-pink-500/20 hover:scale-[1.02] active:scale-[0.98]';

  return (
    <div
      className={cn(baseClasses, className)}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'search';
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  variant = 'default',
  className,
  ...props
}) => {
  const inputClasses = variant === 'search'
    ? 'w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 focus:outline-none transition-all duration-200'
    : 'w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 focus:outline-none transition-all duration-200';

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && variant === 'search' && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          className={cn(
            inputClasses,
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
    </div>
  );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  options,
  className,
  ...props
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <select
        className={cn(
          'w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:border-pink-500 focus:ring-1 focus:ring-pink-500 focus:outline-none transition-all duration-200',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-gray-800">
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
    </div>
  );
};

interface BadgeProps {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'pending';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'pending',
  children,
  className,
}) => {
  const variantClasses = {
    success: 'bg-green-500/20 border-green-500/30 text-green-400',
    warning: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400',
    error: 'bg-red-500/20 border-red-500/30 text-red-400',
    info: 'bg-blue-500/20 border-blue-500/30 text-blue-400',
    pending: 'bg-gray-500/20 border-gray-500/30 text-gray-400',
  };

  return (
    <span
      className={cn(
        'px-3 py-1 rounded-full text-xs font-medium border',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
};

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className,
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-16 h-16',
    xl: 'w-32 h-32',
  };

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-b-2 border-pink-500',
        sizeClasses[size],
        className
      )}
    />
  );
};

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  size = 'md',
}) => {
  if (!open) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div
        className={cn(
          'bg-gray-900 border border-pink-500/30 rounded-2xl p-8 w-full relative',
          sizeClasses[size]
        )}
      >
        {title && (
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              ✕
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

interface SkillTagProps {
  skill: string;
  verified?: boolean;
  className?: string;
}

export const SkillTag: React.FC<SkillTagProps> = ({
  skill,
  verified = false,
  className,
}) => {
  return (
    <span
      className={cn(
        'px-3 py-1 rounded-full text-sm font-medium transition-all duration-200',
        verified
          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
          : 'bg-pink-500/20 text-pink-400 border border-pink-500/30',
        className
      )}
    >
      {skill}
      {verified && <span className="ml-1">✓</span>}
    </span>
  );
};

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color?: 'pink' | 'purple' | 'blue' | 'green' | 'yellow';
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  color = 'pink',
  trend,
  trendValue,
}) => {
  const colorClasses = {
    pink: 'text-pink-400',
    purple: 'text-purple-400',
    blue: 'text-blue-400',
    green: 'text-green-400',
    yellow: 'text-yellow-400',
  };

  const trendClasses = {
    up: 'text-green-400',
    down: 'text-red-400',
    neutral: 'text-gray-400',
  };

  return (
    <Card variant="default" className="text-center">
      <div className="flex items-center justify-between mb-4">
        <div className={cn('w-10 h-10', colorClasses[color])}>
          {icon}
        </div>
        {trend && trendValue && (
          <span className={cn('text-sm font-medium', trendClasses[trend])}>
            {trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'} {trendValue}
          </span>
        )}
      </div>
      <div className="text-3xl font-bold text-white mb-2">{value}</div>
      <div className="text-gray-400 text-sm">{title}</div>
    </Card>
  );
};

export default {
  Button,
  Card,
  Input,
  Select,
  Badge,
  LoadingSpinner,
  Modal,
  SkillTag,
  StatsCard,
};
