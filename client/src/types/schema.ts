export interface AppConfig {
  "app-theme": string;
  "logo-url": string;
  schemaVersion: string;
  screens: Screen[];
}

export interface Screen {
  id: string;
  "heading-text": string;
  is_main: boolean;
  widgets: Widget[];
}

export interface Widget {
  id: string;
  type: "LABEL-INPUT" | "BUTTON" | "LABEL-LABEL" | "PAYMENT_BUTTONS";
  hidden?: boolean;
  "split-payment"?: boolean;
  "ui-meta": WidgetUIMeta | null;
  targets?: Target[];
}

export interface WidgetUIMeta {
  "label-text"?: string;
  "input-hint"?: string;
  "input-constraints"?: InputConstraints;
  "text-left"?: string;
  "text-right"?: TextValue;
  text?: TextValue;
}

export interface InputConstraints {
  "input-type": string;
  minLen?: number;
  maxLen?: number;
  "custom-constraint"?: string | null;
  "input-error-message"?: string;
}

export interface TextValue {
  value: string;
  type: "VALUE" | "STORE";
}

export interface Target {
  key?: string | null;
  target: string;
  type: "STORE" | "API" | "NAVIGATION";
  params?: any;
  id?: string | null;
}

export interface ValidationError {
  message: string;
  line?: number;
  column?: number;
}
