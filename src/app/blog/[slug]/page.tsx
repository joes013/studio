import { notFound } from 'next/navigation';
import Image from 'next/image';
import { blogPosts } from '@/lib/blog-posts';
import { Calendar, User, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-background">
      {post.image && (
        <div className="relative h-[40vh] w-full">
          <Image
            src={post.image.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            priority
            data-ai-hint={post.image.imageHint}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        </div>
      )}

      <div className="container mx-auto max-w-4xl px-4 -mt-24 sm:-mt-32 relative z-10 pb-16 sm:pb-24">
        <article className="bg-card p-6 sm:p-10 rounded-lg shadow-xl">
          <div className="mb-8">
            <Link href="/blog" className="inline-flex items-center text-sm font-semibold text-accent hover:underline mb-4">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Tornar a tots els articles
            </Link>
            <h1 className="text-3xl font-bold tracking-tight font-headline sm:text-4xl lg:text-5xl text-primary">
              {post.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-foreground/80">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.date).toLocaleDateString('ca-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>
          </div>

          <div
            className="text-foreground/90 space-y-6"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </div>
  );
}
