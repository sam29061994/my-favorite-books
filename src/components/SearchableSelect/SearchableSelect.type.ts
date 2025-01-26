export interface SearchableSelectProps<T> {
  label: string;
  options: T[];
  selected?: T;
  onChange: (value?: T) => void;
  disabled?: boolean;
}
