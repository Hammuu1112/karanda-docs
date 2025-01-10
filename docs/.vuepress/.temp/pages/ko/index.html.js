import comp from "/workspaces/karanda-guide/docs/.vuepress/.temp/pages/ko/index.html.vue"
const data = JSON.parse("{\"path\":\"/ko/\",\"title\":\"\",\"lang\":\"ko-KR\",\"frontmatter\":{\"config\":[{\"type\":\"hero\",\"full\":true,\"background\":\"tint-plate\",\"hero\":{\"name\":\"카란다 Docs\",\"tagline\":\"검은사막 편의성 도구\",\"text\":\"Powered by Karanda\",\"actions\":[{\"theme\":\"brand\",\"text\":\"시작하기\",\"link\":\"/ko/documents/get-started/installation/\"},{\"theme\":\"alt\",\"text\":\"Windows용 다운로드\",\"link\":\"https://github.com/Hammuu1112/Karanda/releases/latest\"},{\"theme\":\"alt\",\"text\":\"웹브라우저에서 Karanda 열기\",\"link\":\"https://www.karanda.kr\"}]}},{\"type\":\"features\",\"title\":\"Featured services 주요 서비스\",\"features\":[{\"title\":\"선박 증축\",\"icon\":\"🚢\",\"details\":\"중범선 증축 재료 기록, 남은일수 계산\"},{\"title\":\"이벤트 캘린더\",\"icon\":\"🎉\",\"details\":\"남은 기간을 쉽게 확인할 수 있는 이벤트 캘린더\"},{\"title\":\"광명석 조합식 검색기\",\"icon\":\"🌟\",\"details\":\"광명석 조합식과 효과를 검색\"},{\"title\":\"말 성장치 계산기\",\"icon\":\"🦄\",\"details\":\"말 능력치별 평균 성장치와 합계를 한눈에 확인\"},{\"title\":\"물물교환 계산기\",\"icon\":\"⚓\",\"details\":\"무게, 재료비, 교섭력 계산기\"},{\"title\":\"통합 거래소\",\"icon\":\"⚖️\",\"details\":\"실시간 거래소 데이터와 편리한 프리셋\"},{\"title\":\"월드 보스\",\"icon\":\"😈\",\"details\":\"월드 보스 정보 및 알림\"},{\"title\":\"오버레이\",\"icon\":\"💻\",\"details\":\"강력한 오버레이\"}]}],\"pageLayout\":\"home\",\"head\":[[\"script\",{\"id\":\"check-dark-mode\"},\";(function () {const um= localStorage.getItem('vuepress-theme-appearance') || 'auto';const sm = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;const isDark = um === 'dark' || (um !== 'light' && sm);document.documentElement.dataset.theme = isDark ? 'dark' : 'light';})();\"],[\"script\",{\"id\":\"check-mac-os\"},\"document.documentElement.classList.toggle('mac', /Mac|iPhone|iPod|iPad/i.test(navigator.platform))\"]]},\"headers\":[],\"readingTime\":{\"minutes\":0.23,\"words\":69},\"filePathRelative\":\"ko/README.md\",\"categoryList\":[]}")
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
