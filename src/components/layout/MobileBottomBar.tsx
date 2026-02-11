import { Phone, MessageCircle } from "lucide-react";
import { getExternalLinkTarget, getWhatsAppUrl, trackWhatsAppConversion, COMPANY_INFO } from "@/lib/constants";

export function MobileBottomBar() {
  const target = getExternalLinkTarget();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex lg:hidden border-t border-border bg-background/95 backdrop-blur-md safe-bottom">
      <a
        href={getWhatsAppUrl()}
        target={target}
        rel="noopener noreferrer"
        data-cta="whatsapp"
        data-location="mobile-bottom-bar"
        onClick={trackWhatsAppConversion}
        className="flex flex-1 items-center justify-center gap-2 py-3 text-sm font-semibold text-white bg-whatsapp active:bg-whatsapp/90 transition-colors"
      >
        <MessageCircle className="h-5 w-5" />
        WhatsApp
      </a>
      <a
        href={`tel:+${COMPANY_INFO.phone.replace(/\D/g, "")}`}
        className="flex flex-1 items-center justify-center gap-2 py-3 text-sm font-semibold text-primary bg-background active:bg-muted transition-colors"
      >
        <Phone className="h-5 w-5" />
        Ligar
      </a>
    </div>
  );
}
