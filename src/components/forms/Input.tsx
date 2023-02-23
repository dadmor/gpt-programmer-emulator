import { formGet, formSet, fieldKey } from "helpers/stateForm";

interface Props {
  form: any[];
  type?: string;
  bottomSpace?: boolean;
  placeholder?: string;
  padding?:string;

}
export const Input: React.FC<Props> = ({
  placeholder,

  form,
  bottomSpace = true,
  type = "text",
  padding="p-3"
}) => {
  return (
    <input
   
      placeholder={placeholder}
      className={`outline-0 placeholder-slate-500 text-xs border border-slate-900 shadow-inner bg-slate-700 bg-opacity-50 w-full ${
        bottomSpace ? "mb-3" : ""
      } ${padding}`}
      id={fieldKey(form)}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        formSet(form, e.target.value)
      }
      value={formGet(form)}
      type={type}
    />
  );
};
export default Input;
