import { GetServerSideProps } from "next";
import { getPostDatas, getCategories } from "@/lib/posts";
import { GetCategoriesQuery, GetPostListQuery } from "@/gql/graphql";
import { getCanonicalUrl } from "@/lib/seo";

function generateSiteMap(
  posts: GetPostListQuery["getPostList"]["posts"],
  categories: GetCategoriesQuery["getCategories"]["categories"]
) {
  const paths = ["/", "/about", "/all-posts-page", "/all-categories-page"];

  for (const post of posts ?? []) {
    const parent = encodeURIComponent(post.category?.parentCategory?.categoryTitle ?? "");
    const category = encodeURIComponent(post.category?.categoryTitle ?? "");
    paths.push(`/post/${parent}/${category}/@Post-${post.id}`);
  }

  for (const category of categories ?? []) {
    const parent = encodeURIComponent(category.categoryTitle);
    for (const child of category.subCategories ?? []) {
      paths.push(`/post/${parent}/${encodeURIComponent(child.categoryTitle)}`);
    }
  }

  // The available timestamps do not reliably reflect content edits.
  const entries = paths.map((path) => `  <url><loc>${getCanonicalUrl(path)}</loc></url>`);
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>`;
}

function SiteMap() {
  // getServerSideProps가 처리
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const [posts, categories] = await Promise.all([getPostDatas(), getCategories()]);

  const sitemap = generateSiteMap(posts.posts, categories);

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default SiteMap;
