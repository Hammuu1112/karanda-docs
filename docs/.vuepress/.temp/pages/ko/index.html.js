import comp from "/workspaces/karanda-guide/docs/.vuepress/.temp/pages/ko/index.html.vue"
const data = JSON.parse("{\"path\":\"/ko/\",\"title\":\"\",\"lang\":\"ko-KR\",\"frontmatter\":{\"config\":[{\"type\":\"hero\",\"full\":true,\"background\":\"tint-plate\",\"hero\":{\"name\":\"Karanda Guide\",\"tagline\":\"Immerse yourself in BDO!\",\"text\":\"Powered by Karanda\",\"actions\":[{\"theme\":\"brand\",\"text\":\"Quick Start →\",\"link\":\"/\"},{\"theme\":\"alt\",\"text\":\"for Windows\",\"link\":\"https://github.com/Hammuu1112/Karanda/releases/latest\"}]}},{\"type\":\"features\",\"features\":[{\"title\":\"Support Web & Windows\",\"icon\":\"💻\",\"details\":\"Karanda support Web & Windows desktop\"},{\"title\":\"Lots of features\",\"icon\":\"🛠️\",\"details\":\"Karanda has a wide range of tools\"},{\"title\":\"Free to use\",\"icon\":\"💕\",\"details\":\"Karanda is free\"}]}],\"pageLayout\":\"home\",\"head\":[[\"script\",{\"id\":\"check-dark-mode\"},\";(function () {const um= localStorage.getItem('vuepress-theme-appearance') || 'auto';const sm = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;const isDark = um === 'dark' || (um !== 'light' && sm);document.documentElement.dataset.theme = isDark ? 'dark' : 'light';})();\"],[\"script\",{\"id\":\"check-mac-os\"},\"document.documentElement.classList.toggle('mac', /Mac|iPhone|iPod|iPad/i.test(navigator.platform))\"]]},\"headers\":[],\"readingTime\":{\"minutes\":0.25,\"words\":75},\"filePathRelative\":\"ko/README.md\",\"categoryList\":[{\"id\":\"ed73f6\",\"sort\":10000,\"name\":\"ko\"}]}")
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
