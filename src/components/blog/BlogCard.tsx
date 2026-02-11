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
      className="group flex flex-col overflow-hidden rounded-lg border border-border/40 bg-card transition-all hover:border-primary/30 hover:shadow-lg"
    >
      {/* Cover */}
      <div className="aspect-[16/9] bg-muted overflow-hidden">
        {post.coverImage ? (
          <img src={post.coverImage} alt={post.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
            <span className="text-4xl opacity-30">📄</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
          {category && (
            <Link
              to={`/blog/categoria/${post.category}`}
              onClick={(e) => e.stopPropagation()}
              className="rounded-full bg-primary/10 px-2.5 py-0.5 font-medium text-primary hover:bg-primary/20 transition-colors"
            >
              {category.label}
            </Link>
          )}
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {new Date(post.date).toLocaleDateString("pt-BR")}
          </span>
          <span>{post.readTime}</span>
        </div>

        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2 flex-1">
          {post.excerpt}
        </p>

        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
          Ler artigo
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
