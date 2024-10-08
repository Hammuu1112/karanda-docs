import comp from "/workspaces/karanda-guide/docs/.vuepress/.temp/pages/docs/get-started/installation/index.html.vue"
const data = JSON.parse("{\"path\":\"/docs/get-started/installation/\",\"title\":\"install\",\"lang\":\"ko-KR\",\"frontmatter\":{\"title\":\"install\",\"createTime\":\"2024/10/07 06:59:34\",\"permalink\":\"/docs/get-started/installation/\",\"head\":[[\"script\",{\"id\":\"check-dark-mode\"},\";(function () {const um= localStorage.getItem('vuepress-theme-appearance') || 'auto';const sm = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;const isDark = um === 'dark' || (um !== 'light' && sm);document.documentElement.dataset.theme = isDark ? 'dark' : 'light';})();\"],[\"script\",{\"id\":\"check-mac-os\"},\"document.documentElement.classList.toggle('mac', /Mac|iPhone|iPod|iPad/i.test(navigator.platform))\"]]},\"headers\":[],\"readingTime\":{\"minutes\":0.04,\"words\":12},\"filePathRelative\":\"docs/get-started/installation.md\",\"categoryList\":[{\"id\":\"e3e2a9\",\"sort\":10000,\"name\":\"docs\"},{\"id\":\"b5c287\",\"sort\":10001,\"name\":\"get-started\"}]}")
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
