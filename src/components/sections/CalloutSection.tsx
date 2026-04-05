import type { CalloutSection } from "../../types";

interface Props {
  section: CalloutSection;
}

const severityStyles: Record<NonNullable<CalloutSection["severity"]>, string> = {
  info: "border-blue-500 bg-blue-50 text-blue-800",
  warning: "border-yellow-500 bg-yellow-50 text-yellow-800",
  error: "border-red-500 bg-red-50 text-red-800",
};

const iconMap: Record<string, string> = {
  alert: "⚠️",
  info: "ℹ️",
  error: "❌",
};

export default function CalloutSection({ section }: Props) {
  if (!section.content) return null;

  const style = severityStyles[section.severity ?? "info"];
  const icon = section.icon ? iconMap[section.icon] ?? "💬" : null;

  return (
    <div className={`border-l-4 p-3 my-2 ${style}`}>
      {icon && <span className="mr-2">{icon}</span>}
      {section.content}
    </div>
  );
}