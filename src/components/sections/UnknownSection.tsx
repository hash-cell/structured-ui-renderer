import type { UnknownSection } from "../../types";

interface Props {
    section: UnknownSection;
}

export default function UnknownSection({ section}: Props) {
    return (
        <div className="border border-dashed border-gray-300 p-3 my-2 text-sm text-gray-400">
            Unsupported section type "{section.type}"
        </div>
    )
}