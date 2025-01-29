'use client';

import { Header } from '@/components/admin/Header';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col">
      <>
        <Header />
        <div className="flex flex-1 flex-col">{children}</div>
      </>
    </div>
  );
}
