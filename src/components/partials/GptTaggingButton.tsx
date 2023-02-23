import { useStore } from "helpers/store";
interface Props {
  data: any;
}
export const GptTaggingButton: React.FC<Props> = ({ data }) => {
  const content = useStore((state: any) => state.gitHub.content);
  const setData = useStore((state: any) => state.setAttr);
  return (
    <button
      onClick={async () => {
        console.log("gpt, start");
        
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: `generate list of hashtags separated witrh commas from this code: \`\`\`${atob(
              content?.content
            )}\`\`\``,
            gptKey: data?.gptKey,
          }),
        });
        const resdata = await response.json();
        setData({ path: "gpt.gptTags", value: resdata.result });
      }}
      className="text-sm border text-emerald-700 border-emerald-600 rounded py-1.5 px-3 hover:bg-emerald-700 hover:bg-opacity-20"
    >
      GPT Tagging
    </button>
  );
};
