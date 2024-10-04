import comp from "/workspaces/karanda-guide/docs/.vuepress/.temp/pages/ko/get-started/installation/index.html.vue"
const data = JSON.parse("{\"path\":\"/ko/get-started/installation/\",\"title\":\"시작하기\",\"lang\":\"ko-KR\",\"frontmatter\":{\"title\":\"시작하기\",\"createTime\":\"2024/10/04 03:32:21\",\"permalink\":\"/ko/get-started/installation/\",\"head\":[[\"script\",{\"id\":\"check-dark-mode\"},\";(function () {const um= localStorage.getItem('vuepress-theme-appearance') || 'auto';const sm = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;const isDark = um === 'dark' || (um !== 'light' && sm);document.documentElement.dataset.theme = isDark ? 'dark' : 'light';})();\"],[\"script\",{\"id\":\"check-mac-os\"},\"document.documentElement.classList.toggle('mac', /Mac|iPhone|iPod|iPad/i.test(navigator.platform))\"]]},\"headers\":[{\"level\":2,\"title\":\"Web에서 실행\",\"slug\":\"web에서-실행\",\"link\":\"#web에서-실행\",\"children\":[{\"level\":3,\"title\":\"PWA 설치하기\",\"slug\":\"pwa-설치하기\",\"link\":\"#pwa-설치하기\",\"children\":[]}]},{\"level\":2,\"title\":\"Windows 데스크톱에서 실행\",\"slug\":\"windows-데스크톱에서-실행\",\"link\":\"#windows-데스크톱에서-실행\",\"children\":[{\"level\":3,\"title\":\"다운로드\",\"slug\":\"다운로드\",\"link\":\"#다운로드\",\"children\":[]},{\"level\":3,\"title\":\"설치\",\"slug\":\"설치\",\"link\":\"#설치\",\"children\":[]},{\"level\":3,\"title\":\"업데이트\",\"slug\":\"업데이트\",\"link\":\"#업데이트\",\"children\":[]}]}],\"readingTime\":{\"minutes\":0.2,\"words\":61},\"filePathRelative\":\"ko/get-started/installation.md\",\"categoryList\":[{\"id\":\"ed73f6\",\"sort\":10000,\"name\":\"ko\"},{\"id\":\"903bcc\",\"sort\":10001,\"name\":\"get-started\"}]}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
