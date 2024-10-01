export const siteData = JSON.parse("{\"base\":\"/\",\"lang\":\"ko-KR\",\"title\":\"Karanda Guide\",\"description\":\"Karanda Guide | 카란다 가이드\",\"head\":[[\"link\",{\"rel\":\"icon\",\"href\":\"/favicons/favicon.ico\"}],[\"link\",{\"rel\":\"apple-touch-icon\",\"sizes\":\"180x180\",\"href\":\"/favicons/apple-touch-icon.png\"}],[\"link\",{\"rel\":\"icon\",\"type\":\"image/png\",\"sizes\":\"32x32\",\"href\":\"/favicons/favicon-32x32.png\"}],[\"link\",{\"rel\":\"icon\",\"type\":\"image/png\",\"sizes\":\"16x16\",\"href\":\"/favicons/favicon-16x16.png\"}],[\"meta\",{\"name\":\"theme-color\",\"content\":\"#5086a1\"}],[\"meta\",{\"name\":\"apple-mobile-web-app-capable\",\"content\":\"yes\"}],[\"meta\",{\"name\":\"apple-mobile-web-app-status-bar-style\",\"content\":\"black\"}]],\"locales\":{}}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateSiteData) {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ siteData }) => {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  })
}