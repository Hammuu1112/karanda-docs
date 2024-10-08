export const redirects = JSON.parse("{\"/notes/document/get-started/account.html\":\"/document/get-started/account/\",\"/notes/document/get-started/installation.html\":\"/document/get-started/installation/\",\"/ko/notes/documents/get-started/account.html\":\"/ko/document/get-started/account/\",\"/ko/notes/documents/get-started/installation.html\":\"/ko/document/get-started/installation/\"}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"/workspaces/karanda-guide/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":""} }],
  ["/ko/", { loader: () => import(/* webpackChunkName: "ko_index.html" */"/workspaces/karanda-guide/docs/.vuepress/.temp/pages/ko/index.html.js"), meta: {"title":""} }],
  ["/document/get-started/account/", { loader: () => import(/* webpackChunkName: "document_get-started_account_index.html" */"/workspaces/karanda-guide/docs/.vuepress/.temp/pages/document/get-started/account/index.html.js"), meta: {"title":"account"} }],
  ["/document/get-started/installation/", { loader: () => import(/* webpackChunkName: "document_get-started_installation_index.html" */"/workspaces/karanda-guide/docs/.vuepress/.temp/pages/document/get-started/installation/index.html.js"), meta: {"title":"installation"} }],
  ["/ko/document/get-started/account/", { loader: () => import(/* webpackChunkName: "ko_document_get-started_account_index.html" */"/workspaces/karanda-guide/docs/.vuepress/.temp/pages/ko/document/get-started/account/index.html.js"), meta: {"title":"account"} }],
  ["/ko/document/get-started/installation/", { loader: () => import(/* webpackChunkName: "ko_document_get-started_installation_index.html" */"/workspaces/karanda-guide/docs/.vuepress/.temp/pages/ko/document/get-started/installation/index.html.js"), meta: {"title":"설치"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"/workspaces/karanda-guide/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
  ["/ko/blog/", { loader: () => import(/* webpackChunkName: "ko_blog_index.html" */"/workspaces/karanda-guide/docs/.vuepress/.temp/pages/ko/blog/index.html.js"), meta: {"title":"Blog"} }],
  ["/ko/blog/tags/", { loader: () => import(/* webpackChunkName: "ko_blog_tags_index.html" */"/workspaces/karanda-guide/docs/.vuepress/.temp/pages/ko/blog/tags/index.html.js"), meta: {"title":"Tags"} }],
  ["/ko/blog/archives/", { loader: () => import(/* webpackChunkName: "ko_blog_archives_index.html" */"/workspaces/karanda-guide/docs/.vuepress/.temp/pages/ko/blog/archives/index.html.js"), meta: {"title":"Archives"} }],
  ["/ko/blog/categories/", { loader: () => import(/* webpackChunkName: "ko_blog_categories_index.html" */"/workspaces/karanda-guide/docs/.vuepress/.temp/pages/ko/blog/categories/index.html.js"), meta: {"title":"Categories"} }],
  ["/blog/", { loader: () => import(/* webpackChunkName: "blog_index.html" */"/workspaces/karanda-guide/docs/.vuepress/.temp/pages/blog/index.html.js"), meta: {"title":"Blog"} }],
  ["/blog/tags/", { loader: () => import(/* webpackChunkName: "blog_tags_index.html" */"/workspaces/karanda-guide/docs/.vuepress/.temp/pages/blog/tags/index.html.js"), meta: {"title":"Tags"} }],
  ["/blog/archives/", { loader: () => import(/* webpackChunkName: "blog_archives_index.html" */"/workspaces/karanda-guide/docs/.vuepress/.temp/pages/blog/archives/index.html.js"), meta: {"title":"Archives"} }],
  ["/blog/categories/", { loader: () => import(/* webpackChunkName: "blog_categories_index.html" */"/workspaces/karanda-guide/docs/.vuepress/.temp/pages/blog/categories/index.html.js"), meta: {"title":"Categories"} }],
]);
