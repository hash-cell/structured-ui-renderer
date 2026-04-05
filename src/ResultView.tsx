import type { ResultData, Section } from "./types";
import { getRenderer, UnknownSection } from "./registry/sectionRegistry";
import UntypedSection from "./components/sections/UntypedSection";

interface Props {
  data: ResultData;
}

function renderSection(section: Section, idx: number) {
  const key = section.id ?? idx;

  if (!section.type) {
    return <UntypedSection key={key} section={section as any} />;
  }

  const Renderer = getRenderer(section.type);

  if (!Renderer) {
    return <UnknownSection key={key} section={section as any} />;
  }

  return <Renderer key={key} section={section as any} />;
}

/** 
 * Starter view: wired to `data` in mockData—payloads are intentionally inconsistent; 
 * many cases unhandled here.
 */
export default function ResultView({ data }: Props) {
    if (!data) return null;

    return (
      <div>
        {data.title && <h1>{data.title}</h1>}
        {data.sections?.map((section, idx) => renderSection(section, idx))}
      </div>
    );
}
