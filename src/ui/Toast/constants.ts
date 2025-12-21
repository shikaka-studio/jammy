import { CheckCircle2, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import type { ToastType } from '@/types/toast';

export const DEFAULT_TOAST_DURATION = 5000;

export const TOAST_VARIANTS = {
  success: {
    icon: CheckCircle2,
    className: 'border-green-500/20 bg-green-500/10 text-green-500',
  },
  error: {
    icon: AlertCircle,
    className: 'border-red-500/20 bg-red-500/10 text-red-500',
  },
  warning: {
    icon: AlertTriangle,
    className: 'border-yellow-500/20 bg-yellow-500/10 text-yellow-500',
  },
  info: {
    icon: Info,
    className: 'border-blue-500/20 bg-blue-500/10 text-blue-500',
  },
} as const satisfies Record<ToastType, { icon: any; className: string }>;
