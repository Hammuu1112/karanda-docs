import comp from "/workspaces/karanda-guide/docs/.vuepress/.temp/pages/ko/docs/ins/index.html.vue"
const data = JSON.parse("{\"path\":\"/ko/docs/ins/\",\"title\":\"install\",\"lang\":\"ko-KR\",\"frontmatter\":{\"title\":\"install\",\"createTime\":\"2024/10/07 06:59:34\",\"permalink\":\"/ko/docs/ins/\",\"head\":[[\"script\",{\"id\":\"check-dark-mode\"},\";(function () {const um= localStorage.getItem('vuepress-theme-appearance') || 'auto';const sm = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;const isDark = um === 'dark' || (um !== 'light' && sm);document.documentElement.dataset.theme = isDark ? 'dark' : 'light';})();\"],[\"script\",{\"id\":\"check-mac-os\"},\"document.documentElement.classList.toggle('mac', /Mac|iPhone|iPod|iPad/i.test(navigator.platform))\"]]},\"headers\":[],\"readingTime\":{\"minutes\":0.04,\"words\":11},\"filePathRelative\":\"ko/docs/get-started/installation.md\",\"categoryList\":[{\"id\":\"ed73f6\",\"sort\":10000,\"name\":\"ko\"},{\"id\":\"687c6b\",\"sort\":10002,\"name\":\"docs\"},{\"id\":\"4ec2f4\",\"sort\":10003,\"name\":\"get-started\"}]}")
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
