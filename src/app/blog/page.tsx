import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { blogPosts } from '@/lib/blog-posts';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function BlogPage() {
  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-16 sm:py-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight font-headline sm:text-5xl">El Nostre Blog</h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg text-foreground/80">
          Notícies, tendències i coneixements del sector del transport i la logística.
        </p>
      </div>

      {/* Featured Post */}
      <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16 items-center">
        <div className="relative h-80 lg:h-full w-full rounded-lg overflow-hidden">
          {featuredPost.image && (
            <Image
              src={featuredPost.image.imageUrl}
              alt={featuredPost.title}
              fill
              className="object-cover shadow-lg"
              priority
              data-ai-hint={featuredPost.image.imageHint}
            />
          )}
        </div>
        <div className="space-y-4">
          <Badge variant="outline">Article Destacat</Badge>
          <h2 className="text-3xl font-bold tracking-tight font-headline sm:text-4xl">
            <Link href={`/blog/${featuredPost.slug}`} className="hover:text-accent transition-colors">
              {featuredPost.title}
            </Link>
          </h2>
          <div className="flex items-center gap-4 text-sm text-foreground/80">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(featuredPost.date).toLocaleDateString('ca-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{featuredPost.author}</span>
            </div>
          </div>
          <p className="text-lg text-foreground/80">
            {featuredPost.excerpt}
          </p>
          <Button asChild variant="link" className="px-0">
            <Link href={`/blog/${featuredPost.slug}`}>
              Llegir més <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Other Posts */}
      <div className="mt-24">
         <h2 className="text-3xl font-bold tracking-tight font-headline text-center sm:text-4xl">Més Articles</h2>
        <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2">
          {otherPosts.map((post) => (
            <Card key={post.slug} className="flex flex-col">
              <Link href={`/blog/${post.slug}`}>
                <div className="relative h-64 w-full">
                  {post.image && (
                    <Image
                      src={post.image.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover rounded-t-lg"
                      data-ai-hint={post.image.imageHint}
                    />
                  )}
                </div>
              </Link>
              <CardHeader>
                <CardTitle className="text-2xl">
                  <Link href={`/blog/${post.slug}`} className="hover:text-accent transition-colors">
                    {post.title}
                  </Link>
                </CardTitle>
                <div className="flex items-center gap-4 pt-2 text-xs text-foreground/80">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{new Date(post.date).toLocaleDateString('ca-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5" />
                    <span>{post.author}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{post.excerpt}</CardDescription>
              </CardContent>
              <div className="p-6 pt-0">
                <Button asChild variant="secondary" className="w-full">
                  <Link href={`/blog/${post.slug}`}>Llegir l'article complet</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
