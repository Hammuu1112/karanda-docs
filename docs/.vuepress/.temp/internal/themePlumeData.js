export const themeData = {"locales":{"/en/":{"selectLanguageName":"English","selectLanguageText":"Languages","appearanceText":"Appearance","lightModeSwitchTitle":"Switch to light theme","darkModeSwitchTitle":"Switch to dark theme","editLinkText":"Edit this page","contributorsText":"Contributors","lastUpdated":{"text":"Last Updated"},"encryptButtonText":"Confirm","encryptPlaceholder":"Enter password","encryptGlobalText":"Only password can access this site","encryptPageText":"Only password can access this page","footer":{"message":"Powered by Karanda","copyright":"Copyright © 2024-Present All Rights Reserved."},"logo":"./karanda_logo.png","social":[{"icon":"discord","link":"https://www.discord.com"}],"home":"/en/","navbar":[{"text":"Get-started","link":"/en/get-started/"}]},"/":{"logo":"./karanda_logo.png","social":[{"icon":"discord","link":"https://www.discord.com"}],"footer":{"message":"Powered by Karanda","copyright":"Copyright © 2024-Present All Rights Reserved."},"home":"/","selectLanguageName":"한국어","navbar":[{"text":"시작하기","link":"/ko/get-started/installation.md"}]}},"appearance":true,"blog":false,"navbarSocialInclude":["github","twitter","discord","facebook"],"aside":true,"outline":[2,3],"externalLinkIcon":true,"editLink":true,"contributors":true,"prevPage":true,"nextPage":true,"footer":{"message":"Powered by Karanda","copyright":"Copyright © 2024-Present All Rights Reserved."},"logo":"./karanda_logo.png","social":[{"icon":"discord","link":"https://www.discord.com"}]}

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
