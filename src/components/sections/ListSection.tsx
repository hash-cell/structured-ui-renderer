import type { ListItem, ListSection } from "../../types";

interface Props {
    section: ListSection;
}

function renderItem(item: ListItem, idx: number) {
    if (typeof item === "string") {
        return <li key={idx}>{item}</li>
    }
    return <li key={idx}>{item.text}</li>
}

export default function ListSection({ section }: Props) {
    if (!section.items?.length) return null;

    return (
        <ul>
            {section.items.map((item, idx) => renderItem(item, idx))}
        </ul>
    );
}
