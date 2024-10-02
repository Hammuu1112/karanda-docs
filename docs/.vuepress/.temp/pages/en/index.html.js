import comp from "/workspaces/karanda-guide/docs/.vuepress/.temp/pages/en/index.html.vue"
const data = JSON.parse("{\"path\":\"/en/\",\"title\":\"\",\"lang\":\"en-US\",\"frontmatter\":{\"config\":[{\"type\":\"hero\",\"full\":true,\"background\":\"tint-plate\",\"hero\":{\"name\":\"Karanda Docs\",\"tagline\":\"Immerse yourself in BDO!\",\"text\":\"Powered by Karanda\",\"actions\":[{\"theme\":\"brand\",\"text\":\"Get-started\",\"link\":\"/en/get-started/\"},{\"theme\":\"alt\",\"text\":\"Download for Windows\",\"link\":\"https://github.com/Hammuu1112/Karanda/releases/latest\"},{\"theme\":\"alt\",\"text\":\"Open Karanda in your browser\",\"link\":\"https://github.com/Hammuu1112/Karanda/releases/latest\"}]}},{\"type\":\"features\",\"features\":[{\"title\":\"Support Web & Windows\",\"icon\":\"💻\",\"details\":\"Karanda support Web & Windows desktop\"},{\"title\":\"Lots of features\",\"icon\":\"🛠️\",\"details\":\"Karanda has a wide range of tools\"},{\"title\":\"Free to use\",\"icon\":\"💕\",\"details\":\"Karanda is free\"}]}],\"pageLayout\":\"home\",\"head\":[[\"script\",{\"id\":\"check-dark-mode\"},\";(function () {const um= localStorage.getItem('vuepress-theme-appearance') || 'auto';const sm = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;const isDark = um === 'dark' || (um !== 'light' && sm);document.documentElement.dataset.theme = isDark ? 'dark' : 'light';})();\"],[\"script\",{\"id\":\"check-mac-os\"},\"document.documentElement.classList.toggle('mac', /Mac|iPhone|iPod|iPad/i.test(navigator.platform))\"]]},\"headers\":[],\"readingTime\":{\"minutes\":0.29,\"words\":88},\"filePathRelative\":\"en/README.md\",\"categoryList\":[]}")
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
