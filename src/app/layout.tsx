import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { LayoutDashboard, Package, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Stockpile',
  description: 'Modern inventory management made simple.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition-colors duration-500">
        {/* Topbar */}
        <header className="sticky top-0 z-40 w-full flex items-center justify-between px-8 py-4 shadow-none bg-white/60 dark:bg-gray-900/70 backdrop-blur-xl border-b border-white/10 dark:border-gray-800/60">
          <div className="flex items-center gap-3">
            <span className="text-lg font-extrabold tracking-tight gradient-text">Stockpile</span>
          </div>
          <div className="flex items-center gap-4">
            {/* Theme Switcher Placeholder */}
            <button aria-label="Toggle dark mode" className="rounded-full p-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow hover:scale-110 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400">
              <span className="sr-only">Toggle dark mode</span>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 4.95l-.71-.71M4.05 4.93l-.71-.71" /></svg>
            </button>
            {/* User Avatar Placeholder */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 flex items-center justify-center shadow-inner">
              <span className="text-white font-bold">U</span>
            </div>
          </div>
        </header>
        <SidebarProvider>
          <Sidebar className="glass-card border-r-0 shadow-lg dark:shadow-purple-900/10">
            <SidebarContent className="bg-transparent">
              <SidebarHeader>
                <div className="flex items-center gap-3 p-4">
                  <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-md">
                    <Sparkles className="h-6 w-6 text-white animate-spin-slow" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold gradient-text">Stockpile</h2>
                  </div>
                </div>
              </SidebarHeader>
              <SidebarMenu className="px-4 space-y-2">
                <SidebarMenuItem>
                  <Link href="/" passHref>
                    <SidebarMenuButton tooltip="Dashboard" className="rounded-xl hover:bg-gradient-to-r hover:from-purple-100 hover:to-blue-100 dark:hover:from-purple-900 dark:hover:to-blue-900 transition-all duration-300 font-semibold focus:ring-2 focus:ring-purple-400 aria-[current=page]:bg-gradient-to-r aria-[current=page]:from-purple-200 aria-[current=page]:to-blue-200" aria-current={typeof window !== 'undefined' && window.location.pathname === '/' ? 'page' : undefined}>
                      <LayoutDashboard className="h-5 w-5 text-sidebar-foreground" />
                      <span className="sidebar-gradient-text font-semibold">Dashboard</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <Link href="/products" passHref>
                    <SidebarMenuButton tooltip="Products" className="rounded-xl hover:bg-gradient-to-r hover:from-purple-100 hover:to-blue-100 dark:hover:from-purple-900 dark:hover:to-blue-900 transition-all duration-300 font-semibold focus:ring-2 focus:ring-purple-400 aria-[current=page]:bg-gradient-to-r aria-[current=page]:from-purple-200 aria-[current=page]:to-blue-200" aria-current={typeof window !== 'undefined' && window.location.pathname.startsWith('/products') ? 'page' : undefined}>
                      <Package className="h-5 w-5 text-sidebar-foreground" />
                      <span className="sidebar-gradient-text font-semibold">Products</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>
          <SidebarInset>
            <header className="p-6 border-b border-white/20 md:hidden backdrop-blur-sm">
              <SidebarTrigger className="hover:bg-white/10 rounded-xl" />
            </header>
            <main className="p-8 bg-gradient-to-br from-white/80 to-purple-50/60 dark:from-gray-900/80 dark:to-gray-950/60 min-h-[calc(100vh-80px)] rounded-2xl shadow-xl transition-colors duration-500">
              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
