export const themeData = {"locales":{"/":{"logo":"./karanda_logo.png","lastUpdated":false,"contributors":false,"footer":{"message":"Powered by Karanda","copyright":"Copyright © 2024 All Rights Reserved."},"navbar":[{"text":"start","link":"/get-started/README.md"}]}},"appearance":true,"blog":false,"navbarSocialInclude":["github","twitter","discord","facebook"],"aside":true,"outline":[2,3],"externalLinkIcon":true,"editLink":true,"contributors":false,"prevPage":true,"nextPage":true,"footer":{"message":"Powered by Karanda","copyright":"Copyright © 2024 All Rights Reserved."},"logo":"./karanda_logo.png","lastUpdated":false}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
