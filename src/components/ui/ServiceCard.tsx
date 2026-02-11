import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  variant?: "default" | "large";
}

export function ServiceCard({ slug, title, description, image, variant = "default" }: ServiceCardProps) {
  const isLarge = variant === "large";

  return (
    <Link
      to={`/servicos/${slug}`}
      className={`group relative block overflow-hidden rounded-xl ${
        isLarge ? "aspect-[16/10]" : "aspect-[4/3]"
      }`}
    >
      {/* Image with controlled zoom on hover */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={image}
          alt={`Serviço de ${title} em São Paulo - SMS Terraplenagem`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </div>
      {/* Overlay */}
      <div className="service-card-overlay absolute inset-0 flex flex-col justify-end p-5 md:p-6 transition-all">
        <h3 className={`font-bold text-white ${isLarge ? "text-xl md:text-2xl" : "text-lg"}`}>
          {title}
        </h3>
        <p className="mt-1.5 text-sm text-gray-300 line-clamp-2">{description}</p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors group-hover:text-white">
          Contrate este serviço
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
