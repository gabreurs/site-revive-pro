import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/blog/BlogCard";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SEOHead } from "@/components/seo/SEOHead";
import { ArticleJsonLd } from "@/components/seo/JsonLd";
import { Layout } from "@/components/layout/Layout";
import { BLOG_POSTS, BLOG_CATEGORIES, SERVICES } from "@/lib/constants";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <Layout><div className="container-custom section-padding text-center">
        <h1 className="font-heading text-2xl font-medium">Artigo não encontrado</h1>
        <Button asChild className="mt-4"><Link to="/blog">Voltar ao Blog</Link></Button>
      </div></Layout>
    );
  }

  const category = BLOG_CATEGORIES.find((c) => c.slug === post.category);
  const related = BLOG_POSTS.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 3);
  if (related.length < 3) {
    related.push(...BLOG_POSTS.filter((p) => p.slug !== slug && p.category !== post.category).slice(0, 3 - related.length));
  }

  const relatedServices = SERVICES.slice(0, 2);

  const renderContent = (content: string) =>
    content
      .replace(/^### (.*$)/gim, '<h3 class="font-heading text-lg font-medium mt-8 mb-3 text-foreground">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="font-heading text-xl font-medium mt-10 mb-4 text-foreground">$1</h2>')
      .replace(/^\- \*\*(.*?)\*\*: (.*$)/gim, '<li class="ml-4 mb-1"><strong>$1:</strong> $2</li>')
      .replace(/^\- (.*$)/gim, '<li class="ml-4 mb-1 text-muted-foreground">• $1</li>')
      .replace(/^\d+\) (.*$)/gim, '<li class="ml-4 mb-1 text-muted-foreground list-decimal">$1</li>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n\n/g, '</p><p class="text-muted-foreground leading-relaxed mb-4">')
      .replace(/\n/g, '<br/>');

  return (
    <Layout>
      <SEOHead
        title={`${post.title} | Blog SMS Terraplenagem`}
        description={post.excerpt}
        canonical={`https://smsterraplenagem.com.br/blog/${post.slug}`}
        ogImage={typeof post.coverImage === "string" && post.coverImage.startsWith("http") ? post.coverImage : undefined}
        ogType="article"
        keywords={`${post.title.toLowerCase()}, terraplanagem sp`}
      />
      <ArticleJsonLd title={post.title} date={post.date} description={post.excerpt} />

      {/* Hero with cover image */}
      <section className="relative section-dark overflow-hidden">
        {post.coverImage && (
          <>
            <div className="absolute inset-0">
              <img
                src={post.coverImage}
                alt={`Imagem ilustrativa do artigo: ${post.title}`}
                className="h-full w-full object-cover"
                loading="eager"
                width={1200}
                height={630}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(222,30%,6%)] via-[hsl(222,30%,6%)]/70 to-[hsl(222,30%,6%)]/40" aria-hidden="true" />
          </>
        )}

        <div className="relative container-custom py-14 md:py-28">
          <AnimatedSection>
            <nav className="mb-4 md:mb-6 flex items-center gap-2 text-xs text-gray-300 flex-wrap" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-white transition-colors">Início</Link>
              <span>/</span>
              <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
              {category && (
                <>
                  <span>/</span>
                  <Link to={`/blog/categoria/${post.category}`} className="hover:text-white transition-colors">{category.label}</Link>
                </>
              )}
              <span>/</span>
              <span className="text-white/60 truncate max-w-[150px] sm:max-w-[200px]">{post.title}</span>
            </nav>

            <div className="max-w-3xl">
              {category && (
                <Link to={`/blog/categoria/${post.category}`} className="inline-block rounded-full bg-primary/20 backdrop-blur-sm px-3 py-1 text-xs font-medium text-primary mb-3 md:mb-4">{category.label}</Link>
              )}
              <h1 className="font-heading text-2xl font-medium text-white md:text-4xl lg:text-5xl">{post.title}</h1>
              <div className="mt-3 md:mt-4 flex items-center gap-4 text-sm text-gray-300">
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
              <div className="prose max-w-none text-sm md:text-base" dangerouslySetInnerHTML={{
                __html: `<p class="text-muted-foreground leading-relaxed mb-4">${renderContent(post.content)}</p>`,
              }} />
            </AnimatedSection>

            <AnimatedSection>
              <div className="my-6 md:my-8 rounded-lg border border-border bg-card p-4 md:p-5">
                <h3 className="font-heading text-sm md:text-base font-medium text-foreground mb-3">Serviços relacionados</h3>
                <ul className="space-y-2">
                  {relatedServices.map((s) => (
                    <li key={s.id}>
                      <Link to={`/servicos/${s.slug}`} className="text-sm text-primary hover:underline">
                        Conheça nosso serviço de {s.title.toLowerCase()} →
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link to="/contato" className="text-sm text-primary hover:underline">
                      Solicite um orçamento pelo formulário de contato →
                    </Link>
                  </li>
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="my-8 md:my-10 rounded-lg border border-primary/20 bg-primary/5 p-5 md:p-6 text-center">
                <h3 className="font-heading text-base md:text-lg font-medium text-foreground">Precisa de orçamento?</h3>
                <p className="mt-1 text-sm text-muted-foreground">Fale com a SMS Terraplenagem pelo WhatsApp.</p>
                <div className="mt-4"><WhatsAppCTA label="Chamar no WhatsApp" locationTag="blog-mid" className="rounded-full w-full sm:w-auto tap-feedback" /></div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="mt-8 md:mt-10 rounded-lg cta-gradient p-6 md:p-8 text-center section-dark">
                <h3 className="font-heading text-lg md:text-xl font-medium text-white">Quer cotar seu projeto?</h3>
                <p className="mt-2 text-sm text-white/80">Solicite um orçamento sem compromisso.</p>
                <div className="mt-4"><WhatsAppCTA label="Solicitar orçamento no WhatsApp" locationTag="blog-end" className="bg-white text-primary hover:bg-white/90 rounded-full w-full sm:w-auto tap-feedback" /></div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="pb-12 md:pb-24 section-neutral">
          <div className="container-custom pt-12 md:pt-16">
            <h2 className="font-heading text-xl md:text-2xl font-medium text-foreground mb-6 md:mb-8">Artigos relacionados</h2>
            <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (<BlogCard key={p.slug} post={p} />))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default BlogPost;
