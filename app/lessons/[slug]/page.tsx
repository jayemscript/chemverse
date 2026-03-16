import { notFound } from "next/navigation";
import { readFileSync } from "fs";
import path from "path";
import lessons from "@/data/lessons.json";

// ISR — revalidate every 60 seconds
export const revalidate = 60;

// Pre-build all slug routes at build time
export async function generateStaticParams() {
  return lessons.map((lesson) => ({ slug: lesson.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const lesson = lessons.find((l) => l.slug === params.slug);
  if (!lesson) return {};
  return {
    title: lesson.title,
    description: lesson.description,
  };
}

function getLessonContent(slug: string) {
  try {
    const filePath = path.join(
      process.cwd(),
      "data",
      "lessons",
      `${slug}.json`,
    );
    const raw = readFileSync(filePath, "utf-8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export default function LessonSlugPage({
  params,
}: {
  params: { slug: string };
}) {
  const lesson = getLessonContent(params.slug);

  if (!lesson) notFound();

  const difficultyColor: Record<string, string> = {
    easy: "bg-green-100 text-green-800",
    medium: "bg-amber-100 text-amber-800",
    hard: "bg-rose-100 text-rose-800",
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <p className="text-xs text-muted-foreground mb-6">
        <a href="/lessons" className="hover:text-primary transition-colors">
          Lessons
        </a>{" "}
        / {lesson.category}
      </p>

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] font-bold tracking-widest uppercase text-primary bg-secondary px-2.5 py-1 rounded-full">
            {lesson.category}
          </span>
          <span
            className={`text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full ${difficultyColor[lesson.difficulty]}`}
          >
            {lesson.difficulty}
          </span>
        </div>
        <h1 className="font-serif text-3xl font-bold text-foreground leading-tight mb-3">
          {lesson.title}
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {lesson.description}
        </p>
      </div>

      {/* Sections */}
      {lesson.sections?.length > 0 && (
        <div className="space-y-8 mb-12">
          {lesson.sections.map((section: any, i: number) => (
            <div key={i}>
              <h2 className="font-serif text-lg font-bold text-foreground mb-2">
                {section.heading}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {section.body}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Key Terms */}
      {lesson.keyTerms?.length > 0 && (
        <div className="mb-12">
          <h2 className="font-serif text-xl font-bold text-foreground mb-4">
            Key Terms
          </h2>
          <div className="divide-y divide-border border border-border rounded-xl overflow-hidden">
            {lesson.keyTerms.map((item: any, i: number) => (
              <div key={i} className="flex gap-4 px-5 py-3 bg-card">
                <span className="text-sm font-bold text-primary min-w-[130px]">
                  {item.term}
                </span>
                <span className="text-sm text-muted-foreground">
                  {item.definition}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* References */}
      {lesson.references?.length > 0 && (
        <div className="mb-12">
          <h2 className="font-serif text-xl font-bold text-foreground mb-4">
            References
          </h2>
          <ul className="space-y-2">
            {lesson.references.map((ref: string, i: number) => (
              <li
                key={i}
                className="text-sm text-muted-foreground flex items-start gap-2"
              >
                <span className="text-primary mt-0.5">—</span>
                {ref}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Back */}
      <div className="pt-6 border-t border-border">
        <a
          href="/lessons"
          className="text-sm text-primary hover:underline font-semibold"
        >
          ← Back to all lessons
        </a>
      </div>
    </div>
  );
}
