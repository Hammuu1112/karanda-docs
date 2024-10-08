export const siteData = JSON.parse("{\"base\":\"/\",\"lang\":\"en-US\",\"title\":\"\",\"description\":\"\",\"head\":[[\"link\",{\"rel\":\"icon\",\"href\":\"/favicons/favicon.ico\"}],[\"link\",{\"rel\":\"apple-touch-icon\",\"sizes\":\"180x180\",\"href\":\"/favicons/apple-touch-icon.png\"}],[\"link\",{\"rel\":\"icon\",\"type\":\"image/png\",\"sizes\":\"32x32\",\"href\":\"/favicons/favicon-32x32.png\"}],[\"link\",{\"rel\":\"icon\",\"type\":\"image/png\",\"sizes\":\"16x16\",\"href\":\"/favicons/favicon-16x16.png\"}],[\"meta\",{\"name\":\"theme-color\",\"content\":\"#5086a1\"}],[\"meta\",{\"name\":\"apple-mobile-web-app-capable\",\"content\":\"yes\"}],[\"meta\",{\"name\":\"apple-mobile-web-app-status-bar-style\",\"content\":\"black\"}]],\"locales\":{\"/\":{\"lang\":\"en-US\",\"title\":\"Karanda Docs\",\"description\":\"Karanda Docs\"},\"/ko/\":{\"lang\":\"ko-KR\",\"title\":\"카란다 Docs\",\"description\":\"카란다 Docs\"}}}")

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
