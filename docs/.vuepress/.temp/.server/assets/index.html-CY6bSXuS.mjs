import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "../app.DFlZbol-.mjs";
import "@vuepress/shared";
import "vue-router";
import "@vueuse/core";
import "bcrypt-ts/browser";
import "watermark-js-plus";
import "@iconify/vue";
import "@iconify/vue/offline";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(_attrs)}><p>todo...!</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../pages/docs/get-started/account/index.html.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index_html = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__file", "index.html.vue"]]);
const data = JSON.parse(`{"path":"/docs/get-started/account/","title":"account","lang":"ko-KR","frontmatter":{"title":"account","createTime":"2024/10/07 07:26:25","permalink":"/docs/get-started/account/","head":[["script",{"id":"check-dark-mode"},";(function () {const um= localStorage.getItem('vuepress-theme-appearance') || 'auto';const sm = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;const isDark = um === 'dark' || (um !== 'light' && sm);document.documentElement.dataset.theme = isDark ? 'dark' : 'light';})();"],["script",{"id":"check-mac-os"},"document.documentElement.classList.toggle('mac', /Mac|iPhone|iPod|iPad/i.test(navigator.platform))"]]},"headers":[],"readingTime":{"minutes":0.04,"words":12},"git":{"createdTime":null,"updatedTime":null,"contributors":[]},"filePathRelative":"docs/get-started/account.md","categoryList":[{"id":"e3e2a9","sort":10000,"name":"docs"},{"id":"b5c287","sort":10001,"name":"get-started"}]}`);
export {
  index_html as comp,
  data
};
