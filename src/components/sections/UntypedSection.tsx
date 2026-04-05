import type { UntypedSection } from "../../types";

interface Props {
    section: UntypedSection;
}

export default function UntypedSection({ section }: Props) {
    const content = "content" in section ? String(section.content) : null;
    
    return (
        <div className="border border-dashed border-gray-300 p-3 my-2 text-sm text-gray-400">
            {content ?? "Section with missing type field"}
        </div>
    );
}