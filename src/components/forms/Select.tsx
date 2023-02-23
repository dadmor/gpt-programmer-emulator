import { FiChevronDown, FiX } from "react-icons/fi";
import { useRef, useState } from "react";
import { useStore } from "helpers/store";
import { formGet, formSet, fieldKey } from "helpers/stateForm";

interface Props {
  className?: string;
  label?: string;
  required?: boolean;
  form: any;
  multi?: boolean;
  properties: any;
  size?: string;
}

interface Open {
  open: boolean;
}

export const Select: React.FC<Props> = ({
  className = "",
  label = "",
  children,
  required = false,
  form,
  multi,
  properties,
  size = "",
}) => {
  const wrapperRef = useRef(null);

  const setAttr = useStore((state: any) => state.setAttr);
  const dropdown = useStore((state: any) => state.theme.dropdown);

  return (
    <div className={`${size === "compact" ? "" : "p-2 "} w-full relative`}>
      {dropdown === form[0] && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-900 z-10 opacity-10 pointer-events-none"></div>
      )}
      <div
        className={`w-full relative ${className}  ${
          dropdown === form[0] ? "z-10" : null
        }`}
      >
        {label && (
          <label
            className={`${
              size === "compact"
                ? "block bg-slate-700 border-l border-r border-slate-900 px-2 py-1 "
                : "px-2.5"
            }   w-full  cursor-pointer`}
          >
            {label}
            {required && <span> *</span>}
          </label>
        )}

        {/* dropdown input */}
        <div
          onClick={() => {
            setAttr({
              path: "theme.dropdown",
              value: form[0],
            });
          }}
          className={`${
            dropdown == form[0] ? "bg-slate-900" : "bg-slate-700"
          } w-full p-2.5 text-sm  border border-slate-900 shadow-inner  bg-opacity-50 flex justify-between items-center`}
        >
          <div className="flex gap-2 items-center">
            {!multi ? (
              <div className="py-px text-xs">
                {
                  properties[1][properties[0]].find(
                    (o: { value: any }) => o.value === form[1][form[0]]
                  )?.label
                }
              </div>
            ) : form[1][form[0]].length ? (
              <></>
            ) : (
              //   form[1][form[0]].map((el: any, i: number) => (
              //     <div key={i} className="border rounded px-2 py-px bg-blue-50">
              //       {el.label}
              //     </div>
              //   ))
              <div className="py-px border border-white">&nbsp;</div>
            )}
          </div>
          <FiChevronDown />
        </div>

        {/* dropdown body */}
        {dropdown == form[0] && (
          <div ref={wrapperRef} className="absolute z-30 top-7 pt-9 w-full">
            <div
              onClick={() => {
                setAttr({
                  path: "theme.dropdown",
                  value: false,
                });
              }}
              className="absolute right-2 top-1.5 p-1 mt-px rounded bg-slate-600 cursor-pointer hover:bg-slate-800"
            >
              <FiX />
            </div>

            <div className="bg-slate-700 outline outline-slate-800">
              {properties[1][properties[0]]?.length
                ? properties[1][properties[0]].map((el: any, i: number) => (
                    <div
                      onClick={() => {
                        form[2]({ ...form[1], [form[0]]: el.value });
                        setAttr({
                          path: "theme.dropdown",
                          value: false,
                        });
                      }}
                      className="cursor-pointer p-2.5 border-b border-slate-800 hover:bg-slate-500 hover:bg-opacity-50"
                      key={i}
                    >
                      {el.label}
                    </div>
                  ))
                : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
