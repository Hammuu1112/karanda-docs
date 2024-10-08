import comp from "/workspaces/karanda-guide/docs/.vuepress/.temp/pages/ko/document/get-started/a/index.html.vue"
const data = JSON.parse("{\"path\":\"/ko/document/get-started/a/\",\"title\":\"account\",\"lang\":\"ko-KR\",\"frontmatter\":{\"title\":\"account\",\"createTime\":\"2024/10/08 04:30:06\",\"permalink\":\"/ko/document/get-started/a/\",\"head\":[[\"script\",{\"id\":\"check-dark-mode\"},\";(function () {const um= localStorage.getItem('vuepress-theme-appearance') || 'auto';const sm = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;const isDark = um === 'dark' || (um !== 'light' && sm);document.documentElement.dataset.theme = isDark ? 'dark' : 'light';})();\"],[\"script\",{\"id\":\"check-mac-os\"},\"document.documentElement.classList.toggle('mac', /Mac|iPhone|iPod|iPad/i.test(navigator.platform))\"]]},\"headers\":[],\"readingTime\":{\"minutes\":0.05,\"words\":14},\"filePathRelative\":\"ko/notes/documents/get-started/account.md\"}")
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
