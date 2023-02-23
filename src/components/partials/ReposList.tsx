import { useStore } from "helpers/store";
import { getRepo } from "helpers/githubRest";
interface Props {
  data: any;
}
export const ReposList: React.FC<Props> = ({ data }) => {
  const repos = useStore((state: any) => state.gitHub.repos);
  const setData = useStore((state: any) => state.setAttr);
  const selectedRepo = useStore((state: any) => state.gitHub.selectedRepo);
  const path = '/'
  return (
    <div className="border text-sm">
      {repos.map((el: any, i: number) => {
        return (
          <div
            onClick={() => {
              console.log('ToGetRepo',data, el.name, path, setData)
              getRepo(data, el.name, path, setData);
              
              setData({ path: "gitHub.selectedRepo", value: i });
            }}
            key={i}
            className={`p-3 border-b hover:bg-stone-200 cursor-pointer ${
              selectedRepo == i && "bg-emerald-100"
            }`}
          >
            {el?.name}
          </div>
        );
      })}
    </div>
  );
};
