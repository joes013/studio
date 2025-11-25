'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { blogPosts } from '@/lib/blog-posts';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

// This function can be kept if we remove 'use client' and the code that needs it.
// For now, I will comment it out to fix the build error. In a next step, we could
// refactor to separate client and server components.
/*
export function generateStaticParams() {
  return blogPosts.map(post => ({
    slug: post.slug,
  }));
}
*/

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find(p => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-16 sm:py-24">
      <article>
        <header className="mb-12 text-center">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/blog">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Tornar al Blog
                </Link>
            </Button>
          <h1 className="text-4xl font-bold tracking-tight font-headline sm:text-5xl">{post.title}</h1>
          <div className="mt-6 flex justify-center items-center gap-6 text-sm text-foreground/80">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(post.date).toLocaleDateString('ca-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
          </div>
        </header>
        
        {post.image && (
          <div className="relative h-96 w-full rounded-lg overflow-hidden mb-12 shadow-lg">
            <Image
              src={post.image.url}
              alt={post.image.alt}
              fill
              className="object-cover"
              priority
              data-ai-hint={post.image.hint}
            />
          </div>
        )}

        <div 
          className="prose prose-lg max-w-none mx-auto text-foreground/90 
                     prose-p:mb-4 prose-headings:font-headline prose-headings:text-primary 
                     prose-a:text-accent prose-a:transition-colors hover:prose-a:text-accent/80
                     prose-strong:font-semibold prose-strong:text-foreground
                     [&_.lead]:text-xl [&_.lead]:text-foreground/80 [&_.lead]:italic"
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
      </article>
    </div>
  );
}