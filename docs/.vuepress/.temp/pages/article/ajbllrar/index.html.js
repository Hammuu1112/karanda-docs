import comp from "/workspaces/karanda-guide/docs/.vuepress/.temp/pages/article/ajbllrar/index.html.vue"
const data = JSON.parse("{\"path\":\"/article/ajbllrar/\",\"title\":\"first\",\"lang\":\"ko-KR\",\"frontmatter\":{\"title\":\"first\",\"createTime\":\"2024/10/07 13:32:04\",\"permalink\":\"/article/ajbllrar/\",\"head\":[[\"script\",{\"id\":\"check-dark-mode\"},\";(function () {const um= localStorage.getItem('vuepress-theme-appearance') || 'auto';const sm = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;const isDark = um === 'dark' || (um !== 'light' && sm);document.documentElement.dataset.theme = isDark ? 'dark' : 'light';})();\"],[\"script\",{\"id\":\"check-mac-os\"},\"document.documentElement.classList.toggle('mac', /Mac|iPhone|iPod|iPad/i.test(navigator.platform))\"]]},\"headers\":[],\"readingTime\":{\"minutes\":0.03,\"words\":9},\"filePathRelative\":\"ko/blog/first.md\",\"categoryList\":[{\"id\":\"126ac9\",\"sort\":10002,\"name\":\"blog\"}]}")
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