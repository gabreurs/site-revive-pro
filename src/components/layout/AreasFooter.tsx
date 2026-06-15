import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, ChevronDown } from "lucide-react";
import { REGIONS, slugifyBairro } from "@/lib/bairros";
import { getWhatsAppUrl, getExternalLinkTarget, trackWhatsAppConversion } from "@/lib/constants";

const PREVIEW_COUNT = 10;

export function AreasFooter() {
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <section
      id="areas-atendimento"
      aria-labelledby="areas-atendimento-title"
      className="border-b border-white/5"
    >
      <div className="container-custom py-12 md:py-16">
        <div className="mb-8 md:mb-10 max-w-3xl">
          <h2
            id="areas-atendimento-title"
            className="font-heading text-xl md:text-2xl font-bold text-white"
          >
            Onde atuamos
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            Terraplanagem, escavação e movimentação de terra em toda a Grande São Paulo, interior e litoral.
          </p>
          <p className="mt-2 text-sm text-gray-400">
            Não encontrou sua região na lista?{" "}
            <a
              href={getWhatsAppUrl("Olá! Gostaria de saber se atendem a minha região.")}
              target={getExternalLinkTarget()}
              rel="noopener noreferrer"
              onClick={trackWhatsAppConversion}
              data-cta="whatsapp"
              data-location="areas-footer"
              className="text-primary hover:underline"
            >
              Fale com a gente
            </a>{" "}
            — atendemos toda a Grande São Paulo, interior e litoral.
          </p>
        </div>

        <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {REGIONS.map((r) => {
            const isOpen = openKey === r.key;
            const isLarge = r.bairros.length > 16;
            const visible = isOpen ? r.bairros : r.bairros.slice(0, PREVIEW_COUNT);
            const hasMore = r.bairros.length > PREVIEW_COUNT;

            return (
              <div
                key={r.key}
                className="rounded-lg border border-white/5 bg-white/[0.02] p-4 md:p-5"
              >
                <h3 className="mb-3 flex items-center gap-2 border-b border-white/10 pb-2 text-xs font-semibold uppercase tracking-wider text-primary">
                  <MapPin className="h-3.5 w-3.5" />
                  {r.label}
                  <span className="ml-auto text-[11px] font-normal text-gray-400">
                    {r.bairros.length}
                  </span>
                </h3>

                <ul
                  className={
                    isLarge && isOpen
                      ? "columns-2 gap-x-4 [column-fill:_balance]"
                      : ""
                  }
                  style={{ lineHeight: 1.7 }}
                >
                  {visible.map((name) => {
                    const slug = slugifyBairro(name);
                    return (
                      <li key={slug} className="break-inside-avoid">
                        <Link
                          to={`/terraplanagem-${slug}`}
                          className="text-[13px] text-gray-300 transition-colors hover:text-primary"
                        >
                          {name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                {hasMore && (
                  <button
                    type="button"
                    onClick={() => setOpenKey(isOpen ? null : r.key)}
                    aria-expanded={isOpen}
                    className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                  >
                    {isOpen ? "Ver menos" : `Ver todos (${r.bairros.length})`}
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
