export const redirects = JSON.parse("{\"/intro.html\":\"/article/12vb9kdl/\"}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"/workspaces/karanda-guide/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":""} }],
  ["/article/12vb9kdl/", { loader: () => import(/* webpackChunkName: "article_12vb9kdl_index.html" */"/workspaces/karanda-guide/docs/.vuepress/.temp/pages/article/12vb9kdl/index.html.js"), meta: {"title":"intro"} }],
  ["/get-started/", { loader: () => import(/* webpackChunkName: "get-started_index.html" */"/workspaces/karanda-guide/docs/.vuepress/.temp/pages/get-started/index.html.js"), meta: {"title":"Get-Started"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"/workspaces/karanda-guide/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
]);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateRoutes) {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
  }
  if (__VUE_HMR_RUNTIME__.updateRedirects) {
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ routes, redirects }) => {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  })
}
