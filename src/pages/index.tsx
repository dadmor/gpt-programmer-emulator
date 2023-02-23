import { UserCard, ReposList, SelectedRepo, GptTaggingButton } from "components/partials";
import { getRepos } from "helpers/githubRest";
import Link from "next/link";

import { useStore } from "helpers/store";

// @ts-ignore
const Index: React.FC = ({ data }) => {
  /*
      View render
    */
  // const [repos, setRepos]: any = useState([]);
  // const [repo, setRepo]: any = useState([]);
  // const [content, setContent]: any = useState({});
  // const [selectedRepo, setSelectedRepo]: any = useState(null);
  // const [selectedContent, setSelectedContent] = useState({});
  // const [gptTags, setGptTags] = useState("");

  const setData = useStore((state: any) => state.setAttr);
  const repos = useStore((state: any) => state.gitHub.repos);
  const selectedRepo = useStore((state: any) => state.gitHub.selectedRepo);
  const content = useStore((state: any) => state.gitHub.content);
  const gptTags = useStore((state: any) => state.gpt.gptTags);


  return (
    <div className="p-3 flex gap-3 h-screen">
      {data.login ? (
        <>
          <div className="flex flex-col gap-2 w-1/6"> 
            <UserCard data={data} />
            <div>Select Repo to analyzer</div>
            <button
              onClick={() => getRepos(data, setData)}
              className="border rounded p-1.5 bg-blue-100 hover:bg-blue-50 "
            >
              Loading reposx
            </button>
            <ReposList data={data} />
          </div>

          <div className="border w-1/6 overflow-y-scroll">
            <SelectedRepo data={data}/>
          </div>
          <div className="w-4/6 h-full flex flex-col">
            <div className="p-3 bg-stone-900 text-stone-400">{content?.path ? content?.path : "path not loaded"}</div>
            <div className="p-3 text-xs bg-stone-700 text-emerald-300 font-mono h-[40vh] overflow-y-scroll">
              {/* // @ts-ignore */}
              {content?.content ? atob(content?.content) : "content not loaded"}
            </div>
            <div className="bg-stone-200 p-3 flex gap-1.5">
              
              <GptTaggingButton data={data}/>
              <button className="text-sm border text-emerald-700 border-emerald-600 rounded py-1.5 px-3 hover:bg-emerald-700 hover:bg-opacity-20">
                GPT Methods
              </button>
              <button className="text-sm border text-emerald-700 border-emerald-600 rounded py-1.5 px-3 hover:bg-emerald-700 hover:bg-opacity-20">
                GPT Short
              </button>
              <button className="text-sm border text-emerald-700 border-emerald-600 rounded py-1.5 px-3 hover:bg-emerald-700 hover:bg-opacity-20">
                GPT Components
              </button>
             
            </div>
            {gptTags && (
                <div className="bg-stone-200 flex justify-between border border-stone-400 py-1.5 px-3 rounded mt-1.5 bg-stone-50">
                  <div>{gptTags}</div>
                  <div className="text-white rounded bg-blue-400 px-3 h-min curesor-pointer">+&nbsp;update</div>
                </div>
              )}
            <div className="flex-1 border mt-3">
              <div className="py-1.5 px-3 bg-stone-100 border-b">
                Insert issue for <b>{repos.length && selectedRepo ? repos[selectedRepo]?.name : ''}</b>
              </div>
              <textarea className="w-full h-max"></textarea>
            </div>
          </div>
        </>
      ) : (
        <div className="p-3 text-blue underline">
          <Link href="/login">Login</Link>
        </div>
      )}
    </div>
  );
};

// @ts-ignore
export async function getServerSideProps({ query }) {
  const firstStep = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_ID,
      client_secret: process.env.GITHUB_SECRET,
      code: query.code,
      // redirect_uri: callbackUrl
    }),
  });

  const token = await firstStep.json();
  if (!token.access_token) {
    return { props: { data: { error: "faking booo" } } };
  }
  const secondStep = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `token ${token.access_token}`,
      Accept: "application/vnd.github.v3+json",
    },
  });
  const user = await secondStep.json();
  return {
    props: { data: { ...user, token: token.access_token, gptKey: process.env.OPENAI_API_KEY } },
  };
}

export default Index;
