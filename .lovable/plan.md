## Objetivo

Transformar cada página local em landing page própria, com conteúdo realmente diferente, preposição correta, UX escaneável e SEO “verde” por página — sem refazer o site, sem mapa fake, sem keyword stuffing e sem quebrar rotas/sitemap/GTM.

## Escopo (o que vou tocar)

1. **`src/data/locationProfiles.ts` — enriquecer**
   - Já tenho 6 perfis (`central`, `residential`, `corporativo`, `metropolitan`, `expansao`, `interior`).
   - Adicionar 2–3 variantes de texto por serviço dentro de cada perfil e escolher por `slug` (hash determinístico), para que duas cidades do mesmo perfil não fiquem iguais.
   - Acrescentar campos por localidade: `metaDescription`, `titleVariant`, `nearbyAreas`, `mapQuery`, `localProfile`. Tabela manual para os ~30 bairros prioritários; resto recebe fallback gerado pelo perfil + nome.

2. **`src/pages/Bairro.tsx` — refatorar conteúdo + UX**
   - H1 dinâmico via `h1Suffix` do perfil + preposição correta (já existe).
   - Primeira frase visível = keyword foco exata (`Terraplanagem {prep} {nome} …`).
   - Title e meta description únicos por slug (lookup → fallback por perfil).
   - 6 seções de serviço com textos do perfil (variante por slug).
   - FAQ regional do perfil (já existe) + 2 perguntas extras puxadas dos campos da localidade.
   - Botões: trocar “Saiba mais sobre X” por “Ver serviço” / “Pedir orçamento” / “Falar no WhatsApp”. SEO entra em links contextuais inline (`<Link to="/servicos/…">nivelamento de terreno {prep} {nome}</Link>`).
   - Componente `<ReadMore>` simples (CSS + `aria-expanded`, conteúdo sempre no DOM) aplicado só em blocos > 120 palavras.
   - Confirmar: bloco “Localização e atendimento” é card real com link `target="_blank"` para Google Maps (sem iframe, sem mapa fake) — ajustar se necessário.
   - Imagens: revisar `alt` para incluir serviço + localidade quando fizer sentido; manter arquivos atuais (não duplicar imagem por bairro).
   - JSON-LD: `BreadcrumbList` + `Service` + `LocalBusiness` + `FAQPage` espelhando o que está visível.

3. **`src/pages/Index.tsx` — hub Grande SP**
   - Já tem grade regional. Vou: (a) garantir links reais para páginas locais existentes, (b) reescrever textos curtos de cada card com foco em serviços, (c) garantir âncoras contextuais (“terraplanagem no Tatuapé”) em vez de só nome.

4. **`scripts/seo-audit.ts` — auditoria anti-duplicação**
   - Script Node/TS standalone (não roda no build, opcional via `bunx tsx scripts/seo-audit.ts`).
   - Para cada slug em `LOCATIONS`: gera title/meta/H1/primeira frase/FAQ via mesmas funções do `Bairro.tsx` e mede similaridade par a par (Jaccard sobre tokens).
   - Sinaliza: title/meta/H1 duplicados, similaridade > 45%, preposição estranha, falta de keyword foco no início, alt genérico.
   - Imprime relatório GREEN/YELLOW/RED no console.

5. **`public/sitemap.xml`** — conferir que cada slug local existe e canonical bate. Sem mudar mecanismo.

6. **Auditoria de imagens (leve)** — `rg` por `alt=""`, `alt="imagem"`, nomes tipo `IMG_`, `WhatsApp`. Renomear só se houver poucos casos; senão listar no relatório como “ação manual”.

## O que NÃO vou fazer

- Não vou criar rotas novas, mexer em slugs publicados, GTM, WhatsApp, sitemap mechanism, `.htaccess`, robots, Supabase, backend.
- Não vou gerar imagens novas com IA.
- Não vou criar iframe de mapa.
- Não vou prometer backlinks externos — entram no relatório como tarefas manuais.
- Não vou prerender/SSG (fora de escopo; React Helmet já cobre Googlebot que executa JS).

## Detalhes técnicos

- **Escolha de variante por slug:** `variantIndex = hash(slug) % profile.variants.length`. Determinístico (mesma página sempre mesmo texto) e diferencia cidades do mesmo perfil.
- **Lookup de meta por localidade:** `LOCATION_OVERRIDES: Record<slug, Partial<{title, metaDescription, firstSentence, nearbyAreas, mapQuery}>>`. Preencho manualmente ~20 bairros prioritários (Tatuapé, Mooca, Aclimação, Brás, Alphaville, Perus, Cajamar, Osasco, Santo André, SBC, Diadema, Anhanguera, Pirituba, Jaraguá, Liberdade, Bela Vista, Butantã, Morumbi, Santana, Ipiranga).
- **`<ReadMore>`:** `<details>` nativo estilizado com Tailwind. Conteúdo recolhido fica em `<details><summary>Continuar lendo</summary>…</details>` — fica no HTML renderizado, acessível, sem JS.
- **Links contextuais:** helper `<ServiceLink service="nivelamento" location={loc} />` que renderiza `<Link to="/servicos/nivelamento-de-terreno">nivelamento de terreno {prep} {nome}</Link>`.
- **JSON-LD FAQPage:** gera a partir do mesmo array de perguntas renderizado, garantindo paridade.

## Arquivos

- Editar: `src/data/locationProfiles.ts`, `src/pages/Bairro.tsx`, `src/pages/Index.tsx`
- Criar: `src/components/ReadMore.tsx`, `src/components/ServiceLink.tsx`, `src/data/locationOverrides.ts`, `scripts/seo-audit.ts`
- Conferir: `public/sitemap.xml`, `src/App.tsx` (rotas)

## Verificação antes de entregar

1. `bunx tsgo --noEmit` limpo.
2. `bunx tsx scripts/seo-audit.ts` → relatório GREEN para Tatuapé, Mooca, Aclimação, Alphaville, Perus, Anhanguera, Brás, Osasco.
3. Playwright em 3 rotas (`/terraplanagem-no-tatuape`, `/terraplanagem-em-alphaville`, `/terraplanagem-na-aclimacao`) → checa H1, primeira frase, ausência de iframe de mapa, presença de links contextuais, botão WhatsApp funcionando.
4. Relatório final no chat com tudo que o briefing pediu (arquivos, duplicação, preposição, botões, imagens, schema, sitemap, oportunidades de backlink manual, resultado de build).

## Estimativa

3 rodadas grandes de edição (data → page → home/audit) + 1 rodada de validação. Deve ficar pronto sem novas perguntas, exceto se você quiser priorizar uma lista diferente de ~20 bairros para o override manual (caso contrário, vou na lista acima).
