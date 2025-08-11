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
import { LayoutDashboard, Package } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Stockpile Manager',
  description: 'A simple application to manage your inventory.',
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <SidebarProvider>
          <Sidebar>
            <SidebarContent>
              <SidebarHeader>
                <div className="flex items-center gap-2">
                  <Package className="h-6 w-6 text-primary" />
                  <h2 className="text-lg font-semibold">Stockpile</h2>
                </div>
              </SidebarHeader>
              <SidebarMenu>
                <SidebarMenuItem>
                  <Link href="/" passHref>
                    <SidebarMenuButton tooltip="Dashboard">
                      <LayoutDashboard />
                      <span>Dashboard</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <Link href="/products" passHref>
                    <SidebarMenuButton tooltip="Products">
                      <Package />
                      <span>Products</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>
          <SidebarInset>
            <header className="p-4 border-b md:hidden flex items-center gap-4">
              <SidebarTrigger />
              <div className="flex items-center gap-2">
                  <Package className="h-6 w-6 text-primary" />
                  <h2 className="text-lg font-semibold">Stockpile</h2>
                </div>
            </header>
            <main>{children}</main>
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
