interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export function SectionHeading({ title, subtitle, centered = false, light = false }: SectionHeadingProps) {
  return (
    <div className={`mb-10 md:mb-12 ${centered ? "text-center" : ""}`}>
      <h2 className={`font-heading text-3xl font-bold md:text-4xl ${light ? "text-white" : "text-foreground"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-3 text-lg ${light ? "text-gray-300" : "text-muted-foreground"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
