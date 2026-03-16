import React from "react";

interface LessonCardProps {
  index: number;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  category: string;
  slug: string;
}

const difficultyStyles: Record<string, string> = {
  easy: "bg-green-100 text-green-800",
  medium: "bg-amber-100 text-amber-800",
  hard: "bg-rose-100 text-rose-800",
};

const LessonCard: React.FC<LessonCardProps> = ({
  index,
  title,
  description,
  difficulty,
  category,
  slug,
}) => {
  return (
    <a
      href={`/lessons/${slug}`}
      className="group relative flex flex-col bg-card text-card-foreground border border-border rounded-xl p-6 overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-primary/30 no-underline"
    >
      {/* Top accent bar */}
      <span className="absolute top-0 left-0 right-0 h-[3px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-t-xl" />

      {/* Card header row */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <span className="text-[11px] font-bold tracking-widest uppercase text-primary bg-secondary px-2.5 py-1 rounded-full whitespace-nowrap">
          Lesson {String(index).padStart(2, "0")}
        </span>
        <span
          className={`text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full whitespace-nowrap ${difficultyStyles[difficulty]}`}
        >
          {difficulty}
        </span>
      </div>

      {/* Category eyebrow */}
      <p className="text-[10.5px] font-bold tracking-widest uppercase text-primary mb-1.5">
        {category}
      </p>

      {/* Title */}
      <h3 className="font-serif text-base font-bold leading-snug text-card-foreground mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
        {description}
      </p>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
        <span className="text-[10px] text-muted-foreground">
          Study guide available
        </span>
        <span className="text-primary text-base transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </div>
    </a>
  );
};

export default LessonCard;
