export const themeData = {"locales":{"/ko/":{"selectLanguageName":"한국어","selectLanguageText":"Languages","appearanceText":"Appearance","lightModeSwitchTitle":"Switch to light theme","darkModeSwitchTitle":"Switch to dark theme","editLinkText":"Edit this page","contributorsText":"Contributors","lastUpdated":false,"encryptButtonText":"Confirm","encryptPlaceholder":"Enter password","encryptGlobalText":"Only password can access this site","encryptPageText":"Only password can access this page","footer":{"message":"Powered by Karanda","copyright":"Copyright © 2024-Present All Rights Reserved."},"logo":"./karanda_logo.png","social":[{"icon":"discord","link":"https://www.discord.com"}],"outline":[1,6],"outlineLabel":"현재 페이지","nextPageLabel":"다음 페이지","prevPageLabel":"이전 페이지","navbar":[{"text":"문서","link":"/ko/documents/get-started/installation/"},{"text":"포스트","link":"/ko/blog/"}]},"/":{"selectLanguageName":"English","selectLanguageText":"Languages","appearanceText":"Appearance","lightModeSwitchTitle":"Switch to light theme","darkModeSwitchTitle":"Switch to dark theme","editLinkText":"Edit this page","contributorsText":"Contributors","lastUpdated":false,"encryptButtonText":"Confirm","encryptPlaceholder":"Enter password","encryptGlobalText":"Only password can access this site","encryptPageText":"Only password can access this page","footer":{"message":"Powered by Karanda","copyright":"Copyright © 2024-Present All Rights Reserved."},"logo":"./karanda_logo.png","social":[{"icon":"discord","link":"https://www.discord.com"}],"outline":[1,6],"navbar":[{"text":"Document","link":"/documents/get-started/installation/"},{"text":"Posts","link":"/blog/"}]}},"appearance":true,"blog":{"exclude":[".vuepress/","**/README.md"]},"navbarSocialInclude":["github","twitter","discord","facebook"],"aside":true,"outline":[1,6],"externalLinkIcon":true,"editLink":true,"contributors":true,"prevPage":true,"nextPage":true,"footer":{"message":"Powered by Karanda","copyright":"Copyright © 2024-Present All Rights Reserved."},"logo":"./karanda_logo.png","social":[{"icon":"discord","link":"https://www.discord.com"}],"lastUpdated":false}

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
