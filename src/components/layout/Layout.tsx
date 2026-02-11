import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppPopup } from "./WhatsAppPopup";
import { MobileBottomBar } from "./MobileBottomBar";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col has-bottom-bar">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppPopup />
      <MobileBottomBar />
    </div>
  );
}
