export const redirects = JSON.parse("{\"/docs/get-started/account.html\":\"/docs/get-started/account/\",\"/docs/get-started/installation.html\":\"/docs/get-started/installation/\",\"/en/docs/get-started/account.html\":\"/en/docs/get-started/account/\",\"/en/docs/get-started/installation.html\":\"/en/docs/get-started/installation/\"}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"/workspaces/karanda-guide/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":""} }],
  ["/en/", { loader: () => import(/* webpackChunkName: "en_index.html" */"/workspaces/karanda-guide/docs/.vuepress/.temp/pages/en/index.html.js"), meta: {"title":""} }],
  ["/docs/get-started/account/", { loader: () => import(/* webpackChunkName: "docs_get-started_account_index.html" */"/workspaces/karanda-guide/docs/.vuepress/.temp/pages/docs/get-started/account/index.html.js"), meta: {"title":"account"} }],
  ["/docs/get-started/installation/", { loader: () => import(/* webpackChunkName: "docs_get-started_installation_index.html" */"/workspaces/karanda-guide/docs/.vuepress/.temp/pages/docs/get-started/installation/index.html.js"), meta: {"title":"install"} }],
  ["/en/docs/get-started/account/", { loader: () => import(/* webpackChunkName: "en_docs_get-started_account_index.html" */"/workspaces/karanda-guide/docs/.vuepress/.temp/pages/en/docs/get-started/account/index.html.js"), meta: {"title":"account"} }],
  ["/en/docs/get-started/installation/", { loader: () => import(/* webpackChunkName: "en_docs_get-started_installation_index.html" */"/workspaces/karanda-guide/docs/.vuepress/.temp/pages/en/docs/get-started/installation/index.html.js"), meta: {"title":"installation"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"/workspaces/karanda-guide/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
]);
