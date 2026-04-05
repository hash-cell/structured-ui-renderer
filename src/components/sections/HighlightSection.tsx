import type { HighlightSection } from "../../types";

interface Props {
    section: HighlightSection;
}

export default function HighlightSection({ section }: Props) {
    if (!section.content) return null;

    return <strong>{section.content}</strong>
}