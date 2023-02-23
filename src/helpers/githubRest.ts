// @ts-ignore
export const getRepos = (data, setData) => {
  fetch("https://api.github.com/user/repos", {
    headers: {
      Authorization: `token ${data.token}`,
      Accept: "application/vnd.github.v3+json",
    },
  })
    .then((response) => response.json())
    .then((resdata) => {
      console.log('getRepos',resdata);
      setData({path:'gitHub.repos',value:resdata})
      // setRepos(resdata);
    })
    .catch((error) => console.error(error));
};
// @ts-ignore
export const getRepo = (data, name, path = '/', setData) => {
  fetch(`https://api.github.com/repos/${data.login}/${name}/contents${path}`, {
    headers: {
      Authorization: `token ${data.token}`,
      Accept: "application/vnd.github.v3+json",
    },
  })
    .then((response) => response.json())
    .then((resdata) => {
      console.log('res getRepo',resdata);
      setData({path:'gitHub.repo',value:resdata})
      // setRepo(resdata);
    })
    .catch((error) => console.error(error));
};
// @ts-ignore
export const getContent = (data, name, path, setData) => {
  console.log(data.token, name, path);
  fetch(`https://api.github.com/repos/${data.login}/${name}/contents/${path}`, {
    headers: {
      Authorization: `token ${data.token}`,
      Accept: "application/vnd.github.v3+json",
    },
  })
    .then((response) => response.json())
    .then((resdata) => {
      console.log('res getContent',resdata);
      setData({path:'gitHub.content',value:resdata})
     
    })
    .catch((error) => console.error(error));
};
