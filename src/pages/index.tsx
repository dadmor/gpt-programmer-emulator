import Link from "next/link";
import { useState } from "react";

// @ts-ignore
const Index: React.FC = ({ data }) => {
  /*
      View render
    */
  const [repos, setRepos] = useState([]);
  const [repo, setRepo] = useState([]);
  const [content, setContent]: any = useState({});
  const [selectedRepo, setSelectedRepo] = useState(0);
  console.log(data);
  // @ts-ignore
  const getRepos = (accessToken) => {
    fetch("https://api.github.com/user/repos", {
      headers: {
        Authorization: `token ${accessToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRepos(data);
      })
      .catch((error) => console.error(error));
  };
  // @ts-ignore
  const getRepo = (accessToken, name) => {
    fetch(`https://api.github.com/repos/${data.login}/${name}/contents`, {
      headers: {
        Authorization: `token ${accessToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRepo(data);
      })
      .catch((error) => console.error(error));
  };
  // @ts-ignore
  const getContent = (accessToken, name, path) => {
    console.log(accessToken, name, path);
    fetch(
      `https://api.github.com/repos/${data.login}/${name}/contents/${path}`,
      {
        headers: {
          Authorization: `token ${accessToken}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setContent(data);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="p-3 flex gap-3 max-h-screen">
      {data.login ? (
        <>
          <div className="flex flex-col gap-2 w-1/6">
            <div className="flex gap-3 border">
              <img width="100" height="auto" src={data.avatar_url} />
              <div className="pt-1 pr-3">
                <p>
                  Reverse GitHub repos{" "}
                  <span className="text-stone-400 border bg-emerald-100">
                    GPT
                  </span>{" "}
                  analyzer
                </p>

                <p>
                  Hello: <b>{data.login}</b>
                </p>
              </div>
            </div>
            {}
            <div>Select Repo to analyzer</div>
            <button
              onClick={() => getRepos(data.token)}
              className="border rounded p-1.5 bg-blue-100 hover:bg-blue-50 "
            >
              Loading reposx
            </button>
            <div className="border text-sm">
              {repos.map((el: any, i) => {
                return (
                  <div
                    onClick={() => {
                      getRepo(data.token, el.name);
                      setSelectedRepo(i);
                    }}
                    key={i}
                    className="p-3 border-b hover:bg-stone-200 cursor-pointer"
                  >
                    {el?.name}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border text-sm w-1/6 flex flex-col">
            <p className="p-3 border-b bg-emerald-600 text-white">
              Selected repo
            </p>

            {repo.map((el: any, i) => {
              return (
                <div
                  onClick={() =>
                    // @ts-ignore
                    getContent(data.token, repos[selectedRepo]?.name, el.path)
                  }
                  key={i}
                  className="p-3 border-b hover:bg-stone-200 cursor-pointer truncate"
                >
                  {el?.name}
                </div>
              );
            })}
          </div>
          <div className="w-4/6 h-full border">
            <div className="p-3 text-xs bg-stone-700 text-emerald-300 font-mono h-full overflow-hidden">
              {/* // @ts-ignore */}
              {content?.content ? atob(content?.content) : "content not loaded"}
            </div>
            <div className="bg-stone-200 p-3">
              <button className="text-sm border text-emerald-700 border-emerald-600 rounded py-1.5 px-3 hover:bg-emerald-700 hover:bg-opacity-20">
                GPT Tagging
              </button>
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
    props: { data: { ...user, token: token.access_token } },
  };
}

export default Index;
