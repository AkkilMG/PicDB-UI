
'use client'; 
import dynamic from 'next/dynamic';
// import TestPage from "@/components/test/test";

const Component = dynamic(() => import('@/components/test/test'), { ssr: false });

export default function Page() {
  return <Component />;
}


