
import { useRef, useState } from "react";
import { FiCpu, FiHelpCircle } from "react-icons/fi";
import { LoaderCircle } from "components/partials";
import { Input } from "components/forms";
interface FormDataType {
  description: string;
}


export const ChatWidget: React.FC = () => {

  const windowRef = useRef();
  const [formData, setFormData] = useState<FormDataType>({
    description: "",
  });
  const [chat, setChat] = useState([]) as any;
  const [result, setResult] = useState();
  const [processing, setProcessing] = useState(false);

  const token = localStorage.getItem("strangelogin");
  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const question = {description: `HEY AI, give me: ${formData.description}`, mode:'user' }
    setProcessing(true)
    setChat([...chat, question]);

    setTimeout(function () {
      if (
        // @ts-ignore
        windowRef?.current?.scrollHeight &&
        // @ts-ignore
        windowRef?.current?.scrollHeight
      ) {
        // @ts-ignore
        windowRef.current.scrollTop = windowRef.current.scrollHeight;
      }
    }, 50);

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: formData.description,
        gptKey: "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",
      }),
    });
    const data = await response.json();
    console.log("data", data.result);
   

    setResult(data.result);
    setChat([...chat, question, {description: "I've some code for U", mode:'computer' }]);
    setProcessing(false)
    setFormData({ description: "" });

  };

  return (
    <div className="relative">
      {chat.length ? (
        <div
          // @ts-ignore
          ref={windowRef}
          className="scroll-smooth p-3 flex flex-col gap-px max-h-[40vh] overflow-y-scroll scrollbar scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800"
        >
          {chat.map((el: any, i: number) => (
           
            <div key={i}>{el.mode}{el.description}</div>
          ))}
        </div>
      ) : null}

      <form onSubmit={onSubmitHandler} className="p-3 flex gap-3">
        <div className="w-9 text-2xl flex items-center justify-end">
          <FiHelpCircle />
        </div>
        <div className="w-4/5  flex items-center">
          <Input
            bottomSpace={false}
            placeholder="Hey human! Say what kind of code YOU want to see"
            form={["description", formData, setFormData]}
          ></Input>
        </div>
        <div className="flex-1">
          <button>
            <div className="flex justify-center items-center gap-2">
              <FiCpu /> DO IT AI
            </div>
          </button>
        </div>
      </form>
      {processing && (
        <div className="grid items-center justify-center absolute w-full h-16  bottom-0 bg-slate-800 opacity-80">
          <div className="flex -mt-3">
            <LoaderCircle /> Waiting for AI
          </div>
        </div>
      )}
    </div>
  );
};