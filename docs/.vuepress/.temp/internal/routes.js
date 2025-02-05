export const redirects = JSON.parse("{\"/notes/guides/ship_upgrading.html\":\"/guides/ship-upgrading/\",\"/ko/notes/guides/ship_upgrading.html\":\"/ko/guides/ship-upgrading/\",\"/notes/documents/get-started/account.html\":\"/documents/get-started/account/\",\"/notes/documents/get-started/installation.html\":\"/documents/get-started/installation/\",\"/notes/documents/services/event_calendar.html\":\"/documents/services/event-calendar/\",\"/notes/documents/services/ship_upgrading.html\":\"/documents/services/ship-upgrading/\",\"/ko/notes/documents/get-started/account.html\":\"/ko/documents/get-started/account/\",\"/ko/notes/documents/get-started/installation.html\":\"/ko/documents/get-started/installation/\",\"/ko/notes/documents/services/event_calendar.html\":\"/ko/documents/services/event-calendar/\",\"/ko/notes/documents/services/ship_upgrading.html\":\"/ko/documents/services/ship-upgrading/\"}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"/workspaces/karanda-guide/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":""} }],
  ["/ko/", { loader: () => import(/* webpackChunkName: "ko_index.html" */"/workspaces/karanda-guide/docs/.vuepress/.temp/pages/ko/index.html.js"), meta: {"title":""} }],
  ["/guides/ship-upgrading/", { loader: () => import(/* webpackChunkName: "guides_ship-upgrading_index.html" */"/workspaces/karanda-guide/docs/.vuepress/.temp/pages/guides/ship-upgrading/index.html.js"), meta: {"title":"Ship upgrading guide"} }],
  ["/ko/guides/ship-upgrading/", { loader: () => import(/* webpackChunkName: "ko_guides_ship-upgrading_index.html" */"/workspaces/karanda-guide/docs/.vuepress/.temp/pages/ko/guides/ship-upgrading/index.html.js"), meta: {"title":"선박 증축 가이드"} }],
  ["/documents/get-started/account/", { loader: () => import(/* webpackChunkName: "documents_get-started_account_index.html" */"/workspaces/karanda-guide/docs/.vuepress/.temp/pages/documents/get-started/account/index.html.js"), meta: {"title":"account"} }],
  ["/documents/get-started/installation/", { loader: () => import(/* webpackChunkName: "documents_get-started_installation_index.html" */"/workspaces/karanda-guide/docs/.vuepress/.temp/pages/documents/get-started/installation/index.html.js"), meta: {"title":"installation"} }],
  ["/documents/services/event-calendar/", { loader: () => import(/* webpackChunkName: "documents_services_event-calendar_index.html" */"/workspaces/karanda-guide/docs/.vuepress/.temp/pages/documents/services/event-calendar/index.html.js"), meta: {"title":"Event calendar"} }],
  ["/documents/services/ship-upgrading/", { loader: () => import(/* webpackChunkName: "documents_services_ship-upgrading_index.html" */"/workspaces/karanda-guide/docs/.vuepress/.temp/pages/documents/services/ship-upgrading/index.html.js"), meta: {"title":"Ship upgrading"} }],
  ["/ko/documents/get-started/account/", { loader: () => import(/* webpackChunkName: "ko_documents_get-started_account_index.html" */"/workspaces/karanda-guide/docs/.vuepress/.temp/pages/ko/documents/get-started/account/index.html.js"), meta: {"title":"사용자"} }],
  ["/ko/documents/get-started/installation/", { loader: () => import(/* webpackChunkName: "ko_documents_get-started_installation_index.html" */"/workspaces/karanda-guide/docs/.vuepress/.temp/pages/ko/documents/get-started/installation/index.html.js"), meta: {"title":"설치"} }],
  ["/ko/documents/services/event-calendar/", { loader: () => import(/* webpackChunkName: "ko_documents_services_event-calendar_index.html" */"/workspaces/karanda-guide/docs/.vuepress/.temp/pages/ko/documents/services/event-calendar/index.html.js"), meta: {"title":"이벤트 캘린더","icon":"material-symbols:celebration-outline"} }],
  ["/ko/documents/services/ship-upgrading/", { loader: () => import(/* webpackChunkName: "ko_documents_services_ship-upgrading_index.html" */"/workspaces/karanda-guide/docs/.vuepress/.temp/pages/ko/documents/services/ship-upgrading/index.html.js"), meta: {"title":"선박 증축","icon":"fa6-solid:ship"} }],
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
