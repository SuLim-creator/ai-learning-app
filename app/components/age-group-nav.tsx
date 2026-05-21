import Link from "next/link";

export type AgeGroup = "kids" | "teens" | "adult";

const GROUPS: {
  id: AgeGroup;
  emoji: string;
  label: string;
  href: string;
}[] = [
  { id: "kids", emoji: "🧒", label: "초등", href: "/learn/kids" },
  { id: "teens", emoji: "🧑‍🎓", label: "중고등", href: "/learn/teens" },
  { id: "adult", emoji: "👨‍💼", label: "성인", href: "/learn/adult" },
];

export function AgeGroupNav({ active }: { active: AgeGroup }) {
  return (
    <div className="flex items-center gap-1 rounded-full bg-gray-800/80 p-1">
      {GROUPS.map((g) => (
        <Link
          key={g.id}
          href={g.href}
          className={`flex-1 rounded-full px-3 py-1.5 text-center text-xs font-medium transition-colors ${
            active === g.id
              ? "bg-indigo-600 text-white"
              : "text-gray-400 hover:text-gray-200"
          }`}
        >
          <span className="mr-1">{g.emoji}</span>
          {g.label}
        </Link>
      ))}
    </div>
  );
}
