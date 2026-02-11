import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/blog/BlogCard";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SEOHead } from "@/components/seo/SEOHead";
import { ArticleJsonLd } from "@/components/seo/JsonLd";
import { Layout } from "@/components/layout/Layout";
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/lib/constants";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <Layout>
        <div className="container-custom section-padding text-center">
          <h1 className="text-2xl font-bold">Artigo não encontrado</h1>
          <Button asChild className="mt-4"><Link to="/blog">Voltar ao Blog</Link></Button>
        </div>
      </Layout>
    );
  }

  const category = BLOG_CATEGORIES.find((c) => c.slug === post.category);
  const related = BLOG_POSTS.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 3);
  if (related.length < 3) {
    const extra = BLOG_POSTS.filter((p) => p.slug !== slug && p.category !== post.category).slice(0, 3 - related.length);
    related.push(...extra);
  }

  // Simple markdown to HTML
  const renderContent = (content: string) => {
    return content
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold mt-8 mb-3">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mt-10 mb-4">$1</h2>')
      .replace(/^\- \*\*(.*?)\*\*: (.*$)/gim, '<li class="ml-4 mb-1"><strong>$1:</strong> $2</li>')
      .replace(/^\- (.*$)/gim, '<li class="ml-4 mb-1 text-muted-foreground">• $1</li>')
      .replace(/^\d+\) (.*$)/gim, '<li class="ml-4 mb-1 text-muted-foreground list-decimal">$1</li>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n\n/g, '</p><p class="text-muted-foreground leading-relaxed mb-4">')
      .replace(/\n/g, '<br/>');
  };

  return (
    <Layout>
      <SEOHead
        title={`${post.title} | SMS Terraplenagem`}
        description={post.excerpt}
        keywords={`${post.title.toLowerCase()}, terraplanagem sp`}
      />
      <ArticleJsonLd title={post.title} date={post.date} description={post.excerpt} />

      {/* Cover */}
      <section className="hero-dark py-16 md:py-24 topo-pattern">
        <div className="container-custom">
          <AnimatedSection>
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Voltar ao Blog
            </Link>
            <div className="max-w-3xl">
              {category && (
                <Link to={`/blog/categoria/${post.category}`} className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4">
                  {category.label}
                </Link>
              )}
              <h1 className="text-3xl font-extrabold text-white md:text-4xl lg:text-5xl">{post.title}</h1>
              <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{new Date(post.date).toLocaleDateString("pt-BR")}</span>
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{post.readTime}</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            <AnimatedSection>
              <div
                className="prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{
                  __html: `<p class="text-muted-foreground leading-relaxed mb-4">${renderContent(post.content)}</p>`,
                }}
              />
            </AnimatedSection>

            {/* Mid CTA */}
            <AnimatedSection>
              <div className="my-10 rounded-lg border border-primary/20 bg-primary/5 p-6 text-center">
                <h3 className="text-lg font-bold">Precisa de orçamento?</h3>
                <p className="mt-1 text-sm text-muted-foreground">Fale com a SMS Terraplenagem pelo WhatsApp.</p>
                <div className="mt-4">
                  <WhatsAppCTA label="Chamar no WhatsApp" locationTag="blog-mid" className="rounded-full" />
                </div>
              </div>
            </AnimatedSection>

            {/* End CTA */}
            <AnimatedSection>
              <div className="mt-10 rounded-lg cta-gradient p-8 text-center">
                <h3 className="text-xl font-bold text-white">Gostou do conteúdo?</h3>
                <p className="mt-2 text-sm text-white/80">Solicite um orçamento sem compromisso.</p>
                <div className="mt-4">
                  <WhatsAppCTA
                    label="Solicitar Orçamento"
                    locationTag="blog-end"
                    className="bg-white text-primary hover:bg-white/90 rounded-full"
                  />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="pb-16 md:pb-24">
          <div className="container-custom">
            <h2 className="text-2xl font-bold mb-8">Artigos Relacionados</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default BlogPost;
