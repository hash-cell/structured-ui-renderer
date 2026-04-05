import type { MetricSection } from "../../types";

interface Props {
    section: MetricSection;
}

export default function MetricSection({ section }: Props) {
    if (!section.label || section.value === undefined) return null;

    return (
        <div className="flex flex-col p-3 my-3 border rounded">
            <span className="text-sm text-gray-500">{section.label}</span>
            <span className="text-2x1 font-bold">{section.value}</span>
        </div>
    )
}