import { Link } from "react-router-dom";
import { REGIONS } from "@/lib/bairros";

export function AreasFooter() {
  return (
    <section
      id="areas-atendimento"
      aria-labelledby="areas-atendimento-title"
      className="border-t border-border/30 bg-[hsl(222,30%,5%)]"
    >
      <div className="container-custom py-12 md:py-16">
        <div className="mb-8 md:mb-10 max-w-2xl">
          <h2
            id="areas-atendimento-title"
            className="font-heading text-xl md:text-2xl font-bold text-foreground"
          >
            Onde atuamos
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Terraplanagem, escavação e movimentação de terra em toda a Grande São Paulo, interior e litoral. Clique no bairro ou cidade para ver detalhes.
          </p>
        </div>

        <div className="grid gap-8 md:gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {REGIONS.map((r) => (
            <div key={r.key}>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">
                {r.label}
              </h3>
              <ul className="space-y-1.5">
                {r.bairros.map((name) => {
                  const slug = name
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase()
                    .replace(/'/g, "")
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-+|-+$/g, "");
                  return (
                    <li key={slug}>
                      <Link
                        to={`/terraplanagem-${slug}`}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
