'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogIn, LogOut, Menu, Truck, User as UserIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/icons';
import { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const navigationItems = [
  { href: '/', label: 'Inici' },
  { href: '/about', label: 'Sobre Nosaltres' },
  { href: '/services', label: 'Serveis' },
  { href: '/prices', label: 'Preus' },
  { href: '/blog', label: 'Blog' },
  { href: '/tracking', label: 'Seguiment' },
  { href: '/contact', label: 'Contacte' },
];

interface User {
    nom: string;
    empresa: string;
}

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This effect runs only on the client
    try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            setUser(null);
        }
    } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        localStorage.removeItem('user');
        setUser(null);
    }
    setIsLoading(false);
  }, [pathname]); // Re-check on route change

  const handleSignOut = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(n => n[0])
      .slice(0, 2)
      .join('');
  };

  const AuthButton = () => {
    if (isLoading) {
      return <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />;
    }

    if (user) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{getInitials(user.nom)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.nom}</p>
                <p className="text-xs leading-none text-muted-foreground">{user.empresa}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard">
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Gestió</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Tancar sessió</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <Button asChild variant="secondary" className="hidden md:flex">
        <Link href="/login">
          <LogIn className="mr-2 h-4 w-4" /> Iniciar Sessió
        </Link>
      </Button>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        <Link
          href="/"
          className="mr-6 flex items-center space-x-2"
          onClick={() => isMobileMenuOpen && setIsMobileMenuOpen(false)}
        >
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navigationItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'transition-colors hover:text-accent',
                (pathname.startsWith(item.href) && item.href !== '/') || pathname === item.href
                  ? 'text-primary font-semibold'
                  : 'text-foreground/60'
              )}
            >
              {item.label}
            </Link>
          ))}
           {user && (
             <Link
              href="/dashboard"
              className={cn(
                'transition-colors hover:text-accent',
                pathname.startsWith('/dashboard')
                  ? 'text-primary font-semibold'
                  : 'text-foreground/60'
              )}
            >
              Gestió
            </Link>
           )}
        </nav>

        <div className="flex items-center gap-4">
          <Button asChild className="hidden md:flex">
            <Link href="/request-service">
              <Truck className="mr-2 h-4 w-4" /> Sol·licitar Servei
            </Link>
          </Button>
          
          <AuthButton />

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
                  {navigationItems.map(item => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        'text-lg font-medium transition-colors hover:text-accent',
                        (pathname.startsWith(item.href) && item.href !== '/') || pathname === item.href
                          ? 'text-primary'
                          : 'text-foreground'
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                  {user && (
                     <Link
                      href="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        'text-lg font-medium transition-colors hover:text-accent',
                       pathname.startsWith('/dashboard') ? 'text-primary' : 'text-foreground'
                      )}
                    >
                      Gestió
                    </Link>
                  )}
                </nav>
                 <div className="mt-auto flex flex-col gap-4">
                    <Button asChild onClick={() => setIsMobileMenuOpen(false)}>
                        <Link href="/request-service">
                        <Truck className="mr-2 h-4 w-4" /> Sol·licitar Servei
                        </Link>
                    </Button>
                    {!user && (
                         <Button asChild variant="secondary" onClick={() => setIsMobileMenuOpen(false)}>
                            <Link href="/login">
                                <LogIn className="mr-2 h-4 w-4" /> Iniciar Sessió
                            </Link>
                        </Button>
                    )}
                 </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
