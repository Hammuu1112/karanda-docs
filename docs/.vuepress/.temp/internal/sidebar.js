export const sidebar = {"/ko/":{"/documents/":{"items":[{"text":"시작하기","prefix":"get-started","collapsed":false,"items":[{"text":"설치","link":"installation/"},{"text":"사용자","link":"account/"}]},{"text":"서비스","prefix":"services","collapsed":false,"items":[{"text":"선박 증축","link":"ship-upgrading/","icon":"fa6-solid:ship"},{"text":"이벤트 캘린더","link":"event-calendar/","icon":"material-symbols:celebration-outline"}]}],"prefix":"/ko/documents/"}},"/":{"/documents/":{"items":[{"text":"Get-started","prefix":"get-started","collapsed":false,"items":[{"text":"Installation","link":"installation/"},{"text":"Account","link":"account/"}]},{"text":"Services","prefix":"services","collapsed":false,"items":[{"text":"Ship upgrading","link":"ship-upgrading/","icon":"fa6-solid:ship"}]}],"prefix":"/documents/"}},"__auto__":{}}

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
