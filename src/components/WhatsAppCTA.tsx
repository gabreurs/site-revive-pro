import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getExternalLinkTarget, getWhatsAppUrl, trackWhatsAppConversion } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface WhatsAppCTAProps {
  label?: string;
  message?: string;
  locationTag?: string;
  variant?: "default" | "outline" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg";
  className?: string;
  icon?: "phone" | "message";
  fullWidth?: boolean;
}

export function WhatsAppCTA({
  label = "Solicitar Orçamento",
  message,
  locationTag = "geral",
  variant = "default",
  size = "default",
  className,
  icon = "phone",
  fullWidth = false,
}: WhatsAppCTAProps) {
  const Icon = icon === "message" ? MessageCircle : Phone;
  const target = getExternalLinkTarget();

  return (
    <Button asChild variant={variant} size={size} className={cn("gap-2", fullWidth && "w-full", className)}>
      <a
        href={getWhatsAppUrl(message)}
        target={target}
        rel="noopener noreferrer"
        data-cta="whatsapp"
        data-location={locationTag}
        onClick={trackWhatsAppConversion}
      >
        <Icon className="h-4 w-4" />
        {label}
      </a>
    </Button>
  );
}
