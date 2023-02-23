

interface Props {
  className?: string;
  label?: string;
  form: any[];
  type?: string;
  icon?: any;
}
export const CheckBox: React.FC<Props> = ({
  className = "",
  label = "",
  icon,
  form,
  type = "text",
}) => {
  return (
    <div className="flex items-center mb-3">
      <input
        
        id="disabled-checkbox"
        type="checkbox"
        value=""
        className={`w-5 h-5 text-blue-700 bg-slate-600 accent-slate-200 opacity-25 rounded border-gray-300`}
      />
      <label
        htmlFor="disabled-checkbox"
        className="ml-2 text-sm font-medium"
      >
        {label}
      </label>
    </div>
  );
};
