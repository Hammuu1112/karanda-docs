import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "../app.Bpwe3n7n.mjs";
import "@vuepress/shared";
import "vue-router";
import "@vueuse/core";
import "bcrypt-ts/browser";
import "watermark-js-plus";
import "@iconify/vue";
import "@iconify/vue/offline";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(_attrs)}></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../pages/index.html.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index_html = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__file", "index.html.vue"]]);
const data = JSON.parse(`{"path":"/","title":"","lang":"ko-KR","frontmatter":{"config":[{"type":"hero","full":true,"background":"tint-plate","hero":{"name":"카란다 Docs","tagline":"검은사막 편의성 도구","text":"Powered by Karanda","actions":[{"theme":"brand","text":"시작하기","link":"/docs/get-started/installation"},{"theme":"alt","text":"Windows용 다운로드","link":"https://github.com/Hammuu1112/Karanda/releases/latest"},{"theme":"alt","text":"웹브라우저에서 Karanda 열기","link":"https://www.karanda.kr"}]}},{"type":"features","features":[{"title":"Support Web & Windows","icon":"💻","details":"Karanda support Web & Windows desktop"},{"title":"Lots of features","icon":"🛠️","details":"Karanda has a wide range of tools"},{"title":"Free to use","icon":"💕","details":"Karanda is free"}]}],"pageLayout":"home","head":[["script",{"id":"check-dark-mode"},";(function () {const um= localStorage.getItem('vuepress-theme-appearance') || 'auto';const sm = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;const isDark = um === 'dark' || (um !== 'light' && sm);document.documentElement.dataset.theme = isDark ? 'dark' : 'light';})();"],["script",{"id":"check-mac-os"},"document.documentElement.classList.toggle('mac', /Mac|iPhone|iPod|iPad/i.test(navigator.platform))"]]},"headers":[],"readingTime":{"minutes":0.25,"words":75},"git":{"createdTime":1727805731000,"updatedTime":1728016276000,"contributors":[{"name":"Hammuu1112","email":"97436524+Hammuu1112@users.noreply.github.com","commits":3}]},"filePathRelative":"README.md","categoryList":[]}`);
export {
  index_html as comp,
  data
};
