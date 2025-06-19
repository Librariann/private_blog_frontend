import { GetServerSideProps } from "next";
import { getPostDatas, getCategories } from "@/lib/posts";
import { GetCategoriesQuery, GetPostListQuery } from "@/gql/graphql";

function generateSiteMap(
  posts: GetPostListQuery["getPostList"]["posts"],
  categories: GetCategoriesQuery["getCategories"]["categories"]
) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://librarian-blog.dev</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>daily</changefreq>
       <priority>1.0</priority>
     </url>
     <url>
       <loc>https://librarian-blog.dev/about</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.8</priority>
     </url>
     <url>
       <loc>https://librarian-blog.dev/all-posts-page</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>daily</changefreq>
       <priority>0.9</priority>
     </url>
     <url>
       <loc>https://librarian-blog.dev/all-categories-page</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>0.8</priority>
     </url>
     ${posts
       ?.map((post) => {
         const parentCategory = encodeURIComponent(
           post.category?.parentCategory?.categoryTitle || ""
         );
         const subCategory = encodeURIComponent(
           post.category?.categoryTitle || ""
         );
         return `
       <url>
           <loc>${`https://librarian-blog.dev/post/${parentCategory}/${subCategory}/@Post-${post.id}`}</loc>
           <lastmod>${new Date(post?.updatedAt || post.createdAt).toISOString()}</lastmod>
           <changefreq>weekly</changefreq>
           <priority>0.7</priority>
       </url>
     `;
       })
       .join("")}
     ${categories
       ?.map((category) => {
         const parentCategory = encodeURIComponent(category.categoryTitle);
         return (
           category.subCategories
             ?.map((sub) => {
               const subCategory = encodeURIComponent(sub.categoryTitle);
               return `
       <url>
           <loc>${`https://librarian-blog.dev/post/${parentCategory}/${subCategory}`}</loc>
           <lastmod>${new Date().toISOString()}</lastmod>
           <changefreq>weekly</changefreq>
           <priority>0.6</priority>
       </url>
     `;
             })
             .join("") || ""
         );
       })
       .join("")}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps가 처리
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const posts = await getPostDatas();
  const categories = await getCategories();

  const sitemap = generateSiteMap(posts, categories);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default SiteMap;
