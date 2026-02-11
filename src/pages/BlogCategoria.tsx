import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/blog/BlogCard";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SEOHead } from "@/components/seo/SEOHead";
import { Layout } from "@/components/layout/Layout";
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/lib/constants";

const BlogCategoria = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = BLOG_CATEGORIES.find((c) => c.slug === slug);
  const posts = BLOG_POSTS.filter((p) => p.category === slug);

  if (!category) {
    return (
      <Layout>
        <div className="container-custom section-padding text-center">
          <h1 className="text-2xl font-bold">Categoria não encontrada</h1>
          <Button asChild className="mt-4"><Link to="/blog">Voltar ao Blog</Link></Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOHead
        title={`${category.label} | Blog SMS Terraplenagem`}
        description={`Artigos sobre ${category.label.toLowerCase()} da SMS Terraplenagem.`}
      />

      <section className="hero-dark py-16 md:py-24 topo-pattern">
        <div className="container-custom">
          <AnimatedSection>
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Voltar ao Blog
            </Link>
            <h1 className="text-4xl font-extrabold text-white md:text-5xl">{category.label}</h1>
            <p className="mt-3 text-lg text-white/70">{posts.length} artigo{posts.length !== 1 ? "s" : ""}</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          {posts.length === 0 ? (
            <p className="text-center text-muted-foreground py-20">Nenhum artigo nesta categoria.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <AnimatedSection key={post.slug} delay={i * 0.05}>
                  <BlogCard post={post} />
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default BlogCategoria;
