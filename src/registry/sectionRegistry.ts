import { type ComponentType } from "react";
import type { Section } from "../types";
import TextSection from "../components/sections/TextSection";
import ListSection from "../components/sections/ListSection";
import HighlightSection from "../components/sections/HighlightSection";
import CalloutSection from "../components/sections/CalloutSection";
import MetricSection from "../components/sections/MetricSection";
import UnknownSection from "../components/sections/UnknownSection";

export type SectionRenderer<T extends Section = Section> = ComponentType<{ section: T }>;

const registry = new Map<string, SectionRenderer<any>>();

export function registerSection<T extends Section>(
  type: string,
  component: SectionRenderer<T>
): void {
  registry.set(type, component);
}

export function getRenderer(type: string | undefined): SectionRenderer | undefined {
  if (!type) return undefined;
  return registry.get(type);
}

registerSection("text", TextSection);
registerSection("list", ListSection);
registerSection("highlight", HighlightSection);
registerSection("callout", CalloutSection);
registerSection("metric", MetricSection);

export { UnknownSection };