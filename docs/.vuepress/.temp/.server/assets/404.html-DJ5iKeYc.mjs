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
  _push(`<div${ssrRenderAttrs(_attrs)}><p>404 Not Found</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../pages/404.html.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _404_html = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__file", "404.html.vue"]]);
const data = JSON.parse(`{"path":"/404.html","title":"","lang":"ko-KR","frontmatter":{"layout":"NotFound","head":[["script",{"id":"check-dark-mode"},";(function () {const um= localStorage.getItem('vuepress-theme-appearance') || 'auto';const sm = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;const isDark = um === 'dark' || (um !== 'light' && sm);document.documentElement.dataset.theme = isDark ? 'dark' : 'light';})();"],["script",{"id":"check-mac-os"},"document.documentElement.classList.toggle('mac', /Mac|iPhone|iPod|iPad/i.test(navigator.platform))"]]},"headers":[],"readingTime":{"minutes":0.01,"words":3},"git":{},"filePathRelative":null}`);
export {
  _404_html as comp,
  data
};
