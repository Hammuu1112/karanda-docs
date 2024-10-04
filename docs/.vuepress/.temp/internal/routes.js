export const redirects = JSON.parse("{\"/ko/get-started/installation.html\":\"/ko/get-started/installation/\"}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"/workspaces/karanda-guide/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":""} }],
  ["/en/", { loader: () => import(/* webpackChunkName: "en_index.html" */"/workspaces/karanda-guide/docs/.vuepress/.temp/pages/en/index.html.js"), meta: {"title":""} }],
  ["/ko/", { loader: () => import(/* webpackChunkName: "ko_index.html" */"/workspaces/karanda-guide/docs/.vuepress/.temp/pages/ko/index.html.js"), meta: {"title":""} }],
  ["/en/get-started/", { loader: () => import(/* webpackChunkName: "en_get-started_index.html" */"/workspaces/karanda-guide/docs/.vuepress/.temp/pages/en/get-started/index.html.js"), meta: {"title":"Get-started"} }],
  ["/ko/get-started/", { loader: () => import(/* webpackChunkName: "ko_get-started_index.html" */"/workspaces/karanda-guide/docs/.vuepress/.temp/pages/ko/get-started/index.html.js"), meta: {"title":"시작하기"} }],
  ["/ko/get-started/installation/", { loader: () => import(/* webpackChunkName: "ko_get-started_installation_index.html" */"/workspaces/karanda-guide/docs/.vuepress/.temp/pages/ko/get-started/installation/index.html.js"), meta: {"title":"시작하기"} }],
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
