export const sidebar = {"/ko/":{"/document/":{"items":[{"text":"시작하기","prefix":"get-started","collapsed":false,"items":[{"text":"설치","link":"installation/"},{"text":"사용자","link":"account/"}]}],"prefix":"/ko/document/"}},"/":{"/document/":{"items":[{"text":"get-started","prefix":"get-started","collapsed":false,"items":[{"text":"Installation","link":"installation/"},{"text":"Account","link":"account/"}]}],"prefix":"/document/"}},"__auto__":{}}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateSidebar) {
    __VUE_HMR_RUNTIME__.updateSidebar(sidebar)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ sidebar }) => {
    __VUE_HMR_RUNTIME__.updateSidebar(sidebar)
  })
}
