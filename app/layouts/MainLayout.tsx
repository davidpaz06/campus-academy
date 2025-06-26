import type { ReactNode } from 'react';

const MainLayout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
    {/* Aquí puedes agregar un header o sidebar si lo necesitas */}
    <main className="flex-1">{children}</main>
  </div>
);

export default MainLayout;
