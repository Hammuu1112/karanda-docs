import comp from "/workspaces/karanda-guide/docs/.vuepress/.temp/pages/ko/get-started/index.html.vue"
const data = JSON.parse("{\"path\":\"/ko/get-started/\",\"title\":\"시작하기\",\"lang\":\"ko-KR\",\"frontmatter\":{\"title\":\"시작하기\",\"head\":[[\"script\",{\"id\":\"check-dark-mode\"},\";(function () {const um= localStorage.getItem('vuepress-theme-appearance') || 'auto';const sm = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;const isDark = um === 'dark' || (um !== 'light' && sm);document.documentElement.dataset.theme = isDark ? 'dark' : 'light';})();\"],[\"script\",{\"id\":\"check-mac-os\"},\"document.documentElement.classList.toggle('mac', /Mac|iPhone|iPod|iPad/i.test(navigator.platform))\"]]},\"headers\":[],\"readingTime\":{\"minutes\":0,\"words\":1},\"filePathRelative\":\"ko/get-started/README.md\",\"categoryList\":[{\"id\":\"ed73f6\",\"sort\":10000,\"name\":\"ko\"},{\"id\":\"903bcc\",\"sort\":10001,\"name\":\"get-started\"}]}")
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
