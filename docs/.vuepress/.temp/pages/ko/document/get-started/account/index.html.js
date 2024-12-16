import comp from "/workspaces/karanda-guide/docs/.vuepress/.temp/pages/ko/document/get-started/account/index.html.vue"
const data = JSON.parse("{\"path\":\"/ko/document/get-started/account/\",\"title\":\"사용자\",\"lang\":\"ko-KR\",\"frontmatter\":{\"title\":\"사용자\",\"createTime\":\"2024/10/08 04:30:06\",\"permalink\":\"/ko/document/get-started/account/\",\"head\":[[\"script\",{\"id\":\"check-dark-mode\"},\";(function () {const um= localStorage.getItem('vuepress-theme-appearance') || 'auto';const sm = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;const isDark = um === 'dark' || (um !== 'light' && sm);document.documentElement.dataset.theme = isDark ? 'dark' : 'light';})();\"],[\"script\",{\"id\":\"check-mac-os\"},\"document.documentElement.classList.toggle('mac', /Mac|iPhone|iPod|iPad/i.test(navigator.platform))\"]]},\"headers\":[{\"level\":2,\"title\":\"로그인\",\"slug\":\"로그인\",\"link\":\"#로그인\",\"children\":[]},{\"level\":2,\"title\":\"로그아웃\",\"slug\":\"로그아웃\",\"link\":\"#로그아웃\",\"children\":[]},{\"level\":2,\"title\":\"계정 탈퇴\",\"slug\":\"계정-탈퇴\",\"link\":\"#계정-탈퇴\",\"children\":[]}],\"readingTime\":{\"minutes\":0.12,\"words\":37},\"filePathRelative\":\"ko/notes/documents/get-started/account.md\",\"categoryList\":[{\"id\":\"4358b5\",\"sort\":10000,\"name\":\"notes\"},{\"id\":\"843fe5\",\"sort\":10001,\"name\":\"documents\"},{\"id\":\"9aa543\",\"sort\":10002,\"name\":\"get-started\"}]}")
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
