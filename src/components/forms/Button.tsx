interface Props {
  className?: string;
  onClick?: any;
  selectedState?: boolean;
  width?: string;
  title?: string;
}
export const Button: React.FC<Props> = ({
  className = "",
  children,
  onClick,
  selectedState = false,
  width = "",
  title="button"
}) => (
  <button
    onClick={onClick}
    title={title}
    aria-label="Button"
    className={`${className} ${selectedState ? "bg-sky-800" : "bg-sky-900"} ${
      width == "max" ? "w-max" : " w-full"
    }  cursor-pointer rounded border-b border-gray-900 p-3 text-yellow-600  hover:bg-sky-700`}
  >
    {children}
  </button>
);
export default Button;
