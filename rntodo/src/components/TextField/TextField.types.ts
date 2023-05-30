export interface ITextFieldProps {
  onSubmit?: (text: string) => void;
  initialValue?: string;
  onChangeText?: (text: string) => void;
}
