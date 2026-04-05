//Itens de lista podem ser string ou objeto estruturado
export type ListItem = 
  | string
  | { text: string; meta?: string; deprecatedLabel?: string };

// Seções conhecidas cada uma com seu type
export type TextSection = {
    type: "text";
    content?: string;
    body?: string; // campo legado
    id?: string;
};

export type ListSection = {
    type: "list";
    items: ListItem[] | null;
    id?: string;
};

export type HighlightSection = {
    type: "highlight";
    content: string;
    id?: string;
};

export type CalloutSection = {
    type: "callout";
    content: string;
    severity?: "info" | "warning" | "error";
    icon?: string;
    id?: string;
};

export type MetricSection = {
    type: "metric";
    label: string;
    value: string | number;
    id?: string;
}

// Seçao desconhecida, qualquer tipo nao mapeado
export type UnknownSection = {
    type: string;
    id?: string;
    [key: string]: unknown;
};

//Seçao sem type
export type UntypedSection = {
    type?: undefined;
    id?: string;
    [key: string]: unknown;
};

// Uniao de todas as sections
export type Section = 
  | TextSection
  | ListSection
  | HighlightSection
  | CalloutSection
  | MetricSection
  | UnknownSection
  | UntypedSection;

// Payload principal
export type ResultData = {
    title?: string;
    sections?: Section[] | null;
};