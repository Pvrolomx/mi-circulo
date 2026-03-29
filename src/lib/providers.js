'use client';
import { LangProvider } from '@/lib/i18n';

export function ClientProviders({ children }) {
  return <LangProvider>{children}</LangProvider>;
}
