'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin/dashboard/manage-news');
  }, [router]);

  return null;
}
