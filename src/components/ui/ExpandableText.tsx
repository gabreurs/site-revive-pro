import { useId, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

interface ExpandableTextProps {
  /** Conteúdo visível antes do clique. */
  preview: ReactNode;
  /** Restante do texto, revelado em "Continuar lendo". Renderizado no DOM (acessível ao Googlebot). */
  more: ReactNode;
  openLabel?: string;
  closeLabel?: string;
  className?: string;
}

/**
 * "Continuar lendo" minimalista — sem card, sem caixa. O conteúdo extra aparece
 * no mesmo fluxo logo abaixo do trecho visível. Sempre renderizado no HTML.
 */
export function ExpandableText({
  preview,
  more,
  openLabel = "Continuar lendo",
  closeLabel = "Mostrar menos",
  className = "",
}: ExpandableTextProps) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className={className}>
      {preview}
      <div id={id} hidden={!open} className="mt-4 space-y-4">
        {more}
      </div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={id}
        className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
      >
        {open ? closeLabel : openLabel}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
    </div>
  );
}
