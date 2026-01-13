import { notFound } from 'next/navigation';
import { blogPosts } from '@/lib/blog-posts';
import Image from 'next/image';
import { Calendar, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Define the props type according to Next.js App Router conventions.
// This is the simplest and most robust way to avoid type errors.
type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params;
  const post = blogPosts.find((p) => p.slug === slug);

  // If the post is not found, render the 404 page.
  // This is a best practice for dynamic routes.
  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-16 sm:py-24">
      <article>
        <header className="text-center mb-12">
          {post.image && (
             <div className="relative h-96 w-full rounded-lg overflow-hidden mb-8">
                <Image
                  src={post.image.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover shadow-lg"
                  priority
                  data-ai-hint={post.image.imageHint}
                />
              </div>
          )}
          <Badge variant="secondary">{post.author}</Badge>
          <h1 className="mt-4 text-4xl font-bold tracking-tight font-headline sm:text-5xl">
            {post.title}
          </h1>
          <div className="mt-6 flex justify-center items-center gap-4 text-sm text-foreground/80">
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

        <div
          className="prose prose-lg max-w-none mx-auto text-foreground/90 prose-headings:font-headline prose-headings:text-primary prose-a:text-accent hover:prose-a:text-primary"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}