import { useState, useEffect, useCallback } from "react";
import { X, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getExternalLinkTarget, getWhatsAppUrl, trackWhatsAppConversion } from "@/lib/constants";

const POPUP_DISMISS_KEY = "sms_whatsapp_popup_dismissed";
const DISMISS_DURATION = 24 * 60 * 60 * 1000; // 24h

export function WhatsAppPopup() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(POPUP_DISMISS_KEY);
    if (dismissed && Date.now() - parseInt(dismissed) < DISMISS_DURATION) return;

    const timer = setTimeout(() => {
      setShowPopup(true);
      if (typeof window !== "undefined" && (window as any).dataLayer) {
        (window as any).dataLayer.push({ event: "whatsapp_popup_view" });
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setShowPopup(false);
    localStorage.setItem(POPUP_DISMISS_KEY, Date.now().toString());
  };

  const togglePopup = useCallback(() => {
    setShowPopup((prev) => !prev);
  }, []);

  const handleCTAClick = () => {
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({ event: "whatsapp_popup_click" });
    }
    trackWhatsAppConversion();
  };

  return (
    <>
      {/* Floating button (toggle) */}
      <button
        type="button"
        onClick={togglePopup}
        className="whatsapp-float flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl md:h-16 md:w-16"
        aria-label="Abrir conversa no WhatsApp"
      >
        <MessageCircle className="h-7 w-7 md:h-8 md:w-8" />
      </button>

      {/* Popup card */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-36 right-4 z-50 w-72 overflow-hidden rounded-md bg-[#1a2332] shadow-2xl border border-white/10 md:bottom-24 md:right-6 md:w-80"
          >
            <div className="flex items-center justify-between bg-whatsapp px-4 py-3">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-white" />
                <span className="font-semibold text-white">WhatsApp</span>
              </div>
              <button
                type="button"
                onClick={dismiss}
                className="rounded-full p-1 text-white/80 hover:bg-white/20 hover:text-white transition-colors"
                aria-label="Fechar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-4">
              <div className="mb-3 rounded-lg bg-[#0d1520] p-3">
                <p className="text-sm text-white/90">
                  Precisa de orçamento? 👋
                </p>
                <p className="mt-1 text-sm text-white/70">
                  Fale com a SMS no WhatsApp.
                </p>
              </div>
              <a
                href={getWhatsAppUrl()}
                target={getExternalLinkTarget()}
                rel="noopener noreferrer"
                data-cta="whatsapp"
                data-location="popup"
                onClick={handleCTAClick}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-whatsapp/90"
              >
                Chamar no WhatsApp
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
