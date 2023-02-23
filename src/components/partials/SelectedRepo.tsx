import { useStore } from "helpers/store";
import { getContent, getRepo } from "helpers/githubRest";
import { FiFile, FiFolder } from "react-icons/fi";

interface Props {
  data: any;
}
export const SelectedRepo: React.FC<Props> = ({ data }) => {
  const repo = useStore((state: any) => state.gitHub.repo);
  const repos = useStore((state: any) => state.gitHub.repos);
  const setData = useStore((state: any) => state.setAttr);
  const selectedRepo = useStore((state: any) => state.gitHub.selectedRepo);
  return (
    <div className="flex flex-col text-sm">
      <p className="p-3 border-b bg-emerald-600 text-white">Selected repo</p>

      {repo.map((el: any, i: number) => {
        return (
          <div
            onClick={() => {
              if (el.type == "file")
                getContent(data, repos[selectedRepo]?.name, el.path, setData);
              if (el.type == "dir") {
                getRepo(data, repos[selectedRepo]?.name, el.path, setData);
              }
            }}
            key={i}
            className="p-3 border-b hover:bg-stone-200 cursor-pointer truncate flex items-center gap-1.5"
          >
            {el?.type == "file" ? (
              <span className="text-emerald-600">
                <FiFile className="fill-emerald-100" />
              </span>
            ) : (
              <span className="text-yellow-600">
                <FiFolder className="fill-yellow-100" />
              </span>
            )}
            {el?.name}
          </div>
        );
      })}
    </div>
  );
};
