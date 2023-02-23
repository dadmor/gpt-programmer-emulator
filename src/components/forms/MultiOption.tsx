interface Props {
  className?: string;
  value: string;
  form: [string, any, any];
}
export const MultiOption: React.FC<Props> = ({
  className = "",
  children,
  value = "",
  form,
}) => {
  return (
    <label
      className={`${className} ${
        form[1][form[0]].includes(value) ? "bg-blue-50" : "bg-white"
      } flex items-center border-t  cursor-pointer`}
      htmlFor={`${form[0]}_${value}`}
    >
      <input
        className="my-3 ml-3 w-4 h-4"
        id={`${form[0]}_${value}`}
        type="checkbox"
        defaultValue={value}
        defaultChecked={form[1][form[0]].includes(value)}
        onClick={(e: any) => {
          if (e.target.checked) {
            const newArray = new Array(0), newForm = Object.assign({}, form[1])
            form[1][form[0]].map((el:any)=>newArray.push(el))
            newArray.push(value)
            newForm[form[0]] = newArray
            form[2](newForm)
          } else {
            let out = Object.assign({}, form[1])
            out[form[0]] = form[1][form[0]].filter(
              (e: string) => e !== value
            );
            form[2](out);
          }
        }}
      />
      <div className="p-3">{children}</div>
    </label>
  );
};
