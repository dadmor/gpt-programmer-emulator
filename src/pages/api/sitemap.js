// import { getBlogPosts } from '../utils/data'
export default async function sitemap(req, res) {
  // const postLists = await getBlogPosts()
  const postLists = [
    {
      post: {
        slug: "test",
      },
    },
  ];
  const entries = postLists.map((post) =>
    getSitemapEntry({
      pathname: `/post/${post.slug}`,
    })
  );
  entries.push(
    getSitemapEntry({
      pathname: "/",
      priority: 1,
    })
  );
  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${entries.join("\n")}
        </urlset>      
    `.trim();

  res.writeHead(200, {
    "Content-Type": "application/xml",
  });
  return res.end(sitemap);
}
const hostname = "https://mytestblog.com";
function getSitemapEntry({ pathname, priority = 0.5 }) {
  return `
        <url>
            <loc>${hostname}${pathname}</loc>
        </url>
    `;
}
