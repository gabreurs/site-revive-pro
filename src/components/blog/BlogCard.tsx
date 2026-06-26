import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";
import { BlogPost, BLOG_CATEGORIES } from "@/lib/constants";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const category = BLOG_CATEGORIES.find((c) => c.slug === post.category);

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-primary/30 hover:shadow-lg card-interactive tap-feedback"
    >
      {/* Cover */}
      <div className="aspect-[16/9] bg-muted overflow-hidden">
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={`Ilustração do artigo: ${post.title}`}
            loading="lazy"
            width={640}
            height={360}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
            <span className="text-4xl opacity-30" role="img" aria-hidden="true">📄</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 md:p-5">
        <div className="flex items-center gap-2 md:gap-3 text-xs text-muted-foreground mb-2 md:mb-3">
          {category && (
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-medium text-primary">
              {category.label}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {new Date(post.date).toLocaleDateString("pt-BR")}
          </span>
          <span>{post.readTime}</span>
        </div>

        <h3 className="font-heading text-base md:text-lg font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="mt-1.5 md:mt-2 text-xs md:text-sm text-muted-foreground line-clamp-2 flex-1">
          {post.excerpt}
        </p>

        <span className="mt-3 md:mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
          Ler artigo
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
