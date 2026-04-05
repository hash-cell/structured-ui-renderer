import type { TextSection } from "../../types";

interface Props {
    section: TextSection;
}

export default function TextSection({ section }: Props) {
    const content = section.content ?? section.body;

    if (!content) return null;
    
    return <p>{content}</p>;
}