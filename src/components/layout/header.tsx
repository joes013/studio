'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Truck } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/icons';
import { useState } from 'react';

const navigationItems = [
  { href: '/', label: 'Inici' },
  { href: '/about', label: 'Sobre Nosaltres' },
  { href: '/services', label: 'Serveis' },
  { href: '/blog', label: 'Blog' },
  { href: '/tracking', label: 'Seguiment' },
  { href: '/contact', label: 'Contacte' },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        <Link href="/" className="mr-6 flex items-center space-x-2" onClick={() => isMobileMenuOpen && setIsMobileMenuOpen(false)}>
          <Logo />
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'transition-colors hover:text-accent',
                pathname.startsWith(item.href) && item.href !== '/' || pathname === item.href ? 'text-primary font-semibold' : 'text-foreground/60'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center gap-4">
          <Button asChild className="hidden md:flex">
            <Link href="/request-service">
              <Truck className="mr-2 h-4 w-4" /> Sol·licitar Servei
            </Link>
          </Button>
          
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Obrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <Link href="/" className="mb-8" onClick={() => setIsMobileMenuOpen(false)}>
                <Logo />
              </Link>
              <div className="flex flex-col h-full">
                <nav className="flex flex-col space-y-4">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        'text-lg font-medium transition-colors hover:text-accent',
                       pathname.startsWith(item.href) && item.href !== '/' || pathname === item.href ? 'text-primary' : 'text-foreground'
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <Button asChild className="mt-auto" onClick={() => setIsMobileMenuOpen(false)}>
                    <Link href="/request-service">
                    <Truck className="mr-2 h-4 w-4" /> Sol·licitar Servei
                    </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
