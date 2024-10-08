import comp from "/workspaces/karanda-guide/docs/.vuepress/.temp/pages/en/docs/get-started/account/index.html.vue"
const data = JSON.parse("{\"path\":\"/en/docs/get-started/account/\",\"title\":\"account\",\"lang\":\"en-US\",\"frontmatter\":{\"title\":\"account\",\"createTime\":\"2024/10/07 07:25:41\",\"permalink\":\"/en/docs/get-started/account/\",\"head\":[[\"script\",{\"id\":\"check-dark-mode\"},\";(function () {const um= localStorage.getItem('vuepress-theme-appearance') || 'auto';const sm = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;const isDark = um === 'dark' || (um !== 'light' && sm);document.documentElement.dataset.theme = isDark ? 'dark' : 'light';})();\"],[\"script\",{\"id\":\"check-mac-os\"},\"document.documentElement.classList.toggle('mac', /Mac|iPhone|iPod|iPad/i.test(navigator.platform))\"]]},\"headers\":[],\"readingTime\":{\"minutes\":0.04,\"words\":12},\"filePathRelative\":\"en/docs/get-started/account.md\",\"categoryList\":[{\"id\":\"9cfefe\",\"sort\":10000,\"name\":\"en\"},{\"id\":\"42f13f\",\"sort\":10001,\"name\":\"docs\"},{\"id\":\"9b8981\",\"sort\":10002,\"name\":\"get-started\"}]}")
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
