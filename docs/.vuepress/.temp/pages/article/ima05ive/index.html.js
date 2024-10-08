import comp from "/workspaces/karanda-guide/docs/.vuepress/.temp/pages/article/ima05ive/index.html.vue"
const data = JSON.parse("{\"path\":\"/article/ima05ive/\",\"title\":\"account\",\"lang\":\"en-US\",\"frontmatter\":{\"title\":\"account\",\"createTime\":\"2024/10/08 04:30:59\",\"permalink\":\"/article/ima05ive/\",\"head\":[[\"script\",{\"id\":\"check-dark-mode\"},\";(function () {const um= localStorage.getItem('vuepress-theme-appearance') || 'auto';const sm = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;const isDark = um === 'dark' || (um !== 'light' && sm);document.documentElement.dataset.theme = isDark ? 'dark' : 'light';})();\"],[\"script\",{\"id\":\"check-mac-os\"},\"document.documentElement.classList.toggle('mac', /Mac|iPhone|iPod|iPad/i.test(navigator.platform))\"]]},\"headers\":[],\"readingTime\":{\"minutes\":0.05,\"words\":14},\"filePathRelative\":\"notes/document/get-started/account.md\",\"categoryList\":[{\"id\":\"4358b5\",\"sort\":10003,\"name\":\"notes\"},{\"id\":\"c49268\",\"sort\":10004,\"name\":\"document\"},{\"id\":\"dad0a5\",\"sort\":10002,\"name\":\"get-started\"}]}")
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
