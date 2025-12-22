import { CheckCircle2, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import type { ToastType } from '@/types/toast';

export const DEFAULT_TOAST_DURATION = 5000;

export const TOAST_VARIANTS = {
  success: {
    icon: CheckCircle2,
    className: 'border-green-500 bg-green-950 text-green-400',
  },
  error: {
    icon: AlertCircle,
    className: 'border-red-500 bg-red-950 text-red-400',
  },
  warning: {
    icon: AlertTriangle,
    className: 'border-yellow-500 bg-yellow-950 text-yellow-400',
  },
  info: {
    icon: Info,
    className: 'border-blue-500 bg-blue-950 text-blue-400',
  },
} as const satisfies Record<ToastType, { icon: any; className: string }>;
