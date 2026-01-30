import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  variant?: "default" | "large";
}

export function ServiceCard({ id, title, description, image, variant = "default" }: ServiceCardProps) {
  const isLarge = variant === "large";

  return (
    <Link
      to={`/servicos/${id}`}
      className={`group relative overflow-hidden rounded-lg ${
        isLarge ? "aspect-[4/3] md:aspect-[16/9]" : "aspect-[4/3]"
      }`}
    >
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="service-card-overlay absolute inset-0 flex flex-col justify-end p-6">
        <h3 className={`font-bold text-white ${isLarge ? "text-2xl md:text-3xl" : "text-xl"}`}>
          {title}
        </h3>
        <p className="mt-2 text-sm text-gray-200 line-clamp-2">{description}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors group-hover:text-white">
          Contrate este serviço
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
