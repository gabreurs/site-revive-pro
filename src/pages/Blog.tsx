import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { BlogCard } from "@/components/blog/BlogCard";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SEOHead } from "@/components/seo/SEOHead";
import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/layout/PageHero";
import { HERO_OBRA } from "@/lib/serviceImages";
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/lib/constants";

const POSTS_PER_PAGE = 6;

const Blog = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let posts = BLOG_POSTS;
    if (selectedCategory) posts = posts.filter((p) => p.category === selectedCategory);
    if (search) {
      const q = search.toLowerCase();
      posts = posts.filter((p) => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q));
    }
    return posts;
  }, [search, selectedCategory]);

  const paginated = filtered.slice(0, page * POSTS_PER_PAGE);
  const hasMore = paginated.length < filtered.length;

  return (
    <Layout>
      <SEOHead
        title="Blog | Dicas e Conteúdos de Terraplanagem em SP"
        description="Conteúdos sobre terraplanagem, escavação, corte e aterro, locação de máquinas e boas práticas para obras na Grande São Paulo."
        canonical="https://smsterraplenagem.com.br/blog"
      />

      <PageHero
        eyebrow="Conteúdo SMS"
        title="Blog"
        subtitle="Artigos, dicas e informações sobre terraplanagem, escavação e construção civil em São Paulo."
        image={HERO_OBRA.src}
        imageAlt="Obra de terraplanagem da SMS na Grande São Paulo"
        breadcrumbs={[{ label: "Início", to: "/" }, { label: "Blog" }]}
      />



      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8 md:mb-10">
              {/* Mobile: horizontal scroll categories */}
              <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap">
                <button
                  onClick={() => { setSelectedCategory(null); setPage(1); }}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors tap-feedback ${
                    !selectedCategory ? "bg-primary text-white" : "bg-card border border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Todos
                </button>
                {BLOG_CATEGORIES.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => { setSelectedCategory(cat.slug); setPage(1); }}
                    className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors tap-feedback ${
                      selectedCategory === cat.slug ? "bg-primary text-white" : "bg-card border border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar artigos..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                  className="pl-9 h-11"
                />
              </div>
            </div>
          </AnimatedSection>

          {filtered.length === 0 ? (
            <div className="text-center py-16 md:py-20">
              <p className="text-muted-foreground">Nenhum artigo encontrado.</p>
            </div>
          ) : (
            <>
              <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {paginated.map((post, i) => (
                  <AnimatedSection key={post.slug} delay={i * 0.05}>
                    <BlogCard post={post} />
                  </AnimatedSection>
                ))}
              </div>

              {hasMore && (
                <div className="mt-8 md:mt-10 text-center">
                  <button
                    onClick={() => setPage((p) => p + 1)}
                    className="rounded-full bg-card border border-border px-8 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted tap-feedback"
                  >
                    Ver mais artigos
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
