import { shallowRef, defineComponent, computed, h, toRef, ref, onMounted, defineAsyncComponent, reactive, inject, onUnmounted, watch, nextTick, useSSRContext, mergeProps, isRef, watchEffect, readonly, toValue, onUpdated, provide, customRef, resolveComponent, withCtx, openBlock, createBlock, createCommentVNode, createVNode, resolveDynamicComponent, renderSlot, createTextVNode, toDisplayString, normalizeClass, watchPostEffect, Fragment, renderList, useSlots, toHandlers, withKeys, onBeforeUnmount, createSSRApp } from "vue";
import { isLinkWithProtocol, isString, dedupeHead, resolveLocalePath, splitPath, isLinkHttp, removeLeadingSlash, normalizeRoutePath, removeEndingSlash, ensureLeadingSlash, ensureEndingSlash, isFunction, isLinkExternal, isPlainObject } from "@vuepress/shared";
import { useRouter, useRoute, createRouter, START_LOCATION, createMemoryHistory } from "vue-router";
import { useFullscreen, useEventListener, onKeyStroke, useStorage, useMediaQuery, onClickOutside, useSessionStorage, useDark, hasOwn, tryOnScopeDispose, useWindowScroll, useScrollLock, useElementSize, useWindowSize, useCssVar } from "@vueuse/core";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrRenderSlot, ssrRenderStyle, ssrRenderVNode, ssrIncludeBooleanAttr, ssrRenderSlotInner } from "vue/server-renderer";
import { genSaltSync, compare } from "bcrypt-ts/browser";
import "watermark-js-plus";
import "@iconify/vue";
import { Icon } from "@iconify/vue/offline";
const redirects$1 = JSON.parse('{"/docs/get-started/account.html":"/docs/get-started/account/","/docs/get-started/installation.html":"/docs/get-started/installation/","/en/docs/get-started/account.html":"/en/docs/get-started/account/","/en/docs/get-started/installation.html":"/en/docs/get-started/installation/"}');
const routes$1 = Object.fromEntries([
  ["/", { loader: () => import(
    /* webpackChunkName: "index.html" */
    "./assets/index.html-AOSPR3sa.mjs"
  ), meta: { "title": "" } }],
  ["/en/", { loader: () => import(
    /* webpackChunkName: "en_index.html" */
    "./assets/index.html-CFBjCtgj.mjs"
  ), meta: { "title": "" } }],
  ["/docs/get-started/account/", { loader: () => import(
    /* webpackChunkName: "docs_get-started_account_index.html" */
    "./assets/index.html-CY6bSXuS.mjs"
  ), meta: { "title": "account" } }],
  ["/docs/get-started/installation/", { loader: () => import(
    /* webpackChunkName: "docs_get-started_installation_index.html" */
    "./assets/index.html-iOUNtWux.mjs"
  ), meta: { "title": "install" } }],
  ["/en/docs/get-started/account/", { loader: () => import(
    /* webpackChunkName: "en_docs_get-started_account_index.html" */
    "./assets/index.html-Dj3yBds4.mjs"
  ), meta: { "title": "account" } }],
  ["/en/docs/get-started/installation/", { loader: () => import(
    /* webpackChunkName: "en_docs_get-started_installation_index.html" */
    "./assets/index.html-DYB63-Q4.mjs"
  ), meta: { "title": "installation" } }],
  ["/404.html", { loader: () => import(
    /* webpackChunkName: "404.html" */
    "./assets/404.html-yaTHomYp.mjs"
  ), meta: { "title": "" } }]
]);
var clientDataSymbol = Symbol(
  ""
);
var useClientData = () => {
  const clientData = inject(clientDataSymbol);
  if (!clientData) {
    throw new Error("useClientData() is called without provider.");
  }
  return clientData;
};
var usePageComponent = () => useClientData().pageComponent;
var usePageData = () => useClientData().pageData;
var usePageFrontmatter = () => useClientData().pageFrontmatter;
var usePageHead = () => useClientData().pageHead;
var usePageLang = () => useClientData().pageLang;
var usePageLayout = () => useClientData().pageLayout;
var useRouteLocale = () => useClientData().routeLocale;
var useRoutePath = () => useClientData().routePath;
var useSiteData = () => useClientData().siteData;
var useSiteLocaleData = () => useClientData().siteLocaleData;
var redirects = shallowRef(redirects$1);
var routes = shallowRef(routes$1);
var resolveRoutePath = (pathname, currentPath) => {
  const normalizedRoutePath = normalizeRoutePath(pathname, currentPath);
  if (routes.value[normalizedRoutePath]) return normalizedRoutePath;
  const encodedRoutePath = encodeURI(normalizedRoutePath);
  if (routes.value[encodedRoutePath]) {
    return encodedRoutePath;
  }
  const redirectedRoutePath = redirects.value[normalizedRoutePath] || redirects.value[encodedRoutePath];
  if (redirectedRoutePath) {
    return redirectedRoutePath;
  }
  return normalizedRoutePath;
};
var resolveRoute = (path, currentPath) => {
  const { pathname, hashAndQueries } = splitPath(path);
  const routePath = resolveRoutePath(pathname, currentPath);
  const routeFullPath = routePath + hashAndQueries;
  if (!routes.value[routePath]) {
    return {
      ...routes.value["/404.html"],
      path: routeFullPath,
      notFound: true
    };
  }
  return {
    ...routes.value[routePath],
    path: routeFullPath,
    notFound: false
  };
};
var resolveRouteFullPath = (path, currentPath) => {
  const { pathname, hashAndQueries } = splitPath(path);
  return resolveRoutePath(pathname, currentPath) + hashAndQueries;
};
var guardEvent = (event) => {
  if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) return;
  if (event.defaultPrevented) return;
  if (event.button !== void 0 && event.button !== 0) return;
  if (event.currentTarget) {
    const target = event.currentTarget.getAttribute("target");
    if (target == null ? void 0 : target.match(/\b_blank\b/i)) return;
  }
  event.preventDefault();
  return true;
};
var RouteLink = defineComponent({
  name: "RouteLink",
  props: {
    /**
     * The route path to link to
     */
    to: {
      type: String,
      required: true
    },
    /**
     * Whether the link is active to have an active class
     *
     * Notice that the active status is not automatically determined according to the current route.
     */
    active: Boolean,
    /**
     * The class to add when the link is active
     */
    activeClass: {
      type: String,
      default: "route-link-active"
    }
  },
  slots: Object,
  setup(props, { slots }) {
    const router = useRouter();
    const route = useRoute();
    const path = computed(
      () => props.to.startsWith("#") || props.to.startsWith("?") ? props.to : `${"/"}${resolveRouteFullPath(props.to, route.path).substring(1)}`
    );
    return () => {
      var _a;
      return h(
        "a",
        {
          class: ["route-link", { [props.activeClass]: props.active }],
          href: path.value,
          onClick: (event = {}) => {
            if (guardEvent(event)) {
              router.push(props.to).catch();
            }
          }
        },
        (_a = slots.default) == null ? void 0 : _a.call(slots)
      );
    };
  }
});
defineComponent({
  name: "AutoLink",
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  slots: Object,
  setup(props, { slots }) {
    const config2 = toRef(props, "config");
    const route = useRoute();
    const siteData2 = useSiteData();
    const withProtocol = computed(() => isLinkWithProtocol(config2.value.link));
    const linkTarget = computed(
      () => config2.value.target || (withProtocol.value ? "_blank" : void 0)
    );
    const isBlankTarget = computed(() => linkTarget.value === "_blank");
    const isInternal = computed(
      () => !withProtocol.value && !isBlankTarget.value
    );
    const linkRel = computed(
      () => config2.value.rel || (isBlankTarget.value ? "noopener noreferrer" : null)
    );
    const linkAriaLabel = computed(
      () => config2.value.ariaLabel ?? config2.value.text
    );
    const shouldBeActiveInSubpath = computed(() => {
      if (config2.value.exact) return false;
      const localePaths = Object.keys(siteData2.value.locales);
      return localePaths.length ? (
        // Check all the locales
        localePaths.every((key) => key !== config2.value.link)
      ) : (
        // Check root
        config2.value.link !== "/"
      );
    });
    const isActive2 = computed(() => {
      if (!isInternal.value) return false;
      if (config2.value.activeMatch) {
        return (config2.value.activeMatch instanceof RegExp ? config2.value.activeMatch : new RegExp(config2.value.activeMatch, "u")).test(route.path);
      }
      if (shouldBeActiveInSubpath.value) {
        return route.path.startsWith(config2.value.link);
      }
      return route.path === config2.value.link;
    });
    return () => {
      const { before, after, default: defaultSlot } = slots;
      const content = (defaultSlot == null ? void 0 : defaultSlot(config2.value)) || [
        before == null ? void 0 : before(config2.value),
        config2.value.text,
        after == null ? void 0 : after(config2.value)
      ];
      return isInternal.value ? h(
        RouteLink,
        {
          "class": "auto-link",
          "to": config2.value.link,
          "active": isActive2.value,
          "aria-label": linkAriaLabel.value
        },
        () => content
      ) : h(
        "a",
        {
          "class": "auto-link external-link",
          "href": config2.value.link,
          "aria-label": linkAriaLabel.value,
          "rel": linkRel.value,
          "target": linkTarget.value
        },
        content
      );
    };
  }
});
var ClientOnly = defineComponent({
  name: "ClientOnly",
  setup(_, ctx) {
    const isMounted = ref(false);
    onMounted(() => {
      isMounted.value = true;
    });
    return () => {
      var _a, _b;
      return isMounted.value ? (_b = (_a = ctx.slots).default) == null ? void 0 : _b.call(_a) : null;
    };
  }
});
var Content$1 = defineComponent({
  // eslint-disable-next-line vue/no-reserved-component-names
  name: "Content",
  props: {
    path: {
      type: String,
      required: false,
      default: ""
    }
  },
  setup(props) {
    const pageComponent = usePageComponent();
    const ContentComponent = computed(() => {
      if (!props.path) return pageComponent.value;
      const route = resolveRoute(props.path);
      return defineAsyncComponent(() => route.loader().then(({ comp }) => comp));
    });
    return () => h(ContentComponent.value);
  }
});
var LAYOUT_NAME_DEFAULT = "Layout";
var LANG_DEFAULT = "en-US";
var resolvers = reactive({
  /**
   * Resolve layouts component map
   */
  resolveLayouts: (clientConfigs2) => clientConfigs2.reduce(
    (prev, item) => ({
      ...prev,
      ...item.layouts
    }),
    {}
  ),
  /**
   * Merge the head config in frontmatter and site locale
   *
   * Frontmatter should take priority over site locale
   */
  resolvePageHead: (pageHeadTitle, pageFrontmatter, siteLocaleDate) => {
    const description = isString(pageFrontmatter.description) ? pageFrontmatter.description : siteLocaleDate.description;
    const head = [
      ...Array.isArray(pageFrontmatter.head) ? pageFrontmatter.head : [],
      ...siteLocaleDate.head,
      ["title", {}, pageHeadTitle],
      ["meta", { name: "description", content: description }]
    ];
    return dedupeHead(head);
  },
  /**
   * Resolve the content of page head title
   *
   * It would be used as the content of the `<title>` tag
   */
  resolvePageHeadTitle: (pageData, siteLocaleDate) => [pageData.title, siteLocaleDate.title].filter((item) => !!item).join(" | "),
  /**
   * Resolve page language from page data
   *
   * It would be used as the `lang` attribute of `<html>` tag
   */
  resolvePageLang: (pageData, siteLocaleData) => pageData.lang || siteLocaleData.lang || LANG_DEFAULT,
  /**
   * Resolve layout component of current page
   */
  resolvePageLayout: (pageData, layouts) => {
    const layoutName = isString(pageData.frontmatter.layout) ? pageData.frontmatter.layout : LAYOUT_NAME_DEFAULT;
    if (!layouts[layoutName]) {
      throw new Error(`[vuepress] Cannot resolve layout: ${layoutName}`);
    }
    return layouts[layoutName];
  },
  /**
   * Resolve locale path according to route path and locales config
   */
  resolveRouteLocale: (locales2, routePath) => resolveLocalePath(locales2, decodeURI(routePath)),
  /**
   * Resolve site data for specific locale
   *
   * It would merge the locales fields to the root fields
   */
  resolveSiteLocaleData: ({ base, locales: locales2, ...siteData2 }, routeLocale) => {
    var _a;
    return {
      ...siteData2,
      ...locales2[routeLocale],
      head: [
        // when merging head, the locales head should be placed before root head
        // to get higher priority
        ...((_a = locales2[routeLocale]) == null ? void 0 : _a.head) ?? [],
        ...siteData2.head ?? []
      ]
    };
  }
});
var defineClientConfig = (clientConfig = {}) => clientConfig;
var withBase = (url) => {
  if (isLinkHttp(url)) return url;
  return `${"/"}${removeLeadingSlash(url)}`;
};
var config_default$3 = {};
const clientConfig0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: config_default$3
}, Symbol.toStringTag, { value: "Module" }));
var contentUpdatedCallbacks = [];
function onContentUpdated(fn) {
  contentUpdatedCallbacks.push(fn);
  onUnmounted(() => {
    contentUpdatedCallbacks = contentUpdatedCallbacks.filter((f) => f !== fn);
  });
}
function runCallbacks(lifeCircleType) {
  contentUpdatedCallbacks.forEach((fn) => fn(lifeCircleType));
}
var Content = defineComponent({
  name: "Content",
  props: {
    path: {
      type: String,
      required: false,
      default: ""
    }
  },
  setup(props) {
    const pageComponent = usePageComponent();
    const ContentComponent = computed(() => {
      if (!props.path)
        return pageComponent.value;
      const route = resolveRoute(props.path);
      return defineAsyncComponent(() => route.loader().then(({ comp }) => comp));
    });
    return () => h(ContentComponent.value, {
      onVnodeMounted: () => runCallbacks({ mounted: true }),
      onVnodeUpdated: () => runCallbacks({ updated: true }),
      onVnodeBeforeUnmount: () => runCallbacks({ beforeUnmount: true })
    });
  }
});
var config_default$2 = defineClientConfig({
  enhance({ app }) {
    if (app._context.components.Content)
      delete app._context.components.Content;
    app.component("Content", Content);
  }
});
const clientConfig1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: config_default$2
}, Symbol.toStringTag, { value: "Module" }));
const config$4 = defineClientConfig({
  setup() {
    return;
  }
});
const clientConfig2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: config$4
}, Symbol.toStringTag, { value: "Module" }));
const wait = (ms) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});
const useLocaleConfig = (localesConfig) => {
  const routeLocale = useRouteLocale();
  return computed(() => localesConfig[routeLocale.value] ?? {});
};
const isDef = (val) => typeof val !== "undefined";
const { isArray } = Array;
const startsWith = (str, prefix) => isString(str) && str.startsWith(prefix);
const isLinkAbsolute = (test) => startsWith(test, "/");
/**
 * NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT
 */
const addClass = (element, name) => {
  element.classList.add(name);
};
const removeClass = (element, name) => {
  element.classList.remove(name);
};
const removeElement = (element) => {
  var _a;
  (_a = element == null ? void 0 : element.parentNode) == null ? void 0 : _a.removeChild(element);
};
const clamp = (n, min, max) => {
  if (n < min)
    return min;
  if (n > max)
    return max;
  return n;
};
const toBarPercent = (n) => (-1 + n) * 100;
const queue = /* @__PURE__ */ (() => {
  const pending = [];
  const nextStep = () => {
    const fn = pending.shift();
    if (fn) {
      fn(nextStep);
    }
  };
  return (fn) => {
    pending.push(fn);
    if (pending.length === 1)
      nextStep();
  };
})();
const camelCase = (content) => content.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, (_, letter) => letter.toUpperCase());
const addStyle = /* @__PURE__ */ (() => {
  const cssPrefixes = ["Webkit", "O", "Moz", "ms"];
  const cssProps = {};
  const getVendorProp = (name) => {
    const { style } = document.body;
    if (name in style)
      return name;
    const capName = name.charAt(0).toUpperCase() + name.slice(1);
    let index = cssPrefixes.length;
    while (index--) {
      const vendorName = `${cssPrefixes[index]}${capName}`;
      if (vendorName in style)
        return vendorName;
    }
    return name;
  };
  const getStyleProp = (name) => {
    const finalizedName = camelCase(name);
    return cssProps[finalizedName] ?? (cssProps[finalizedName] = getVendorProp(finalizedName));
  };
  const applyCss = (element, prop, value) => {
    element.style[getStyleProp(prop)] = value;
  };
  return (element, properties) => {
    for (const prop in properties) {
      const value = properties[prop];
      if (Object.hasOwn(properties, prop) && isDef(value))
        applyCss(element, prop, value);
    }
  };
})();
const SETTINGS = {
  minimum: 0.08,
  easing: "ease",
  speed: 200,
  trickle: true,
  trickleRate: 0.02,
  trickleSpeed: 800,
  barSelector: '[role="bar"]',
  parent: "body",
  template: '<div class="bar" role="bar"></div>'
};
const nprogress = {
  percent: null,
  isRendered: () => Boolean(document.getElementById("nprogress")),
  set: (progress) => {
    const { speed, easing } = SETTINGS;
    const inProgress = nprogress.isStarted();
    const newPercent = clamp(progress, SETTINGS.minimum, 1);
    nprogress.percent = newPercent === 1 ? null : newPercent;
    const nprogressElement = nprogress.render(!inProgress);
    const barElement = nprogressElement.querySelector(SETTINGS.barSelector);
    nprogressElement.offsetWidth;
    queue((next) => {
      addStyle(barElement, {
        transform: `translate3d(${toBarPercent(newPercent)}%,0,0)`,
        transition: `all ${speed}ms ${easing}`
      });
      if (newPercent === 1) {
        addStyle(nprogressElement, {
          transition: "none",
          opacity: "1"
        });
        nprogressElement.offsetWidth;
        setTimeout(() => {
          addStyle(nprogressElement, {
            transition: `all ${speed}ms linear`,
            opacity: "0"
          });
          setTimeout(() => {
            nprogress.remove();
            next();
          }, speed);
        }, speed);
      } else {
        setTimeout(() => {
          next();
        }, speed);
      }
    });
    return nprogress;
  },
  isStarted: () => typeof nprogress.percent === "number",
  start: () => {
    if (!nprogress.percent)
      nprogress.set(0);
    const work = () => {
      setTimeout(() => {
        if (!nprogress.percent)
          return;
        nprogress.trickle();
        work();
      }, SETTINGS.trickleSpeed);
    };
    work();
    return nprogress;
  },
  done: (force) => {
    if (!force && !nprogress.percent)
      return nprogress;
    return nprogress.increase(0.3 + 0.5 * Math.random()).set(1);
  },
  increase: (amount) => {
    let { percent } = nprogress;
    if (!percent) {
      return nprogress.start();
    }
    percent = clamp(percent + (typeof amount === "number" ? amount : (1 - percent) * clamp(Math.random() * percent, 0.1, 0.95)), 0, 0.994);
    return nprogress.set(percent);
  },
  trickle: () => nprogress.increase(Math.random() * SETTINGS.trickleRate),
  render: (fromStart) => {
    if (nprogress.isRendered()) {
      return document.getElementById("nprogress");
    }
    addClass(document.documentElement, "nprogress-busy");
    const nprogressElement = document.createElement("div");
    nprogressElement.id = "nprogress";
    nprogressElement.innerHTML = SETTINGS.template;
    const barElement = nprogressElement.querySelector(SETTINGS.barSelector);
    const parentElement = document.querySelector(SETTINGS.parent);
    const percent = fromStart ? "-100" : toBarPercent(nprogress.percent ?? 0);
    addStyle(barElement, {
      transition: "all 0 linear",
      transform: `translate3d(${percent}%,0,0)`
    });
    if (parentElement) {
      if (parentElement !== document.body) {
        addClass(parentElement, "nprogress-custom-parent");
      }
      parentElement.appendChild(nprogressElement);
    }
    return nprogressElement;
  },
  remove: () => {
    removeClass(document.documentElement, "nprogress-busy");
    removeClass(document.querySelector(SETTINGS.parent), "nprogress-custom-parent");
    removeElement(document.getElementById("nprogress"));
  }
};
const useNprogress = () => {
  onMounted(() => {
    const router = useRouter();
    const loadedPages = /* @__PURE__ */ new Set();
    loadedPages.add(router.currentRoute.value.path);
    router.beforeEach((to) => {
      if (!loadedPages.has(to.path)) {
        nprogress.start();
      }
    });
    router.afterEach((to) => {
      loadedPages.add(to.path);
      nprogress.done();
    });
  });
};
const config$3 = defineClientConfig({
  setup() {
    useNprogress();
  }
});
const clientConfig3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: config$3
}, Symbol.toStringTag, { value: "Module" }));
const photoswipeOptions = ref({});
const photoswipeSymbol = Symbol("");
const usePhotoSwipeOptions = () => inject(photoswipeSymbol);
const injectPhotoSwipeConfig = (app) => {
  app.provide(photoswipeSymbol, photoswipeOptions);
};
const LOADING_ICON = '<div class="photo-swipe-loading"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" preserveAspectRatio="xMidYMid" viewBox="25 25 50 50"><animateTransform attributeName="transform" type="rotate" dur="2s" keyTimes="0;1" repeatCount="indefinite" values="0;360"></animateTransform><circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"><animate attributeName="stroke-dasharray" dur="1.5s" keyTimes="0;0.5;1" repeatCount="indefinite" values="1,200;90,200;1,200"></animate><animate attributeName="stroke-dashoffset" dur="1.5s" keyTimes="0;0.5;1" repeatCount="indefinite" values="0;-35px;-125px"></animate></circle></svg></div>';
const getImages = (selector2) => isString(selector2) ? Array.from(document.querySelectorAll(selector2)) : selector2.map((item) => Array.from(document.querySelectorAll(item))).flat();
const getImageElementInfo = (image) => new Promise((resolve, reject) => {
  if (image.complete) {
    resolve({
      type: "image",
      element: image,
      src: image.src,
      width: image.naturalWidth,
      height: image.naturalHeight,
      alt: image.alt,
      msrc: image.src
    });
  } else {
    image.onload = () => {
      resolve(getImageElementInfo(image));
    };
    image.onerror = () => {
      reject();
    };
  }
});
const initPhotoSwipe = (photoSwipe, { download: download2 = true, fullscreen: fullscreen2 = true } = {}) => {
  photoSwipe.on("uiRegister", () => {
    photoSwipe.ui.registerElement({
      name: "bulletsIndicator",
      className: "photo-swipe-bullets-indicator",
      appendTo: "wrapper",
      onInit: (el) => {
        const bullets = [];
        let prevIndex = -1;
        for (let i = 0; i < photoSwipe.getNumItems(); i++) {
          const bullet = document.createElement("div");
          bullet.className = "photo-swipe-bullet";
          bullet.onclick = (event) => {
            photoSwipe.goTo(bullets.indexOf(event.target));
          };
          bullets.push(bullet);
          el.appendChild(bullet);
        }
        photoSwipe.on("change", () => {
          if (prevIndex >= 0)
            bullets[prevIndex].classList.remove("active");
          bullets[photoSwipe.currIndex].classList.add("active");
          prevIndex = photoSwipe.currIndex;
        });
      }
    });
    if (fullscreen2) {
      const { isSupported, toggle } = useFullscreen();
      if (isSupported.value)
        photoSwipe.ui.registerElement({
          name: "fullscreen",
          order: 7,
          isButton: true,
          html: '<svg class="pswp__icn" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M249.5 270.833H437v-75H212a37.5 37.5 0 0 0-37.5 37.5v225h75v-187.5zm-37.5 600h225v-75H249.5v-187.5h-75v225a37.5 37.5 0 0 0 37.5 37.5zm637.5-37.5v-225h-75v187.5H587v75h225a37.5 37.5 0 0 0 37.5-37.5zM587 270.833h187.5v187.5h75v-225a37.5 37.5 0 0 0-37.5-37.5H587v75z"/></svg>',
          onClick: () => {
            void toggle();
          }
        });
    }
    if (download2) {
      photoSwipe.ui.registerElement({
        name: "download",
        order: 8,
        isButton: true,
        tagName: "a",
        // SVG with outline
        html: {
          isCustomSVG: true,
          inner: '<path d="M20.5 14.3 17.1 18V10h-2.2v7.9l-3.4-3.6L10 16l6 6.1 6-6.1-1.5-1.6ZM23 23H9v2h14" id="pswp__icn-download"/>',
          outlineID: "pswp__icn-download"
        },
        onInit: (el) => {
          el.setAttribute("download", "");
          el.setAttribute("target", "_blank");
          el.setAttribute("rel", "noopener");
          photoSwipe.on("change", () => {
            el.setAttribute("href", photoSwipe.currSlide.data.src);
          });
        }
      });
    }
  });
};
const registerPhotoSwipe = (images, { scrollToClose: scrollToClose2 = true, download: download2 = true, fullscreen: fullscreen2 = true, ...photoSwipeOptions }) => import(
  /* webpackChunkName: "photo-swipe" */
  "photoswipe"
).then(({ default: PhotoSwipe }) => {
  let currentPhotoSwipe = null;
  const dataSource = images.map((image) => ({
    html: LOADING_ICON,
    element: image,
    msrc: image.src
  }));
  images.forEach((image, index) => {
    const handler = () => {
      currentPhotoSwipe == null ? void 0 : currentPhotoSwipe.destroy();
      currentPhotoSwipe = new PhotoSwipe({
        preloaderDelay: 0,
        showHideAnimationType: "zoom",
        ...photoSwipeOptions,
        dataSource,
        index,
        ...scrollToClose2 ? { closeOnVerticalDrag: true, wheelToZoom: false } : {}
      });
      initPhotoSwipe(currentPhotoSwipe, { download: download2, fullscreen: fullscreen2 });
      currentPhotoSwipe.addFilter("thumbEl", () => image);
      currentPhotoSwipe.addFilter("placeholderSrc", () => image.src);
      currentPhotoSwipe.init();
    };
    if (!image.getAttribute("photo-swipe")) {
      image.style.cursor = "zoom-in";
      image.addEventListener("click", () => {
        handler();
      });
      image.addEventListener("keypress", ({ key }) => {
        if (key === "Enter")
          handler();
      });
      image.setAttribute("photo-swipe", "");
    }
    void getImageElementInfo(image).then((data) => {
      dataSource.splice(index, 1, data);
      currentPhotoSwipe == null ? void 0 : currentPhotoSwipe.refreshSlideContent(index);
    });
  });
  return scrollToClose2 ? useEventListener("wheel", () => {
    currentPhotoSwipe == null ? void 0 : currentPhotoSwipe.close();
  }) : () => {
  };
});
const usePhotoSwipe = ({ selector: selector2, locales: locales2, delay: delay2 = 500, download: download2 = true, fullscreen: fullscreen2 = true, scrollToClose: scrollToClose2 = true }) => {
  const photoSwipeOptions = usePhotoSwipeOptions();
  const locale = useLocaleConfig(locales2);
  const page = usePageData();
  const frontmatter = usePageFrontmatter();
  let destroy = null;
  const setupPhotoSwipe = () => {
    const { photoSwipe } = frontmatter.value;
    if (photoSwipe !== false)
      void nextTick().then(() => wait(delay2)).then(async () => {
        const imageSelector = isString(photoSwipe) ? photoSwipe : selector2;
        destroy = await registerPhotoSwipe(getImages(imageSelector), {
          ...photoSwipeOptions.value,
          ...locale.value,
          download: download2,
          fullscreen: fullscreen2,
          scrollToClose: scrollToClose2
        });
      });
  };
  onMounted(() => {
    setupPhotoSwipe();
    watch(() => [page.value.path, photoSwipeOptions.value], () => {
      destroy == null ? void 0 : destroy();
      setupPhotoSwipe();
    });
  });
  onUnmounted(() => {
    destroy == null ? void 0 : destroy();
  });
};
var define_PS_LOCALES_default = { "/en/": { closeTitle: "Close", downloadTitle: "Download Image", fullscreenTitle: "Switch to fullscreen", zoomTitle: "Zoom in/out", arrowPrevTitle: "Prev (Arrow Left)", arrowNextTitle: "Next (Arrow Right)" }, "/": { closeTitle: "닫기", downloadTitle: "이미지 다운로드", fullscreenTitle: "전체 화면 전환", zoomTitle: "확대/축소", arrowPrevTitle: "이전 (왼쪽 화살표)", arrowNextTitle: "다음 (오른쪽 화살표)" } };
const selector = ".plume-content > img, .plume-content :not(a) > img";
const locales$1 = define_PS_LOCALES_default;
const delay = 300;
const download = true;
const fullscreen = true;
const scrollToClose = true;
const config$2 = defineClientConfig({
  enhance: ({ app }) => {
    injectPhotoSwipeConfig(app);
  },
  setup: () => {
    usePhotoSwipe({
      selector,
      delay,
      locales: locales$1,
      download,
      fullscreen,
      scrollToClose
    });
  }
});
const clientConfig4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: config$2
}, Symbol.toStringTag, { value: "Module" }));
const searchIndex = { "/": () => import("./assets/searchBox-default-DR_NYbFt.mjs"), "/en/": () => import("./assets/searchBox-en-CzTDJZx1.mjs") };
var defaultLocales = {
  "/": {
    placeholder: "Search",
    resetButtonTitle: "Reset search",
    backButtonTitle: "Close search",
    noResultsText: "No results for",
    footer: {
      selectText: "to select",
      selectKeyAriaLabel: "enter",
      navigateText: "to navigate",
      navigateUpKeyAriaLabel: "up arrow",
      navigateDownKeyAriaLabel: "down arrow",
      closeText: "to close",
      closeKeyAriaLabel: "escape"
    }
  }
};
function useLocale(locales2) {
  const localesRef = toRef(locales2);
  const routeLocale = useRouteLocale();
  const locale = computed(() => localesRef.value[routeLocale.value] ?? defaultLocales[routeLocale.value] ?? defaultLocales["/"]);
  return locale;
}
var searchIndexData = shallowRef(searchIndex);
function useSearchIndex() {
  return searchIndexData;
}
const _sfc_main$1v = /* @__PURE__ */ defineComponent({
  __name: "SearchButton",
  props: {
    locales: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const locale = useLocale(toRef(props.locales));
    const __returned__ = { props, locale };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
function _sfc_ssrRender$1v(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<button${ssrRenderAttrs(mergeProps({
    type: "button",
    class: "mini-search mini-search-button",
    "aria-label": $setup.locale.placeholder
  }, _attrs))}><span class="mini-search-button-container"><svg class="mini-search-search-icon" width="20" height="20" viewBox="0 0 20 20" aria-label="search icon"><path d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z" stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="mini-search-button-placeholder">${ssrInterpolate($setup.locale.placeholder)}</span></span><span class="mini-search-button-keys"><kbd class="mini-search-button-key"></kbd><kbd class="mini-search-button-key">K</kbd></span></button>`);
}
const _sfc_setup$1v = _sfc_main$1v.setup;
_sfc_main$1v.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/@vuepress-plume/plugin-search/lib/client/components/SearchButton.vue");
  return _sfc_setup$1v ? _sfc_setup$1v(props, ctx) : void 0;
};
const SearchButton = /* @__PURE__ */ _export_sfc(_sfc_main$1v, [["ssrRender", _sfc_ssrRender$1v], ["__file", "SearchButton.vue"]]);
const _sfc_main$1u = /* @__PURE__ */ defineComponent({
  __name: "Search",
  props: {
    locales: {},
    options: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const SearchBox = defineAsyncComponent(() => import("./assets/SearchBox-Bdl9qnlh.mjs"));
    const showSearch = ref(false);
    onKeyStroke("k", (event) => {
      if (event.ctrlKey || event.metaKey) {
        event.preventDefault();
        showSearch.value = true;
      }
    });
    onKeyStroke("/", (event) => {
      if (!isEditingContent(event)) {
        event.preventDefault();
        showSearch.value = true;
      }
    });
    function isEditingContent(event) {
      const element = event.target;
      const tagName = element.tagName;
      return element.isContentEditable || tagName === "INPUT" || tagName === "SELECT" || tagName === "TEXTAREA";
    }
    const __returned__ = { SearchBox, showSearch, isEditingContent, SearchButton };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$1u(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "search-wrapper" }, _attrs))} data-v-da80fada>`);
  if ($setup.showSearch) {
    _push(ssrRenderComponent($setup["SearchBox"], {
      locales: $props.locales,
      options: $props.options,
      onClose: ($event) => $setup.showSearch = false
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  _push(`<div id="local-search" data-v-da80fada>`);
  _push(ssrRenderComponent($setup["SearchButton"], {
    locales: $props.locales,
    onClick: ($event) => $setup.showSearch = true
  }, null, _parent));
  _push(`</div></div>`);
}
const _sfc_setup$1u = _sfc_main$1u.setup;
_sfc_main$1u.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/@vuepress-plume/plugin-search/lib/client/components/Search.vue");
  return _sfc_setup$1u ? _sfc_setup$1u(props, ctx) : void 0;
};
const Search = /* @__PURE__ */ _export_sfc(_sfc_main$1u, [["ssrRender", _sfc_ssrRender$1u], ["__scopeId", "data-v-da80fada"], ["__file", "Search.vue"]]);
var define_SEARCH_LOCALES_default = { "/en/": { placeholder: "Search", resetButtonTitle: "Reset search", backButtonTitle: "Close search", noResultsText: "No results for", footer: { selectText: "to select", selectKeyAriaLabel: "enter", navigateText: "to navigate", navigateUpKeyAriaLabel: "up arrow", navigateDownKeyAriaLabel: "down arrow", closeText: "to close", closeKeyAriaLabel: "escape" } }, "/": { placeholder: "찾아보기" } };
var define_SEARCH_OPTIONS_default = {};
var locales = define_SEARCH_LOCALES_default;
var searchOptions = define_SEARCH_OPTIONS_default;
var config_default$1 = defineClientConfig({
  enhance({ app }) {
    app.component("SearchBox", (props) => h(Search, {
      locales,
      options: searchOptions,
      ...props
    }));
  }
});
const clientConfig5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: config_default$1
}, Symbol.toStringTag, { value: "Module" }));
function useCollapsedLines({
  selector: selector2 = 'div[class*="language-"] > .collapsed-lines'
} = {}) {
  useEventListener("click", (e) => {
    const el = e.target;
    if (el.matches(selector2)) {
      const parent = el.parentElement;
      if (parent == null ? void 0 : parent.classList.toggle("collapsed")) {
        parent.scrollIntoView({ block: "center", behavior: "instant" });
      }
    }
  });
}
const client = {
  setup() {
    useCollapsedLines();
  }
};
const clientConfig6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: client
}, Symbol.toStringTag, { value: "Module" }));
const clientConfig7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
const config$1 = {
  enhance: ({ app }) => {
  }
};
const clientConfig8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: config$1
}, Symbol.toStringTag, { value: "Module" }));
const TAB_STORE_NAME = "VUEPRESS_TAB_STORE";
const _sfc_main$1t = /* @__PURE__ */ defineComponent({
  __name: "Tabs",
  props: {
    id: {},
    tabId: { default: "" },
    active: { default: 0 },
    data: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const tabStore = useStorage(TAB_STORE_NAME, {});
    const activeIndex = ref(props.active);
    const tabRefs = shallowRef([]);
    function updateStore() {
      if (props.tabId)
        tabStore.value[props.tabId] = props.data[activeIndex.value].id;
    }
    function activateNext(index = activeIndex.value) {
      activeIndex.value = index < tabRefs.value.length - 1 ? index + 1 : 0;
      tabRefs.value[activeIndex.value].focus();
    }
    function activatePrev(index = activeIndex.value) {
      activeIndex.value = index > 0 ? index - 1 : tabRefs.value.length - 1;
      tabRefs.value[activeIndex.value].focus();
    }
    function keyboardHandler(event, index) {
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        activeIndex.value = index;
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        activateNext();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        activatePrev();
      }
      updateStore();
    }
    function getInitialIndex() {
      if (props.tabId) {
        const valueIndex = props.data.findIndex(
          ({ id }) => tabStore.value[props.tabId] === id
        );
        if (valueIndex !== -1)
          return valueIndex;
      }
      return props.active;
    }
    onMounted(() => {
      activeIndex.value = getInitialIndex();
      watch(
        () => tabStore.value[props.tabId],
        (newValue, oldValue) => {
          if (props.tabId && newValue !== oldValue) {
            const index = props.data.findIndex(({ id }) => id === newValue);
            if (index !== -1)
              activeIndex.value = index;
          }
        }
      );
    });
    function onTabNavClick(index) {
      activeIndex.value = index;
      updateStore();
    }
    const __returned__ = { props, TAB_STORE_NAME, tabStore, activeIndex, tabRefs, updateStore, activateNext, activatePrev, keyboardHandler, getInitialIndex, onTabNavClick };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$1t(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if ($props.data.length) {
    _push(`<div${ssrRenderAttrs(mergeProps({ class: "vp-tabs" }, _attrs))}><div class="vp-tabs-nav" role="tablist"><!--[-->`);
    ssrRenderList($props.data, (item, index) => {
      _push(`<button class="${ssrRenderClass([{ active: index === $setup.activeIndex }, "vp-tab-nav"])}" type="button" role="tab"${ssrRenderAttr("aria-controls", `tab-${$props.id}-${index}`)}${ssrRenderAttr("aria-selected", index === $setup.activeIndex)}>`);
      ssrRenderSlot(_ctx.$slots, `title${index}`, {
        value: item.id,
        isActive: index === $setup.activeIndex
      }, null, _push, _parent);
      _push(`</button>`);
    });
    _push(`<!--]--></div><!--[-->`);
    ssrRenderList($props.data, (item, index) => {
      _push(`<div${ssrRenderAttr("id", `tab-${$props.id}-${index}`)} class="${ssrRenderClass([{ active: index === $setup.activeIndex }, "vp-tab"])}" role="tabpanel"${ssrRenderAttr("aria-expanded", index === $setup.activeIndex)}><div class="vp-tab-title">`);
      ssrRenderSlot(_ctx.$slots, `title${index}`, {
        value: item.id,
        isActive: index === $setup.activeIndex
      }, null, _push, _parent);
      _push(`</div>`);
      ssrRenderSlot(_ctx.$slots, `tab${index}`, {
        value: item.id,
        isActive: index === $setup.activeIndex
      }, null, _push, _parent);
      _push(`</div>`);
    });
    _push(`<!--]--></div>`);
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup$1t = _sfc_main$1t.setup;
_sfc_main$1t.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-plugin-md-power/lib/client/components/Tabs.vue");
  return _sfc_setup$1t ? _sfc_setup$1t(props, ctx) : void 0;
};
const Tabs = /* @__PURE__ */ _export_sfc(_sfc_main$1t, [["ssrRender", _sfc_ssrRender$1t], ["__file", "Tabs.vue"]]);
const CODE_TAB_STORE_NAME = "VUEPRESS_CODE_TAB_STORE";
const _sfc_main$1s = /* @__PURE__ */ defineComponent({
  __name: "CodeTabs",
  props: {
    id: {},
    tabId: { default: "" },
    active: { default: 0 },
    data: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const codeTabStore = useStorage(CODE_TAB_STORE_NAME, {});
    const activeIndex = ref(props.active);
    const tabRefs = shallowRef([]);
    function updateStore() {
      if (props.tabId)
        codeTabStore.value[props.tabId] = props.data[activeIndex.value].id;
    }
    function activateNext(index = activeIndex.value) {
      activeIndex.value = index < tabRefs.value.length - 1 ? index + 1 : 0;
      tabRefs.value[activeIndex.value].focus();
    }
    function activatePrev(index = activeIndex.value) {
      activeIndex.value = index > 0 ? index - 1 : tabRefs.value.length - 1;
      tabRefs.value[activeIndex.value].focus();
    }
    function keyboardHandler(event, index) {
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        activeIndex.value = index;
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        activateNext();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        activatePrev();
      }
      if (props.tabId)
        codeTabStore.value[props.tabId] = props.data[activeIndex.value].id;
    }
    function getInitialIndex() {
      if (props.tabId) {
        const valueIndex = props.data.findIndex(
          ({ id }) => codeTabStore.value[props.tabId] === id
        );
        if (valueIndex !== -1)
          return valueIndex;
      }
      return props.active;
    }
    onMounted(() => {
      activeIndex.value = getInitialIndex();
      watch(
        () => codeTabStore.value[props.tabId],
        (newValue, oldValue) => {
          if (props.tabId && newValue !== oldValue) {
            const index = props.data.findIndex(({ id }) => id === newValue);
            if (index !== -1)
              activeIndex.value = index;
          }
        }
      );
    });
    function onTabNavClick(index) {
      activeIndex.value = index;
      updateStore();
    }
    const __returned__ = { props, CODE_TAB_STORE_NAME, codeTabStore, activeIndex, tabRefs, updateStore, activateNext, activatePrev, keyboardHandler, getInitialIndex, onTabNavClick };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$1s(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if ($props.data.length) {
    _push(`<div${ssrRenderAttrs(mergeProps({ class: "vp-code-tabs" }, _attrs))}><div class="vp-code-tabs-nav" role="tablist"><!--[-->`);
    ssrRenderList($props.data, (item, index) => {
      _push(`<button class="${ssrRenderClass([{ active: index === $setup.activeIndex }, "vp-code-tab-nav"])}" type="button" role="tab"${ssrRenderAttr("aria-controls", `codetab-${$props.id}-${index}`)}${ssrRenderAttr("aria-selected", index === $setup.activeIndex)}>`);
      ssrRenderSlot(_ctx.$slots, `title${index}`, {
        value: item.id,
        isActive: index === $setup.activeIndex
      }, null, _push, _parent);
      _push(`</button>`);
    });
    _push(`<!--]--></div><!--[-->`);
    ssrRenderList($props.data, (item, index) => {
      _push(`<div${ssrRenderAttr("id", `codetab-${$props.id}-${index}`)} class="${ssrRenderClass([{ active: index === $setup.activeIndex }, "vp-code-tab"])}" role="tabpanel"${ssrRenderAttr("aria-expanded", index === $setup.activeIndex)}><div class="vp-code-tab-title">`);
      ssrRenderSlot(_ctx.$slots, `title${index}`, {
        value: item.id,
        isActive: index === $setup.activeIndex
      }, null, _push, _parent);
      _push(`</div>`);
      ssrRenderSlot(_ctx.$slots, `tab${index}`, {
        value: item.id,
        isActive: index === $setup.activeIndex
      }, null, _push, _parent);
      _push(`</div>`);
    });
    _push(`<!--]--></div>`);
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup$1s = _sfc_main$1s.setup;
_sfc_main$1s.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-plugin-md-power/lib/client/components/CodeTabs.vue");
  return _sfc_setup$1s ? _sfc_setup$1s(props, ctx) : void 0;
};
const CodeTabs = /* @__PURE__ */ _export_sfc(_sfc_main$1s, [["ssrRender", _sfc_ssrRender$1s], ["__file", "CodeTabs.vue"]]);
const _sfc_main$1r = /* @__PURE__ */ defineComponent({
  __name: "Plot",
  props: {
    mask: {},
    color: {},
    trigger: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const matter = usePageFrontmatter();
    const options = computed(() => {
      const plot = {};
      return {
        trigger: props.trigger || matter.value.plotTrigger || plot.trigger || "hover",
        color: props.color || plot.color,
        mask: props.mask || plot.mask
      };
    });
    const styles = computed(() => {
      const plot = options.value;
      if (!plot.color && !plot.mask)
        return {};
      const style = {};
      if (plot.color) {
        if (typeof plot.color === "string") {
          style["--vp-c-plot-light"] = plot.color;
        } else {
          style["--vp-c-plot-light"] = plot.color.light;
          style["--vp-c-plot-dark"] = plot.color.dark;
        }
      }
      if (plot.mask) {
        if (typeof plot.mask === "string") {
          style["--vp-c-bg-plot-light"] = plot.mask;
        } else {
          style["--vp-c-bg-plot-light"] = plot.mask.light;
          style["--vp-c-bg-plot-dark"] = plot.mask.dark;
        }
      }
      return style;
    });
    const isMobile = useMediaQuery("(max-width: 768px)");
    const active2 = ref(false);
    const el = shallowRef();
    onClickOutside(el, () => {
      if (options.value.trigger === "click" || isMobile.value)
        active2.value = false;
    });
    function onClick() {
      if (props.trigger === "click" || isMobile.value)
        active2.value = !active2.value;
    }
    const __returned__ = { props, matter, options, styles, isMobile, active: active2, el, onClick };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$1r(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<span${ssrRenderAttrs(mergeProps({
    ref: "el",
    class: ["vp-plot", { hover: $setup.options.trigger !== "click", active: $setup.active }],
    style: $setup.styles
  }, _attrs))}>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</span>`);
}
const _sfc_setup$1r = _sfc_main$1r.setup;
_sfc_main$1r.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-plugin-md-power/lib/client/components/Plot.vue");
  return _sfc_setup$1r ? _sfc_setup$1r(props, ctx) : void 0;
};
const Plot = /* @__PURE__ */ _export_sfc(_sfc_main$1r, [["ssrRender", _sfc_ssrRender$1r], ["__file", "Plot.vue"]]);
const _sfc_main$1q = /* @__PURE__ */ defineComponent({
  __name: "FileTreeItem",
  props: {
    type: {},
    expanded: { type: Boolean },
    empty: { type: Boolean }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const active2 = ref(!!props.expanded);
    const el = ref();
    function toggle(e) {
      const target = e.target;
      if (target.matches(".comment") || e.currentTarget === target)
        return;
      active2.value = !active2.value;
    }
    onMounted(() => {
      var _a;
      if (!el.value || props.type !== "folder")
        return;
      (_a = el.value.querySelector(".tree-node.folder")) == null ? void 0 : _a.addEventListener(
        "click",
        toggle
      );
    });
    onUnmounted(() => {
      var _a;
      if (!el.value || props.type !== "folder")
        return;
      (_a = el.value.querySelector(".tree-node.folder")) == null ? void 0 : _a.removeEventListener(
        "click",
        toggle
      );
    });
    const __returned__ = { props, active: active2, el, toggle };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$1q(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<li${ssrRenderAttrs(mergeProps({
    ref: "el",
    class: ["file-tree-item", { expanded: $setup.active }]
  }, _attrs))}>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  if ($setup.props.type === "folder" && $setup.props.empty) {
    _push(`<ul><li class="file-tree-item"><span class="tree-node file"><span class="name">…</span></span></li></ul>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</li>`);
}
const _sfc_setup$1q = _sfc_main$1q.setup;
_sfc_main$1q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-plugin-md-power/lib/client/components/FileTreeItem.vue");
  return _sfc_setup$1q ? _sfc_setup$1q(props, ctx) : void 0;
};
const FileTreeItem = /* @__PURE__ */ _export_sfc(_sfc_main$1q, [["ssrRender", _sfc_ssrRender$1q], ["__file", "FileTreeItem.vue"]]);
const config = defineClientConfig({
  enhance({ router, app }) {
    app.component("Tabs", Tabs);
    app.component("CodeTabs", CodeTabs);
    app.component("Plot", Plot);
    app.component("FileTreeItem", FileTreeItem);
  }
});
const clientConfig9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: config
}, Symbol.toStringTag, { value: "Module" }));
const clientConfig10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
const sidebar = { "/en/": { "/en/docs/": [{ "text": "Get-started", "prefix": "get-started", "items": [{ "text": "installation", "link": "installation" }] }] }, "/": { "/docs/": [{ "text": "Get-started", "prefix": "get-started", "collapsed": false, "items": [{ "text": "installation", "link": "installation" }] }] }, "__auto__": {} };
function resolveRepoType(repo) {
  if (!isLinkHttp(repo) || /github\.com/.test(repo))
    return "GitHub";
  if (/bitbucket\.org/.test(repo))
    return "Bitbucket";
  if (/gitlab\.com/.test(repo))
    return "GitLab";
  if (/gitee\.com/.test(repo))
    return "Gitee";
  return null;
}
var editLinkPatterns = {
  GitHub: ":repo/edit/:branch/:path",
  GitLab: ":repo/-/edit/:branch/:path",
  Gitee: ":repo/edit/:branch/:path",
  Bitbucket: ":repo/src/:branch/:path?mode=edit&spa=0&at=:branch&fileviewer=file-view-default"
};
function resolveEditLinkPatterns({
  docsRepo,
  editLinkPattern
}) {
  if (editLinkPattern)
    return editLinkPattern;
  const repoType = resolveRepoType(docsRepo);
  if (repoType !== null)
    return editLinkPatterns[repoType];
  return null;
}
function resolveEditLink({
  docsRepo,
  docsBranch,
  docsDir,
  filePathRelative,
  editLinkPattern
}) {
  if (!filePathRelative)
    return null;
  const pattern = resolveEditLinkPatterns({ docsRepo, editLinkPattern });
  if (!pattern)
    return null;
  return pattern.replace(
    /:repo/,
    isLinkHttp(docsRepo) ? docsRepo : `https://github.com/${docsRepo}`
  ).replace(/:branch/, docsBranch).replace(
    /:path/,
    removeLeadingSlash(`${removeEndingSlash(docsDir)}/${filePathRelative}`)
  );
}
function resolveNavLink(link) {
  const { notFound, meta, path } = resolveRoute(link);
  return notFound ? { text: path, link: path } : {
    text: meta.title || path,
    link: path,
    icon: meta.icon
  };
}
function normalizeLink(base = "", link = "") {
  return isLinkAbsolute(link) || isLinkWithProtocol(link) ? link : ensureLeadingSlash(`${base}/${link}`.replace(/\/+/g, "/"));
}
function normalizePrefix(base, link = "") {
  return ensureEndingSlash(normalizeLink(base, link));
}
var HASH_RE = /#.*$/;
var EXT_RE = /(index|README)?\.(md|html)$/;
var inBrowser = typeof document !== "undefined";
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
function isActive(currentPath, matchPath, asRegex = false) {
  if (matchPath === void 0)
    return false;
  currentPath = normalize(`/${currentPath.replace(/^\//, "")}`);
  if (asRegex)
    return new RegExp(matchPath).test(currentPath);
  if (normalize(matchPath) !== currentPath)
    return false;
  const hashMatch = matchPath.match(HASH_RE);
  if (hashMatch)
    return (inBrowser ? location.hash : "") === hashMatch[0];
  return true;
}
function normalize(path) {
  return decodeURI(path).replace(HASH_RE, "").replace(EXT_RE, "");
}
function throttleAndDebounce(fn, delay2) {
  let timeoutId;
  let called = false;
  return () => {
    if (timeoutId)
      clearTimeout(timeoutId);
    if (!called) {
      fn();
      called = true;
      setTimeout(() => {
        called = false;
      }, delay2);
    } else {
      timeoutId = setTimeout(fn, delay2);
    }
  };
}
const themeData$1 = { "locales": { "/en/": { "selectLanguageName": "English", "selectLanguageText": "Languages", "appearanceText": "Appearance", "lightModeSwitchTitle": "Switch to light theme", "darkModeSwitchTitle": "Switch to dark theme", "editLinkText": "Edit this page", "contributorsText": "Contributors", "lastUpdated": { "text": "Last Updated" }, "encryptButtonText": "Confirm", "encryptPlaceholder": "Enter password", "encryptGlobalText": "Only password can access this site", "encryptPageText": "Only password can access this page", "footer": { "message": "Powered by Karanda", "copyright": "Copyright © 2024-Present All Rights Reserved." }, "logo": "./karanda_logo.png", "social": [{ "icon": "discord", "link": "https://www.discord.com" }], "outline": [1, 6], "navbar": [{ "text": "Get-started", "link": "/en/docs/get-started/installation/" }] }, "/": { "logo": "./karanda_logo.png", "social": [{ "icon": "discord", "link": "https://www.discord.com" }], "footer": { "message": "Powered by Karanda", "copyright": "Copyright © 2024-Present All Rights Reserved." }, "outline": [1, 6], "selectLanguageName": "한국어", "navbar": [{ "text": "시작하기", "link": "/docs/get-started/installation" }] } }, "appearance": true, "blog": false, "navbarSocialInclude": ["github", "twitter", "discord", "facebook"], "aside": true, "outline": [1, 6], "externalLinkIcon": true, "editLink": true, "contributors": true, "prevPage": true, "nextPage": true, "footer": { "message": "Powered by Karanda", "copyright": "Copyright © 2024-Present All Rights Reserved." }, "logo": "./karanda_logo.png", "social": [{ "icon": "discord", "link": "https://www.discord.com" }] };
const encrypt$1 = [false, ":", "", [], {}];
const blogPostData$1 = [];
const articleTagColors = {};
const icons = "{}";
const watermarkOptions = ref({});
const defineWatermarkConfig = (userConfig) => {
  if (isRef(userConfig)) {
    watch(userConfig, (value) => {
      watermarkOptions.value = value;
    }, { immediate: true });
  } else if (isFunction(userConfig)) {
    watch(userConfig, (value) => {
      watermarkOptions.value = value;
    });
  } else {
    watermarkOptions.value = userConfig;
  }
};
var define_PLUME_PRESET_LOCALE_default = { "/zh/": { home: "首页", blog: "博客", tag: "标签", archive: "归档", category: "分类" }, "/en/": { home: "Home", blog: "Blog", tag: "Tags", archive: "Archives", category: "Categories" } };
var themeLocaleDataSymbol = Symbol(
  ""
);
var themeData = ref(themeData$1);
function useThemeData() {
  return themeData;
}
function useThemeLocaleData() {
  const themeLocaleData = inject(themeLocaleDataSymbol);
  if (!themeLocaleData) {
    throw new Error("useThemeLocaleData() is called without provider.");
  }
  return themeLocaleData;
}
function resolveThemeLocaleData(theme, routeLocale) {
  const { locales: locales2, ...baseOptions } = theme;
  return {
    ...baseOptions,
    ...locales2 == null ? void 0 : locales2[routeLocale]
  };
}
function setupThemeData(app) {
  const themeData2 = useThemeData();
  const clientData = app._context.provides[clientDataSymbol];
  const themeLocaleData = computed(
    () => resolveThemeLocaleData(themeData2.value, clientData.routeLocale.value)
  );
  app.provide(themeLocaleDataSymbol, themeLocaleData);
  Object.defineProperties(app.config.globalProperties, {
    $theme: {
      get() {
        return themeData2.value;
      }
    },
    $themeLocale: {
      get() {
        return themeLocaleData.value;
      }
    }
  });
}
var darkModeSymbol = Symbol(
  ""
);
function setupDarkMode(app) {
  const theme = useThemeData();
  const transition = theme.value.transition;
  const disableTransition = typeof transition === "object" ? transition.appearance === false : transition === false;
  const appearance = theme.value.appearance;
  const isDark = appearance === "force-dark" ? ref(true) : appearance ? useDark({
    storageKey: "vuepress-theme-appearance",
    attribute: "data-theme",
    valueLight: "light",
    valueDark: "dark",
    disableTransition,
    initialValue: () => typeof appearance === "string" ? appearance : "auto",
    ...typeof appearance === "object" ? appearance : {}
  }) : ref(false);
  app.provide(darkModeSymbol, isDark);
  Object.defineProperty(app.config.globalProperties, "$isDark", {
    get: () => isDark
  });
}
function useDarkMode() {
  const isDarkMode = inject(darkModeSymbol);
  if (!isDarkMode)
    throw new Error("useDarkMode() is called without provider.");
  return isDarkMode;
}
function useData() {
  const theme = useThemeLocaleData();
  const page = usePageData();
  const frontmatter = usePageFrontmatter();
  const site = useSiteLocaleData();
  const isDark = useDarkMode();
  const lang = usePageLang();
  return { theme, page, frontmatter, lang, site, isDark };
}
var encrypt = ref(resolveEncryptData(encrypt$1));
function useEncryptData() {
  return encrypt;
}
function resolveEncryptData([global, separator, admin, matches, rules]) {
  return {
    global,
    separator,
    matches,
    admins: admin.split(separator),
    ruleList: Object.keys(rules).map((key) => ({
      key,
      match: matches[key],
      rules: rules[key].split(separator)
    }))
  };
}
var EncryptSymbol = Symbol(
  ""
);
var storage = useSessionStorage("2a0a3d6afb2fdf1f", () => ({
  s: [genSaltSync(10), genSaltSync(10)],
  g: "",
  p: {}
}));
function mergeHash(hash) {
  const [left, right] = storage.value.s;
  return left + hash + right;
}
function splitHash(hash) {
  const [left, right] = storage.value.s;
  if (!hash.startsWith(left) || !hash.endsWith(right))
    return "";
  return hash.slice(left.length, hash.length - right.length);
}
var compareCache = /* @__PURE__ */ new Map();
async function compareDecrypt(content, hash, separator = ":") {
  const key = [content, hash].join(separator);
  if (compareCache.has(key))
    return compareCache.get(key);
  try {
    const result = await compare(content, hash);
    compareCache.set(key, result);
    return result;
  } catch {
    compareCache.set(key, false);
    return false;
  }
}
var matchCache = /* @__PURE__ */ new Map();
function createMatchRegex(match) {
  if (matchCache.has(match))
    return matchCache.get(match);
  const regex = new RegExp(match);
  matchCache.set(match, regex);
  return regex;
}
function toMatch(match, pagePath, filePathRelative) {
  const relativePath = filePathRelative || "";
  if (match[0] === "^") {
    const regex = createMatchRegex(match);
    return regex.test(pagePath) || relativePath && regex.test(relativePath);
  }
  if (match.endsWith(".md"))
    return relativePath && relativePath.endsWith(match);
  return pagePath.startsWith(match) || relativePath.startsWith(match);
}
function setupEncrypt() {
  const { page } = useData();
  const route = useRoute();
  const encrypt2 = useEncryptData();
  const hasPageEncrypt = computed(() => {
    const pagePath = route.path;
    const filePathRelative = page.value.filePathRelative;
    return encrypt2.value.ruleList.length ? encrypt2.value.matches.some((match) => toMatch(match, pagePath, filePathRelative)) : false;
  });
  const isGlobalDecrypted = computed(() => {
    if (!encrypt2.value.global)
      return true;
    const hash = splitHash(storage.value.g);
    return !!hash && encrypt2.value.admins.includes(hash);
  });
  const hashList = computed(() => {
    const pagePath = route.path;
    const filePathRelative = page.value.filePathRelative;
    return encrypt2.value.ruleList.length ? encrypt2.value.ruleList.filter((item) => toMatch(item.match, pagePath, filePathRelative)) : [];
  });
  const isPageDecrypted = computed(() => {
    if (!hasPageEncrypt.value)
      return true;
    const hash = splitHash(storage.value.p.__GLOBAL__ || "");
    if (hash && encrypt2.value.admins.includes(hash))
      return true;
    for (const { key, rules } of hashList.value) {
      if (hasOwn(storage.value.p, key)) {
        const hash2 = splitHash(storage.value.p[key]);
        if (hash2 && rules.includes(hash2))
          return true;
      }
    }
    return false;
  });
  provide(EncryptSymbol, {
    hasPageEncrypt,
    isGlobalDecrypted,
    isPageDecrypted,
    hashList
  });
}
function useEncrypt() {
  const result = inject(EncryptSymbol);
  if (!result)
    throw new Error("useEncrypt() is called without setup");
  return result;
}
function useEncryptCompare() {
  const encrypt2 = useEncryptData();
  const { page } = useData();
  const route = useRoute();
  const { hashList } = useEncrypt();
  async function compareGlobal(password) {
    if (!password)
      return false;
    for (const admin of encrypt2.value.admins) {
      if (await compareDecrypt(password, admin, encrypt2.value.separator)) {
        storage.value.g = mergeHash(admin);
        return true;
      }
    }
    return false;
  }
  async function comparePage(password) {
    if (!password)
      return false;
    const pagePath = route.path;
    const filePathRelative = page.value.filePathRelative;
    let decrypted = false;
    for (const { match, key, rules } of hashList.value) {
      if (toMatch(match, pagePath, filePathRelative)) {
        for (const rule of rules) {
          if (await compareDecrypt(password, rule, encrypt2.value.separator)) {
            decrypted = true;
            storage.value.p = {
              ...storage.value.p,
              [key]: mergeHash(rule)
            };
            break;
          }
        }
        if (decrypted)
          break;
      }
    }
    if (!decrypted) {
      decrypted = await compareGlobal(password);
    }
    return decrypted;
  }
  return { compareGlobal, comparePage };
}
var { __auto__, ...items } = sidebar;
var sidebarData = ref(items);
var autoDirSidebar = ref(__auto__);
var sidebarSymbol = Symbol(
  ""
);
function setupSidebar() {
  const { page, frontmatter } = useData();
  const routeLocale = useRouteLocale();
  const hasSidebar = computed(() => {
    return frontmatter.value.pageLayout !== "home" && frontmatter.value.pageLayout !== "friends" && frontmatter.value.sidebar !== false && frontmatter.value.layout !== "NotFound";
  });
  const sidebarData2 = computed(() => {
    return hasSidebar.value ? getSidebar(typeof frontmatter.value.sidebar === "string" ? frontmatter.value.sidebar : page.value.path, routeLocale.value) : [];
  });
  provide(sidebarSymbol, sidebarData2);
}
function useSidebarData() {
  const sidebarData2 = inject(sidebarSymbol);
  if (!sidebarData2) {
    throw new Error("useSidebarData() is called without provider.");
  }
  return sidebarData2;
}
function getSidebar(routePath, routeLocal) {
  const _sidebar = sidebarData.value[routeLocal];
  if (_sidebar === "auto") {
    return resolveSidebarItems(autoDirSidebar.value[routeLocal]);
  } else if (isArray(_sidebar)) {
    return resolveSidebarItems(_sidebar, routeLocal);
  } else if (isPlainObject(_sidebar)) {
    routePath = decodeURIComponent(routePath);
    const dir = Object.keys(_sidebar).sort((a, b) => b.split("/").length - a.split("/").length).find((dir2) => {
      return routePath.startsWith(`${routeLocal}${removeLeadingSlash(dir2)}`);
    }) || "";
    const sidebar2 = dir ? _sidebar[dir] : void 0;
    if (sidebar2 === "auto") {
      return resolveSidebarItems(
        dir ? autoDirSidebar.value[dir] : [],
        routeLocal
      );
    } else if (isArray(sidebar2)) {
      return resolveSidebarItems(sidebar2, dir);
    } else if (isPlainObject(sidebar2)) {
      const prefix = normalizePrefix(dir, sidebar2.prefix);
      return resolveSidebarItems(
        sidebar2.items === "auto" ? autoDirSidebar.value[prefix] : sidebar2.items,
        prefix
      );
    }
  }
  return [];
}
function resolveSidebarItems(sidebarItems, _prefix = "") {
  const resolved = [];
  sidebarItems.forEach((item) => {
    if (isString(item)) {
      resolved.push(resolveNavLink(normalizeLink(_prefix, item)));
    } else {
      const { link, items: items2, prefix, dir, ...args } = item;
      const navLink = { ...args };
      if (link) {
        navLink.link = normalizeLink(_prefix, link);
        const nav = resolveNavLink(navLink.link);
        navLink.icon = nav.icon;
      }
      const nextPrefix = normalizePrefix(_prefix, prefix || dir);
      if (items2 === "auto") {
        navLink.items = autoDirSidebar.value[nextPrefix];
      } else {
        navLink.items = (items2 == null ? void 0 : items2.length) ? resolveSidebarItems(items2, nextPrefix) : void 0;
      }
      resolved.push(navLink);
    }
  });
  return resolved;
}
function getSidebarGroups(sidebar2) {
  const groups = [];
  let lastGroupIndex = 0;
  for (const index in sidebar2) {
    const item = sidebar2[index];
    if (item.items) {
      lastGroupIndex = groups.push(item);
      continue;
    }
    if (!groups[lastGroupIndex]) {
      groups.push({ items: [] });
    }
    groups[lastGroupIndex].items.push(item);
  }
  return groups;
}
function hasActiveLink(path, items2) {
  if (Array.isArray(items2)) {
    return items2.some((item) => hasActiveLink(path, item));
  }
  return isActive(
    path,
    items2.link ? resolveRouteFullPath(items2.link) : void 0
  ) ? true : items2.items ? hasActiveLink(path, items2.items) : false;
}
var containsActiveLink = hasActiveLink;
function useSidebar() {
  const { theme, frontmatter, page } = useData();
  const routeLocal = useRouteLocale();
  const is960 = useMediaQuery("(min-width: 960px)");
  const { isPageDecrypted } = useEncrypt();
  const isOpen = ref(false);
  const sidebarKey = computed(() => {
    const _sidebar = sidebarData.value[routeLocal.value];
    if (!_sidebar || _sidebar === "auto" || isArray(_sidebar))
      return routeLocal.value;
    return Object.keys(_sidebar).sort((a, b) => b.split("/").length - a.split("/").length).find((dir) => {
      return page.value.path.startsWith(ensureLeadingSlash(dir));
    }) || "";
  });
  const sidebar2 = useSidebarData();
  const hasSidebar = computed(() => {
    return frontmatter.value.sidebar !== false && sidebar2.value.length > 0 && frontmatter.value.pageLayout !== "home";
  });
  const hasAside = computed(() => {
    if (frontmatter.value.pageLayout === "home" || frontmatter.value.home)
      return false;
    if (frontmatter.value.pageLayout === "friends" || frontmatter.value.friends)
      return false;
    if (!isPageDecrypted.value)
      return false;
    if (frontmatter.value.aside != null)
      return !!frontmatter.value.aside;
    return theme.value.aside !== false;
  });
  const leftAside = computed(() => {
    if (hasAside.value) {
      return frontmatter.value.aside == null ? theme.value.aside === "left" : frontmatter.value.aside === "left";
    }
    return false;
  });
  const isSidebarEnabled = computed(() => hasSidebar.value && is960.value);
  const sidebarGroups = computed(() => {
    return hasSidebar.value ? getSidebarGroups(sidebar2.value) : [];
  });
  const open = () => {
    isOpen.value = true;
  };
  const close = () => {
    isOpen.value = false;
  };
  const toggle = () => {
    if (isOpen.value) {
      close();
    } else {
      open();
    }
  };
  return {
    isOpen,
    sidebar: sidebar2,
    sidebarKey,
    sidebarGroups,
    hasSidebar,
    hasAside,
    leftAside,
    isSidebarEnabled,
    open,
    close,
    toggle
  };
}
function useCloseSidebarOnEscape(isOpen, close) {
  let triggerElement;
  watchEffect(() => {
    triggerElement = isOpen.value ? document.activeElement : void 0;
  });
  onMounted(() => {
    window.addEventListener("keyup", onEscape);
  });
  onUnmounted(() => {
    window.removeEventListener("keyup", onEscape);
  });
  function onEscape(e) {
    if (e.key === "Escape" && isOpen.value) {
      close();
      triggerElement == null ? void 0 : triggerElement.focus();
    }
  }
}
function useSidebarControl(item) {
  const { page } = useData();
  const route = useRoute();
  const collapsed = ref(false);
  const collapsible = computed(() => {
    return item.value.collapsed != null;
  });
  const isLink = computed(() => {
    return !!item.value.link;
  });
  const isActiveLink = ref(false);
  const updateIsActiveLink = () => {
    isActiveLink.value = isActive(
      page.value.path,
      item.value.link ? resolveRouteFullPath(item.value.link) : void 0
    );
  };
  watch([() => page.value.path, item, () => route.hash], updateIsActiveLink);
  onMounted(updateIsActiveLink);
  const hasActiveLink2 = computed(() => {
    if (isActiveLink.value) {
      return true;
    }
    return item.value.items ? containsActiveLink(page.value.path, item.value.items) : false;
  });
  const hasChildren = computed(() => {
    return !!(item.value.items && item.value.items.length);
  });
  watchEffect(() => {
    collapsed.value = !!(collapsible.value && item.value.collapsed);
  });
  watch(() => [page.value.path, isActiveLink.value, hasActiveLink2.value], () => {
    if (isActiveLink.value || hasActiveLink2.value) {
      collapsed.value = false;
    }
  }, { immediate: true, flush: "post" });
  const toggle = () => {
    if (collapsible.value) {
      collapsed.value = !collapsed.value;
    }
  };
  return {
    collapsed,
    collapsible,
    isLink,
    isActiveLink,
    hasActiveLink: hasActiveLink2,
    hasChildren,
    toggle
  };
}
function useAside() {
  const { hasSidebar } = useSidebar();
  const is960 = useMediaQuery("(min-width: 960px)");
  const is1280 = useMediaQuery("(min-width: 1280px)");
  const isAsideEnabled = computed(() => {
    if (!is1280.value && !is960.value)
      return false;
    return hasSidebar.value ? is1280.value : is960.value;
  });
  return {
    isAsideEnabled
  };
}
var blogPostData = ref(blogPostData$1);
function usePostList() {
  return blogPostData;
}
function useLocalePostList() {
  const locale = usePageLang();
  return computed(() => blogPostData.value.filter((item) => item.lang === locale.value));
}
function useArchives() {
  const list = useLocalePostList();
  const archives = computed(() => {
    const archives2 = [];
    list.value.forEach((item) => {
      var _a;
      const createTime = ((_a = item.createTime) == null ? void 0 : _a.split(" ")[0]) || "";
      const year = createTime.split("/")[0];
      let current = archives2.find((archive) => archive.label === year);
      if (!current) {
        current = { label: year, list: [] };
        archives2.push(current);
      }
      current.list.push({
        title: item.title,
        path: item.path,
        createTime: createTime.slice(year.length + 1).replace(/\//g, "-")
      });
    });
    return archives2;
  });
  return { archives };
}
function useBlogCategory() {
  const postList = useLocalePostList();
  const categories = computed(() => {
    const list = [];
    postList.value.forEach((item) => {
      const categoryList = item.categoryList;
      if (!categoryList || categoryList.length === 0) {
        list.push({ type: "post", title: item.title, path: item.path });
      } else {
        let cate = list;
        let i = 0;
        while (i < categoryList.length) {
          const { id, name, sort } = categoryList[i];
          const current = cate.find((item2) => item2.type === "category" && item2.id === id);
          if (!current) {
            const items2 = [];
            cate.push({ type: "category", title: name, id, sort, items: items2 });
            cate = items2;
          } else {
            cate = current.items;
          }
          i++;
        }
        cate.push({ type: "post", title: item.title, path: item.path });
      }
    });
    return sortCategory(list);
  });
  return { categories };
}
function sortCategory(items2) {
  for (const item of items2) {
    if (item.type === "category" && item.items.length) {
      item.items = sortCategory(item.items);
    }
  }
  return items2.sort((a, b) => {
    if (a.type === "category" && b.type === "category") {
      return a.sort < b.sort ? -1 : 1;
    }
    return 0;
  });
}
var _queue = /* @__PURE__ */ new WeakMap();
function useRouteQuery(name, defaultValue, options = {}) {
  const {
    mode = "replace",
    route = useRoute(),
    router = useRouter(),
    transform = (value) => value
  } = options;
  if (!_queue.has(router))
    _queue.set(router, /* @__PURE__ */ new Map());
  const _queriesQueue = _queue.get(router);
  let query = route.query[name];
  tryOnScopeDispose(() => {
    query = void 0;
  });
  let _trigger;
  const proxy = customRef((track, trigger) => {
    _trigger = trigger;
    return {
      get() {
        track();
        return transform(query !== void 0 ? query : toValue(defaultValue));
      },
      set(v) {
        if (query === v)
          return;
        query = v;
        _queriesQueue.set(name, v);
        trigger();
        nextTick(() => {
          if (_queriesQueue.size === 0)
            return;
          const newQueries = Object.fromEntries(_queriesQueue.entries());
          _queriesQueue.clear();
          const { query: query2, hash, path } = route;
          router[toValue(mode)]({
            path,
            query: { ...query2, ...newQueries },
            hash
          });
        });
      }
    };
  });
  watch(
    () => route.query[name],
    (v) => {
      query = v;
      _trigger();
    },
    { flush: "sync" }
  );
  return proxy;
}
var tagColorsRef = ref(articleTagColors);
var useTagColors = () => tagColorsRef;
function useTags() {
  const list = useLocalePostList();
  const colors = useTagColors();
  const tags = computed(() => {
    const tagMap = {};
    list.value.forEach((item) => {
      if (item.tags) {
        toArray(item.tags).forEach((tag) => {
          if (tagMap[tag])
            tagMap[tag] += 1;
          else
            tagMap[tag] = 1;
        });
      }
    });
    return Object.keys(tagMap).map((tag) => ({
      name: tag,
      count: tagMap[tag] > 99 ? "99+" : tagMap[tag],
      className: `vp-tag-${colors.value[tag]}`
    }));
  });
  const currentTag = useRouteQuery("tag");
  const postList = computed(() => {
    if (!currentTag.value)
      return [];
    return list.value.filter((item) => {
      if (item.tags)
        return toArray(item.tags).includes(currentTag.value);
      return false;
    }).map((item) => ({
      title: item.title,
      path: item.path,
      createTime: item.createTime.split(" ")[0].replace(/\//g, "-")
    }));
  });
  const handleTagClick = (tag) => {
    currentTag.value = tag;
  };
  return {
    tags,
    currentTag,
    postList,
    handleTagClick
  };
}
var presetLocales = define_PLUME_PRESET_LOCALE_default;
function getPresetLocaleData(locale, name) {
  var _a;
  return ((_a = presetLocales[locale]) == null ? void 0 : _a[name]) || presetLocales["/"][name];
}
function useInternalLink() {
  const { theme } = useData();
  const routeLocale = useRouteLocale();
  function resolveLink(name, link) {
    return {
      link: (routeLocale.value + link).replace(/\/+/g, "/"),
      text: getPresetLocaleData(routeLocale.value, name)
    };
  }
  const blogData = computed(() => theme.value.blog || {});
  const home = computed(() => resolveLink("home", "/"));
  const blog = computed(() => blogData.value.postList !== false ? resolveLink("blog", blogData.value.link || "blog/") : home.value);
  const tags = computed(() => blogData.value.tags !== false ? resolveLink("tag", blogData.value.tagsLink || "blog/tags/") : void 0);
  const archive = computed(() => blogData.value.archives !== false ? resolveLink("archive", blogData.value.archivesLink || "blog/archives/") : void 0);
  const categories = computed(() => blogData.value.categories !== false ? resolveLink("category", blogData.value.categoriesLink || "blog/categories/") : void 0);
  return {
    home,
    blog,
    tags,
    archive,
    categories
  };
}
function useBlogExtract() {
  const { theme } = useData();
  const postList = useLocalePostList();
  const { tags: tagsList } = useTags();
  const { categories: categoryList } = useBlogCategory();
  const blog = computed(() => theme.value.blog || {});
  const links = useInternalLink();
  const hasBlogExtract = computed(
    () => blog.value.archives !== false || blog.value.tags !== false || blog.value.categories !== false
  );
  const tags = computed(() => {
    var _a, _b;
    return {
      link: (_a = links.tags.value) == null ? void 0 : _a.link,
      text: (_b = links.tags.value) == null ? void 0 : _b.text,
      total: tagsList.value.length
    };
  });
  const archives = computed(() => {
    var _a, _b;
    return {
      link: (_a = links.archive.value) == null ? void 0 : _a.link,
      text: (_b = links.archive.value) == null ? void 0 : _b.text,
      total: postList.value.length
    };
  });
  const categories = computed(() => {
    var _a, _b;
    return {
      link: (_a = links.categories.value) == null ? void 0 : _a.link,
      text: (_b = links.categories.value) == null ? void 0 : _b.text,
      total: getCategoriesTotal(categoryList.value)
    };
  });
  return {
    hasBlogExtract,
    tags,
    archives,
    categories
  };
}
function getCategoriesTotal(categories) {
  let total = 0;
  for (const category of categories) {
    if (category.type === "category") {
      total += 1;
      if (category.items.length) {
        total += getCategoriesTotal(category.items);
      }
    }
  }
  return total;
}
var DEFAULT_PER_PAGE = 15;
function usePostListControl(homePage) {
  const { theme } = useData();
  const list = useLocalePostList();
  const blog = computed(() => theme.value.blog || {});
  const is960 = useMediaQuery("(max-width: 960px)");
  const postList = computed(() => {
    const stickyList = list.value.filter(
      (item) => item.sticky === true || typeof item.sticky === "number"
    );
    const otherList = list.value.filter(
      (item) => item.sticky === void 0 || item.sticky === false
    );
    return [
      ...stickyList.sort((prev, next) => {
        if (next.sticky === true && prev.sticky === true)
          return 0;
        return next.sticky > prev.sticky ? 1 : -1;
      }),
      ...otherList
    ];
  });
  const page = useRouteQuery("p", 1, {
    mode: "push",
    transform(val) {
      const page2 = Number(val);
      if (!Number.isNaN(page2) && page2 > 0)
        return page2;
      return 1;
    }
  });
  const perPage = computed(() => {
    var _a;
    if (blog.value.pagination === false)
      return 0;
    if (typeof blog.value.pagination === "number")
      return blog.value.pagination;
    return ((_a = blog.value.pagination) == null ? void 0 : _a.perPage) || DEFAULT_PER_PAGE;
  });
  const totalPage = computed(() => {
    if (blog.value.pagination === false)
      return 0;
    return Math.ceil(postList.value.length / perPage.value);
  });
  const isLastPage = computed(() => page.value >= totalPage.value);
  const isFirstPage = computed(() => page.value <= 1);
  const isPaginationEnabled = computed(() => blog.value.pagination !== false && totalPage.value > 1);
  const finalList = computed(() => {
    if (blog.value.pagination === false)
      return postList.value;
    if (postList.value.length <= perPage.value)
      return postList.value;
    return postList.value.slice(
      (page.value - 1) * perPage.value,
      page.value * perPage.value
    );
  });
  const pageRange = computed(() => {
    let range = [];
    const total = totalPage.value;
    const _page = page.value;
    const per = is960.value ? 4 : 5;
    if (total <= 0)
      return range;
    if (total <= 10) {
      range = Array.from({ length: total }, (_, i) => ({ value: i + 1 }));
    } else {
      let i = 1;
      let hasMore = false;
      while (i <= total) {
        if (_page <= per && i <= per || _page >= total - (per - 1) && i >= total - (per - 1)) {
          hasMore = false;
          range.push({ value: i });
        } else if (i <= 2 || i >= total - 1) {
          hasMore = false;
          range.push({ value: i });
        } else if ((_page > per + 1 || _page < total - (per + 1)) && _page - i < per - 2 && i - _page < per - 2) {
          hasMore = false;
          range.push({ value: i });
        } else if (!hasMore) {
          hasMore = true;
          range.push({ value: i, more: true });
        }
        i++;
      }
    }
    return range;
  });
  const changePage = (current) => {
    if (page.value === current)
      return;
    page.value = current;
    setTimeout(() => {
      var _a;
      let top = 0;
      if (homePage.value) {
        top = ((_a = document.querySelector(".vp-blog")) == null ? void 0 : _a.getBoundingClientRect().top) || 0;
        top += window.scrollY - 64;
      }
      window.scrollTo({ top, behavior: "instant" });
    }, 0);
  };
  return {
    postList: finalList,
    page,
    totalPage,
    pageRange,
    isLastPage,
    isFirstPage,
    isPaginationEnabled,
    changePage
  };
}
function useContributors() {
  const { theme, page, frontmatter } = useData();
  return computed(() => {
    var _a;
    const config2 = frontmatter.value.contributors ?? theme.value.contributors ?? true;
    if (config2 === false)
      return [];
    const contributors = config2 === true ? [] : toArray(config2);
    const gitContributors = (((_a = page.value.git) == null ? void 0 : _a.contributors) ?? []).map(({ name }) => name);
    return Array.from(/* @__PURE__ */ new Set([...gitContributors, ...contributors]));
  });
}
function useEditLink() {
  const { theme, page, frontmatter } = useData();
  return computed(() => {
    const showEditLink = frontmatter.value.editLink ?? theme.value.editLink ?? true;
    if (!showEditLink)
      return null;
    const {
      docsRepo,
      docsBranch = "main",
      docsDir = "",
      editLinkText
    } = theme.value;
    if (!docsRepo)
      return null;
    const editLink = resolveEditLink({
      docsRepo,
      docsBranch,
      docsDir,
      filePathRelative: page.value.filePathRelative,
      editLinkPattern: frontmatter.value.editLinkPattern ?? theme.value.editLinkPattern
    });
    if (!editLink)
      return null;
    return {
      text: editLinkText ?? "Edit this page",
      link: editLink
    };
  });
}
var focusedElement = ref();
var active = false;
var listeners = 0;
function useFlyout(options) {
  const focus = ref(false);
  if (inBrowser) {
    if (!active) {
      activateFocusTracking();
    }
    listeners++;
    const unwatch = watch(focusedElement, (el) => {
      var _a, _b, _c;
      if (el === options.el.value || ((_a = options.el.value) == null ? void 0 : _a.contains(el))) {
        focus.value = true;
        (_b = options.onFocus) == null ? void 0 : _b.call(options);
      } else {
        focus.value = false;
        (_c = options.onBlur) == null ? void 0 : _c.call(options);
      }
    });
    onUnmounted(() => {
      unwatch();
      listeners--;
      if (!listeners)
        deactivateFocusTracking();
    });
  }
  return readonly(focus);
}
function activateFocusTracking() {
  document.addEventListener("focusin", handleFocusIn);
  active = true;
  focusedElement.value = document.activeElement;
}
function deactivateFocusTracking() {
  document.removeEventListener("focusin", handleFocusIn);
}
function handleFocusIn() {
  focusedElement.value = document.activeElement;
}
var lightTint = {
  r: { value: 200, offset: 36 },
  g: { value: 200, offset: 36 },
  b: { value: 200, offset: 36 }
};
var darkTint = {
  r: { value: 32, offset: 36 },
  g: { value: 32, offset: 36 },
  b: { value: 32, offset: 36 }
};
function useHomeHeroTintPlate(canvas, enable, tintPlate) {
  const isDark = useDarkMode();
  let ctx = null;
  let t = 0;
  let timer;
  const plate = computed(() => {
    const defaultTint = isDark.value ? darkTint : lightTint;
    if (!tintPlate.value)
      return defaultTint;
    const plate2 = tintPlate.value;
    if (typeof plate2 === "string" || typeof plate2 === "number") {
      if (isDark.value)
        return darkTint;
      const values = toPlate(plate2);
      return values.length !== 3 ? lightTint : toTint(values);
    }
    if (typeof plate2 === "object") {
      if ("r" in plate2) {
        if (isDark.value)
          return darkTint;
        return toNumber({ ...lightTint, ...plate2 });
      }
      const key = isDark.value ? "dark" : "light";
      if (key in plate2) {
        const _plate = plate2[key];
        if (typeof _plate === "string" || typeof _plate === "number") {
          const values = toPlate(_plate);
          return values.length !== 3 ? lightTint : toTint(values);
        }
        return toNumber({ ...defaultTint, ...plate2 });
      }
    }
    return defaultTint;
  });
  onMounted(() => {
    if (canvas.value && enable.value) {
      ctx = canvas.value.getContext("2d");
      if (timer) {
        window.cancelAnimationFrame(timer);
      }
      run();
    }
  });
  onUnmounted(() => {
    if (timer) {
      window.cancelAnimationFrame(timer);
    }
  });
  function run() {
    for (let x = 0; x <= 35; x++) {
      for (let y = 0; y <= 35; y++)
        col(x, y, R(x, y, t), G(x, y, t), B(x, y, t));
    }
    t = t + 0.02;
    timer = window.requestAnimationFrame(run);
  }
  function col(x, y, r, g, b) {
    if (!ctx)
      return;
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(x, y, 1, 1);
  }
  function R(x, y, t2) {
    const r = plate.value.r;
    return Math.floor(r.value + r.offset * Math.cos((x * x - y * y) / 300 + t2));
  }
  function G(x, y, t2) {
    const g = plate.value.g;
    return Math.floor(g.value + g.offset * Math.sin((x * x * Math.cos(t2 / 4) + y * y * Math.sin(t2 / 3)) / 300));
  }
  function B(x, y, t2) {
    const b = plate.value.b;
    return Math.floor(b.value + b.offset * Math.sin(5 * Math.sin(t2 / 9) + ((x - 100) * (x - 100) + (y - 100) * (y - 100)) / 1100));
  }
}
function toPlate(plate) {
  return typeof plate === "number" || Number(plate) === Number.parseInt(plate) ? [plate, plate, plate].map((n) => Number(n)) : plate.includes(",") ? plate.replace(/\s/g, "").split(",").map((n) => Number(n)) : [];
}
function toTint([r, g, b]) {
  return { r: toColor(r), g: toColor(g), b: toColor(b) };
}
function toColor(num) {
  const offset = 256 - num;
  return { value: num, offset: offset > 64 ? 64 : offset };
}
function toNumber(tint) {
  Object.keys(tint).forEach((key) => {
    const p = tint[key];
    p.value = Number(p.value);
    p.offset = Number(p.offset);
  });
  return tint;
}
var iconsData = ref(icons);
var useIconsData = () => iconsData;
function useBlogPageData() {
  const { page } = useData();
  const postList = usePostList();
  const isBlogPost = computed(() => {
    return postList.value.some((item) => item.path === page.value.path);
  });
  const isBlogLayout = computed(() => {
    const type = page.value.type;
    return type === "blog" || type === "blog-archives" || type === "blog-tags" || type === "blog-categories";
  });
  return {
    isBlogPost,
    isBlogLayout
  };
}
function useLangs({
  removeCurrent = true
} = {}) {
  const theme = useThemeData();
  const { page } = useData();
  const routeLocale = useRouteLocale();
  const { isBlogPost } = useBlogPageData();
  const currentLang = computed(() => {
    var _a, _b;
    const link = routeLocale.value;
    return {
      label: (_b = (_a = theme.value.locales) == null ? void 0 : _a[link]) == null ? void 0 : _b.selectLanguageName,
      link
    };
  });
  const getPageLink = (locale) => {
    const filepath = page.value.filePathRelative ? `/${page.value.filePathRelative}` : page.value.path;
    const pagePath = filepath.slice(routeLocale.value.length);
    const targetPath = normalizeLink(locale, pagePath);
    const { notFound, path } = resolveRoute(targetPath);
    if (!notFound)
      return path;
    const blog = theme.value.blog;
    if (isBlogPost.value && blog !== false)
      return withBase((blog == null ? void 0 : blog.link) || normalizeLink(locale, "blog/"));
    const home = withBase(theme.value.home || "/");
    const fallbackResolve = resolveRoute(withBase(locale));
    return fallbackResolve.notFound ? home : fallbackResolve.path;
  };
  const localeLinks = computed(
    () => Object.entries(theme.value.locales || {}).flatMap(
      ([key, locale]) => removeCurrent && currentLang.value.label === locale.selectLanguageName ? [] : {
        text: locale.selectLanguageName,
        link: getPageLink(key)
      }
    )
  );
  return { localeLinks, currentLang };
}
function useLastUpdated() {
  const { theme, page, frontmatter } = useData();
  const lang = usePageLang();
  const date = computed(() => {
    var _a;
    return ((_a = page.value.git) == null ? void 0 : _a.updatedTime) ? new Date(page.value.git.updatedTime) : null;
  });
  const isoDatetime = computed(() => {
    var _a;
    return (_a = date.value) == null ? void 0 : _a.toISOString();
  });
  const datetime = ref("");
  const lastUpdatedText = computed(() => {
    var _a;
    if (theme.value.lastUpdated === false)
      return;
    return ((_a = theme.value.lastUpdated) == null ? void 0 : _a.text) || theme.value.lastUpdatedText || "Last updated";
  });
  onMounted(() => {
    watchEffect(() => {
      var _a, _b, _c;
      if (frontmatter.value.lastUpdated === false || theme.value.lastUpdated === false)
        return;
      datetime.value = date.value ? new Intl.DateTimeFormat(
        ((_b = (_a = theme.value.lastUpdated) == null ? void 0 : _a.formatOptions) == null ? void 0 : _b.forceLocale) ? lang.value : void 0,
        ((_c = theme.value.lastUpdated) == null ? void 0 : _c.formatOptions) ?? {
          dateStyle: "short",
          timeStyle: "short"
        }
      ).format(date.value) : "";
    });
  });
  return {
    datetime,
    isoDatetime,
    lastUpdatedText
  };
}
var SEARCH_RE = /\.md(?:(?:#|\?).*)?$/;
function useLink(href, target) {
  const route = useRoute();
  const { page } = useData();
  const isExternal = computed(
    () => {
      const link2 = toValue(href);
      const rawTarget = toValue(target);
      return link2 && isLinkExternal(link2) || rawTarget === "_blank";
    }
  );
  const link = computed(() => {
    const link2 = toValue(href);
    if (!link2)
      return void 0;
    if (isExternal.value)
      return link2;
    const currentPath = link2.startsWith("./") && SEARCH_RE.test(link2) ? `/${page.value.filePathRelative}` : route.path;
    const path = resolveRouteFullPath(link2, currentPath);
    if (path.includes("#")) {
      if (path.slice(0, path.indexOf("#")) === route.path) {
        return path.slice(path.indexOf("#"));
      }
    }
    return path;
  });
  return { isExternal, link };
}
function useNavbarData() {
  const { theme } = useData();
  return computed(() => resolveNavbar(theme.value.navbar || []));
}
function resolveNavbar(navbar, _prefix = "") {
  const resolved = [];
  navbar.forEach((item) => {
    if (typeof item === "string") {
      resolved.push(resolveNavLink(normalizeLink(_prefix, item)));
    } else {
      const { items: items2, prefix, ...args } = item;
      const res = { ...args };
      if ("link" in res) {
        res.link = normalizeLink(_prefix, res.link);
      }
      if (items2 == null ? void 0 : items2.length) {
        res.items = resolveNavbar(
          items2,
          normalizeLink(_prefix, prefix)
        );
      }
      resolved.push(res);
    }
  });
  return resolved;
}
function useNav() {
  const isScreenOpen = ref(false);
  function openScreen() {
    isScreenOpen.value = true;
    window.addEventListener("resize", closeScreenOnTabletWindow);
  }
  function closeScreen() {
    isScreenOpen.value = false;
    window.removeEventListener("resize", closeScreenOnTabletWindow);
  }
  function toggleScreen() {
    if (isScreenOpen.value) {
      closeScreen();
    } else {
      openScreen();
    }
  }
  function closeScreenOnTabletWindow() {
    if (window.outerWidth >= 768) {
      closeScreen();
    }
  }
  const route = useRoute();
  watch(() => route.path, closeScreen);
  return {
    isScreenOpen,
    openScreen,
    closeScreen,
    toggleScreen
  };
}
var resolvedHeaders = [];
var headersSymbol = Symbol(
  ""
);
function setupHeaders() {
  const { frontmatter, theme } = useData();
  const headers = ref([]);
  onContentUpdated(() => {
    headers.value = getHeaders(frontmatter.value.outline ?? theme.value.outline);
  });
  provide(headersSymbol, headers);
  return headers;
}
function useHeaders() {
  const headers = inject(headersSymbol);
  if (!headers) {
    throw new Error("useHeaders() is called without provider.");
  }
  return headers;
}
function getHeaders(range) {
  const headers = Array.from(
    document.querySelectorAll(".vp-doc :where(h1,h2,h3,h4,h5,h6)")
  ).filter((el) => el.id && el.hasChildNodes()).map((el) => {
    const level = Number(el.tagName[1]);
    return {
      element: el,
      title: serializeHeader(el),
      link: `#${el.id}`,
      level
    };
  });
  return resolveHeaders(headers, range);
}
function serializeHeader(h2) {
  const anchor = h2.firstChild;
  const el = anchor == null ? void 0 : anchor.firstChild;
  let ret = "";
  for (const node of Array.from((el == null ? void 0 : el.childNodes) ?? [])) {
    if (node.nodeType === 1) {
      if (node.classList.contains("vp-badge") || node.classList.contains("ignore-header")) {
        continue;
      }
      ret += node.textContent;
    } else if (node.nodeType === 3) {
      ret += node.textContent;
    }
  }
  let next = anchor == null ? void 0 : anchor.nextSibling;
  while (next) {
    if (next.nodeType === 1 || next.nodeType === 3)
      ret += next.textContent;
    next = next.nextSibling;
  }
  return ret.trim();
}
function resolveHeaders(headers, range) {
  if (range === false)
    return [];
  const levelsRange = range || 2;
  const [high, low] = typeof levelsRange === "number" ? [levelsRange, levelsRange] : levelsRange === "deep" ? [2, 6] : levelsRange;
  headers = headers.filter((h2) => h2.level >= high && h2.level <= low);
  resolvedHeaders.length = 0;
  for (const { element, link } of headers)
    resolvedHeaders.push({ element, link });
  const ret = [];
  outer: for (let i = 0; i < headers.length; i++) {
    const cur = headers[i];
    if (i === 0) {
      ret.push(cur);
    } else {
      for (let j = i - 1; j >= 0; j--) {
        const prev = headers[j];
        if (prev.level < cur.level) {
          (prev.children || (prev.children = [])).push(cur);
          continue outer;
        }
      }
      ret.push(cur);
    }
  }
  return ret;
}
function useActiveAnchor(container, marker) {
  const { isAsideEnabled } = useAside();
  let prevActiveLink = null;
  const setActiveLink = () => {
    if (!isAsideEnabled.value)
      return;
    const scrollY = window.scrollY;
    const innerHeight = window.innerHeight;
    const offsetHeight = document.body.offsetHeight;
    const isBottom = Math.abs(scrollY + innerHeight - offsetHeight) < 1;
    const headers = resolvedHeaders.map(({ element, link }) => ({
      link,
      top: getAbsoluteTop(element)
    })).filter(({ top }) => !Number.isNaN(top)).sort((a, b) => a.top - b.top);
    if (!headers.length) {
      activateLink(null);
      return;
    }
    if (scrollY < 1) {
      activateLink(null);
      return;
    }
    if (isBottom) {
      activateLink(headers[headers.length - 1].link);
      return;
    }
    let activeLink = null;
    for (const { link, top } of headers) {
      if (top > scrollY + 144)
        break;
      activeLink = link;
    }
    activateLink(activeLink);
  };
  function activateLink(hash) {
    var _a;
    if (prevActiveLink)
      prevActiveLink.classList.remove("active");
    if (hash == null) {
      prevActiveLink = null;
    } else {
      prevActiveLink = ((_a = container.value) == null ? void 0 : _a.querySelector(
        `a[href="${decodeURIComponent(hash)}"]`
      )) ?? null;
    }
    const activeLink = prevActiveLink;
    if (activeLink) {
      activeLink.classList.add("active");
      if (marker.value) {
        marker.value.style.top = `${activeLink.offsetTop + 39}px`;
        marker.value.style.opacity = "1";
      }
    } else {
      if (marker.value) {
        marker.value.style.top = "33px";
        marker.value.style.opacity = "0";
      }
    }
  }
  const onScroll = throttleAndDebounce(setActiveLink, 100);
  onMounted(() => {
    requestAnimationFrame(setActiveLink);
    window.addEventListener("scroll", onScroll);
  });
  onUpdated(() => {
    activateLink(location.hash);
  });
  onUnmounted(() => {
    window.removeEventListener("scroll", onScroll);
  });
}
function getAbsoluteTop(element) {
  let offsetTop = 0;
  while (element !== document.body) {
    if (element === null) {
      return Number.NaN;
    }
    offsetTop += element.offsetTop;
    element = element.offsetParent;
  }
  return offsetTop;
}
function usePrevNext() {
  const route = useRoute();
  const { frontmatter, theme } = useData();
  const { sidebar: sidebar2 } = useSidebar();
  const postList = usePostList();
  const locale = usePageLang();
  const { isBlogPost } = useBlogPageData();
  const prevNavList = computed(() => {
    if (theme.value.prevPage === false)
      return null;
    const prevConfig = resolveFromFrontmatterConfig(frontmatter.value.prev);
    if (prevConfig !== false)
      return prevConfig;
    if (isBlogPost.value) {
      return resolveFromBlogPostData(
        postList.value.filter((item) => item.lang === locale.value),
        route.path,
        -1
      );
    } else {
      return resolveFromSidebarItems(flatSidebar(sidebar2.value), route.path, -1);
    }
  });
  const nextNavList = computed(() => {
    if (theme.value.nextPage === false)
      return null;
    const nextConfig = resolveFromFrontmatterConfig(frontmatter.value.next);
    if (nextConfig !== false)
      return nextConfig;
    if (isBlogPost.value) {
      return resolveFromBlogPostData(
        postList.value.filter((item) => item.lang === locale.value),
        route.path,
        1
      );
    } else {
      return resolveFromSidebarItems(flatSidebar(sidebar2.value), route.path, 1);
    }
  });
  return {
    prev: prevNavList,
    next: nextNavList
  };
}
function resolveFromFrontmatterConfig(conf) {
  if (conf === false)
    return null;
  if (isString(conf))
    return resolveNavLink(conf);
  if (isPlainObject(conf))
    return conf;
  return false;
}
function flatSidebar(sidebar2, res = []) {
  for (const item of sidebar2) {
    if (item.link)
      res.push({ link: item.link, text: item.text || item.dir || "" });
    if (Array.isArray(item.items) && item.items.length)
      flatSidebar(item.items, res);
  }
  return res;
}
function resolveFromSidebarItems(sidebarItems, currentPath, offset) {
  const index = sidebarItems.findIndex((item) => resolveRouteFullPath(item.link) === currentPath);
  if (index !== -1) {
    const targetItem = sidebarItems[index + offset];
    if (targetItem == null ? void 0 : targetItem.link) {
      return {
        link: targetItem.link,
        text: targetItem.text
      };
    }
  }
  return null;
}
function resolveFromBlogPostData(postList, currentPath, offset) {
  const index = postList.findIndex((item) => item.path === currentPath);
  if (index !== -1) {
    const targetItem = postList[index + offset];
    if (!(targetItem == null ? void 0 : targetItem.path))
      return null;
    return {
      link: targetItem.path,
      text: targetItem.title
    };
  }
  return null;
}
var promise = null;
var promiseResolve = null;
var scrollPromise = {
  wait: () => promise,
  pending: () => {
    promise = new Promise((resolve) => promiseResolve = resolve);
  },
  resolve: () => {
    promiseResolve == null ? void 0 : promiseResolve();
    promise = null;
    promiseResolve = null;
  }
};
var useScrollPromise = () => scrollPromise;
function enhanceScrollBehavior(router) {
  const scrollBehavior = router.options.scrollBehavior;
  router.options.scrollBehavior = async (...args) => {
    await useScrollPromise().wait();
    return scrollBehavior(...args);
  };
  router.beforeEach(() => {
    if (inBrowser) {
      document.documentElement.classList.remove("smooth");
    }
  });
  router.afterEach(() => nextTick(() => {
    if (inBrowser) {
      document.documentElement.classList.add("smooth");
    }
  }));
}
function setupWatermark() {
  const { frontmatter } = useData();
  defineWatermarkConfig(computed(() => {
    const disableFullPage = typeof frontmatter.value.watermark === "object" && frontmatter.value.watermark.fullPage === false;
    return {
      parent: disableFullPage ? ".vp-doc" : "body"
    };
  }));
}
const _sfc_main$1p = /* @__PURE__ */ defineComponent({
  __name: "VPBadge",
  props: {
    text: { default: void 0 },
    type: { default: "tip" }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const __returned__ = {};
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$1p(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<span${ssrRenderAttrs(mergeProps({
    class: ["vp-badge", $props.type]
  }, _attrs))} data-v-d4fe6e3a>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, () => {
    _push(`${ssrInterpolate($props.text)}`);
  }, _push, _parent);
  _push(`</span>`);
}
const _sfc_setup$1p = _sfc_main$1p.setup;
_sfc_main$1p.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/global/VPBadge.vue");
  return _sfc_setup$1p ? _sfc_setup$1p(props, ctx) : void 0;
};
const VPBadge = /* @__PURE__ */ _export_sfc(_sfc_main$1p, [["ssrRender", _sfc_ssrRender$1p], ["__scopeId", "data-v-d4fe6e3a"], ["__file", "VPBadge.vue"]]);
const _sfc_main$1o = /* @__PURE__ */ defineComponent({
  __name: "VPIconify",
  props: {
    name: { default: "" },
    size: { default: "" },
    color: { default: "" }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const icon = ref(null);
    const loaded = ref(false);
    async function loadIconComponent() {
      if (icon.value)
        return;
      {
        loaded.value = true;
      }
    }
    watch(() => props.name, loadIconComponent, { immediate: true });
    const size = computed(() => {
      const size2 = props.size || "1em";
      if (String(Number(size2)) === size2)
        return `${size2}px`;
      return size2;
    });
    const color = computed(() => props.color || "currentColor");
    const bind = computed(() => ({
      icon: icon.value,
      color: props.color,
      height: size.value
    }));
    const __returned__ = { props, icon, loaded, loadIconComponent, size, color, bind, get OfflineIcon() {
      return Icon;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$1o(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ClientOnly = resolveComponent("ClientOnly");
  _push(ssrRenderComponent(_component_ClientOnly, _attrs, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        if (!$setup.loaded) {
          _push2(`<span class="vp-icon iconify" style="${ssrRenderStyle({ color: $setup.color, width: $setup.size, height: $setup.size })}"${_scopeId}></span>`);
        } else if ($setup.icon) {
          _push2(ssrRenderComponent($setup["OfflineIcon"], mergeProps({ class: "vp-icon iconify" }, $setup.bind), null, _parent2, _scopeId));
        } else {
          _push2(`<!---->`);
        }
      } else {
        return [
          !$setup.loaded ? (openBlock(), createBlock("span", {
            key: 0,
            class: "vp-icon iconify",
            style: { color: $setup.color, width: $setup.size, height: $setup.size }
          }, null, 4)) : $setup.icon ? (openBlock(), createBlock($setup["OfflineIcon"], mergeProps({
            key: 1,
            class: "vp-icon iconify"
          }, $setup.bind), null, 16)) : createCommentVNode("", true)
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$1o = _sfc_main$1o.setup;
_sfc_main$1o.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/VPIconify.vue");
  return _sfc_setup$1o ? _sfc_setup$1o(props, ctx) : void 0;
};
const VPIconify = /* @__PURE__ */ _export_sfc(_sfc_main$1o, [["ssrRender", _sfc_ssrRender$1o], ["__file", "VPIconify.vue"]]);
const _sfc_main$1n = /* @__PURE__ */ defineComponent({
  __name: "VPIcon",
  props: {
    name: {},
    size: {},
    color: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const iconsData2 = useIconsData();
    const type = computed(() => {
      if (typeof props.name === "string" && (isLinkHttp(props.name) || props.name[0] === "/")) {
        return "link";
      }
      if (typeof props.name === "object" && !!props.name.svg) {
        return "svg";
      }
      if (typeof props.name === "string" && iconsData2.value[props.name]) {
        return "local";
      }
      return "remote";
    });
    const svg = computed(() => {
      if (type.value === "svg")
        return props.name.svg;
      return "";
    });
    const link = computed(() => {
      if (type.value === "link") {
        const link2 = props.name;
        return isLinkHttp(link2) ? link2 : withBase(link2);
      }
      return "";
    });
    const className = computed(() => {
      if (type.value === "local") {
        const name = props.name;
        return iconsData2.value[name] || "";
      }
      return "";
    });
    const size = computed(() => {
      const size2 = props.size;
      if (!size2)
        return void 0;
      if (String(Number(size2)) === size2)
        return `${size2}px`;
      return size2;
    });
    const style = computed(() => ({
      "background-color": props.color,
      "width": size.value,
      "height": size.value
    }));
    const __returned__ = { props, iconsData: iconsData2, type, svg, link, className, size, style, VPIconify };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$1n(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if ($setup.type === "link") {
    _push(`<span${ssrRenderAttrs(mergeProps({ class: "vp-icon-img" }, _attrs))} data-v-2a8c5e48><img${ssrRenderAttr("src", $setup.link)} alt="" style="${ssrRenderStyle({ height: $setup.size })}" data-v-2a8c5e48></span>`);
  } else if ($setup.type === "svg") {
    _push(`<span${ssrRenderAttrs(mergeProps({
      class: "vp-icon",
      style: $setup.style
    }, _attrs))} data-v-2a8c5e48>${$setup.svg ?? ""}</span>`);
  } else if ($setup.type === "local" && $setup.className) {
    _push(`<span${ssrRenderAttrs(mergeProps({
      class: ["vp-icon", [$setup.className]],
      style: $setup.style
    }, _attrs))} data-v-2a8c5e48></span>`);
  } else {
    _push(ssrRenderComponent($setup["VPIconify"], mergeProps({
      name: $props.name,
      size: $setup.size,
      color: $props.color
    }, _attrs), null, _parent));
  }
}
const _sfc_setup$1n = _sfc_main$1n.setup;
_sfc_main$1n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/VPIcon.vue");
  return _sfc_setup$1n ? _sfc_setup$1n(props, ctx) : void 0;
};
const VPIcon = /* @__PURE__ */ _export_sfc(_sfc_main$1n, [["ssrRender", _sfc_ssrRender$1n], ["__scopeId", "data-v-2a8c5e48"], ["__file", "VPIcon.vue"]]);
const _sfc_main$1m = /* @__PURE__ */ defineComponent({
  __name: "VPCard",
  props: {
    title: {},
    icon: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const icon = computed(() => {
      var _a;
      if (((_a = props.icon) == null ? void 0 : _a[0]) === "{") {
        try {
          return JSON.parse(icon);
        } catch {
        }
      }
      return props.icon;
    });
    const __returned__ = { props, icon, VPIcon };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$1m(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<article${ssrRenderAttrs(mergeProps({ class: "vp-card-wrapper" }, _attrs))} data-v-4d55b70c>`);
  ssrRenderSlot(_ctx.$slots, "title", {}, () => {
    if ($props.title || $setup.icon) {
      _push(`<p class="title" data-v-4d55b70c>`);
      if ($setup.icon) {
        _push(ssrRenderComponent($setup["VPIcon"], { name: $setup.icon }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if ($props.title) {
        _push(`<span data-v-4d55b70c>${$props.title ?? ""}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</p>`);
    } else {
      _push(`<!---->`);
    }
  }, _push, _parent);
  _push(`<div class="body" data-v-4d55b70c>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div></article>`);
}
const _sfc_setup$1m = _sfc_main$1m.setup;
_sfc_main$1m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/global/VPCard.vue");
  return _sfc_setup$1m ? _sfc_setup$1m(props, ctx) : void 0;
};
const VPCard = /* @__PURE__ */ _export_sfc(_sfc_main$1m, [["ssrRender", _sfc_ssrRender$1m], ["__scopeId", "data-v-4d55b70c"], ["__file", "VPCard.vue"]]);
const _sfc_main$1l = /* @__PURE__ */ defineComponent({
  __name: "VPCardGrid",
  props: {
    cols: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const md = useMediaQuery("(min-width: 768px)");
    const lg = useMediaQuery("(min-width: 960px)");
    const repeat = ref(1);
    function resolveCols() {
      const reset = { sm: 1, md: 2, lg: 2 };
      if (!props.cols)
        return reset;
      if (typeof props.cols === "number" || typeof props.cols === "string") {
        const cols = Number(props.cols);
        return { sm: cols, md: cols, lg: cols };
      }
      return { ...reset, ...toValue(props.cols) };
    }
    function getRepeat() {
      const cols = resolveCols();
      if (lg.value)
        return cols.lg;
      if (md.value)
        return cols.md;
      return cols.sm;
    }
    watch(() => [md.value, lg.value, props.cols], () => {
      repeat.value = getRepeat();
    });
    onMounted(() => {
      repeat.value = getRepeat();
    });
    const __returned__ = { props, md, lg, repeat, resolveCols, getRepeat };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$1l(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: ["vp-card-grid", [`cols-${$setup.repeat}`]],
    style: { gridTemplateColumns: `repeat(${$setup.repeat}, 1fr)` }
  }, _attrs))} data-v-b5b97dee>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup$1l = _sfc_main$1l.setup;
_sfc_main$1l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/global/VPCardGrid.vue");
  return _sfc_setup$1l ? _sfc_setup$1l(props, ctx) : void 0;
};
const VPCardGrid = /* @__PURE__ */ _export_sfc(_sfc_main$1l, [["ssrRender", _sfc_ssrRender$1l], ["__scopeId", "data-v-b5b97dee"], ["__file", "VPCardGrid.vue"]]);
const _sfc_main$1k = /* @__PURE__ */ defineComponent({
  __name: "VPImageCard",
  props: {
    image: {},
    title: {},
    description: {},
    href: {},
    author: {},
    date: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const lang = usePageLang();
    const title = computed(() => {
      if (props.title)
        return props.title;
      const image = props.image || "";
      const dirs = image.split("/");
      return dirs[dirs.length - 1];
    });
    const date = computed(() => {
      if (!props.date)
        return "";
      const date2 = props.date instanceof Date ? props.date : new Date(props.date);
      const intl = new Intl.DateTimeFormat(
        lang.value,
        { year: "numeric", month: "short", day: "numeric" }
      );
      return intl.format(date2);
    });
    const __returned__ = { props, lang, title, date };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$1k(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "vp-image-card" }, _attrs))} data-v-dfcca14b><div class="image-container" data-v-dfcca14b><img${ssrRenderAttr("src", $props.image)}${ssrRenderAttr("alt", $setup.title)} loading="lazy" data-v-dfcca14b><div class="image-info" data-v-dfcca14b><h3 class="title" data-v-dfcca14b>`);
  if ($props.href) {
    _push(`<a${ssrRenderAttr("href", $props.href)} target="_blank" rel="noopener noreferrer" class="no-icon" data-v-dfcca14b>${ssrInterpolate($setup.title)}</a>`);
  } else {
    _push(`<span data-v-dfcca14b>${ssrInterpolate($setup.title)}</span>`);
  }
  _push(`</h3>`);
  if ($props.author || $setup.date) {
    _push(`<p class="copyright" data-v-dfcca14b>`);
    if ($props.author) {
      _push(`<span data-v-dfcca14b>${ssrInterpolate($props.author)}</span>`);
    } else {
      _push(`<!---->`);
    }
    if ($props.author && $setup.date) {
      _push(`<span data-v-dfcca14b> | </span>`);
    } else {
      _push(`<!---->`);
    }
    if ($setup.date) {
      _push(`<span data-v-dfcca14b>${ssrInterpolate($setup.date)}</span>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</p>`);
  } else {
    _push(`<!---->`);
  }
  if ($props.description) {
    _push(`<p class="description" data-v-dfcca14b>${ssrInterpolate($props.description)}</p>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div></div>`);
}
const _sfc_setup$1k = _sfc_main$1k.setup;
_sfc_main$1k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/global/VPImageCard.vue");
  return _sfc_setup$1k ? _sfc_setup$1k(props, ctx) : void 0;
};
const VPImageCard = /* @__PURE__ */ _export_sfc(_sfc_main$1k, [["ssrRender", _sfc_ssrRender$1k], ["__scopeId", "data-v-dfcca14b"], ["__file", "VPImageCard.vue"]]);
const _sfc_main$1j = /* @__PURE__ */ defineComponent({
  __name: "VPLink",
  props: {
    tag: {},
    href: {},
    text: {},
    noIcon: { type: Boolean },
    target: {},
    rel: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const router = useRouter();
    const tag = computed(() => props.tag ?? (props.href ? "a" : "span"));
    const { link, isExternal } = useLink(toRef(props, "href"), toRef(props, "target"));
    function linkTo(e) {
      if (!isExternal.value) {
        e.preventDefault();
        if (link.value)
          router.push(link.value);
      }
    }
    const __returned__ = { props, router, tag, link, isExternal, linkTo, get withBase() {
      return withBase;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$1j(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  ssrRenderVNode(_push, createVNode(resolveDynamicComponent($setup.tag), mergeProps({
    class: ["vp-link", { link: $setup.link }],
    href: $setup.withBase($setup.link || ""),
    target: $props.target ?? ($setup.isExternal ? "_blank" : void 0),
    rel: $props.rel ?? ($setup.isExternal ? "noreferrer" : void 0),
    onClick: ($event) => $setup.linkTo($event)
  }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        ssrRenderSlot(_ctx.$slots, "default", {}, () => {
          _push2(`${ssrInterpolate($props.text || $props.href)}`);
        }, _push2, _parent2, _scopeId);
        if ($setup.isExternal && !$props.noIcon) {
          _push2(`<span class="vpi-external-link icon" data-v-35a47b4c${_scopeId}></span>`);
        } else {
          _push2(`<!---->`);
        }
      } else {
        return [
          renderSlot(_ctx.$slots, "default", {}, () => [
            createTextVNode(toDisplayString($props.text || $props.href), 1)
          ], true),
          $setup.isExternal && !$props.noIcon ? (openBlock(), createBlock("span", {
            key: 0,
            class: "vpi-external-link icon"
          })) : createCommentVNode("", true)
        ];
      }
    }),
    _: 3
  }), _parent);
}
const _sfc_setup$1j = _sfc_main$1j.setup;
_sfc_main$1j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/VPLink.vue");
  return _sfc_setup$1j ? _sfc_setup$1j(props, ctx) : void 0;
};
const VPLink = /* @__PURE__ */ _export_sfc(_sfc_main$1j, [["ssrRender", _sfc_ssrRender$1j], ["__scopeId", "data-v-35a47b4c"], ["__file", "VPLink.vue"]]);
const _sfc_main$1i = /* @__PURE__ */ defineComponent({
  __name: "VPLinkCard",
  props: {
    href: {},
    title: {},
    icon: {},
    description: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const __returned__ = { VPIcon, VPLink };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$1i(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "vp-link-card" }, _attrs))} data-v-f47e7377><span class="body" data-v-f47e7377>`);
  _push(ssrRenderComponent($setup["VPLink"], {
    href: $props.href,
    "no-icon": "",
    class: "link no-icon"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        ssrRenderSlot(_ctx.$slots, "title", {}, () => {
          if ($props.icon) {
            _push2(ssrRenderComponent($setup["VPIcon"], { name: $props.icon }, null, _parent2, _scopeId));
          } else {
            _push2(`<!---->`);
          }
          if ($props.title) {
            _push2(`<span data-v-f47e7377${_scopeId}>${$props.title ?? ""}</span>`);
          } else {
            _push2(`<!---->`);
          }
        }, _push2, _parent2, _scopeId);
      } else {
        return [
          renderSlot(_ctx.$slots, "title", {}, () => [
            $props.icon ? (openBlock(), createBlock($setup["VPIcon"], {
              key: 0,
              name: $props.icon
            }, null, 8, ["name"])) : createCommentVNode("", true),
            $props.title ? (openBlock(), createBlock("span", {
              key: 1,
              innerHTML: $props.title
            }, null, 8, ["innerHTML"])) : createCommentVNode("", true)
          ], true)
        ];
      }
    }),
    _: 3
  }, _parent));
  ssrRenderSlot(_ctx.$slots, "default", {}, () => {
    if ($props.description) {
      _push(`<p data-v-f47e7377>${$props.description ?? ""}</p>`);
    } else {
      _push(`<!---->`);
    }
  }, _push, _parent);
  _push(`</span><span class="vpi-arrow-right" data-v-f47e7377></span></div>`);
}
const _sfc_setup$1i = _sfc_main$1i.setup;
_sfc_main$1i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/global/VPLinkCard.vue");
  return _sfc_setup$1i ? _sfc_setup$1i(props, ctx) : void 0;
};
const VPLinkCard = /* @__PURE__ */ _export_sfc(_sfc_main$1i, [["ssrRender", _sfc_ssrRender$1i], ["__scopeId", "data-v-f47e7377"], ["__file", "VPLinkCard.vue"]]);
const _sfc_main$1h = /* @__PURE__ */ defineComponent({
  __name: "VPHomeBox",
  props: {
    type: {},
    full: { type: Boolean },
    backgroundImage: {},
    backgroundAttachment: {},
    onlyOnce: { type: Boolean },
    containerClass: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const isDark = useDarkMode();
    const styles = computed(() => {
      if (!props.backgroundImage)
        return null;
      const image = typeof props.backgroundImage === "string" ? props.backgroundImage : props.backgroundImage[isDark.value ? "dark" : "light"] ?? props.backgroundImage.light;
      const link = isLinkHttp(image) ? props.backgroundImage : withBase(image);
      return {
        "background-image": `url(${link})`,
        "background-size": "cover",
        "background-position": "center",
        "background-repeat": "no-repeat",
        "background-attachment": props.backgroundAttachment || ""
      };
    });
    const containerClass = computed(() => normalizeClass(props.containerClass || ""));
    const __returned__ = { props, isDark, styles, containerClass };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$1h(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: ["vp-home-box", { full: $setup.props.full }],
    style: $setup.styles
  }, _attrs))}>`);
  ssrRenderSlot(_ctx.$slots, "before", {}, null, _push, _parent);
  _push(`<div class="${ssrRenderClass([$setup.containerClass, "container"])}">`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
  ssrRenderSlot(_ctx.$slots, "after", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup$1h = _sfc_main$1h.setup;
_sfc_main$1h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/Home/VPHomeBox.vue");
  return _sfc_setup$1h ? _sfc_setup$1h(props, ctx) : void 0;
};
const VPHomeBox = /* @__PURE__ */ _export_sfc(_sfc_main$1h, [["ssrRender", _sfc_ssrRender$1h], ["__file", "VPHomeBox.vue"]]);
const _sfc_main$1g = {};
function _sfc_ssrRender$1g(_ctx, _push, _parent, _attrs) {
  _push(`<button${ssrRenderAttrs(mergeProps({
    class: "vp-switch",
    type: "button",
    role: "switch"
  }, _attrs))} data-v-9c861193><span class="check" data-v-9c861193>`);
  if (_ctx.$slots.default) {
    _push(`<span class="icon" data-v-9c861193>`);
    ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
    _push(`</span>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</span></button>`);
}
const _sfc_setup$1g = _sfc_main$1g.setup;
_sfc_main$1g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/VPSwitch.vue");
  return _sfc_setup$1g ? _sfc_setup$1g(props, ctx) : void 0;
};
const VPSwitch = /* @__PURE__ */ _export_sfc(_sfc_main$1g, [["ssrRender", _sfc_ssrRender$1g], ["__scopeId", "data-v-9c861193"], ["__file", "VPSwitch.vue"]]);
const _sfc_main$1f = /* @__PURE__ */ defineComponent({
  __name: "VPSwitchAppearance",
  setup(__props, { expose: __expose }) {
    __expose();
    const checked = ref(false);
    const { theme, isDark } = useData();
    const toggleAppearance = inject("toggle-appearance", () => {
      isDark.value = !isDark.value;
    });
    const switchTitle = ref("");
    watchPostEffect(() => {
      switchTitle.value = isDark.value ? theme.value.lightModeSwitchTitle || "Switch to light theme" : theme.value.darkModeSwitchTitle || "Switch to dark theme";
    });
    const __returned__ = { checked, theme, isDark, toggleAppearance, switchTitle, VPSwitch };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$1f(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(ssrRenderComponent($setup["VPSwitch"], mergeProps({
    class: "vp-switch-appearance",
    title: $setup.switchTitle,
    "aria-checked": $setup.checked,
    onClick: $setup.toggleAppearance
  }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<span class="vpi-sun sun" data-v-7c8eb8ae${_scopeId}></span><span class="vpi-moon moon" data-v-7c8eb8ae${_scopeId}></span>`);
      } else {
        return [
          createVNode("span", { class: "vpi-sun sun" }),
          createVNode("span", { class: "vpi-moon moon" })
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$1f = _sfc_main$1f.setup;
_sfc_main$1f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/VPSwitchAppearance.vue");
  return _sfc_setup$1f ? _sfc_setup$1f(props, ctx) : void 0;
};
const VPSwitchAppearance = /* @__PURE__ */ _export_sfc(_sfc_main$1f, [["ssrRender", _sfc_ssrRender$1f], ["__scopeId", "data-v-7c8eb8ae"], ["__file", "VPSwitchAppearance.vue"]]);
const _sfc_main$1e = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarAppearance",
  setup(__props, { expose: __expose }) {
    __expose();
    const { theme } = useData();
    const __returned__ = { theme, VPSwitchAppearance };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$1e(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if ($setup.theme.appearance && $setup.theme.appearance !== "force-dark") {
    _push(`<div${ssrRenderAttrs(mergeProps({ class: "vp-navbar-appearance" }, _attrs))} data-v-69e7a7dc>`);
    _push(ssrRenderComponent($setup["VPSwitchAppearance"], null, null, _parent));
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup$1e = _sfc_main$1e.setup;
_sfc_main$1e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/Nav/VPNavBarAppearance.vue");
  return _sfc_setup$1e ? _sfc_setup$1e(props, ctx) : void 0;
};
const VPNavBarAppearance = /* @__PURE__ */ _export_sfc(_sfc_main$1e, [["ssrRender", _sfc_ssrRender$1e], ["__scopeId", "data-v-69e7a7dc"], ["__file", "VPNavBarAppearance.vue"]]);
const _sfc_main$1d = /* @__PURE__ */ defineComponent({
  __name: "VPMenuLink",
  props: {
    item: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const { page } = useData();
    const __returned__ = { page, VPIcon, VPLink, get resolveRouteFullPath() {
      return resolveRouteFullPath;
    }, get isActive() {
      return isActive;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$1d(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "vp-menu-link" }, _attrs))} data-v-a3aeb8f0>`);
  _push(ssrRenderComponent($setup["VPLink"], {
    class: {
      active: $setup.isActive(
        $setup.page.path,
        $props.item.activeMatch || $setup.resolveRouteFullPath($props.item.link),
        !!$props.item.activeMatch
      )
    },
    href: $props.item.link
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        if ($props.item.icon) {
          _push2(ssrRenderComponent($setup["VPIcon"], {
            name: $props.item.icon
          }, null, _parent2, _scopeId));
        } else {
          _push2(`<!---->`);
        }
        _push2(`<i data-v-a3aeb8f0${_scopeId}>${ssrInterpolate($props.item.text)}</i>`);
      } else {
        return [
          $props.item.icon ? (openBlock(), createBlock($setup["VPIcon"], {
            key: 0,
            name: $props.item.icon
          }, null, 8, ["name"])) : createCommentVNode("", true),
          createVNode("i", {
            textContent: toDisplayString($props.item.text)
          }, null, 8, ["textContent"])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup$1d = _sfc_main$1d.setup;
_sfc_main$1d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/VPMenuLink.vue");
  return _sfc_setup$1d ? _sfc_setup$1d(props, ctx) : void 0;
};
const VPMenuLink = /* @__PURE__ */ _export_sfc(_sfc_main$1d, [["ssrRender", _sfc_ssrRender$1d], ["__scopeId", "data-v-a3aeb8f0"], ["__file", "VPMenuLink.vue"]]);
const _sfc_main$1c = /* @__PURE__ */ defineComponent({
  __name: "VPMenuGroup",
  props: {
    text: {},
    icon: {},
    items: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const __returned__ = { VPIcon, VPMenuLink };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$1c(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "vp-menu-group" }, _attrs))} data-v-13a9afb3>`);
  if ($props.text) {
    _push(`<p class="title" data-v-13a9afb3>`);
    if ($props.icon) {
      _push(ssrRenderComponent($setup["VPIcon"], { name: $props.icon }, null, _parent));
    } else {
      _push(`<!---->`);
    }
    _push(`<span data-v-13a9afb3>${ssrInterpolate($props.text)}</span></p>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<!--[-->`);
  ssrRenderList($props.items, (item) => {
    _push(`<!--[-->`);
    if ("link" in item) {
      _push(ssrRenderComponent($setup["VPMenuLink"], {
        key: item == null ? void 0 : item.link,
        item
      }, null, _parent));
    } else {
      _push(`<!---->`);
    }
    _push(`<!--]-->`);
  });
  _push(`<!--]--></div>`);
}
const _sfc_setup$1c = _sfc_main$1c.setup;
_sfc_main$1c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/VPMenuGroup.vue");
  return _sfc_setup$1c ? _sfc_setup$1c(props, ctx) : void 0;
};
const VPMenuGroup = /* @__PURE__ */ _export_sfc(_sfc_main$1c, [["ssrRender", _sfc_ssrRender$1c], ["__scopeId", "data-v-13a9afb3"], ["__file", "VPMenuGroup.vue"]]);
const _sfc_main$1b = /* @__PURE__ */ defineComponent({
  __name: "VPMenu",
  props: {
    items: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const __returned__ = { VPMenuGroup, VPMenuLink };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$1b(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "vp-menu" }, _attrs))} data-v-54f5c54e>`);
  if ($props.items) {
    _push(`<div class="items" data-v-54f5c54e><!--[-->`);
    ssrRenderList($props.items, (item) => {
      _push(`<!--[-->`);
      if ("link" in item) {
        _push(ssrRenderComponent($setup["VPMenuLink"], { item }, null, _parent));
      } else {
        _push(ssrRenderComponent($setup["VPMenuGroup"], {
          text: item.text,
          items: item.items,
          icon: item.icon
        }, null, _parent));
      }
      _push(`<!--]-->`);
    });
    _push(`<!--]--></div>`);
  } else {
    _push(`<!---->`);
  }
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup$1b = _sfc_main$1b.setup;
_sfc_main$1b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/VPMenu.vue");
  return _sfc_setup$1b ? _sfc_setup$1b(props, ctx) : void 0;
};
const VPMenu = /* @__PURE__ */ _export_sfc(_sfc_main$1b, [["ssrRender", _sfc_ssrRender$1b], ["__scopeId", "data-v-54f5c54e"], ["__file", "VPMenu.vue"]]);
const _sfc_main$1a = /* @__PURE__ */ defineComponent({
  __name: "VPFlyout",
  props: {
    prefixIcon: {},
    icon: {},
    button: {},
    label: {},
    items: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const open = ref(false);
    const el = ref();
    useFlyout({ el, onBlur });
    function onBlur() {
      open.value = false;
    }
    const __returned__ = { open, el, onBlur, VPIcon, VPMenu };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$1a(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    ref: "el",
    class: "vp-flyout"
  }, _attrs))} data-v-26365935><button type="button" class="button" aria-haspopup="true"${ssrRenderAttr("aria-expanded", $setup.open)}${ssrRenderAttr("aria-label", $props.label)} data-v-26365935>`);
  if ($props.button || $props.icon) {
    _push(`<span class="text" data-v-26365935>`);
    if ($props.prefixIcon) {
      _push(ssrRenderComponent($setup["VPIcon"], { name: $props.prefixIcon }, null, _parent));
    } else {
      _push(`<!---->`);
    }
    if ($props.icon) {
      _push(`<span class="${ssrRenderClass([[$props.icon], "option-icon"])}" data-v-26365935></span>`);
    } else {
      _push(`<!---->`);
    }
    if ($props.button) {
      _push(`<span data-v-26365935>${$props.button ?? ""}</span>`);
    } else {
      _push(`<!---->`);
    }
    _push(`<span class="vpi-chevron-down text-icon" data-v-26365935></span></span>`);
  } else {
    _push(`<span class="vpi-more-horizontal icon" data-v-26365935></span>`);
  }
  _push(`</button><div class="menu" data-v-26365935>`);
  _push(ssrRenderComponent($setup["VPMenu"], { items: $props.items }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
      } else {
        return [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ];
      }
    }),
    _: 3
  }, _parent));
  _push(`</div></div>`);
}
const _sfc_setup$1a = _sfc_main$1a.setup;
_sfc_main$1a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/VPFlyout.vue");
  return _sfc_setup$1a ? _sfc_setup$1a(props, ctx) : void 0;
};
const VPFlyout = /* @__PURE__ */ _export_sfc(_sfc_main$1a, [["ssrRender", _sfc_ssrRender$1a], ["__scopeId", "data-v-26365935"], ["__file", "VPFlyout.vue"]]);
const _sfc_main$19 = /* @__PURE__ */ defineComponent({
  __name: "VPSocialLink",
  props: {
    icon: {},
    link: {},
    ariaLabel: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const svg = computed(() => {
      if (typeof props.icon === "object")
        return props.icon.svg;
      return `<span class="vpi-social-${props.icon}" />`;
    });
    const __returned__ = { props, svg };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$19(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<a${ssrRenderAttrs(mergeProps({
    class: "vp-social-link no-icon",
    href: $props.link,
    "aria-label": $props.ariaLabel ?? (typeof $props.icon === "string" ? $props.icon : ""),
    target: "_blank",
    rel: "noopener"
  }, _attrs))} data-v-3e76be72>${$setup.svg ?? ""}</a>`);
}
const _sfc_setup$19 = _sfc_main$19.setup;
_sfc_main$19.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/VPSocialLink.vue");
  return _sfc_setup$19 ? _sfc_setup$19(props, ctx) : void 0;
};
const VPSocialLink = /* @__PURE__ */ _export_sfc(_sfc_main$19, [["ssrRender", _sfc_ssrRender$19], ["__scopeId", "data-v-3e76be72"], ["__file", "VPSocialLink.vue"]]);
const _sfc_main$18 = /* @__PURE__ */ defineComponent({
  __name: "VPSocialLinks",
  props: {
    links: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const __returned__ = { VPSocialLink };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$18(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "vp-social-links" }, _attrs))} data-v-913db725><!--[-->`);
  ssrRenderList($props.links, ({ link, icon }) => {
    _push(ssrRenderComponent($setup["VPSocialLink"], {
      key: link,
      icon,
      link
    }, null, _parent));
  });
  _push(`<!--]--></div>`);
}
const _sfc_setup$18 = _sfc_main$18.setup;
_sfc_main$18.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/VPSocialLinks.vue");
  return _sfc_setup$18 ? _sfc_setup$18(props, ctx) : void 0;
};
const VPSocialLinks = /* @__PURE__ */ _export_sfc(_sfc_main$18, [["ssrRender", _sfc_ssrRender$18], ["__scopeId", "data-v-913db725"], ["__file", "VPSocialLinks.vue"]]);
const _sfc_main$17 = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarExtra",
  setup(__props, { expose: __expose }) {
    __expose();
    const { theme } = useData();
    const { localeLinks, currentLang } = useLangs();
    const social = computed(() => {
      var _a;
      const includes = theme.value.navbarSocialInclude ?? [];
      if (!includes.length)
        return theme.value.social;
      return (_a = theme.value.social) == null ? void 0 : _a.filter(
        ({ icon }) => typeof icon === "string" && includes.includes(icon)
      );
    });
    const hasExtraContent = computed(
      () => {
        var _a;
        return localeLinks.value.length && currentLang.value.label || theme.value.appearance || ((_a = social.value) == null ? void 0 : _a.length);
      }
    );
    const __returned__ = { theme, localeLinks, currentLang, social, hasExtraContent, VPFlyout, VPMenuLink, VPSocialLinks, VPSwitchAppearance };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$17(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if ($setup.hasExtraContent) {
    _push(ssrRenderComponent($setup["VPFlyout"], mergeProps({
      class: "vp-navbar-extra",
      label: "extra navigation"
    }, _attrs), {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          if ($setup.localeLinks.length && $setup.currentLang.label) {
            _push2(`<div class="group translations" data-v-9d4d88cb${_scopeId}><p class="trans-title" data-v-9d4d88cb${_scopeId}>${ssrInterpolate($setup.currentLang.label)}</p><!--[-->`);
            ssrRenderList($setup.localeLinks, (locale) => {
              _push2(ssrRenderComponent($setup["VPMenuLink"], { item: locale }, null, _parent2, _scopeId));
            });
            _push2(`<!--]--></div>`);
          } else {
            _push2(`<!---->`);
          }
          if ($setup.theme.appearance && $setup.theme.appearance !== "force-dark") {
            _push2(`<div class="group" data-v-9d4d88cb${_scopeId}><div class="item appearance" data-v-9d4d88cb${_scopeId}><p class="label" data-v-9d4d88cb${_scopeId}>${ssrInterpolate($setup.theme.appearanceText || "Appearance")}</p><div class="appearance-action" data-v-9d4d88cb${_scopeId}>`);
            _push2(ssrRenderComponent($setup["VPSwitchAppearance"], null, null, _parent2, _scopeId));
            _push2(`</div></div></div>`);
          } else {
            _push2(`<!---->`);
          }
          if ($setup.social) {
            _push2(`<div class="group" data-v-9d4d88cb${_scopeId}><div class="item social-links" data-v-9d4d88cb${_scopeId}>`);
            _push2(ssrRenderComponent($setup["VPSocialLinks"], {
              class: "social-links-list",
              links: $setup.social
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            _push2(`<!---->`);
          }
        } else {
          return [
            $setup.localeLinks.length && $setup.currentLang.label ? (openBlock(), createBlock("div", {
              key: 0,
              class: "group translations"
            }, [
              createVNode("p", { class: "trans-title" }, toDisplayString($setup.currentLang.label), 1),
              (openBlock(true), createBlock(Fragment, null, renderList($setup.localeLinks, (locale) => {
                return openBlock(), createBlock($setup["VPMenuLink"], {
                  key: locale.link,
                  item: locale
                }, null, 8, ["item"]);
              }), 128))
            ])) : createCommentVNode("", true),
            $setup.theme.appearance && $setup.theme.appearance !== "force-dark" ? (openBlock(), createBlock("div", {
              key: 1,
              class: "group"
            }, [
              createVNode("div", { class: "item appearance" }, [
                createVNode("p", { class: "label" }, toDisplayString($setup.theme.appearanceText || "Appearance"), 1),
                createVNode("div", { class: "appearance-action" }, [
                  createVNode($setup["VPSwitchAppearance"])
                ])
              ])
            ])) : createCommentVNode("", true),
            $setup.social ? (openBlock(), createBlock("div", {
              key: 2,
              class: "group"
            }, [
              createVNode("div", { class: "item social-links" }, [
                createVNode($setup["VPSocialLinks"], {
                  class: "social-links-list",
                  links: $setup.social
                }, null, 8, ["links"])
              ])
            ])) : createCommentVNode("", true)
          ];
        }
      }),
      _: 1
    }, _parent));
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup$17 = _sfc_main$17.setup;
_sfc_main$17.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/Nav/VPNavBarExtra.vue");
  return _sfc_setup$17 ? _sfc_setup$17(props, ctx) : void 0;
};
const VPNavBarExtra = /* @__PURE__ */ _export_sfc(_sfc_main$17, [["ssrRender", _sfc_ssrRender$17], ["__scopeId", "data-v-9d4d88cb"], ["__file", "VPNavBarExtra.vue"]]);
const _sfc_main$16 = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarHamburger",
  props: {
    active: { type: Boolean }
  },
  emits: ["click"],
  setup(__props, { expose: __expose }) {
    __expose();
    const __returned__ = {};
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$16(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<button${ssrRenderAttrs(mergeProps({
    type: "button",
    class: ["vp-navbar-hamburger", { active: $props.active }],
    "aria-label": "mobile navigation",
    "aria-expanded": $props.active,
    "aria-controls": "nav-screen"
  }, _attrs))} data-v-a1cd7b54><span class="container" data-v-a1cd7b54><span class="top" data-v-a1cd7b54></span><span class="middle" data-v-a1cd7b54></span><span class="bottom" data-v-a1cd7b54></span></span></button>`);
}
const _sfc_setup$16 = _sfc_main$16.setup;
_sfc_main$16.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/Nav/VPNavBarHamburger.vue");
  return _sfc_setup$16 ? _sfc_setup$16(props, ctx) : void 0;
};
const VPNavBarHamburger = /* @__PURE__ */ _export_sfc(_sfc_main$16, [["ssrRender", _sfc_ssrRender$16], ["__scopeId", "data-v-a1cd7b54"], ["__file", "VPNavBarHamburger.vue"]]);
const _sfc_main$15 = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarMenuGroup",
  props: {
    item: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const { page } = useData();
    function isChildActive(navItem) {
      if ("link" in navItem) {
        return isActive(
          page.value.path,
          resolveRouteFullPath(navItem.link),
          !!props.item.activeMatch
        );
      } else {
        return navItem.items.some(isChildActive);
      }
    }
    const childrenActive = computed(() => isChildActive(props.item));
    const __returned__ = { props, page, isChildActive, childrenActive, VPFlyout, get isActive() {
      return isActive;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$15(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(ssrRenderComponent($setup["VPFlyout"], mergeProps({
    class: ["vp-navbar-menu-group", {
      active: $setup.isActive(
        $setup.page.path,
        $props.item.activeMatch,
        !!$props.item.activeMatch
      ) || $setup.childrenActive
    }],
    button: $props.item.text,
    items: $props.item.items,
    "prefix-icon": $props.item.icon
  }, _attrs), null, _parent));
}
const _sfc_setup$15 = _sfc_main$15.setup;
_sfc_main$15.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/Nav/VPNavBarMenuGroup.vue");
  return _sfc_setup$15 ? _sfc_setup$15(props, ctx) : void 0;
};
const VPNavBarMenuGroup = /* @__PURE__ */ _export_sfc(_sfc_main$15, [["ssrRender", _sfc_ssrRender$15], ["__file", "VPNavBarMenuGroup.vue"]]);
const _sfc_main$14 = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarMenuLink",
  props: {
    item: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const { page } = useData();
    const __returned__ = { page, VPIcon, VPLink, get resolveRouteFullPath() {
      return resolveRouteFullPath;
    }, get isActive() {
      return isActive;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$14(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(ssrRenderComponent($setup["VPLink"], mergeProps({
    class: ["navbar-menu-link", {
      active: $setup.isActive(
        $setup.page.path,
        $props.item.activeMatch || $setup.resolveRouteFullPath($props.item.link),
        !!$props.item.activeMatch
      )
    }],
    href: $props.item.link,
    "no-icon": $props.item.noIcon,
    target: $props.item.target,
    rel: $props.item.rel,
    tabindex: "0"
  }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        if ($props.item.icon) {
          _push2(ssrRenderComponent($setup["VPIcon"], {
            name: $props.item.icon
          }, null, _parent2, _scopeId));
        } else {
          _push2(`<!---->`);
        }
        _push2(`<span data-v-12bf62f9${_scopeId}>${$props.item.text ?? ""}</span>`);
      } else {
        return [
          $props.item.icon ? (openBlock(), createBlock($setup["VPIcon"], {
            key: 0,
            name: $props.item.icon
          }, null, 8, ["name"])) : createCommentVNode("", true),
          createVNode("span", {
            innerHTML: $props.item.text
          }, null, 8, ["innerHTML"])
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$14 = _sfc_main$14.setup;
_sfc_main$14.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/Nav/VPNavBarMenuLink.vue");
  return _sfc_setup$14 ? _sfc_setup$14(props, ctx) : void 0;
};
const VPNavBarMenuLink = /* @__PURE__ */ _export_sfc(_sfc_main$14, [["ssrRender", _sfc_ssrRender$14], ["__scopeId", "data-v-12bf62f9"], ["__file", "VPNavBarMenuLink.vue"]]);
const _sfc_main$13 = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarMenu",
  setup(__props, { expose: __expose }) {
    __expose();
    const navbar = useNavbarData();
    const __returned__ = { navbar, VPNavBarMenuGroup, VPNavBarMenuLink };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$13(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if ($setup.navbar.length) {
    _push(`<nav${ssrRenderAttrs(mergeProps({
      "aria-labelledby": "main-nav-aria-label",
      class: "vp-navbar-menu"
    }, _attrs))} data-v-c3439201><span id="main-nav-aria-label" class="visually-hidden" data-v-c3439201>Main Navigation</span><!--[-->`);
    ssrRenderList($setup.navbar, (item) => {
      _push(`<!--[-->`);
      if ("link" in item) {
        _push(ssrRenderComponent($setup["VPNavBarMenuLink"], { item }, null, _parent));
      } else {
        _push(ssrRenderComponent($setup["VPNavBarMenuGroup"], { item }, null, _parent));
      }
      _push(`<!--]-->`);
    });
    _push(`<!--]--></nav>`);
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup$13 = _sfc_main$13.setup;
_sfc_main$13.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/Nav/VPNavBarMenu.vue");
  return _sfc_setup$13 ? _sfc_setup$13(props, ctx) : void 0;
};
const VPNavBarMenu = /* @__PURE__ */ _export_sfc(_sfc_main$13, [["ssrRender", _sfc_ssrRender$13], ["__scopeId", "data-v-c3439201"], ["__file", "VPNavBarMenu.vue"]]);
const _sfc_main$12 = {};
function _sfc_ssrRender$12(_ctx, _push, _parent, _attrs) {
  const _component_SearchBox = resolveComponent("SearchBox");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "vp-navbar-search" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_SearchBox, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup$12 = _sfc_main$12.setup;
_sfc_main$12.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/Nav/VPNavBarSearch.vue");
  return _sfc_setup$12 ? _sfc_setup$12(props, ctx) : void 0;
};
const VPNavBarSearch = /* @__PURE__ */ _export_sfc(_sfc_main$12, [["ssrRender", _sfc_ssrRender$12], ["__file", "VPNavBarSearch.vue"]]);
const _sfc_main$11 = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarSocialLinks",
  setup(__props, { expose: __expose }) {
    __expose();
    const { theme } = useData();
    const social = computed(() => {
      var _a;
      const includes = theme.value.navbarSocialInclude ?? [];
      if (!includes.length)
        return theme.value.social;
      return (_a = theme.value.social) == null ? void 0 : _a.filter(
        ({ icon }) => typeof icon === "string" && includes.includes(icon)
      );
    });
    const __returned__ = { theme, social, VPSocialLinks };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$11(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if ($setup.social) {
    _push(ssrRenderComponent($setup["VPSocialLinks"], mergeProps({
      class: "vp-navbar-social-links",
      links: $setup.social
    }, _attrs), null, _parent));
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup$11 = _sfc_main$11.setup;
_sfc_main$11.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/Nav/VPNavBarSocialLinks.vue");
  return _sfc_setup$11 ? _sfc_setup$11(props, ctx) : void 0;
};
const VPNavBarSocialLinks = /* @__PURE__ */ _export_sfc(_sfc_main$11, [["ssrRender", _sfc_ssrRender$11], ["__scopeId", "data-v-05d620fd"], ["__file", "VPNavBarSocialLinks.vue"]]);
const __default__ = {
  inheritAttrs: false
};
const _sfc_main$10 = /* @__PURE__ */ defineComponent({
  ...__default__,
  __name: "VPImage",
  props: {
    image: {},
    alt: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const __returned__ = { get withBase() {
      return withBase;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$10(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_VPImage = resolveComponent("VPImage", true);
  if ($props.image) {
    _push(`<!--[-->`);
    if (typeof $props.image === "string" || "src" in $props.image) {
      _push(`<img${ssrRenderAttrs(mergeProps({ class: "vp-image" }, typeof $props.image === "string" ? _ctx.$attrs : { ...$props.image, ..._ctx.$attrs }, {
        src: $setup.withBase(typeof $props.image === "string" ? $props.image : $props.image.src),
        alt: $props.alt ?? (typeof $props.image === "string" ? "" : $props.image.alt || "")
      }))} data-v-c9d1a68b>`);
    } else {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_VPImage, mergeProps({
        class: "dark",
        image: $props.image.dark,
        alt: $props.image.alt
      }, _ctx.$attrs), null, _parent));
      _push(ssrRenderComponent(_component_VPImage, mergeProps({
        class: "light",
        image: $props.image.light,
        alt: $props.image.alt
      }, _ctx.$attrs), null, _parent));
      _push(`<!--]-->`);
    }
    _push(`<!--]-->`);
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup$10 = _sfc_main$10.setup;
_sfc_main$10.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/VPImage.vue");
  return _sfc_setup$10 ? _sfc_setup$10(props, ctx) : void 0;
};
const VPImage = /* @__PURE__ */ _export_sfc(_sfc_main$10, [["ssrRender", _sfc_ssrRender$10], ["__scopeId", "data-v-c9d1a68b"], ["__file", "VPImage.vue"]]);
const _sfc_main$$ = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarTitle",
  setup(__props, { expose: __expose }) {
    __expose();
    const { theme, site } = useData();
    const { hasSidebar } = useSidebar();
    const routeLocale = useRouteLocale();
    const __returned__ = { theme, site, hasSidebar, routeLocale, VPImage, VPLink };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$$(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: ["vp-navbar-title", { "has-sidebar": $setup.hasSidebar }]
  }, _attrs))} data-v-9d4e5fc3>`);
  _push(ssrRenderComponent($setup["VPLink"], {
    class: "title",
    href: $setup.theme.home ?? $setup.routeLocale
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        ssrRenderSlot(_ctx.$slots, "nav-bar-title-before", {}, null, _push2, _parent2, _scopeId);
        if ($setup.theme.logo) {
          _push2(ssrRenderComponent($setup["VPImage"], {
            class: "logo",
            image: { light: $setup.theme.logo, dark: $setup.theme.logoDark || $setup.theme.logo }
          }, null, _parent2, _scopeId));
        } else {
          _push2(`<!---->`);
        }
        _push2(`<span data-v-9d4e5fc3${_scopeId}>${ssrInterpolate($setup.site.title)}</span>`);
        ssrRenderSlot(_ctx.$slots, "nav-bar-title-after", {}, null, _push2, _parent2, _scopeId);
      } else {
        return [
          renderSlot(_ctx.$slots, "nav-bar-title-before", {}, void 0, true),
          $setup.theme.logo ? (openBlock(), createBlock($setup["VPImage"], {
            key: 0,
            class: "logo",
            image: { light: $setup.theme.logo, dark: $setup.theme.logoDark || $setup.theme.logo }
          }, null, 8, ["image"])) : createCommentVNode("", true),
          createVNode("span", null, toDisplayString($setup.site.title), 1),
          renderSlot(_ctx.$slots, "nav-bar-title-after", {}, void 0, true)
        ];
      }
    }),
    _: 3
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup$$ = _sfc_main$$.setup;
_sfc_main$$.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/Nav/VPNavBarTitle.vue");
  return _sfc_setup$$ ? _sfc_setup$$(props, ctx) : void 0;
};
const VPNavBarTitle = /* @__PURE__ */ _export_sfc(_sfc_main$$, [["ssrRender", _sfc_ssrRender$$], ["__scopeId", "data-v-9d4e5fc3"], ["__file", "VPNavBarTitle.vue"]]);
const _sfc_main$_ = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarTranslations",
  setup(__props, { expose: __expose }) {
    __expose();
    const { theme } = useData();
    const { currentLang, localeLinks } = useLangs();
    const __returned__ = { theme, currentLang, localeLinks, VPFlyout, VPMenuLink };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$_(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if ($setup.localeLinks.length && $setup.currentLang.label) {
    _push(ssrRenderComponent($setup["VPFlyout"], mergeProps({
      class: "vp-navbar-translations",
      icon: "vpi-languages",
      label: $setup.theme.selectLanguageText || "Change Language"
    }, _attrs), {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<div class="items" data-v-0c39f5dd${_scopeId}><p class="title" data-v-0c39f5dd${_scopeId}>${ssrInterpolate($setup.currentLang.label)}</p><!--[-->`);
          ssrRenderList($setup.localeLinks, (locale) => {
            _push2(ssrRenderComponent($setup["VPMenuLink"], { item: locale }, null, _parent2, _scopeId));
          });
          _push2(`<!--]--></div>`);
        } else {
          return [
            createVNode("div", { class: "items" }, [
              createVNode("p", { class: "title" }, toDisplayString($setup.currentLang.label), 1),
              (openBlock(true), createBlock(Fragment, null, renderList($setup.localeLinks, (locale) => {
                return openBlock(), createBlock($setup["VPMenuLink"], {
                  key: locale.link,
                  item: locale
                }, null, 8, ["item"]);
              }), 128))
            ])
          ];
        }
      }),
      _: 1
    }, _parent));
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup$_ = _sfc_main$_.setup;
_sfc_main$_.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/Nav/VPNavBarTranslations.vue");
  return _sfc_setup$_ ? _sfc_setup$_(props, ctx) : void 0;
};
const VPNavBarTranslations = /* @__PURE__ */ _export_sfc(_sfc_main$_, [["ssrRender", _sfc_ssrRender$_], ["__scopeId", "data-v-0c39f5dd"], ["__file", "VPNavBarTranslations.vue"]]);
const _sfc_main$Z = /* @__PURE__ */ defineComponent({
  __name: "VPNavBar",
  props: {
    isScreenOpen: { type: Boolean }
  },
  emits: ["toggleScreen"],
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const { frontmatter } = useData();
    const { y } = useWindowScroll();
    const { hasSidebar } = useSidebar();
    const classes = ref({});
    watchPostEffect(() => {
      classes.value = {
        "has-sidebar": hasSidebar.value,
        "home": frontmatter.value.pageLayout === "home",
        "top": y.value === 0,
        "screen-open": props.isScreenOpen
      };
    });
    const __returned__ = { props, frontmatter, y, hasSidebar, classes, VPNavBarAppearance, VPNavBarExtra, VPNavBarHamburger, VPNavBarMenu, VPNavBarSearch, VPNavBarSocialLinks, VPNavBarTitle, VPNavBarTranslations };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$Z(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: ["vp-navbar", $setup.classes],
    "vp-navbar": ""
  }, _attrs))} data-v-0d78b3f8><div class="wrapper" data-v-0d78b3f8><div class="container" data-v-0d78b3f8><div class="title" data-v-0d78b3f8>`);
  _push(ssrRenderComponent($setup["VPNavBarTitle"], null, {
    "nav-bar-title-before": withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        ssrRenderSlot(_ctx.$slots, "nav-bar-title-before", {}, null, _push2, _parent2, _scopeId);
      } else {
        return [
          renderSlot(_ctx.$slots, "nav-bar-title-before", {}, void 0, true)
        ];
      }
    }),
    "nav-bar-title-after": withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        ssrRenderSlot(_ctx.$slots, "nav-bar-title-after", {}, null, _push2, _parent2, _scopeId);
      } else {
        return [
          renderSlot(_ctx.$slots, "nav-bar-title-after", {}, void 0, true)
        ];
      }
    }),
    _: 3
  }, _parent));
  _push(`</div><div class="content" data-v-0d78b3f8><div class="content-body" data-v-0d78b3f8>`);
  ssrRenderSlot(_ctx.$slots, "nav-bar-content-before", {}, null, _push, _parent);
  _push(ssrRenderComponent($setup["VPNavBarSearch"], { class: "search" }, null, _parent));
  _push(ssrRenderComponent($setup["VPNavBarMenu"], { class: "menu" }, null, _parent));
  _push(ssrRenderComponent($setup["VPNavBarTranslations"], { class: "translations" }, null, _parent));
  _push(ssrRenderComponent($setup["VPNavBarAppearance"], { class: "appearance" }, null, _parent));
  _push(ssrRenderComponent($setup["VPNavBarSocialLinks"], { class: "social-links" }, null, _parent));
  _push(ssrRenderComponent($setup["VPNavBarExtra"], { class: "extra" }, null, _parent));
  ssrRenderSlot(_ctx.$slots, "nav-bar-content-after", {}, null, _push, _parent);
  _push(ssrRenderComponent($setup["VPNavBarHamburger"], {
    class: "hamburger",
    active: $props.isScreenOpen,
    onClick: ($event) => _ctx.$emit("toggleScreen")
  }, null, _parent));
  _push(`</div></div></div></div><div class="divider" data-v-0d78b3f8><div class="divider-line" data-v-0d78b3f8></div></div></div>`);
}
const _sfc_setup$Z = _sfc_main$Z.setup;
_sfc_main$Z.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/Nav/VPNavBar.vue");
  return _sfc_setup$Z ? _sfc_setup$Z(props, ctx) : void 0;
};
const VPNavbar = /* @__PURE__ */ _export_sfc(_sfc_main$Z, [["ssrRender", _sfc_ssrRender$Z], ["__scopeId", "data-v-0d78b3f8"], ["__file", "VPNavBar.vue"]]);
const _sfc_main$Y = /* @__PURE__ */ defineComponent({
  __name: "VPNavScreenAppearance",
  setup(__props, { expose: __expose }) {
    __expose();
    const { theme } = useData();
    const __returned__ = { theme, VPSwitchAppearance };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$Y(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if ($setup.theme.appearance && $setup.theme.appearance !== "force-dark") {
    _push(`<div${ssrRenderAttrs(mergeProps({ class: "vp-nav-screen-appearance" }, _attrs))} data-v-fcfa3264><p class="text" data-v-fcfa3264>${ssrInterpolate($setup.theme.appearanceText ?? "Appearance")}</p>`);
    _push(ssrRenderComponent($setup["VPSwitchAppearance"], null, null, _parent));
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup$Y = _sfc_main$Y.setup;
_sfc_main$Y.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/Nav/VPNavScreenAppearance.vue");
  return _sfc_setup$Y ? _sfc_setup$Y(props, ctx) : void 0;
};
const VPNavScreenAppearance = /* @__PURE__ */ _export_sfc(_sfc_main$Y, [["ssrRender", _sfc_ssrRender$Y], ["__scopeId", "data-v-fcfa3264"], ["__file", "VPNavScreenAppearance.vue"]]);
const _sfc_main$X = /* @__PURE__ */ defineComponent({
  __name: "VPNavScreenMenuGroupLink",
  props: {
    item: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const closeScreen = inject("close-screen");
    const __returned__ = { closeScreen, VPIcon, VPLink };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$X(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(ssrRenderComponent($setup["VPLink"], mergeProps({
    class: "vp-nav-screen-menu-group-link",
    href: $props.item.link,
    target: $props.item.target,
    rel: $props.item.rel,
    "no-icon": $props.item.noIcon,
    onClick: $setup.closeScreen
  }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        if ($props.item.icon) {
          _push2(ssrRenderComponent($setup["VPIcon"], {
            name: $props.item.icon
          }, null, _parent2, _scopeId));
        } else {
          _push2(`<!---->`);
        }
        _push2(`<span data-v-47a47dfd${_scopeId}>${$props.item.text ?? ""}</span>`);
      } else {
        return [
          $props.item.icon ? (openBlock(), createBlock($setup["VPIcon"], {
            key: 0,
            name: $props.item.icon
          }, null, 8, ["name"])) : createCommentVNode("", true),
          createVNode("span", {
            innerHTML: $props.item.text
          }, null, 8, ["innerHTML"])
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$X = _sfc_main$X.setup;
_sfc_main$X.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/Nav/VPNavScreenMenuGroupLink.vue");
  return _sfc_setup$X ? _sfc_setup$X(props, ctx) : void 0;
};
const VPNavScreenMenuGroupLink = /* @__PURE__ */ _export_sfc(_sfc_main$X, [["ssrRender", _sfc_ssrRender$X], ["__scopeId", "data-v-47a47dfd"], ["__file", "VPNavScreenMenuGroupLink.vue"]]);
const _sfc_main$W = /* @__PURE__ */ defineComponent({
  __name: "VPNavScreenMenuGroupSection",
  props: {
    icon: {},
    text: {},
    items: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const __returned__ = { VPNavScreenMenuGroupLink, VPIcon };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$W(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "vp-nav-screen-menu-group-section" }, _attrs))} data-v-4fc882f4>`);
  if ($props.text) {
    _push(`<p class="title" data-v-4fc882f4>`);
    if ($props.icon) {
      _push(ssrRenderComponent($setup["VPIcon"], { name: $props.icon }, null, _parent));
    } else {
      _push(`<!---->`);
    }
    _push(` ${ssrInterpolate($props.text)}</p>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<!--[-->`);
  ssrRenderList($props.items, (item) => {
    _push(ssrRenderComponent($setup["VPNavScreenMenuGroupLink"], {
      key: item.text,
      item
    }, null, _parent));
  });
  _push(`<!--]--></div>`);
}
const _sfc_setup$W = _sfc_main$W.setup;
_sfc_main$W.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/Nav/VPNavScreenMenuGroupSection.vue");
  return _sfc_setup$W ? _sfc_setup$W(props, ctx) : void 0;
};
const VPNavScreenMenuGroupSection = /* @__PURE__ */ _export_sfc(_sfc_main$W, [["ssrRender", _sfc_ssrRender$W], ["__scopeId", "data-v-4fc882f4"], ["__file", "VPNavScreenMenuGroupSection.vue"]]);
const _sfc_main$V = /* @__PURE__ */ defineComponent({
  __name: "VPNavScreenMenuGroup",
  props: {
    text: {},
    icon: {},
    items: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const isOpen = ref(false);
    const groupId = computed(
      () => `nav-screen-menu-group-${props.text.replace(" ", "-").toLowerCase()}`
    );
    function toggle() {
      isOpen.value = !isOpen.value;
    }
    const __returned__ = { props, isOpen, groupId, toggle, VPNavScreenMenuGroupLink, VPNavScreenMenuGroupSection, VPIcon };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$V(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: ["vp-nav-screen-menu-group", { open: $setup.isOpen }]
  }, _attrs))} data-v-6ef220b8><button class="button"${ssrRenderAttr("aria-controls", $setup.groupId)}${ssrRenderAttr("aria-expanded", $setup.isOpen)} data-v-6ef220b8><span class="button-text" data-v-6ef220b8>`);
  if ($props.icon) {
    _push(ssrRenderComponent($setup["VPIcon"], { name: $props.icon }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  _push(`<span data-v-6ef220b8>${$props.text ?? ""}</span></span><span class="vpi-plus button-icon" data-v-6ef220b8></span></button><div${ssrRenderAttr("id", $setup.groupId)} class="items" data-v-6ef220b8><!--[-->`);
  ssrRenderList($props.items, (item) => {
    _push(`<!--[-->`);
    if ("link" in item) {
      _push(`<div class="item" data-v-6ef220b8>`);
      _push(ssrRenderComponent($setup["VPNavScreenMenuGroupLink"], { item }, null, _parent));
      _push(`</div>`);
    } else {
      _push(`<div class="group" data-v-6ef220b8>`);
      _push(ssrRenderComponent($setup["VPNavScreenMenuGroupSection"], {
        text: item.text,
        items: item.items,
        icon: item.icon
      }, null, _parent));
      _push(`</div>`);
    }
    _push(`<!--]-->`);
  });
  _push(`<!--]--></div></div>`);
}
const _sfc_setup$V = _sfc_main$V.setup;
_sfc_main$V.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/Nav/VPNavScreenMenuGroup.vue");
  return _sfc_setup$V ? _sfc_setup$V(props, ctx) : void 0;
};
const VPNavScreenMenuGroup = /* @__PURE__ */ _export_sfc(_sfc_main$V, [["ssrRender", _sfc_ssrRender$V], ["__scopeId", "data-v-6ef220b8"], ["__file", "VPNavScreenMenuGroup.vue"]]);
const _sfc_main$U = /* @__PURE__ */ defineComponent({
  __name: "VPNavScreenMenuLink",
  props: {
    item: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const closeScreen = inject("close-screen");
    const __returned__ = { closeScreen, VPIcon, VPLink };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$U(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(ssrRenderComponent($setup["VPLink"], mergeProps({
    class: "vp-nav-screen-menu-link",
    href: $props.item.link,
    target: $props.item.target,
    rel: $props.item.rel,
    "no-icon": $props.item.noIcon,
    onClick: $setup.closeScreen
  }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        if ($props.item.icon) {
          _push2(ssrRenderComponent($setup["VPIcon"], {
            name: $props.item.icon
          }, null, _parent2, _scopeId));
        } else {
          _push2(`<!---->`);
        }
        _push2(`<span data-v-ba1cd179${_scopeId}>${$props.item.text ?? ""}</span>`);
      } else {
        return [
          $props.item.icon ? (openBlock(), createBlock($setup["VPIcon"], {
            key: 0,
            name: $props.item.icon
          }, null, 8, ["name"])) : createCommentVNode("", true),
          createVNode("span", {
            innerHTML: $props.item.text
          }, null, 8, ["innerHTML"])
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$U = _sfc_main$U.setup;
_sfc_main$U.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/Nav/VPNavScreenMenuLink.vue");
  return _sfc_setup$U ? _sfc_setup$U(props, ctx) : void 0;
};
const VPNavScreenMenuLink = /* @__PURE__ */ _export_sfc(_sfc_main$U, [["ssrRender", _sfc_ssrRender$U], ["__scopeId", "data-v-ba1cd179"], ["__file", "VPNavScreenMenuLink.vue"]]);
const _sfc_main$T = /* @__PURE__ */ defineComponent({
  __name: "VPNavScreenMenu",
  setup(__props, { expose: __expose }) {
    __expose();
    const navbar = useNavbarData();
    const __returned__ = { navbar, VPNavScreenMenuGroup, VPNavScreenMenuLink };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$T(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if ($setup.navbar.length) {
    _push(`<nav${ssrRenderAttrs(mergeProps({ class: "vp-nav-screen-menu" }, _attrs))}><!--[-->`);
    ssrRenderList($setup.navbar, (item) => {
      _push(`<!--[-->`);
      if ("link" in item) {
        _push(ssrRenderComponent($setup["VPNavScreenMenuLink"], { item }, null, _parent));
      } else {
        _push(ssrRenderComponent($setup["VPNavScreenMenuGroup"], {
          text: item.text || "",
          items: item.items,
          icon: item.icon
        }, null, _parent));
      }
      _push(`<!--]-->`);
    });
    _push(`<!--]--></nav>`);
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup$T = _sfc_main$T.setup;
_sfc_main$T.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/Nav/VPNavScreenMenu.vue");
  return _sfc_setup$T ? _sfc_setup$T(props, ctx) : void 0;
};
const VPNavScreenMenu = /* @__PURE__ */ _export_sfc(_sfc_main$T, [["ssrRender", _sfc_ssrRender$T], ["__file", "VPNavScreenMenu.vue"]]);
const _sfc_main$S = /* @__PURE__ */ defineComponent({
  __name: "VPNavScreenSocialLinks",
  setup(__props, { expose: __expose }) {
    __expose();
    const { theme } = useData();
    const __returned__ = { theme, VPSocialLinks };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$S(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if ($setup.theme.social) {
    _push(ssrRenderComponent($setup["VPSocialLinks"], mergeProps({
      class: "vp-nav-screen-social-links",
      links: $setup.theme.social
    }, _attrs), null, _parent));
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup$S = _sfc_main$S.setup;
_sfc_main$S.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/Nav/VPNavScreenSocialLinks.vue");
  return _sfc_setup$S ? _sfc_setup$S(props, ctx) : void 0;
};
const VPNavScreenSocialLinks = /* @__PURE__ */ _export_sfc(_sfc_main$S, [["ssrRender", _sfc_ssrRender$S], ["__file", "VPNavScreenSocialLinks.vue"]]);
const _sfc_main$R = /* @__PURE__ */ defineComponent({
  __name: "VPNavScreenTranslations",
  setup(__props, { expose: __expose }) {
    __expose();
    const { localeLinks, currentLang } = useLangs();
    const isOpen = ref(false);
    function toggle() {
      isOpen.value = !isOpen.value;
    }
    const __returned__ = { localeLinks, currentLang, isOpen, toggle, VPLink };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$R(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if ($setup.localeLinks.length && $setup.currentLang.label) {
    _push(`<div${ssrRenderAttrs(mergeProps({
      class: ["vp-nav-screen-translations", { open: $setup.isOpen }]
    }, _attrs))} data-v-3ab94706><button class="title" data-v-3ab94706><span class="vpi-languages icon lang" data-v-3ab94706></span> ${ssrInterpolate($setup.currentLang.label)} <span class="vpi-chevron-down icon chevron" data-v-3ab94706></span></button><ul class="list" data-v-3ab94706><!--[-->`);
    ssrRenderList($setup.localeLinks, (locale) => {
      _push(`<li class="item" data-v-3ab94706>`);
      _push(ssrRenderComponent($setup["VPLink"], {
        class: "link",
        href: locale.link
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(locale.text)}`);
          } else {
            return [
              createTextVNode(toDisplayString(locale.text), 1)
            ];
          }
        }),
        _: 2
      }, _parent));
      _push(`</li>`);
    });
    _push(`<!--]--></ul></div>`);
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup$R = _sfc_main$R.setup;
_sfc_main$R.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/Nav/VPNavScreenTranslations.vue");
  return _sfc_setup$R ? _sfc_setup$R(props, ctx) : void 0;
};
const VPNavScreenTranslates = /* @__PURE__ */ _export_sfc(_sfc_main$R, [["ssrRender", _sfc_ssrRender$R], ["__scopeId", "data-v-3ab94706"], ["__file", "VPNavScreenTranslations.vue"]]);
const _sfc_main$Q = /* @__PURE__ */ defineComponent({
  __name: "VPNavScreen",
  props: {
    open: { type: Boolean }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const isLocked = useScrollLock(inBrowser ? document.body : null);
    const __returned__ = { isLocked, VPNavScreenAppearance, VPNavScreenMenu, VPNavScreenSocialLinks, VPNavScreenTranslates };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$Q(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if ($props.open) {
    _push(`<div${ssrRenderAttrs(mergeProps({
      id: "navScreen",
      class: "vp-nav-screen"
    }, _attrs))} data-v-2f881b97><div class="container" data-v-2f881b97>`);
    ssrRenderSlot(_ctx.$slots, "nav-screen-content-before", {}, null, _push, _parent);
    _push(ssrRenderComponent($setup["VPNavScreenMenu"], { class: "menu" }, null, _parent));
    _push(ssrRenderComponent($setup["VPNavScreenTranslates"], { class: "translations" }, null, _parent));
    _push(ssrRenderComponent($setup["VPNavScreenAppearance"], { class: "appearance" }, null, _parent));
    _push(ssrRenderComponent($setup["VPNavScreenSocialLinks"], { class: "social-links" }, null, _parent));
    ssrRenderSlot(_ctx.$slots, "nav-screen-content-after", {}, null, _push, _parent);
    _push(`</div></div>`);
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup$Q = _sfc_main$Q.setup;
_sfc_main$Q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/Nav/VPNavScreen.vue");
  return _sfc_setup$Q ? _sfc_setup$Q(props, ctx) : void 0;
};
const VPNavScreen = /* @__PURE__ */ _export_sfc(_sfc_main$Q, [["ssrRender", _sfc_ssrRender$Q], ["__scopeId", "data-v-2f881b97"], ["__file", "VPNavScreen.vue"]]);
const _sfc_main$P = /* @__PURE__ */ defineComponent({
  __name: "VPNav",
  setup(__props, { expose: __expose }) {
    __expose();
    const { page, frontmatter } = useData();
    const { isScreenOpen, closeScreen, toggleScreen } = useNav();
    const fixedInclude = ["blog", "friends", "blog-archives", "blog-tags", "blog-categories"];
    const fixed = computed(() => {
      return fixedInclude.includes(page.value.type);
    });
    const hasNavbar = computed(() => {
      return frontmatter.value.navbar !== false;
    });
    provide("close-screen", closeScreen);
    watchEffect(() => {
      if (inBrowser) {
        document.documentElement.classList.toggle("hide-nav", !hasNavbar.value);
      }
    });
    const __returned__ = { page, frontmatter, isScreenOpen, closeScreen, toggleScreen, fixedInclude, fixed, hasNavbar, VPNavbar, VPNavScreen };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$P(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: ["vp-nav", { fixed: $setup.fixed }]
  }, _attrs))} data-v-64abc0b4>`);
  _push(ssrRenderComponent($setup["VPNavbar"], {
    "is-screen-open": $setup.isScreenOpen,
    onToggleScreen: $setup.toggleScreen
  }, {
    "nav-bar-title-before": withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        ssrRenderSlot(_ctx.$slots, "nav-bar-title-before", {}, null, _push2, _parent2, _scopeId);
      } else {
        return [
          renderSlot(_ctx.$slots, "nav-bar-title-before", {}, void 0, true)
        ];
      }
    }),
    "nav-bar-title-after": withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        ssrRenderSlot(_ctx.$slots, "nav-bar-title-after", {}, null, _push2, _parent2, _scopeId);
      } else {
        return [
          renderSlot(_ctx.$slots, "nav-bar-title-after", {}, void 0, true)
        ];
      }
    }),
    "nav-bar-content-before": withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        ssrRenderSlot(_ctx.$slots, "nav-bar-content-before", {}, null, _push2, _parent2, _scopeId);
      } else {
        return [
          renderSlot(_ctx.$slots, "nav-bar-content-before", {}, void 0, true)
        ];
      }
    }),
    "nav-bar-content-after": withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        ssrRenderSlot(_ctx.$slots, "nav-bar-content-after", {}, null, _push2, _parent2, _scopeId);
      } else {
        return [
          renderSlot(_ctx.$slots, "nav-bar-content-after", {}, void 0, true)
        ];
      }
    }),
    _: 3
  }, _parent));
  _push(ssrRenderComponent($setup["VPNavScreen"], { open: $setup.isScreenOpen }, {
    "nav-screen-content-before": withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        ssrRenderSlot(_ctx.$slots, "nav-screen-content-before", {}, null, _push2, _parent2, _scopeId);
      } else {
        return [
          renderSlot(_ctx.$slots, "nav-screen-content-before", {}, void 0, true)
        ];
      }
    }),
    "nav-screen-content-after": withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        ssrRenderSlot(_ctx.$slots, "nav-screen-content-after", {}, null, _push2, _parent2, _scopeId);
      } else {
        return [
          renderSlot(_ctx.$slots, "nav-screen-content-after", {}, void 0, true)
        ];
      }
    }),
    _: 3
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup$P = _sfc_main$P.setup;
_sfc_main$P.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/Nav/VPNav.vue");
  return _sfc_setup$P ? _sfc_setup$P(props, ctx) : void 0;
};
const VPNav = /* @__PURE__ */ _export_sfc(_sfc_main$P, [["ssrRender", _sfc_ssrRender$P], ["__scopeId", "data-v-64abc0b4"], ["__file", "VPNav.vue"]]);
const _sfc_main$O = /* @__PURE__ */ defineComponent({
  __name: "VPBackdrop",
  props: {
    show: { type: Boolean }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const __returned__ = {};
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$O(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if ($props.show) {
    _push(`<div${ssrRenderAttrs(mergeProps({ class: "vp-backdrop" }, _attrs))} data-v-96018438></div>`);
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup$O = _sfc_main$O.setup;
_sfc_main$O.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/VPBackdrop.vue");
  return _sfc_setup$O ? _sfc_setup$O(props, ctx) : void 0;
};
const VPBackdrop = /* @__PURE__ */ _export_sfc(_sfc_main$O, [["ssrRender", _sfc_ssrRender$O], ["__scopeId", "data-v-96018438"], ["__file", "VPBackdrop.vue"]]);
const _sfc_main$N = /* @__PURE__ */ defineComponent({
  __name: "VPBackToTop",
  setup(__props, { expose: __expose }) {
    __expose();
    const body = shallowRef();
    const { height: bodyHeight } = useElementSize(body);
    const { height: windowHeight } = useWindowSize();
    onMounted(() => {
      body.value = document.body;
    });
    const { page } = useData();
    const { y } = useWindowScroll();
    const isScrolling = ref(false);
    const progress = computed(
      () => y.value / (bodyHeight.value - windowHeight.value) * 100
    );
    const percent = computed(() => `${Math.min(Math.round(progress.value), 100) || 0}%`);
    const stroke = computed(
      () => `calc(${Math.PI * progress.value}% - ${4 * Math.PI}px) calc(${Math.PI * 100}% - ${4 * Math.PI}px)`
    );
    const mustHidden = computed(() => {
      return page.value.frontmatter.backToTop === false || page.value.frontmatter.pageLayout === "home" && page.value.frontmatter.config && page.value.frontmatter.config.length <= 1;
    });
    const show = computed(() => {
      if (bodyHeight.value < windowHeight.value)
        return false;
      else
        return y.value > windowHeight.value / 2;
    });
    let timer = null;
    function resetScrolling() {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        isScrolling.value = false;
      }, 1e3);
    }
    watch(y, () => {
      isScrolling.value = true;
      resetScrolling();
    });
    function handleClick() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    const __returned__ = { body, bodyHeight, windowHeight, page, y, isScrolling, progress, percent, stroke, mustHidden, show, get timer() {
      return timer;
    }, set timer(v) {
      timer = v;
    }, resetScrolling, handleClick };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$N(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<button${ssrRenderAttrs(mergeProps({
    style: !$setup.mustHidden && ($setup.show || $setup.isScrolling) ? null : { display: "none" },
    type: "button",
    class: "vp-back-to-top",
    "aria-label": "back to top"
  }, _attrs))} data-v-d36c6534><span class="${ssrRenderClass([{ show: $setup.isScrolling }, "percent"])}" data-v-d36c6534>${ssrInterpolate($setup.percent)}</span><span class="${ssrRenderClass([{ show: !$setup.isScrolling }, "icon vpi-back-to-top"])}" data-v-d36c6534></span><svg aria-hidden="true" data-v-d36c6534><circle cx="50%" cy="50%" style="${ssrRenderStyle({ "stroke-dasharray": $setup.stroke })}" data-v-d36c6534></circle></svg></button>`);
}
const _sfc_setup$N = _sfc_main$N.setup;
_sfc_main$N.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/VPBackToTop.vue");
  return _sfc_setup$N ? _sfc_setup$N(props, ctx) : void 0;
};
const VPBackToTop = /* @__PURE__ */ _export_sfc(_sfc_main$N, [["ssrRender", _sfc_ssrRender$N], ["__scopeId", "data-v-d36c6534"], ["__file", "VPBackToTop.vue"]]);
const _sfc_main$M = /* @__PURE__ */ defineComponent({
  __name: "VPShortPostList",
  props: {
    postList: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const __returned__ = { VPLink };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$M(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<ul${ssrRenderAttrs(mergeProps({ class: "vp-blog-short-post-list" }, _attrs))} data-v-2818d980><!--[-->`);
  ssrRenderList($props.postList, (post) => {
    _push(`<li data-v-2818d980><p class="post-title" data-v-2818d980>`);
    _push(ssrRenderComponent($setup["VPLink"], {
      class: "post-link",
      href: post.path
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`${ssrInterpolate(post.title)}`);
        } else {
          return [
            createTextVNode(toDisplayString(post.title), 1)
          ];
        }
      }),
      _: 2
    }, _parent));
    _push(`</p><span class="post-time" data-v-2818d980>${ssrInterpolate(post.createTime)}</span></li>`);
  });
  _push(`<!--]--></ul>`);
}
const _sfc_setup$M = _sfc_main$M.setup;
_sfc_main$M.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/Blog/VPShortPostList.vue");
  return _sfc_setup$M ? _sfc_setup$M(props, ctx) : void 0;
};
const VPShortPostList = /* @__PURE__ */ _export_sfc(_sfc_main$M, [["ssrRender", _sfc_ssrRender$M], ["__scopeId", "data-v-2818d980"], ["__file", "VPShortPostList.vue"]]);
const _sfc_main$L = /* @__PURE__ */ defineComponent({
  __name: "VPBlogArchives",
  setup(__props, { expose: __expose }) {
    __expose();
    const { archive: archiveLink } = useInternalLink();
    const { archives } = useArchives();
    const __returned__ = { archiveLink, archives, VPShortPostList };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$L(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  var _a;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "vp-blog-archives" }, _attrs))} data-v-983152d1>`);
  ssrRenderSlot(_ctx.$slots, "blog-archives-before", {}, null, _push, _parent);
  _push(`<h2 class="archives-title" data-v-983152d1><span class="vpi-archive icon" data-v-983152d1></span><span data-v-983152d1>${ssrInterpolate(((_a = $setup.archiveLink) == null ? void 0 : _a.text) ?? "Archives")}</span></h2>`);
  if ($setup.archives.length) {
    _push(`<div class="archives" data-v-983152d1><!--[-->`);
    ssrRenderList($setup.archives, (archive) => {
      _push(`<div class="archive" data-v-983152d1><h3 class="archive-title" data-v-983152d1>${ssrInterpolate(archive.label)}</h3>`);
      _push(ssrRenderComponent($setup["VPShortPostList"], {
        "post-list": archive.list
      }, null, _parent));
      _push(`</div>`);
    });
    _push(`<!--]--></div>`);
  } else {
    _push(`<!---->`);
  }
  ssrRenderSlot(_ctx.$slots, "blog-archives-after", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup$L = _sfc_main$L.setup;
_sfc_main$L.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/Blog/VPBlogArchives.vue");
  return _sfc_setup$L ? _sfc_setup$L(props, ctx) : void 0;
};
const VPBlogArchives = /* @__PURE__ */ _export_sfc(_sfc_main$L, [["ssrRender", _sfc_ssrRender$L], ["__scopeId", "data-v-983152d1"], ["__file", "VPBlogArchives.vue"]]);
const _sfc_main$K = /* @__PURE__ */ defineComponent({
  __name: "VPBlogNav",
  props: {
    isLocal: { type: Boolean }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const route = useRoute();
    const { hasBlogExtract, tags, archives, categories } = useBlogExtract();
    const __returned__ = { props, route, hasBlogExtract, tags, archives, categories, VPLink };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$K(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if ($setup.hasBlogExtract) {
    _push(`<div${ssrRenderAttrs(mergeProps({
      class: ["vp-blog-nav", { local: $setup.props.isLocal }]
    }, _attrs))} data-v-5a8f7cf8>`);
    _push(ssrRenderComponent($setup["VPLink"], {
      class: ["nav-link", { active: $setup.route.path === $setup.tags.link }],
      href: $setup.tags.link
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<span class="icon icon-logo vpi-tag" data-v-5a8f7cf8${_scopeId}></span><span class="text" data-v-5a8f7cf8${_scopeId}>${ssrInterpolate($setup.tags.text)}</span><span class="total" data-v-5a8f7cf8${_scopeId}>${ssrInterpolate($setup.tags.total)}</span><span class="icon vpi-chevron-right" data-v-5a8f7cf8${_scopeId}></span>`);
        } else {
          return [
            createVNode("span", { class: "icon icon-logo vpi-tag" }),
            createVNode("span", { class: "text" }, toDisplayString($setup.tags.text), 1),
            createVNode("span", { class: "total" }, toDisplayString($setup.tags.total), 1),
            createVNode("span", { class: "icon vpi-chevron-right" })
          ];
        }
      }),
      _: 1
    }, _parent));
    _push(ssrRenderComponent($setup["VPLink"], {
      class: ["nav-link", { active: $setup.route.path === $setup.categories.link }],
      href: $setup.categories.link
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<span class="icon icon-logo vpi-category" data-v-5a8f7cf8${_scopeId}></span><span class="text" data-v-5a8f7cf8${_scopeId}>${ssrInterpolate($setup.categories.text)}</span><span class="total" data-v-5a8f7cf8${_scopeId}>${ssrInterpolate($setup.categories.total)}</span><span class="icon vpi-chevron-right" data-v-5a8f7cf8${_scopeId}></span>`);
        } else {
          return [
            createVNode("span", { class: "icon icon-logo vpi-category" }),
            createVNode("span", { class: "text" }, toDisplayString($setup.categories.text), 1),
            createVNode("span", { class: "total" }, toDisplayString($setup.categories.total), 1),
            createVNode("span", { class: "icon vpi-chevron-right" })
          ];
        }
      }),
      _: 1
    }, _parent));
    _push(ssrRenderComponent($setup["VPLink"], {
      class: ["nav-link", { active: $setup.route.path === $setup.archives.link }],
      href: $setup.archives.link
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<span class="icon icon-logo vpi-archive" data-v-5a8f7cf8${_scopeId}></span><span class="text" data-v-5a8f7cf8${_scopeId}>${ssrInterpolate($setup.archives.text)}</span><span class="total" data-v-5a8f7cf8${_scopeId}>${ssrInterpolate($setup.archives.total)}</span><span class="icon vpi-chevron-right" data-v-5a8f7cf8${_scopeId}></span>`);
        } else {
          return [
            createVNode("span", { class: "icon icon-logo vpi-archive" }),
            createVNode("span", { class: "text" }, toDisplayString($setup.archives.text), 1),
            createVNode("span", { class: "total" }, toDisplayString($setup.archives.total), 1),
            createVNode("span", { class: "icon vpi-chevron-right" })
          ];
        }
      }),
      _: 1
    }, _parent));
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup$K = _sfc_main$K.setup;
_sfc_main$K.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/Blog/VPBlogNav.vue");
  return _sfc_setup$K ? _sfc_setup$K(props, ctx) : void 0;
};
const VPBlogNav = /* @__PURE__ */ _export_sfc(_sfc_main$K, [["ssrRender", _sfc_ssrRender$K], ["__scopeId", "data-v-5a8f7cf8"], ["__file", "VPBlogNav.vue"]]);
const _sfc_main$J = /* @__PURE__ */ defineComponent({
  __name: "VPBlogProfile",
  setup(__props, { expose: __expose }) {
    __expose();
    const { theme } = useData();
    const profile = computed(
      () => theme.value.profile
    );
    const imageUrl = computed(() => {
      var _a, _b;
      const url = ((_a = profile.value) == null ? void 0 : _a.avatar) ?? ((_b = profile.value) == null ? void 0 : _b.url);
      if (!url)
        return "";
      if (isLinkHttp(url))
        return url;
      return withBase(url);
    });
    const __returned__ = { theme, profile, imageUrl, VPSocialLinks };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$J(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if ($setup.profile) {
    _push(`<div${ssrRenderAttrs(mergeProps({ class: "vp-blog-profile" }, _attrs))} data-v-14b90c2a>`);
    if ($setup.imageUrl) {
      _push(`<p class="${ssrRenderClass({ circle: !!$setup.profile.circle })}" data-v-14b90c2a><img${ssrRenderAttr("src", $setup.imageUrl)}${ssrRenderAttr("alt", $setup.profile.name)}${ssrRenderAttr("width", $setup.profile.originalWidth)}${ssrRenderAttr("height", $setup.profile.originalHeight)} data-v-14b90c2a></p>`);
    } else {
      _push(`<!---->`);
    }
    _push(`<div class="profile-info" data-v-14b90c2a><h3 data-v-14b90c2a>${ssrInterpolate($setup.profile.name)}</h3>`);
    if ($setup.profile.description) {
      _push(`<p data-v-14b90c2a>${$setup.profile.description ?? ""}</p>`);
    } else {
      _push(`<!---->`);
    }
    if ($setup.profile.location) {
      _push(`<div class="profile-location" data-v-14b90c2a><span class="vpi-location" data-v-14b90c2a></span>`);
      if ($setup.profile.location) {
        _push(`<p data-v-14b90c2a>${$setup.profile.location ?? ""}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    } else {
      _push(`<!---->`);
    }
    if ($setup.profile.organization) {
      _push(`<div class="profile-organization" data-v-14b90c2a><span class="vpi-organization" data-v-14b90c2a></span>`);
      if ($setup.profile.organization) {
        _push(`<p data-v-14b90c2a>${$setup.profile.organization ?? ""}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div>`);
    if ($setup.theme.social) {
      _push(`<div class="profile-social" data-v-14b90c2a>`);
      _push(ssrRenderComponent($setup["VPSocialLinks"], {
        links: $setup.theme.social
      }, null, _parent));
      _push(`</div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup$J = _sfc_main$J.setup;
_sfc_main$J.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/Blog/VPBlogProfile.vue");
  return _sfc_setup$J ? _sfc_setup$J(props, ctx) : void 0;
};
const VPBlogProfile = /* @__PURE__ */ _export_sfc(_sfc_main$J, [["ssrRender", _sfc_ssrRender$J], ["__scopeId", "data-v-14b90c2a"], ["__file", "VPBlogProfile.vue"]]);
const _sfc_main$I = /* @__PURE__ */ defineComponent({
  __name: "VPBlogAside",
  setup(__props, { expose: __expose }) {
    __expose();
    const { theme } = useData();
    const __returned__ = { theme, VPBlogNav, VPBlogProfile };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$I(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if ($setup.theme.profile) {
    _push(`<div${ssrRenderAttrs(mergeProps({ class: "vp-blog-aside" }, _attrs))} data-v-eda0a8a2>`);
    ssrRenderSlot(_ctx.$slots, "blog-aside-top", {}, null, _push, _parent);
    _push(ssrRenderComponent($setup["VPBlogProfile"], null, null, _parent));
    _push(ssrRenderComponent($setup["VPBlogNav"], null, null, _parent));
    ssrRenderSlot(_ctx.$slots, "blog-aside-bottom", {}, null, _push, _parent);
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup$I = _sfc_main$I.setup;
_sfc_main$I.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/Blog/VPBlogAside.vue");
  return _sfc_setup$I ? _sfc_setup$I(props, ctx) : void 0;
};
const VPBlogAside = /* @__PURE__ */ _export_sfc(_sfc_main$I, [["ssrRender", _sfc_ssrRender$I], ["__scopeId", "data-v-eda0a8a2"], ["__file", "VPBlogAside.vue"]]);
const _sfc_main$H = /* @__PURE__ */ defineComponent({
  __name: "VPCategoriesGroup",
  props: {
    item: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const route = useRoute();
    const el = ref(null);
    const active2 = ref(true);
    const isActive2 = ref(false);
    watch(
      () => [route.query, props.item],
      () => {
        const id = route.query.id;
        if (!id) {
          active2.value = true;
        } else {
          active2.value = hasActive(props.item, id);
        }
        isActive2.value = id ? props.item.id === id : false;
      },
      { immediate: true }
    );
    function hasActive(item, id) {
      return item.id === id || item.items.filter((item2) => item2.type === "category").some((item2) => hasActive(item2, id));
    }
    function toggle() {
      active2.value = !active2.value;
    }
    onMounted(() => {
      if (el.value && isActive2.value) {
        el.value.scrollIntoView({ block: "center" });
      }
    });
    const __returned__ = { props, route, el, active: active2, isActive: isActive2, hasActive, toggle, VPCategories };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$H(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    ref: "el",
    class: ["vp-category-group", { active: $setup.active }]
  }, _attrs))} data-v-14f260cb><p class="folder" data-v-14f260cb><span class="${ssrRenderClass([[$setup.active ? "vpi-folder-open" : "vpi-folder"], "icon"])}" data-v-14f260cb></span><span data-v-14f260cb>${ssrInterpolate($props.item.title)}</span></p>`);
  if ($props.item.items.length) {
    _push(ssrRenderComponent($setup["VPCategories"], {
      class: "group",
      items: $props.item.items
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup$H = _sfc_main$H.setup;
_sfc_main$H.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/Blog/VPCategoriesGroup.vue");
  return _sfc_setup$H ? _sfc_setup$H(props, ctx) : void 0;
};
const VPCategoriesGroup = /* @__PURE__ */ _export_sfc(_sfc_main$H, [["ssrRender", _sfc_ssrRender$H], ["__scopeId", "data-v-14f260cb"], ["__file", "VPCategoriesGroup.vue"]]);
const _sfc_main$G = /* @__PURE__ */ defineComponent({
  __name: "VPCategories",
  props: {
    items: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const __returned__ = { VPCategoriesGroup, VPLink };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$G(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<ul${ssrRenderAttrs(mergeProps({ class: "vp-categories" }, _attrs))} data-v-46a2bebc><!--[-->`);
  ssrRenderList($props.items, (item) => {
    _push(`<li class="vp-categories-item" data-v-46a2bebc>`);
    if (item.type === "post") {
      _push(`<p class="post" data-v-46a2bebc><span class="vpi-post" data-v-46a2bebc></span>`);
      _push(ssrRenderComponent($setup["VPLink"], {
        href: item.path,
        text: item.title
      }, null, _parent));
      _push(`</p>`);
    } else {
      _push(ssrRenderComponent($setup["VPCategoriesGroup"], { item }, null, _parent));
    }
    _push(`</li>`);
  });
  _push(`<!--]--></ul>`);
}
const _sfc_setup$G = _sfc_main$G.setup;
_sfc_main$G.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/Blog/VPCategories.vue");
  return _sfc_setup$G ? _sfc_setup$G(props, ctx) : void 0;
};
const VPCategories = /* @__PURE__ */ _export_sfc(_sfc_main$G, [["ssrRender", _sfc_ssrRender$G], ["__scopeId", "data-v-46a2bebc"], ["__file", "VPCategories.vue"]]);
const _sfc_main$F = /* @__PURE__ */ defineComponent({
  __name: "VPBlogCategories",
  setup(__props, { expose: __expose }) {
    __expose();
    const { categories: categoriesLink } = useInternalLink();
    const { categories } = useBlogCategory();
    const __returned__ = { categoriesLink, categories, VPCategories };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$F(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  var _a;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "vp-blog-categories" }, _attrs))} data-v-5099deb1>`);
  ssrRenderSlot(_ctx.$slots, "blog-categories-before", {}, null, _push, _parent);
  _push(`<h2 class="categories-title" data-v-5099deb1><span class="vpi-category icon" data-v-5099deb1></span><span data-v-5099deb1>${ssrInterpolate(((_a = $setup.categoriesLink) == null ? void 0 : _a.text) ?? "Categories")}</span></h2>`);
  ssrRenderSlot(_ctx.$slots, "blog-categories-content-before", {}, null, _push, _parent);
  _push(`<div class="content" data-v-5099deb1>`);
  _push(ssrRenderComponent($setup["VPCategories"], { items: $setup.categories }, null, _parent));
  _push(`</div>`);
  ssrRenderSlot(_ctx.$slots, "blog-categories-after", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup$F = _sfc_main$F.setup;
_sfc_main$F.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/Blog/VPBlogCategories.vue");
  return _sfc_setup$F ? _sfc_setup$F(props, ctx) : void 0;
};
const VPBlogCategories = /* @__PURE__ */ _export_sfc(_sfc_main$F, [["ssrRender", _sfc_ssrRender$F], ["__scopeId", "data-v-5099deb1"], ["__file", "VPBlogCategories.vue"]]);
const _sfc_main$E = /* @__PURE__ */ defineComponent({
  __name: "VPBlogExtract",
  setup(__props, { expose: __expose }) {
    __expose();
    const { theme } = useData();
    const route = useRoute();
    const profile = computed(() => theme.value.profile);
    const imageUrl = computed(() => {
      var _a, _b;
      const url = ((_a = profile.value) == null ? void 0 : _a.avatar) ?? ((_b = profile.value) == null ? void 0 : _b.url);
      if (!url)
        return "";
      if (isLinkHttp(url))
        return url;
      return withBase(url);
    });
    const { hasBlogExtract, tags, archives, categories } = useBlogExtract();
    const open = ref(false);
    const lazyOpen = ref(false);
    const isLocked = useScrollLock(inBrowser ? document.body : null);
    watch(() => route.path, () => {
      open.value = false;
    });
    watch(open, async () => {
      if (open.value) {
        setTimeout(() => {
          lazyOpen.value = true;
        }, 200);
      } else {
        lazyOpen.value = false;
      }
    });
    watch(
      [() => open.value],
      () => {
        if (open.value)
          isLocked.value = true;
        else isLocked.value = false;
      },
      { immediate: true, flush: "post" }
    );
    const showBlogExtract = computed(() => {
      return profile.value || hasBlogExtract.value;
    });
    const __returned__ = { theme, route, profile, imageUrl, hasBlogExtract, tags, archives, categories, open, lazyOpen, isLocked, showBlogExtract, VPLink };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$E(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if ($setup.showBlogExtract) {
    _push(`<!--[--><div class="vp-blog-extract" data-v-a44e7d9d><span class="vpi-blog-ext icon" data-v-a44e7d9d></span></div><div style="${ssrRenderStyle($setup.open ? null : { display: "none" })}" class="blog-modal" data-v-a44e7d9d><div class="${ssrRenderClass([{ open: $setup.lazyOpen }, "blog-modal-container"])}" data-v-a44e7d9d>`);
    ssrRenderSlot(_ctx.$slots, "blog-extract-before", {}, null, _push, _parent);
    if ($setup.profile) {
      _push(`<div class="profile" data-v-a44e7d9d>`);
      if ($setup.imageUrl) {
        _push(`<p class="avatar" data-v-a44e7d9d><img${ssrRenderAttr("src", $setup.imageUrl)}${ssrRenderAttr("alt", $setup.profile.name)} data-v-a44e7d9d></p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div data-v-a44e7d9d><h3 data-v-a44e7d9d>${ssrInterpolate($setup.profile.name)}</h3><p class="desc" data-v-a44e7d9d>${ssrInterpolate($setup.profile.description)}</p><div class="profile-info" data-v-a44e7d9d>`);
      if ($setup.profile.location) {
        _push(`<div class="profile-location" data-v-a44e7d9d><span class="vpi-location" data-v-a44e7d9d></span>`);
        if ($setup.profile.location) {
          _push(`<p data-v-a44e7d9d>${$setup.profile.location ?? ""}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if ($setup.profile.organization) {
        _push(`<div class="profile-organization" data-v-a44e7d9d><span class="vpi-organization" data-v-a44e7d9d></span>`);
        if ($setup.profile.organization) {
          _push(`<p data-v-a44e7d9d>${$setup.profile.organization ?? ""}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    } else {
      _push(`<!---->`);
    }
    if ($setup.hasBlogExtract) {
      _push(`<div class="${ssrRenderClass([{ "no-profile": !$setup.profile }, "blog-nav"])}" data-v-a44e7d9d>`);
      _push(ssrRenderComponent($setup["VPLink"], {
        class: "nav-link",
        href: $setup.tags.link,
        "no-icon": ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="vpi-tag icon" data-v-a44e7d9d${_scopeId}></span><span data-v-a44e7d9d${_scopeId}>${ssrInterpolate($setup.tags.text)}</span>`);
          } else {
            return [
              createVNode("span", { class: "vpi-tag icon" }),
              createVNode("span", null, toDisplayString($setup.tags.text), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent($setup["VPLink"], {
        class: "nav-link",
        href: $setup.categories.link,
        "no-icon": ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="vpi-category icon" data-v-a44e7d9d${_scopeId}></span><span data-v-a44e7d9d${_scopeId}>${ssrInterpolate($setup.categories.text)}</span>`);
          } else {
            return [
              createVNode("span", { class: "vpi-category icon" }),
              createVNode("span", null, toDisplayString($setup.categories.text), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent($setup["VPLink"], {
        class: "nav-link",
        href: $setup.archives.link,
        "no-icon": ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="vpi-archive icon" data-v-a44e7d9d${_scopeId}></span><span data-v-a44e7d9d${_scopeId}>${ssrInterpolate($setup.archives.text)}</span>`);
          } else {
            return [
              createVNode("span", { class: "vpi-archive icon" }),
              createVNode("span", null, toDisplayString($setup.archives.text), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    } else {
      _push(`<!---->`);
    }
    ssrRenderSlot(_ctx.$slots, "blog-extract-after", {}, null, _push, _parent);
    _push(`</div></div><!--]-->`);
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup$E = _sfc_main$E.setup;
_sfc_main$E.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/Blog/VPBlogExtract.vue");
  return _sfc_setup$E ? _sfc_setup$E(props, ctx) : void 0;
};
const VPBlogExtract = /* @__PURE__ */ _export_sfc(_sfc_main$E, [["ssrRender", _sfc_ssrRender$E], ["__scopeId", "data-v-a44e7d9d"], ["__file", "VPBlogExtract.vue"]]);
const _sfc_main$D = /* @__PURE__ */ defineComponent({
  __name: "VPBlogTags",
  setup(__props, { expose: __expose }) {
    __expose();
    const { tags: tagsLink } = useInternalLink();
    const { tags, currentTag, postList, handleTagClick } = useTags();
    const __returned__ = { tagsLink, tags, currentTag, postList, handleTagClick, VPShortPostList };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$D(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  var _a;
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: ["vp-blog-tags", { "has-list": $setup.postList.length > 0 }]
  }, _attrs))} data-v-83c0740b>`);
  ssrRenderSlot(_ctx.$slots, "blog-tags-before", {}, null, _push, _parent);
  _push(`<div class="tags-nav" data-v-83c0740b><h2 class="tags-title" data-v-83c0740b><span class="vpi-tag icon" data-v-83c0740b></span><span data-v-83c0740b>${ssrInterpolate(((_a = $setup.tagsLink) == null ? void 0 : _a.text) ?? "Tags")}</span></h2>`);
  ssrRenderSlot(_ctx.$slots, "blog-tags-title-after", {}, null, _push, _parent);
  _push(`<div class="tags" data-v-83c0740b><!--[-->`);
  ssrRenderList($setup.tags, (tag) => {
    _push(`<p class="${ssrRenderClass([{ active: tag.name === $setup.currentTag, [tag.className]: true }, "tag"])}" data-v-83c0740b><span class="tag-name" data-v-83c0740b>${ssrInterpolate(tag.name)}</span><span class="tag-count" data-v-83c0740b>${ssrInterpolate(tag.count)}</span></p>`);
  });
  _push(`<!--]--></div></div>`);
  ssrRenderSlot(_ctx.$slots, "blog-tags-content-before", {}, null, _push, _parent);
  if ($setup.currentTag) {
    _push(`<div class="tags-container" data-v-83c0740b><h3 class="tag-title" data-v-83c0740b>${ssrInterpolate($setup.currentTag)}</h3>`);
    if ($setup.postList.length) {
      _push(ssrRenderComponent($setup["VPShortPostList"], { "post-list": $setup.postList }, null, _parent));
    } else {
      _push(`<!---->`);
    }
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
  ssrRenderSlot(_ctx.$slots, "blog-tags-after", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup$D = _sfc_main$D.setup;
_sfc_main$D.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/Blog/VPBlogTags.vue");
  return _sfc_setup$D ? _sfc_setup$D(props, ctx) : void 0;
};
const VPBlogTags = /* @__PURE__ */ _export_sfc(_sfc_main$D, [["ssrRender", _sfc_ssrRender$D], ["__scopeId", "data-v-83c0740b"], ["__file", "VPBlogTags.vue"]]);
const _sfc_main$C = /* @__PURE__ */ defineComponent({
  __name: "VPPagination",
  props: {
    page: {},
    totalPage: {},
    isFirstPage: { type: Boolean },
    isLastPage: { type: Boolean },
    pageRange: {}
  },
  emits: ["change"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const emit = __emit;
    const { theme } = useData();
    const __returned__ = { emit, theme };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$C(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "vp-blog-pagination" }, _attrs))} data-v-6e626d7f><button type="button" class="btn prev"${ssrIncludeBooleanAttr($props.isFirstPage) ? " disabled" : ""} data-v-6e626d7f>${ssrInterpolate($setup.theme.prevPageLabel || "Prev")}</button><div class="page-range" data-v-6e626d7f><!--[-->`);
  ssrRenderList($props.pageRange, ({ value, more }) => {
    _push(`<button${ssrIncludeBooleanAttr(more) ? " disabled" : ""} class="${ssrRenderClass([{ more, active: value === $props.page }, "btn"])}" type="button" data-v-6e626d7f>${ssrInterpolate(more ? "..." : value)}</button>`);
  });
  _push(`<!--]--></div><button type="button" class="btn next"${ssrIncludeBooleanAttr($props.isLastPage) ? " disabled" : ""} data-v-6e626d7f>${ssrInterpolate($setup.theme.nextPageLabel || "Next")}</button></div>`);
}
const _sfc_setup$C = _sfc_main$C.setup;
_sfc_main$C.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/Blog/VPPagination.vue");
  return _sfc_setup$C ? _sfc_setup$C(props, ctx) : void 0;
};
const VPPagination = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["ssrRender", _sfc_ssrRender$C], ["__scopeId", "data-v-6e626d7f"], ["__file", "VPPagination.vue"]]);
const _sfc_main$B = /* @__PURE__ */ defineComponent({
  __name: "VPPostItem",
  props: {
    post: {},
    index: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const { theme } = useData();
    const colors = useTagColors();
    const { categories: categoriesLink, tags: tagsLink } = useInternalLink();
    const createTime = computed(() => {
      var _a;
      return (_a = props.post.createTime) == null ? void 0 : _a.split(" ")[0].replace(/\//g, "-");
    });
    const categoryList = computed(() => props.post.categoryList ?? []);
    const sticky = computed(() => {
      if (typeof props.post.sticky === "boolean") {
        return props.post.sticky;
      } else if (typeof props.post.sticky === "number") {
        return props.post.sticky >= 0;
      }
      return false;
    });
    const tags = computed(
      () => (props.post.tags ?? []).slice(0, 4).map((tag) => ({
        name: tag,
        className: `vp-tag-${colors.value[tag]}`
      }))
    );
    const cover = computed(() => {
      var _a;
      if (!props.post.cover)
        return null;
      const opt = (typeof theme.value.blog === "boolean" ? "right" : (_a = theme.value.blog) == null ? void 0 : _a.postCover) ?? "right";
      const options = typeof opt === "string" ? { layout: opt } : opt;
      const cover2 = typeof props.post.cover === "string" ? { url: props.post.cover } : props.post.cover;
      return { layout: "right", ratio: "4:3", ...options, ...cover2 };
    });
    const isMobile = useMediaQuery("(max-width: 496px)");
    const coverLayout = computed(() => {
      var _a;
      if (isMobile.value)
        return "top";
      const layout = ((_a = cover.value) == null ? void 0 : _a.layout) ?? "right";
      const odd = (props.index + 1) % 2 === 1;
      if (layout === "odd-left")
        return odd ? "left" : "right";
      if (layout === "odd-right")
        return odd ? "right" : "left";
      return layout;
    });
    const coverCompact = computed(() => {
      var _a;
      if (props.post.excerpt || coverLayout.value === "top")
        return false;
      return ((_a = cover.value) == null ? void 0 : _a.compact) ?? false;
    });
    const coverStyles = computed(() => {
      if (!cover.value)
        return null;
      let ratio;
      if (typeof cover.value.ratio === "number") {
        ratio = cover.value.ratio;
      } else {
        const [w, h2] = cover.value.ratio.split(/[:/]/).map(Number);
        ratio = h2 / w;
      }
      if (coverLayout.value === "left" || coverLayout.value === "right") {
        const w = cover.value.width ?? 240;
        return { width: `${w}px`, height: `${w * ratio}px` };
      }
      return { height: 0, paddingBottom: `${ratio * 100}%` };
    });
    const __returned__ = { props, theme, colors, categoriesLink, tagsLink, createTime, categoryList, sticky, tags, cover, isMobile, coverLayout, coverCompact, coverStyles, VPLink };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$B(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: ["vp-blog-post-item", { "has-cover": $setup.cover, [$setup.coverLayout]: $setup.cover }]
  }, _attrs))} data-v-83cdf6dc>`);
  if ($setup.cover) {
    _push(`<div class="${ssrRenderClass([{ compact: $setup.coverCompact }, "post-cover"])}" style="${ssrRenderStyle($setup.coverStyles)}" data-v-83cdf6dc><img${ssrRenderAttr("src", $setup.cover.url)}${ssrRenderAttr("alt", $props.post.title)} loading="lazy" data-v-83cdf6dc></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="blog-post-item-content" data-v-83cdf6dc><h3 data-v-83cdf6dc>`);
  if ($setup.sticky) {
    _push(`<span class="sticky" data-v-83cdf6dc>TOP</span>`);
  } else {
    _push(`<!---->`);
  }
  if ($props.post.encrypt) {
    _push(`<span class="icon-lock vpi-lock" data-v-83cdf6dc></span>`);
  } else {
    _push(`<!---->`);
  }
  _push(ssrRenderComponent($setup["VPLink"], {
    href: $props.post.path,
    text: $props.post.title
  }, null, _parent));
  _push(`</h3><div class="post-meta" data-v-83cdf6dc>`);
  if ($setup.categoryList.length) {
    _push(`<div class="category-list" data-v-83cdf6dc><span class="icon vpi-folder" data-v-83cdf6dc></span><!--[-->`);
    ssrRenderList($setup.categoryList, (cate, i) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent($setup["VPLink"], {
        href: $setup.categoriesLink ? `${$setup.categoriesLink.link}?id=${cate.id}` : void 0
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(cate.name)}`);
          } else {
            return [
              createTextVNode(toDisplayString(cate.name), 1)
            ];
          }
        }),
        _: 2
      }, _parent));
      if (i !== $setup.categoryList.length - 1) {
        _push(`<span data-v-83cdf6dc>/</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    });
    _push(`<!--]--></div>`);
  } else {
    _push(`<!---->`);
  }
  if ($setup.tags.length) {
    _push(`<div class="tag-list" data-v-83cdf6dc><span class="icon vpi-tag" data-v-83cdf6dc></span><!--[-->`);
    ssrRenderList($setup.tags, (tag) => {
      _push(ssrRenderComponent($setup["VPLink"], {
        class: ["tag", tag.className],
        href: $setup.tagsLink ? `${$setup.tagsLink.link}?tag=${tag.name}` : void 0
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(tag.name)}`);
          } else {
            return [
              createTextVNode(toDisplayString(tag.name), 1)
            ];
          }
        }),
        _: 2
      }, _parent));
    });
    _push(`<!--]--></div>`);
  } else {
    _push(`<!---->`);
  }
  if ($setup.createTime) {
    _push(`<div class="create-time" data-v-83cdf6dc><span class="icon vpi-clock" data-v-83cdf6dc></span><span data-v-83cdf6dc>${ssrInterpolate($setup.createTime)}</span></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
  if ($props.post.excerpt) {
    _push(`<div class="vp-doc excerpt" data-v-83cdf6dc>${$props.post.excerpt ?? ""}</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div>`);
}
const _sfc_setup$B = _sfc_main$B.setup;
_sfc_main$B.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/Blog/VPPostItem.vue");
  return _sfc_setup$B ? _sfc_setup$B(props, ctx) : void 0;
};
const VPPostItem = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["ssrRender", _sfc_ssrRender$B], ["__scopeId", "data-v-83cdf6dc"], ["__file", "VPPostItem.vue"]]);
const _sfc_main$A = /* @__PURE__ */ defineComponent({
  __name: "VPTransitionDrop",
  props: {
    delay: { default: 0 },
    duration: { default: 0.25 },
    appear: { type: Boolean }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const { theme } = useData();
    const enabledTransition = computed(() => {
      const transition = theme.value.transition;
      return typeof transition === "object" ? transition.postList !== false : transition !== false;
    });
    let _transition = "";
    function beforeAppear(item) {
      const el = item;
      el.style.transform = "translateY(-20px)";
      el.style.opacity = "0";
    }
    function setStyle(item) {
      var _a;
      const el = item;
      if (!_transition) {
        const value = typeof window !== "undefined" ? (_a = window.getComputedStyle) == null ? void 0 : _a.call(window, el).transition : "";
        _transition = value && !value.includes("all") ? `${value || ""}, ` : " ";
      }
      el.style.transition = `${_transition}transform ${props.duration}s ease-in-out ${props.delay}s, opacity ${props.duration}s ease-in-out ${props.delay}s`;
    }
    function unsetStyle(item) {
      const el = item;
      el.style.transform = "translateY(0)";
      el.style.opacity = "1";
      el.style.transition = _transition;
    }
    const __returned__ = { props, theme, enabledTransition, get _transition() {
      return _transition;
    }, set _transition(v) {
      _transition = v;
    }, beforeAppear, setStyle, unsetStyle };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$A(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if ($setup.enabledTransition) {
    _push(`<template>`);
    ssrRenderSlotInner(_ctx.$slots, "default", {}, null, _push, _parent, null, true);
    _push(`</template>`);
  } else {
    ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  }
}
const _sfc_setup$A = _sfc_main$A.setup;
_sfc_main$A.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/VPTransitionDrop.vue");
  return _sfc_setup$A ? _sfc_setup$A(props, ctx) : void 0;
};
const VPTransitionDrop = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["ssrRender", _sfc_ssrRender$A], ["__file", "VPTransitionDrop.vue"]]);
const _sfc_main$z = /* @__PURE__ */ defineComponent({
  __name: "VPPostList",
  props: {
    homeBlog: { type: Boolean }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const {
      postList,
      page,
      totalPage,
      pageRange,
      isLastPage,
      isFirstPage,
      isPaginationEnabled,
      changePage
    } = usePostListControl(computed(() => !!props.homeBlog));
    const __returned__ = { props, postList, page, totalPage, pageRange, isLastPage, isFirstPage, isPaginationEnabled, changePage, VPPagination, VPPostItem, VPTransitionDrop };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$z(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "vp-blog-post-list" }, _attrs))} data-v-ef0e6973>`);
  ssrRenderSlot(_ctx.$slots, "blog-post-list-before", {}, null, _push, _parent);
  _push(`<!--[-->`);
  ssrRenderList($setup.postList, (post, index) => {
    _push(ssrRenderComponent($setup["VPTransitionDrop"], {
      appear: "",
      delay: index * 0.025
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(ssrRenderComponent($setup["VPPostItem"], {
            key: post.path,
            post,
            index
          }, null, _parent2, _scopeId));
        } else {
          return [
            (openBlock(), createBlock($setup["VPPostItem"], {
              key: post.path,
              post,
              index
            }, null, 8, ["post", "index"]))
          ];
        }
      }),
      _: 2
    }, _parent));
  });
  _push(`<!--]-->`);
  ssrRenderSlot(_ctx.$slots, "blog-post-list-after", {}, null, _push, _parent);
  if ($setup.isPaginationEnabled) {
    _push(ssrRenderComponent($setup["VPPagination"], {
      page: $setup.page,
      "total-page": $setup.totalPage,
      "page-range": $setup.pageRange,
      "is-last-page": $setup.isLastPage,
      "is-first-page": $setup.isFirstPage,
      onChange: $setup.changePage
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  ssrRenderSlot(_ctx.$slots, "blog-post-list-pagination-after", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup$z = _sfc_main$z.setup;
_sfc_main$z.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/Blog/VPPostList.vue");
  return _sfc_setup$z ? _sfc_setup$z(props, ctx) : void 0;
};
const VPPostList = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["ssrRender", _sfc_ssrRender$z], ["__scopeId", "data-v-ef0e6973"], ["__file", "VPPostList.vue"]]);
const _sfc_main$y = /* @__PURE__ */ defineComponent({
  __name: "VPTransitionFadeSlideY",
  setup(__props, { expose: __expose }) {
    __expose();
    const { theme } = useData();
    const { resolve: onBeforeEnter, pending: onBeforeLeave } = useScrollPromise();
    const enabledTransition = computed(() => {
      const transition = theme.value.transition;
      return typeof transition === "object" ? transition.page !== false : transition !== false;
    });
    const __returned__ = { theme, onBeforeEnter, onBeforeLeave, enabledTransition };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$y(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if ($setup.enabledTransition) {
    ssrRenderSlotInner(_ctx.$slots, "default", {}, null, _push, _parent, null, true);
  } else {
    ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  }
}
const _sfc_setup$y = _sfc_main$y.setup;
_sfc_main$y.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/VPTransitionFadeSlideY.vue");
  return _sfc_setup$y ? _sfc_setup$y(props, ctx) : void 0;
};
const VPTransitionFadeSlideY = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["ssrRender", _sfc_ssrRender$y], ["__file", "VPTransitionFadeSlideY.vue"]]);
const _sfc_main$x = /* @__PURE__ */ defineComponent({
  __name: "VPBlog",
  props: {
    homeBlog: { type: Boolean },
    type: {},
    onlyOnce: { type: Boolean }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const { theme, page } = useData();
    const __returned__ = { theme, page, VPBlogArchives, VPBlogAside, VPBlogCategories, VPBlogExtract, VPBlogNav, VPBlogTags, VPPostList, VPTransitionFadeSlideY };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$x(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  var _a;
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: ["vp-blog", { "home-blog": $props.homeBlog }],
    "vp-blog": ""
  }, _attrs))} data-v-852cc790>`);
  ssrRenderSlot(_ctx.$slots, "blog-top", {}, null, _push, _parent);
  _push(`<div class="${ssrRenderClass([{ "no-profile": !$setup.theme.profile, "left": ((_a = $setup.theme.profile) == null ? void 0 : _a.layout) === "left" }, "blog-container"])}" data-v-852cc790>`);
  if (!$setup.theme.profile) {
    _push(ssrRenderComponent($setup["VPBlogNav"], { "is-local": "" }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  _push(ssrRenderComponent($setup["VPTransitionFadeSlideY"], null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        if ($setup.page.type === "blog-archives") {
          _push2(ssrRenderComponent($setup["VPBlogArchives"], null, {
            "blog-archives-before": withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                ssrRenderSlot(_ctx.$slots, "blog-archives-before", {}, null, _push3, _parent3, _scopeId2);
              } else {
                return [
                  renderSlot(_ctx.$slots, "blog-archives-before", {}, void 0, true)
                ];
              }
            }),
            "blog-archives-after": withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                ssrRenderSlot(_ctx.$slots, "blog-archives-after", {}, null, _push3, _parent3, _scopeId2);
              } else {
                return [
                  renderSlot(_ctx.$slots, "blog-archives-after", {}, void 0, true)
                ];
              }
            }),
            _: 3
          }, _parent2, _scopeId));
        } else if ($setup.page.type === "blog-tags") {
          _push2(ssrRenderComponent($setup["VPBlogTags"], null, {
            "blog-tags-before": withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                ssrRenderSlot(_ctx.$slots, "blog-tags-before", {}, null, _push3, _parent3, _scopeId2);
              } else {
                return [
                  renderSlot(_ctx.$slots, "blog-tags-before", {}, void 0, true)
                ];
              }
            }),
            "blog-tags-after": withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                ssrRenderSlot(_ctx.$slots, "blog-tags-after", {}, null, _push3, _parent3, _scopeId2);
              } else {
                return [
                  renderSlot(_ctx.$slots, "blog-tags-after", {}, void 0, true)
                ];
              }
            }),
            "blog-tags-title-after": withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                ssrRenderSlot(_ctx.$slots, "blog-tags-title-after", {}, null, _push3, _parent3, _scopeId2);
              } else {
                return [
                  renderSlot(_ctx.$slots, "blog-tags-title-after", {}, void 0, true)
                ];
              }
            }),
            "blog-tags-content-before": withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                ssrRenderSlot(_ctx.$slots, "blog-tags-content-before", {}, null, _push3, _parent3, _scopeId2);
              } else {
                return [
                  renderSlot(_ctx.$slots, "blog-tags-content-before", {}, void 0, true)
                ];
              }
            }),
            _: 3
          }, _parent2, _scopeId));
        } else if ($setup.page.type === "blog-categories") {
          _push2(ssrRenderComponent($setup["VPBlogCategories"], null, {
            "blog-categories-before": withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                ssrRenderSlot(_ctx.$slots, "blog-categories-before", {}, null, _push3, _parent3, _scopeId2);
              } else {
                return [
                  renderSlot(_ctx.$slots, "blog-categories-before", {}, void 0, true)
                ];
              }
            }),
            "blog-categories-after": withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                ssrRenderSlot(_ctx.$slots, "blog-categories-after", {}, null, _push3, _parent3, _scopeId2);
              } else {
                return [
                  renderSlot(_ctx.$slots, "blog-categories-after", {}, void 0, true)
                ];
              }
            }),
            "blog-categories-content-before": withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                ssrRenderSlot(_ctx.$slots, "blog-categories-content-before", {}, null, _push3, _parent3, _scopeId2);
              } else {
                return [
                  renderSlot(_ctx.$slots, "blog-categories-content-before", {}, void 0, true)
                ];
              }
            }),
            _: 3
          }, _parent2, _scopeId));
        } else {
          _push2(ssrRenderComponent($setup["VPPostList"], { "home-blog": $props.homeBlog }, {
            "blog-post-list-before": withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                ssrRenderSlot(_ctx.$slots, "blog-post-list-before", {}, null, _push3, _parent3, _scopeId2);
              } else {
                return [
                  renderSlot(_ctx.$slots, "blog-post-list-before", {}, void 0, true)
                ];
              }
            }),
            "blog-post-list-after": withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                ssrRenderSlot(_ctx.$slots, "blog-post-list-after", {}, null, _push3, _parent3, _scopeId2);
              } else {
                return [
                  renderSlot(_ctx.$slots, "blog-post-list-after", {}, void 0, true)
                ];
              }
            }),
            "blog-post-list-pagination-after": withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                ssrRenderSlot(_ctx.$slots, "blog-post-list-pagination-after", {}, null, _push3, _parent3, _scopeId2);
              } else {
                return [
                  renderSlot(_ctx.$slots, "blog-post-list-pagination-after", {}, void 0, true)
                ];
              }
            }),
            _: 3
          }, _parent2, _scopeId));
        }
      } else {
        return [
          $setup.page.type === "blog-archives" ? (openBlock(), createBlock($setup["VPBlogArchives"], { key: 0 }, {
            "blog-archives-before": withCtx(() => [
              renderSlot(_ctx.$slots, "blog-archives-before", {}, void 0, true)
            ]),
            "blog-archives-after": withCtx(() => [
              renderSlot(_ctx.$slots, "blog-archives-after", {}, void 0, true)
            ]),
            _: 3
          })) : $setup.page.type === "blog-tags" ? (openBlock(), createBlock($setup["VPBlogTags"], { key: 1 }, {
            "blog-tags-before": withCtx(() => [
              renderSlot(_ctx.$slots, "blog-tags-before", {}, void 0, true)
            ]),
            "blog-tags-after": withCtx(() => [
              renderSlot(_ctx.$slots, "blog-tags-after", {}, void 0, true)
            ]),
            "blog-tags-title-after": withCtx(() => [
              renderSlot(_ctx.$slots, "blog-tags-title-after", {}, void 0, true)
            ]),
            "blog-tags-content-before": withCtx(() => [
              renderSlot(_ctx.$slots, "blog-tags-content-before", {}, void 0, true)
            ]),
            _: 3
          })) : $setup.page.type === "blog-categories" ? (openBlock(), createBlock($setup["VPBlogCategories"], { key: 2 }, {
            "blog-categories-before": withCtx(() => [
              renderSlot(_ctx.$slots, "blog-categories-before", {}, void 0, true)
            ]),
            "blog-categories-after": withCtx(() => [
              renderSlot(_ctx.$slots, "blog-categories-after", {}, void 0, true)
            ]),
            "blog-categories-content-before": withCtx(() => [
              renderSlot(_ctx.$slots, "blog-categories-content-before", {}, void 0, true)
            ]),
            _: 3
          })) : (openBlock(), createBlock($setup["VPPostList"], {
            key: 3,
            "home-blog": $props.homeBlog
          }, {
            "blog-post-list-before": withCtx(() => [
              renderSlot(_ctx.$slots, "blog-post-list-before", {}, void 0, true)
            ]),
            "blog-post-list-after": withCtx(() => [
              renderSlot(_ctx.$slots, "blog-post-list-after", {}, void 0, true)
            ]),
            "blog-post-list-pagination-after": withCtx(() => [
              renderSlot(_ctx.$slots, "blog-post-list-pagination-after", {}, void 0, true)
            ]),
            _: 3
          }, 8, ["home-blog"]))
        ];
      }
    }),
    _: 3
  }, _parent));
  _push(ssrRenderComponent($setup["VPBlogAside"], null, {
    "blog-aside-top": withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        ssrRenderSlot(_ctx.$slots, "blog-aside-top", {}, null, _push2, _parent2, _scopeId);
      } else {
        return [
          renderSlot(_ctx.$slots, "blog-aside-top", {}, void 0, true)
        ];
      }
    }),
    "blog-aside-bottom": withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        ssrRenderSlot(_ctx.$slots, "blog-aside-bottom", {}, null, _push2, _parent2, _scopeId);
      } else {
        return [
          renderSlot(_ctx.$slots, "blog-aside-bottom", {}, void 0, true)
        ];
      }
    }),
    _: 3
  }, _parent));
  _push(ssrRenderComponent($setup["VPBlogExtract"], null, {
    "blog-extract-before": withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        ssrRenderSlot(_ctx.$slots, "blog-extract-before", {}, null, _push2, _parent2, _scopeId);
      } else {
        return [
          renderSlot(_ctx.$slots, "blog-extract-before", {}, void 0, true)
        ];
      }
    }),
    "blog-extract-after": withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        ssrRenderSlot(_ctx.$slots, "blog-extract-after", {}, null, _push2, _parent2, _scopeId);
      } else {
        return [
          renderSlot(_ctx.$slots, "blog-extract-after", {}, void 0, true)
        ];
      }
    }),
    _: 3
  }, _parent));
  _push(`</div>`);
  ssrRenderSlot(_ctx.$slots, "blog-bottom", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup$x = _sfc_main$x.setup;
_sfc_main$x.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/Blog/VPBlog.vue");
  return _sfc_setup$x ? _sfc_setup$x(props, ctx) : void 0;
};
const VPBlog = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["ssrRender", _sfc_ssrRender$x], ["__scopeId", "data-v-852cc790"], ["__file", "VPBlog.vue"]]);
const _sfc_main$w = /* @__PURE__ */ defineComponent({
  __name: "VPButton",
  props: {
    tag: { default: void 0 },
    size: { default: "medium" },
    theme: { default: "brand" },
    text: {},
    href: { default: void 0 },
    target: { default: void 0 },
    rel: { default: void 0 }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const router = useRouter();
    const component = computed(() => {
      return props.tag || props.href ? "a" : "button";
    });
    const { link, isExternal } = useLink(toRef(props, "href"), toRef(props, "target"));
    function linkTo(e) {
      var _a;
      if (!isExternal.value && ((_a = link.value) == null ? void 0 : _a[0]) !== "#") {
        e.preventDefault();
        if (link.value)
          router.push(link.value);
      }
    }
    const __returned__ = { props, router, component, link, isExternal, linkTo, get withBase() {
      return withBase;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$w(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  var _a;
  ssrRenderVNode(_push, createVNode(resolveDynamicComponent($setup.component), mergeProps({
    class: ["vp-button", [$props.size, $props.theme]],
    href: ((_a = $setup.link) == null ? void 0 : _a[0]) === "#" ? $setup.link : $setup.withBase($setup.link || ""),
    target: $props.target ?? ($setup.isExternal ? "_blank" : void 0),
    rel: $props.rel ?? ($setup.isExternal ? "noreferrer" : void 0),
    onClick: ($event) => $setup.linkTo($event)
  }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`${ssrInterpolate($props.text)}`);
      } else {
        return [
          createTextVNode(toDisplayString($props.text), 1)
        ];
      }
    }),
    _: 1
  }), _parent);
}
const _sfc_setup$w = _sfc_main$w.setup;
_sfc_main$w.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/VPButton.vue");
  return _sfc_setup$w ? _sfc_setup$w(props, ctx) : void 0;
};
const VPButton = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["ssrRender", _sfc_ssrRender$w], ["__scopeId", "data-v-ecf1ae32"], ["__file", "VPButton.vue"]]);
const DEFAULT_BANNER = "https://api.pengzhanbo.cn/wallpaper/bing";
const _sfc_main$v = /* @__PURE__ */ defineComponent({
  __name: "VPHomeBanner",
  props: {
    type: {},
    banner: {},
    bannerMask: {},
    hero: {},
    onlyOnce: { type: Boolean },
    full: { type: Boolean }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const { isDark, frontmatter: matter } = useData();
    const mask = computed(() => {
      const mask2 = props.bannerMask ?? matter.value.bannerMask;
      if (typeof mask2 !== "object")
        return mask2 || 0;
      return (isDark.value ? mask2.dark : mask2.light) || 0;
    });
    const bannerStyle = computed(() => {
      const banner = props.banner ?? matter.value.banner;
      const link = banner ? isLinkHttp(banner) ? banner : withBase(banner) : DEFAULT_BANNER;
      return {
        "background-image": `url(${link})`
      };
    });
    const name = computed(() => {
      var _a, _b;
      return ((_a = props.hero) == null ? void 0 : _a.name) ?? ((_b = matter.value.hero) == null ? void 0 : _b.name) ?? "Plume";
    });
    const tagline = computed(() => {
      var _a, _b;
      return ((_a = props.hero) == null ? void 0 : _a.tagline) ?? ((_b = matter.value.hero) == null ? void 0 : _b.tagline) ?? "A VuePress Theme";
    });
    const text = computed(() => {
      var _a, _b;
      return ((_a = props.hero) == null ? void 0 : _a.text) ?? ((_b = matter.value.hero) == null ? void 0 : _b.text);
    });
    const actions = computed(() => {
      var _a, _b;
      return ((_a = props.hero) == null ? void 0 : _a.actions) ?? ((_b = matter.value.hero) == null ? void 0 : _b.actions) ?? [];
    });
    const __returned__ = { props, DEFAULT_BANNER, isDark, matter, mask, bannerStyle, name, tagline, text, actions, VPButton };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$v(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: "vp-home-banner",
    style: $setup.bannerStyle
  }, _attrs))} data-v-5c0eb200><div class="banner-mask" style="${ssrRenderStyle({ opacity: $setup.mask })}" data-v-5c0eb200></div><div class="container" data-v-5c0eb200><div class="content" data-v-5c0eb200>`);
  if ($setup.name) {
    _push(`<h2 class="hero-name" data-v-5c0eb200>${ssrInterpolate($setup.name)}</h2>`);
  } else {
    _push(`<!---->`);
  }
  if ($setup.tagline) {
    _push(`<p class="hero-tagline" data-v-5c0eb200><span class="line" data-v-5c0eb200></span> <span data-v-5c0eb200>${ssrInterpolate($setup.tagline)}</span></p>`);
  } else {
    _push(`<!---->`);
  }
  if ($setup.text) {
    _push(`<p class="hero-text" data-v-5c0eb200>${ssrInterpolate($setup.text)}</p>`);
  } else {
    _push(`<!---->`);
  }
  if ($setup.actions.length) {
    _push(`<div class="actions" data-v-5c0eb200><!--[-->`);
    ssrRenderList($setup.actions, (action) => {
      _push(`<div class="action" data-v-5c0eb200>`);
      _push(ssrRenderComponent($setup["VPButton"], {
        tag: "a",
        size: "medium",
        theme: action.theme,
        text: action.text,
        href: action.link
      }, null, _parent));
      _push(`</div>`);
    });
    _push(`<!--]--></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div></div>`);
}
const _sfc_setup$v = _sfc_main$v.setup;
_sfc_main$v.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/Home/VPHomeBanner.vue");
  return _sfc_setup$v ? _sfc_setup$v(props, ctx) : void 0;
};
const VPHomeBanner = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["ssrRender", _sfc_ssrRender$v], ["__scopeId", "data-v-5c0eb200"], ["__file", "VPHomeBanner.vue"]]);
const _sfc_main$u = /* @__PURE__ */ defineComponent({
  __name: "VPHomeCustom",
  props: {
    type: {},
    full: { type: Boolean },
    backgroundImage: {},
    backgroundAttachment: {},
    onlyOnce: { type: Boolean }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const __returned__ = { props, VPHomeBox, get Content() {
      return Content$1;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$u(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(ssrRenderComponent($setup["VPHomeBox"], mergeProps({ class: "vp-home-custom" }, $setup.props, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent($setup["Content"], {
          class: "vp-doc",
          "vp-content": ""
        }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode($setup["Content"], {
            class: "vp-doc",
            "vp-content": ""
          })
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$u = _sfc_main$u.setup;
_sfc_main$u.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/Home/VPHomeCustom.vue");
  return _sfc_setup$u ? _sfc_setup$u(props, ctx) : void 0;
};
const VPHomeCustom = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["ssrRender", _sfc_ssrRender$u], ["__file", "VPHomeCustom.vue"]]);
const _sfc_main$t = /* @__PURE__ */ defineComponent({
  __name: "VPHomeFeature",
  props: {
    icon: {},
    title: {},
    details: {},
    link: {},
    linkText: {},
    rel: {},
    target: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const ICONIFY_NAME = /^[\w-]+:[\w-]+$/;
    const isIconify = computed(() => {
      if (typeof props.icon !== "string" || isLinkAbsolute(props.icon) || isLinkHttp(props.icon)) {
        return false;
      }
      return ICONIFY_NAME.test(props.icon);
    });
    const __returned__ = { props, ICONIFY_NAME, isIconify, VPIcon, VPImage, VPLink };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$t(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(ssrRenderComponent($setup["VPLink"], mergeProps({
    class: "vp-home-feature",
    href: $props.link,
    rel: $props.rel,
    target: $props.target,
    "no-icon": true,
    tag: $props.link ? "a" : "div"
  }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<article class="box" data-v-7c0d0c79${_scopeId}>`);
        if (typeof $props.icon === "object" && $props.icon.wrap) {
          _push2(`<div class="icon" data-v-7c0d0c79${_scopeId}>`);
          _push2(ssrRenderComponent($setup["VPImage"], {
            image: $props.icon,
            alt: $props.icon.alt,
            height: $props.icon.height || 48,
            width: $props.icon.width || 48
          }, null, _parent2, _scopeId));
          _push2(`</div>`);
        } else if (typeof $props.icon === "object") {
          _push2(ssrRenderComponent($setup["VPImage"], {
            image: $props.icon,
            alt: $props.icon.alt,
            height: $props.icon.height || 48,
            width: $props.icon.width || 48
          }, null, _parent2, _scopeId));
        } else if ($props.icon && $setup.isIconify) {
          _push2(`<div class="icon" data-v-7c0d0c79${_scopeId}>`);
          _push2(ssrRenderComponent($setup["VPIcon"], { name: $props.icon }, null, _parent2, _scopeId));
          _push2(`</div>`);
        } else if ($props.icon) {
          _push2(`<div class="icon" data-v-7c0d0c79${_scopeId}>${$props.icon ?? ""}</div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`<h2 class="title" data-v-7c0d0c79${_scopeId}>${$props.title ?? ""}</h2>`);
        if ($props.details) {
          _push2(`<p class="details" data-v-7c0d0c79${_scopeId}>${$props.details ?? ""}</p>`);
        } else {
          _push2(`<!---->`);
        }
        if ($props.linkText) {
          _push2(`<div class="link-text" data-v-7c0d0c79${_scopeId}><p class="link-text-value" data-v-7c0d0c79${_scopeId}>${ssrInterpolate($props.linkText)} <span class="vpi-arrow-right link-text-icon" data-v-7c0d0c79${_scopeId}></span></p></div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`</article>`);
      } else {
        return [
          createVNode("article", { class: "box" }, [
            typeof $props.icon === "object" && $props.icon.wrap ? (openBlock(), createBlock("div", {
              key: 0,
              class: "icon"
            }, [
              createVNode($setup["VPImage"], {
                image: $props.icon,
                alt: $props.icon.alt,
                height: $props.icon.height || 48,
                width: $props.icon.width || 48
              }, null, 8, ["image", "alt", "height", "width"])
            ])) : typeof $props.icon === "object" ? (openBlock(), createBlock($setup["VPImage"], {
              key: 1,
              image: $props.icon,
              alt: $props.icon.alt,
              height: $props.icon.height || 48,
              width: $props.icon.width || 48
            }, null, 8, ["image", "alt", "height", "width"])) : $props.icon && $setup.isIconify ? (openBlock(), createBlock("div", {
              key: 2,
              class: "icon"
            }, [
              createVNode($setup["VPIcon"], { name: $props.icon }, null, 8, ["name"])
            ])) : $props.icon ? (openBlock(), createBlock("div", {
              key: 3,
              class: "icon",
              innerHTML: $props.icon
            }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
            createVNode("h2", {
              class: "title",
              innerHTML: $props.title
            }, null, 8, ["innerHTML"]),
            $props.details ? (openBlock(), createBlock("p", {
              key: 4,
              class: "details",
              innerHTML: $props.details
            }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
            $props.linkText ? (openBlock(), createBlock("div", {
              key: 5,
              class: "link-text"
            }, [
              createVNode("p", { class: "link-text-value" }, [
                createTextVNode(toDisplayString($props.linkText) + " ", 1),
                createVNode("span", { class: "vpi-arrow-right link-text-icon" })
              ])
            ])) : createCommentVNode("", true)
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$t = _sfc_main$t.setup;
_sfc_main$t.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/Home/VPHomeFeature.vue");
  return _sfc_setup$t ? _sfc_setup$t(props, ctx) : void 0;
};
const VPHomeFeature = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["ssrRender", _sfc_ssrRender$t], ["__scopeId", "data-v-7c0d0c79"], ["__file", "VPHomeFeature.vue"]]);
const _sfc_main$s = /* @__PURE__ */ defineComponent({
  __name: "VPHomeFeatures",
  props: {
    type: {},
    title: {},
    description: {},
    features: {},
    full: { type: Boolean },
    backgroundImage: {},
    backgroundAttachment: {},
    onlyOnce: { type: Boolean }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const grid = computed(() => {
      var _a;
      const length = (_a = props.features) == null ? void 0 : _a.length;
      if (!length)
        return void 0;
      else if (length === 2)
        return "grid-2";
      else if (length === 3)
        return "grid-3";
      else if (length % 3 === 0)
        return "grid-6";
      else if (length > 3)
        return "grid-4";
      return void 0;
    });
    const __returned__ = { props, grid, VPHomeBox, VPHomeFeature };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$s(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if ($props.features) {
    _push(ssrRenderComponent($setup["VPHomeBox"], mergeProps({
      class: "vp-home-features",
      type: $props.type,
      "background-image": $props.backgroundImage,
      "background-attachment": $props.backgroundAttachment,
      full: $props.full
    }, _attrs), {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          if ($props.title) {
            _push2(`<h2 class="title" data-v-61208016${_scopeId}>${$props.title ?? ""}</h2>`);
          } else {
            _push2(`<!---->`);
          }
          if ($props.description) {
            _push2(`<p class="description" data-v-61208016${_scopeId}>${$props.description ?? ""}</p>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<div class="items" data-v-61208016${_scopeId}><!--[-->`);
          ssrRenderList($props.features, (feature) => {
            _push2(`<div class="${ssrRenderClass([[$setup.grid], "item"])}" data-v-61208016${_scopeId}>`);
            _push2(ssrRenderComponent($setup["VPHomeFeature"], {
              icon: feature.icon,
              title: feature.title,
              details: feature.details,
              link: feature.link,
              "link-text": feature.linkText,
              rel: feature.rel,
              target: feature.target
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          });
          _push2(`<!--]--></div>`);
        } else {
          return [
            $props.title ? (openBlock(), createBlock("h2", {
              key: 0,
              class: "title",
              innerHTML: $props.title
            }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
            $props.description ? (openBlock(), createBlock("p", {
              key: 1,
              class: "description",
              innerHTML: $props.description
            }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
            createVNode("div", { class: "items" }, [
              (openBlock(true), createBlock(Fragment, null, renderList($props.features, (feature) => {
                return openBlock(), createBlock("div", {
                  key: feature.title,
                  class: ["item", [$setup.grid]]
                }, [
                  createVNode($setup["VPHomeFeature"], {
                    icon: feature.icon,
                    title: feature.title,
                    details: feature.details,
                    link: feature.link,
                    "link-text": feature.linkText,
                    rel: feature.rel,
                    target: feature.target
                  }, null, 8, ["icon", "title", "details", "link", "link-text", "rel", "target"])
                ], 2);
              }), 128))
            ])
          ];
        }
      }),
      _: 1
    }, _parent));
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup$s = _sfc_main$s.setup;
_sfc_main$s.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/Home/VPHomeFeatures.vue");
  return _sfc_setup$s ? _sfc_setup$s(props, ctx) : void 0;
};
const VPHomeFeatures = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["ssrRender", _sfc_ssrRender$s], ["__scopeId", "data-v-61208016"], ["__file", "VPHomeFeatures.vue"]]);
const _sfc_main$r = /* @__PURE__ */ defineComponent({
  __name: "VPHomeHero",
  props: {
    type: {},
    hero: {},
    full: { type: Boolean },
    background: {},
    tintPlate: {},
    filter: {},
    backgroundImage: {},
    backgroundAttachment: {},
    onlyOnce: { type: Boolean }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const { isDark, frontmatter: matter } = useData();
    const heroBackground = computed(() => {
      if (props.background === "tint-plate")
        return null;
      const image = props.backgroundImage ? typeof props.backgroundImage === "string" ? props.backgroundImage : props.backgroundImage[isDark.value ? "dark" : "light"] ?? props.backgroundImage.light : "";
      const background = image || props.background;
      if (!background)
        return null;
      const link = isLinkHttp(background) ? background : withBase(background);
      return {
        "background-image": `url(${link})`,
        "background-attachment": props.backgroundAttachment || "",
        "--vp-hero-bg-filter": props.filter
      };
    });
    const hero = computed(() => props.hero ?? matter.value.hero ?? {});
    const actions = computed(() => hero.value.actions ?? []);
    const canvas = ref();
    useHomeHeroTintPlate(
      canvas,
      computed(() => props.background === "tint-plate"),
      computed(() => props.tintPlate)
    );
    const __returned__ = { props, isDark, matter, heroBackground, hero, actions, canvas, VPButton };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$r(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: ["vp-home-hero", { full: $setup.props.full, once: $setup.props.onlyOnce }]
  }, _attrs))} data-v-4cee6bed>`);
  if ($setup.heroBackground) {
    _push(`<div class="home-hero-bg" style="${ssrRenderStyle($setup.heroBackground)}" data-v-4cee6bed></div>`);
  } else {
    _push(`<!---->`);
  }
  if ($props.background === "tint-plate") {
    _push(`<div class="bg-filter" data-v-4cee6bed><canvas width="32" height="32" data-v-4cee6bed></canvas></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="container" data-v-4cee6bed><div class="content" data-v-4cee6bed>`);
  if ($setup.hero.name) {
    _push(`<h1 class="hero-name" data-v-4cee6bed>${$setup.hero.name ?? ""}</h1>`);
  } else {
    _push(`<!---->`);
  }
  if ($setup.hero.tagline) {
    _push(`<p class="hero-tagline" data-v-4cee6bed>${$setup.hero.tagline ?? ""}</p>`);
  } else {
    _push(`<!---->`);
  }
  if ($setup.hero.text) {
    _push(`<p class="hero-text" data-v-4cee6bed>${$setup.hero.text ?? ""}</p>`);
  } else {
    _push(`<!---->`);
  }
  if ($setup.actions.length) {
    _push(`<div class="actions" data-v-4cee6bed><div class="action" data-v-4cee6bed><!--[-->`);
    ssrRenderList($setup.actions, (action) => {
      _push(ssrRenderComponent($setup["VPButton"], {
        key: action.link,
        tag: "a",
        size: "medium",
        theme: action.theme,
        text: action.text,
        href: action.link,
        target: action.target,
        rel: action.rel
      }, null, _parent));
    });
    _push(`<!--]--></div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div></div>`);
}
const _sfc_setup$r = _sfc_main$r.setup;
_sfc_main$r.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/Home/VPHomeHero.vue");
  return _sfc_setup$r ? _sfc_setup$r(props, ctx) : void 0;
};
const VPHomeHero = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["ssrRender", _sfc_ssrRender$r], ["__scopeId", "data-v-4cee6bed"], ["__file", "VPHomeHero.vue"]]);
const _sfc_main$q = /* @__PURE__ */ defineComponent({
  __name: "VPHomeProfile",
  props: {
    type: {},
    name: {},
    description: {},
    avatar: {},
    circle: { type: Boolean },
    full: { type: Boolean },
    backgroundImage: {},
    backgroundAttachment: {},
    onlyOnce: { type: Boolean }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const { theme } = useData();
    const rawProfile = computed(() => theme.value.profile);
    const profile = computed(() => {
      var _a, _b, _c, _d, _e;
      return {
        name: props.name || ((_a = rawProfile.value) == null ? void 0 : _a.name),
        description: props.description || ((_b = rawProfile.value) == null ? void 0 : _b.description),
        avatar: props.avatar || ((_c = rawProfile.value) == null ? void 0 : _c.avatar) || ((_d = rawProfile.value) == null ? void 0 : _d.url),
        circle: props.circle || ((_e = rawProfile.value) == null ? void 0 : _e.circle)
      };
    });
    const __returned__ = { props, theme, rawProfile, profile, VPHomeBox, VPImage };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$q(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(ssrRenderComponent($setup["VPHomeBox"], mergeProps({
    class: "vp-home-profile",
    type: $props.type,
    "background-image": $props.backgroundImage,
    "background-attachment": $props.backgroundAttachment,
    full: $props.full
  }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        if ($setup.profile.avatar) {
          _push2(ssrRenderComponent($setup["VPImage"], {
            image: $setup.profile.avatar,
            class: { circle: $setup.profile.circle }
          }, null, _parent2, _scopeId));
        } else {
          _push2(`<!---->`);
        }
        if ($setup.profile.name) {
          _push2(`<h3 data-v-4e5d4cad${_scopeId}>${$setup.profile.name ?? ""}</h3>`);
        } else {
          _push2(`<!---->`);
        }
        if ($setup.profile.description) {
          _push2(`<p data-v-4e5d4cad${_scopeId}>${$setup.profile.description ?? ""}</p>`);
        } else {
          _push2(`<!---->`);
        }
      } else {
        return [
          $setup.profile.avatar ? (openBlock(), createBlock($setup["VPImage"], {
            key: 0,
            image: $setup.profile.avatar,
            class: { circle: $setup.profile.circle }
          }, null, 8, ["image", "class"])) : createCommentVNode("", true),
          $setup.profile.name ? (openBlock(), createBlock("h3", {
            key: 1,
            innerHTML: $setup.profile.name
          }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
          $setup.profile.description ? (openBlock(), createBlock("p", {
            key: 2,
            innerHTML: $setup.profile.description
          }, null, 8, ["innerHTML"])) : createCommentVNode("", true)
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$q = _sfc_main$q.setup;
_sfc_main$q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/Home/VPHomeProfile.vue");
  return _sfc_setup$q ? _sfc_setup$q(props, ctx) : void 0;
};
const VPHomeProfile = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["ssrRender", _sfc_ssrRender$q], ["__scopeId", "data-v-4e5d4cad"], ["__file", "VPHomeProfile.vue"]]);
const _sfc_main$p = /* @__PURE__ */ defineComponent({
  __name: "VPHomeTextImage",
  props: {
    type: {},
    image: {},
    width: {},
    title: {},
    description: {},
    list: {},
    full: { type: Boolean },
    backgroundImage: {},
    backgroundAttachment: {},
    onlyOnce: { type: Boolean }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const maxWidth = computed(() => {
      const width = props.width;
      if (typeof width === "number")
        return `${width}px`;
      return width;
    });
    const __returned__ = { props, maxWidth, VPHomeBox, VPImage };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$p(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(ssrRenderComponent($setup["VPHomeBox"], mergeProps({
    class: "vp-home-text-image",
    type: $props.type,
    "background-image": $props.backgroundImage,
    "background-attachment": $props.backgroundAttachment,
    full: $props.full,
    "container-class": { reverse: $props.type === "text-image" }
  }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="content-image" data-v-d8a6e097${_scopeId}>`);
        _push2(ssrRenderComponent($setup["VPImage"], {
          image: $props.image,
          style: { maxWidth: $setup.maxWidth }
        }, null, _parent2, _scopeId));
        _push2(`</div><div class="content-text vp-doc" data-v-d8a6e097${_scopeId}><section data-v-d8a6e097${_scopeId}>`);
        if ($props.title) {
          _push2(`<h2 class="title" data-v-d8a6e097${_scopeId}>${ssrInterpolate($props.title)}</h2>`);
        } else {
          _push2(`<!---->`);
        }
        if ($props.description) {
          _push2(`<p class="description" data-v-d8a6e097${_scopeId}>${$props.description ?? ""}</p>`);
        } else {
          _push2(`<!---->`);
        }
        if ($props.list && $props.list.length) {
          _push2(`<ul class="list" data-v-d8a6e097${_scopeId}><!--[-->`);
          ssrRenderList($props.list, (item, index) => {
            _push2(`<li data-v-d8a6e097${_scopeId}>`);
            if (typeof item === "object") {
              _push2(`<!--[-->`);
              if (item.title) {
                _push2(`<h3 data-v-d8a6e097${_scopeId}>${item.title ?? ""}</h3>`);
              } else {
                _push2(`<!---->`);
              }
              if (item.description) {
                _push2(`<p data-v-d8a6e097${_scopeId}>${item.description ?? ""}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--]-->`);
            } else {
              _push2(`<p data-v-d8a6e097${_scopeId}>${item ?? ""}</p>`);
            }
            _push2(`</li>`);
          });
          _push2(`<!--]--></ul>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`</section></div>`);
      } else {
        return [
          createVNode("div", { class: "content-image" }, [
            createVNode($setup["VPImage"], {
              image: $props.image,
              style: { maxWidth: $setup.maxWidth }
            }, null, 8, ["image", "style"])
          ]),
          createVNode("div", { class: "content-text vp-doc" }, [
            createVNode("section", null, [
              $props.title ? (openBlock(), createBlock("h2", {
                key: 0,
                class: "title"
              }, toDisplayString($props.title), 1)) : createCommentVNode("", true),
              $props.description ? (openBlock(), createBlock("p", {
                key: 1,
                class: "description",
                innerHTML: $props.description
              }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
              $props.list && $props.list.length ? (openBlock(), createBlock("ul", {
                key: 2,
                class: "list"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList($props.list, (item, index) => {
                  return openBlock(), createBlock("li", { key: index }, [
                    typeof item === "object" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                      item.title ? (openBlock(), createBlock("h3", {
                        key: 0,
                        innerHTML: item.title
                      }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
                      item.description ? (openBlock(), createBlock("p", {
                        key: 1,
                        innerHTML: item.description
                      }, null, 8, ["innerHTML"])) : createCommentVNode("", true)
                    ], 64)) : (openBlock(), createBlock("p", {
                      key: 1,
                      innerHTML: item
                    }, null, 8, ["innerHTML"]))
                  ]);
                }), 128))
              ])) : createCommentVNode("", true)
            ])
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$p = _sfc_main$p.setup;
_sfc_main$p.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/Home/VPHomeTextImage.vue");
  return _sfc_setup$p ? _sfc_setup$p(props, ctx) : void 0;
};
const VPHomeTextImage = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["ssrRender", _sfc_ssrRender$p], ["__scopeId", "data-v-d8a6e097"], ["__file", "VPHomeTextImage.vue"]]);
const _sfc_main$o = /* @__PURE__ */ defineComponent({
  __name: "VPHome",
  setup(__props, { expose: __expose }) {
    __expose();
    const slots = useSlots();
    function VPHomeBlog() {
      return h(VPBlog, { homeBlog: true }, {
        "blog-top": () => {
          var _a;
          return (_a = slots["blog-top"]) == null ? void 0 : _a.call(slots);
        },
        "blog-bottom": () => {
          var _a;
          return (_a = slots["blog-bottom"]) == null ? void 0 : _a.call(slots);
        },
        "blog-post-list-before": () => {
          var _a;
          return (_a = slots["blog-post-list-before"]) == null ? void 0 : _a.call(slots);
        },
        "blog-post-list-after": () => {
          var _a;
          return (_a = slots["blog-post-list-after"]) == null ? void 0 : _a.call(slots);
        },
        "blog-post-list-pagination-after": () => {
          var _a;
          return (_a = slots["blog-post-list-pagination-after"]) == null ? void 0 : _a.call(slots);
        }
      });
    }
    const components = {
      "banner": VPHomeBanner,
      "hero": VPHomeHero,
      "features": VPHomeFeatures,
      "text-image": VPHomeTextImage,
      "image-text": VPHomeTextImage,
      "profile": VPHomeProfile,
      "blog": VPHomeBlog,
      "custom": VPHomeCustom
    };
    const DEFAULT_HERO = {
      name: "Theme Plume",
      tagline: "VuePress Next Theme",
      text: "一个简约的，功能丰富的 vuepress 文档&博客 主题"
    };
    const { frontmatter: matter } = useData();
    const config2 = computed(() => {
      const config22 = matter.value.config;
      if (config22 && config22.length)
        return config22;
      if (matter.value.banner) {
        return [{
          type: "banner",
          banner: matter.value.banner,
          bannerMask: matter.value.bannerMask,
          hero: matter.value.hero ?? DEFAULT_HERO
        }];
      }
      return [{
        type: "hero",
        full: true,
        background: "tint-plate",
        hero: matter.value.hero ?? DEFAULT_HERO
      }];
    });
    const onlyOnce = computed(() => config2.value.length === 1);
    function resolveComponentName(type) {
      return components[type] ?? resolveComponent(type);
    }
    let el = null;
    watch(() => onlyOnce.value, (value) => nextTick(() => {
      if (typeof document !== "undefined") {
        el ?? (el = document.querySelector(".vp-layout"));
        el == null ? void 0 : el.classList.toggle("footer-no-border", value);
      }
    }), { immediate: true });
    onUnmounted(() => {
      el == null ? void 0 : el.classList.remove("footer-no-border");
    });
    const __returned__ = { slots, VPHomeBlog, components, DEFAULT_HERO, matter, config: config2, onlyOnce, resolveComponentName, get el() {
      return el;
    }, set el(v) {
      el = v;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$o(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "vp-home" }, _attrs))} data-v-2e9757d2><!--[-->`);
  ssrRenderList($setup.config, (item, index) => {
    _push(`<div class="${ssrRenderClass({ layout: index > 0 && item.type !== "features" && item.type !== "custom" })}" data-v-2e9757d2>`);
    ssrRenderVNode(_push, createVNode(resolveDynamicComponent($setup.resolveComponentName(item.type)), mergeProps({ ref_for: true }, item, { "only-once": $setup.onlyOnce }), null), _parent);
    _push(`</div>`);
  });
  _push(`<!--]--></div>`);
}
const _sfc_setup$o = _sfc_main$o.setup;
_sfc_main$o.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/Home/VPHome.vue");
  return _sfc_setup$o ? _sfc_setup$o(props, ctx) : void 0;
};
const VPHome = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["ssrRender", _sfc_ssrRender$o], ["__scopeId", "data-v-2e9757d2"], ["__file", "VPHome.vue"]]);
const _sfc_main$n = /* @__PURE__ */ defineComponent({
  __name: "VPDocOutlineItem",
  props: {
    headers: {},
    root: { type: Boolean }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    function handleClick({ target: el }) {
      const id = `#${el.href.split("#")[1]}`;
      const heading = document.querySelector(
        decodeURIComponent(id)
      );
      heading == null ? void 0 : heading.focus({ preventScroll: true });
    }
    const __returned__ = { handleClick };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$n(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_VPDocOutlineItem = resolveComponent("VPDocOutlineItem", true);
  _push(`<ul${ssrRenderAttrs(mergeProps({
    class: $props.root ? "root" : "nested"
  }, _attrs))} data-v-59c1e848><!--[-->`);
  ssrRenderList($props.headers, ({ children, link, title }) => {
    _push(`<li data-v-59c1e848><a class="outline-link"${ssrRenderAttr("href", link)} data-v-59c1e848>${ssrInterpolate(title)}</a>`);
    if (children == null ? void 0 : children.length) {
      _push(ssrRenderComponent(_component_VPDocOutlineItem, { headers: children }, null, _parent));
    } else {
      _push(`<!---->`);
    }
    _push(`</li>`);
  });
  _push(`<!--]--></ul>`);
}
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/VPDocOutlineItem.vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};
const VPDocOutlineItem = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["ssrRender", _sfc_ssrRender$n], ["__scopeId", "data-v-59c1e848"], ["__file", "VPDocOutlineItem.vue"]]);
const _sfc_main$m = /* @__PURE__ */ defineComponent({
  __name: "VPDocAsideOutline",
  setup(__props, { expose: __expose }) {
    __expose();
    const { theme } = useData();
    const headers = useHeaders();
    const hasOutline = computed(() => headers.value.length > 0);
    const container = ref();
    const marker = ref();
    useActiveAnchor(container, marker);
    function handlePrint() {
      window.print();
    }
    const __returned__ = { theme, headers, hasOutline, container, marker, handlePrint, VPDocOutlineItem };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$m(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<nav${ssrRenderAttrs(mergeProps({
    ref: "container",
    "aria-labelledby": "doc-outline-aria-label",
    class: ["vp-doc-aside-outline", { "has-outline": $setup.hasOutline }],
    role: "navigation"
  }, _attrs))} data-v-bad181dd><div class="content" data-v-bad181dd><div class="outline-marker" data-v-bad181dd></div><div id="doc-outline-aria-label" aria-level="2" class="outline-title" role="heading" data-v-bad181dd><span data-v-bad181dd>${ssrInterpolate($setup.theme.outlineLabel || "On this page")}</span><span class="vpi-print icon" data-v-bad181dd></span></div>`);
  _push(ssrRenderComponent($setup["VPDocOutlineItem"], {
    headers: $setup.headers,
    root: true
  }, null, _parent));
  _push(`</div></nav>`);
}
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/VPDocAsideOutline.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
const VPDocAsideOutline = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["ssrRender", _sfc_ssrRender$m], ["__scopeId", "data-v-bad181dd"], ["__file", "VPDocAsideOutline.vue"]]);
const _sfc_main$l = /* @__PURE__ */ defineComponent({
  __name: "VPDocAside",
  setup(__props, { expose: __expose }) {
    __expose();
    const __returned__ = { VPDocAsideOutline };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$l(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "vp-doc-aside" }, _attrs))} data-v-7b1983db>`);
  ssrRenderSlot(_ctx.$slots, "aside-top", {}, null, _push, _parent);
  ssrRenderSlot(_ctx.$slots, "aside-outline-before", {}, null, _push, _parent);
  _push(ssrRenderComponent($setup["VPDocAsideOutline"], null, null, _parent));
  ssrRenderSlot(_ctx.$slots, "aside-outline-after", {}, null, _push, _parent);
  _push(`<div class="spacer" data-v-7b1983db></div>`);
  ssrRenderSlot(_ctx.$slots, "aside-bottom", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/VPDocAside.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
const VPDocAside = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["ssrRender", _sfc_ssrRender$l], ["__scopeId", "data-v-7b1983db"], ["__file", "VPDocAside.vue"]]);
const _sfc_main$k = /* @__PURE__ */ defineComponent({
  __name: "VPDocBreadcrumbs",
  setup(__props, { expose: __expose }) {
    __expose();
    const { page } = useData();
    const { isBlogPost } = useBlogPageData();
    const { home, blog, categories } = useInternalLink();
    const sidebar2 = useSidebarData();
    const hasBreadcrumb = computed(() => {
      if (isBlogPost.value && page.value.categoryList)
        return page.value.categoryList.length > 0;
      return sidebar2.value.length > 0;
    });
    const breadcrumbList = computed(() => {
      if (!hasBreadcrumb.value)
        return [];
      const list = [{ text: home.value.text, link: home.value.link }];
      if (isBlogPost.value) {
        list.push({ text: blog.value.text, link: blog.value.link });
        const categoryList = page.value.categoryList ?? [];
        for (const category of categoryList) {
          list.push({
            text: category.name,
            link: categories.value ? `${categories.value.link}?id=${category.id}` : void 0
          });
        }
      } else if (sidebar2.value.length > 0) {
        list.push(...resolveSidebar(sidebar2.value) || []);
      }
      list.push({ text: page.value.title, link: page.value.path, current: true });
      return list;
    });
    function resolveSidebar(sidebar22, result = []) {
      for (const item of sidebar22) {
        if (item.link === page.value.path) {
          return result;
        } else if (item.items) {
          const res = resolveSidebar(
            item.items,
            [...result, { text: item.text, link: item.link }]
          );
          if (res)
            return res;
        }
      }
      return null;
    }
    const __returned__ = { page, isBlogPost, home, blog, categories, sidebar: sidebar2, hasBreadcrumb, breadcrumbList, resolveSidebar, VPLink };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$k(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if ($setup.hasBreadcrumb) {
    _push(`<nav${ssrRenderAttrs(mergeProps({ class: "vp-breadcrumb" }, _attrs))} data-v-441d9c8c><ol vocab="https://schema.org/" typeof="BreadcrumbList" data-v-441d9c8c><!--[-->`);
    ssrRenderList($setup.breadcrumbList, ({ text, link, current }, index) => {
      _push(`<li property="itemListElement" typeof="ListItem" data-v-441d9c8c>`);
      _push(ssrRenderComponent($setup["VPLink"], {
        href: link,
        class: ["breadcrumb", { current }],
        property: "item",
        typeof: "WebPage"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(text)}`);
          } else {
            return [
              createTextVNode(toDisplayString(text), 1)
            ];
          }
        }),
        _: 2
      }, _parent));
      if (index !== $setup.breadcrumbList.length - 1) {
        _push(`<span class="vpi-chevron-right" data-v-441d9c8c></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<meta property="position"${ssrRenderAttr("content", `${index + 1}`)} data-v-441d9c8c></li>`);
    });
    _push(`<!--]--></ol></nav>`);
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/VPDocBreadcrumbs.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
const VPDocBreadcrumbs = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["ssrRender", _sfc_ssrRender$k], ["__scopeId", "data-v-441d9c8c"], ["__file", "VPDocBreadcrumbs.vue"]]);
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  __name: "VPDocFooter",
  setup(__props, { expose: __expose }) {
    __expose();
    const { theme, frontmatter } = useData();
    const editLink = useEditLink();
    const { datetime: lastUpdated, isoDatetime, lastUpdatedText } = useLastUpdated();
    const contributors = useContributors();
    const { prev, next } = usePrevNext();
    const hasEditLink = computed(
      () => Boolean(theme.value.editLink && frontmatter.value.editLink !== false && editLink.value)
    );
    const hasLastUpdated = computed(
      () => Boolean(theme.value.lastUpdated && frontmatter.value.lastUpdated !== false && lastUpdated.value)
    );
    const hasContributors = computed(() => Boolean(contributors.value.length));
    const showFooter = computed(() => {
      var _a, _b;
      return hasEditLink.value || hasLastUpdated.value || hasContributors.value || ((_a = prev.value) == null ? void 0 : _a.link) || ((_b = next.value) == null ? void 0 : _b.link);
    });
    const __returned__ = { theme, frontmatter, editLink, lastUpdated, isoDatetime, lastUpdatedText, contributors, prev, next, hasEditLink, hasLastUpdated, hasContributors, showFooter, VPLink };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$j(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  var _a, _b, _c, _d, _e;
  if ($setup.showFooter) {
    _push(`<footer${ssrRenderAttrs(mergeProps({ class: "vp-doc-footer" }, _attrs))} data-v-2a87633e>`);
    ssrRenderSlot(_ctx.$slots, "doc-footer-before", {}, null, _push, _parent);
    if ($setup.hasEditLink || $setup.hasLastUpdated) {
      _push(`<div class="edit-info" data-v-2a87633e>`);
      if ($setup.hasEditLink && $setup.editLink) {
        _push(`<div class="edit-link" data-v-2a87633e>`);
        _push(ssrRenderComponent($setup["VPLink"], {
          class: "edit-link-button",
          href: $setup.editLink.link,
          "no-icon": true
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="vpi-square-pen edit-link-icon" aria-label="edit icon" data-v-2a87633e${_scopeId}></span> ${ssrInterpolate($setup.editLink.text)}`);
            } else {
              return [
                createVNode("span", {
                  class: "vpi-square-pen edit-link-icon",
                  "aria-label": "edit icon"
                }),
                createTextVNode(" " + toDisplayString($setup.editLink.text), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if ($setup.hasLastUpdated) {
        _push(`<div class="last-updated" data-v-2a87633e><p class="last-updated-text" data-v-2a87633e>${ssrInterpolate($setup.lastUpdatedText)}: <time${ssrRenderAttr("datetime", $setup.isoDatetime)} class="last-updated-time" data-v-2a87633e>${ssrInterpolate($setup.lastUpdated)}</time></p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    } else {
      _push(`<!---->`);
    }
    if ($setup.hasContributors && ((_a = $setup.contributors) == null ? void 0 : _a.length)) {
      _push(`<div class="contributors" data-v-2a87633e><span class="contributors-label" data-v-2a87633e>${ssrInterpolate($setup.theme.contributorsText || "Contributors")}: </span><span class="contributors-info" data-v-2a87633e><!--[-->`);
      ssrRenderList($setup.contributors, (contributor, index) => {
        _push(`<!--[--><span class="contributor" data-v-2a87633e>${ssrInterpolate(contributor)}</span>`);
        if (index !== $setup.contributors.length - 1) {
          _push(`<!--[-->, <!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></span></div>`);
    } else {
      _push(`<!---->`);
    }
    if (((_b = $setup.prev) == null ? void 0 : _b.link) || ((_c = $setup.next) == null ? void 0 : _c.link)) {
      _push(`<nav class="prev-next" data-v-2a87633e><div class="pager" data-v-2a87633e>`);
      if ((_d = $setup.prev) == null ? void 0 : _d.link) {
        _push(ssrRenderComponent($setup["VPLink"], {
          class: "pager-link prev",
          href: $setup.prev.link
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="desc" data-v-2a87633e${_scopeId}>${($setup.theme.prevPageLabel || "Previous page") ?? ""}</span><span class="title" data-v-2a87633e${_scopeId}>${$setup.prev.text ?? ""}</span>`);
            } else {
              return [
                createVNode("span", {
                  class: "desc",
                  innerHTML: $setup.theme.prevPageLabel || "Previous page"
                }, null, 8, ["innerHTML"]),
                createVNode("span", {
                  class: "title",
                  innerHTML: $setup.prev.text
                }, null, 8, ["innerHTML"])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="pager" data-v-2a87633e>`);
      if ((_e = $setup.next) == null ? void 0 : _e.link) {
        _push(ssrRenderComponent($setup["VPLink"], {
          class: "pager-link next",
          href: $setup.next.link
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="desc" data-v-2a87633e${_scopeId}>${($setup.theme.nextPageLabel || "Next page") ?? ""}</span><span class="title" data-v-2a87633e${_scopeId}>${$setup.next.text ?? ""}</span>`);
            } else {
              return [
                createVNode("span", {
                  class: "desc",
                  innerHTML: $setup.theme.nextPageLabel || "Next page"
                }, null, 8, ["innerHTML"]),
                createVNode("span", {
                  class: "title",
                  innerHTML: $setup.next.text
                }, null, 8, ["innerHTML"])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></nav>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</footer>`);
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/VPDocFooter.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const VPDocFooter = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["ssrRender", _sfc_ssrRender$j], ["__scopeId", "data-v-2a87633e"], ["__file", "VPDocFooter.vue"]]);
const useReadingTimeData = () => {
  const page = usePageData();
  return computed(() => page.value.readingTime ?? null);
};
const getReadingTimeLocale = (readingTime, locale) => {
  const { minutes, words } = readingTime;
  const { less1Minute, word, time } = locale;
  return {
    time: minutes < 1 ? less1Minute : time.replace("$time", Math.round(minutes).toString()),
    words: word.replace("$word", words.toString())
  };
};
var define_READING_TIME_LOCALES_default = { "/en/": { word: "About $word words", less1Minute: "Less than 1 minute", time: "About $time min" }, "/": { word: "약 $word 단어", less1Minute: "1분 미만", time: "약 $time 분" } };
const DEFAULT_LOCALE = { words: "", time: "" };
const readingTimeLocales = typeof define_READING_TIME_LOCALES_default === "undefined" ? null : define_READING_TIME_LOCALES_default;
const useReadingTimeLocaleConfig = () => readingTimeLocales ? useLocaleConfig(readingTimeLocales) : computed(() => null);
const useReadingTimeLocale = () => {
  if (typeof readingTimeLocales === "undefined")
    return computed(() => DEFAULT_LOCALE);
  const readingTime = useReadingTimeData();
  const readingTimeLocale = useReadingTimeLocaleConfig();
  return computed(() => readingTime.value && readingTimeLocale.value ? getReadingTimeLocale(readingTime.value, readingTimeLocale.value) : DEFAULT_LOCALE);
};
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  __name: "VPDocMeta",
  setup(__props, { expose: __expose }) {
    __expose();
    const { page, frontmatter: matter } = useData();
    const colors = useTagColors();
    const readingTime = useReadingTimeLocale();
    const { tags: tagsLink } = useInternalLink();
    const { isBlogPost } = useBlogPageData();
    const createTime = computed(() => {
      if (matter.value.createTime)
        return matter.value.createTime.split(" ")[0].replace(/\//g, "-");
      return "";
    });
    const tags = computed(() => {
      if (matter.value.tags) {
        return matter.value.tags.slice(0, 4).map((tag) => ({
          name: tag,
          className: `vp-tag-${colors.value[tag]}`
        }));
      }
      return [];
    });
    const badge = computed(() => {
      if (matter.value.badge) {
        return typeof matter.value.badge === "string" ? { text: matter.value.badge } : matter.value.badge;
      }
      return false;
    });
    const hasMeta = computed(() => readingTime.value.time || tags.value.length || createTime.value);
    const __returned__ = { page, matter, colors, readingTime, tagsLink, isBlogPost, createTime, tags, badge, hasMeta, VPBadge, VPLink };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$i(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<!--[--><h1 class="${ssrRenderClass([{ padding: !$setup.hasMeta }, "vp-doc-title page-title"])}" data-v-633eace2>${ssrInterpolate($setup.page.title)} `);
  if ($setup.badge) {
    _push(ssrRenderComponent($setup["VPBadge"], {
      type: $setup.badge.type || "tip",
      text: $setup.badge.text
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  _push(`</h1>`);
  if ($setup.hasMeta) {
    _push(`<div class="vp-doc-meta" data-v-633eace2>`);
    if ($setup.readingTime.time && $setup.matter.readingTime !== false) {
      _push(`<p class="reading-time" data-v-633eace2><span class="vpi-books icon" data-v-633eace2></span><span data-v-633eace2>${ssrInterpolate($setup.readingTime.words)}</span><span data-v-633eace2>${ssrInterpolate($setup.readingTime.time)}</span></p>`);
    } else {
      _push(`<!---->`);
    }
    if ($setup.tags.length > 0) {
      _push(`<p data-v-633eace2><span class="vpi-tag icon" data-v-633eace2></span><!--[-->`);
      ssrRenderList($setup.tags, (tag) => {
        var _a;
        _push(ssrRenderComponent($setup["VPLink"], {
          key: tag.name,
          class: ["tag", tag.className],
          href: ((_a = $setup.tagsLink) == null ? void 0 : _a.link) && $setup.isBlogPost ? `${$setup.tagsLink.link}?tag=${tag.name}` : void 0
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(tag.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(tag.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></p>`);
    } else {
      _push(`<!---->`);
    }
    if ($setup.createTime) {
      _push(`<p class="create-time" data-v-633eace2><span class="vpi-clock icon" data-v-633eace2></span><span data-v-633eace2>${ssrInterpolate($setup.createTime)}</span></p>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<!--]-->`);
}
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/VPDocMeta.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const VPDocMeta = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["ssrRender", _sfc_ssrRender$i], ["__scopeId", "data-v-633eace2"], ["__file", "VPDocMeta.vue"]]);
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "VPEncryptForm",
  props: {
    global: { type: Boolean },
    info: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const { theme } = useData();
    const { compareGlobal, comparePage } = useEncryptCompare();
    const password = ref("");
    const errorCode = ref(0);
    const unlocking = ref(false);
    async function onSubmit() {
      if (unlocking.value)
        return;
      const compare2 = props.global ? compareGlobal : comparePage;
      unlocking.value = true;
      const result = await compare2(password.value);
      unlocking.value = false;
      if (!result) {
        errorCode.value = 1;
      } else {
        errorCode.value = 0;
        password.value = "";
      }
    }
    const __returned__ = { props, theme, compareGlobal, comparePage, password, errorCode, unlocking, onSubmit };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$h(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "vp-encrypt-form" }, _attrs))} data-v-65bee878><p class="encrypt-text" data-v-65bee878>${$props.info ?? "Only Password can access this site" ?? ""}</p><p class="encrypt-input-wrapper" data-v-65bee878><span class="vpi-lock icon-lock" data-v-65bee878></span><input${ssrRenderAttr("value", $setup.password)} class="${ssrRenderClass([{ error: $setup.errorCode === 1 }, "encrypt-input"])}" type="password"${ssrRenderAttr("placeholder", $setup.theme.encryptPlaceholder ?? "Enter Password")} data-v-65bee878></p><button class="${ssrRenderClass([{ unlocking: $setup.unlocking }, "encrypt-button"])}" data-v-65bee878>`);
  if (!$setup.unlocking) {
    _push(`<span data-v-65bee878>${ssrInterpolate($setup.theme.encryptButtonText ?? "Confirm")}</span>`);
  } else {
    _push(`<span class="vpi-loading" data-v-65bee878></span>`);
  }
  _push(`</button></div>`);
}
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/VPEncryptForm.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const VPEncryptForm = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["ssrRender", _sfc_ssrRender$h], ["__scopeId", "data-v-65bee878"], ["__file", "VPEncryptForm.vue"]]);
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "VPEncryptPage",
  setup(__props, { expose: __expose }) {
    __expose();
    const { theme } = useData();
    const __returned__ = { theme, VPEncryptForm };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$g(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ClientOnly = resolveComponent("ClientOnly");
  _push(ssrRenderComponent(_component_ClientOnly, _attrs, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="vp-page-encrypt" data-v-d06c3002${_scopeId}><div class="logo" data-v-d06c3002${_scopeId}><span class="vpi-lock icon-lock-head" data-v-d06c3002${_scopeId}></span></div>`);
        _push2(ssrRenderComponent($setup["VPEncryptForm"], {
          info: $setup.theme.encryptPageText
        }, null, _parent2, _scopeId));
        _push2(`</div>`);
      } else {
        return [
          createVNode("div", { class: "vp-page-encrypt" }, [
            createVNode("div", { class: "logo" }, [
              createVNode("span", { class: "vpi-lock icon-lock-head" })
            ]),
            createVNode($setup["VPEncryptForm"], {
              info: $setup.theme.encryptPageText
            }, null, 8, ["info"])
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/VPEncryptPage.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const VPEncryptPage = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["ssrRender", _sfc_ssrRender$g], ["__scopeId", "data-v-d06c3002"], ["__file", "VPEncryptPage.vue"]]);
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "VPDoc",
  setup(__props, { expose: __expose }) {
    __expose();
    const { page, theme, frontmatter, isDark } = useData();
    const route = useRoute();
    const { hasSidebar, hasAside, leftAside } = useSidebar();
    const { isBlogPost } = useBlogPageData();
    const headers = useHeaders();
    const { isPageDecrypted } = useEncrypt();
    const hasComments = computed(() => {
      return !!resolveComponent("CommentService") && page.value.frontmatter.comments !== false && isPageDecrypted.value;
    });
    const enableAside = computed(() => {
      if (!hasAside.value)
        return false;
      if (isBlogPost.value)
        return headers.value.length > 0;
      return true;
    });
    const pageName = computed(
      () => route.path.replace(/[./]+/g, "_").replace(/_html$/, "")
    );
    const enabledExternalLinkIcon = computed(
      () => theme.value.externalLinkIcon && frontmatter.value.externalLinkIcon !== false
    );
    const asideEl = ref();
    watch(
      () => route.hash,
      (hash) => nextTick(() => {
        if (!asideEl.value)
          return;
        const activeItem = asideEl.value.querySelector(
          `.outline-link[href="${hash}"]`
        );
        if (!activeItem || !hash) {
          asideEl.value.scrollTop = 0;
          return;
        }
        const { top: navTop, height: navHeight } = asideEl.value.getBoundingClientRect();
        const { top: activeTop, height: activeHeight } = activeItem.getBoundingClientRect();
        if (activeTop < navTop || activeTop + activeHeight > navTop + navHeight)
          activeItem.scrollIntoView({ block: "center" });
      }),
      { immediate: true }
    );
    const __returned__ = { page, theme, frontmatter, isDark, route, hasSidebar, hasAside, leftAside, isBlogPost, headers, isPageDecrypted, hasComments, enableAside, pageName, enabledExternalLinkIcon, asideEl, VPDocAside, VPDocBreadcrumbs, VPDocFooter, VPDocMeta, VPEncryptPage, VPTransitionFadeSlideY };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$f(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Content = resolveComponent("Content");
  const _component_CommentService = resolveComponent("CommentService");
  _push(ssrRenderComponent($setup["VPTransitionFadeSlideY"], _attrs, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="${ssrRenderClass([{
          "has-sidebar": $setup.hasSidebar,
          "has-aside": $setup.enableAside,
          "is-blog": $setup.isBlogPost,
          "with-encrypt": !$setup.isPageDecrypted
        }, "vp-doc-container"])}" data-v-267a8830${_scopeId}>`);
        ssrRenderSlot(_ctx.$slots, "doc-top", {}, null, _push2, _parent2, _scopeId);
        _push2(`<div class="container" data-v-267a8830${_scopeId}>`);
        if ($setup.enableAside) {
          _push2(`<div class="${ssrRenderClass([{ "left-aside": $setup.leftAside }, "aside"])}" vp-outline data-v-267a8830${_scopeId}><div class="aside-curtain" data-v-267a8830${_scopeId}></div><div class="aside-container" data-v-267a8830${_scopeId}><div class="aside-content" data-v-267a8830${_scopeId}>`);
          _push2(ssrRenderComponent($setup["VPDocAside"], null, {
            "aside-top": withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                ssrRenderSlot(_ctx.$slots, "aside-top", {}, null, _push3, _parent3, _scopeId2);
              } else {
                return [
                  renderSlot(_ctx.$slots, "aside-top", {}, void 0, true)
                ];
              }
            }),
            "aside-bottom": withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                ssrRenderSlot(_ctx.$slots, "aside-bottom", {}, null, _push3, _parent3, _scopeId2);
              } else {
                return [
                  renderSlot(_ctx.$slots, "aside-bottom", {}, void 0, true)
                ];
              }
            }),
            "aside-outline-before": withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                ssrRenderSlot(_ctx.$slots, "aside-outline-before", {}, null, _push3, _parent3, _scopeId2);
              } else {
                return [
                  renderSlot(_ctx.$slots, "aside-outline-before", {}, void 0, true)
                ];
              }
            }),
            "aside-outline-after": withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                ssrRenderSlot(_ctx.$slots, "aside-outline-after", {}, null, _push3, _parent3, _scopeId2);
              } else {
                return [
                  renderSlot(_ctx.$slots, "aside-outline-after", {}, void 0, true)
                ];
              }
            }),
            "aside-ads-before": withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                ssrRenderSlot(_ctx.$slots, "aside-ads-before", {}, null, _push3, _parent3, _scopeId2);
              } else {
                return [
                  renderSlot(_ctx.$slots, "aside-ads-before", {}, void 0, true)
                ];
              }
            }),
            "aside-ads-after": withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                ssrRenderSlot(_ctx.$slots, "aside-ads-after", {}, null, _push3, _parent3, _scopeId2);
              } else {
                return [
                  renderSlot(_ctx.$slots, "aside-ads-after", {}, void 0, true)
                ];
              }
            }),
            _: 3
          }, _parent2, _scopeId));
          _push2(`</div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`<div class="content" data-v-267a8830${_scopeId}><div class="content-container" data-v-267a8830${_scopeId}>`);
        ssrRenderSlot(_ctx.$slots, "doc-before", {}, null, _push2, _parent2, _scopeId);
        _push2(`<main class="main" data-v-267a8830${_scopeId}>`);
        _push2(ssrRenderComponent($setup["VPDocBreadcrumbs"], null, null, _parent2, _scopeId));
        _push2(ssrRenderComponent($setup["VPDocMeta"], null, null, _parent2, _scopeId));
        if (!$setup.isPageDecrypted) {
          _push2(ssrRenderComponent($setup["VPEncryptPage"], null, null, _parent2, _scopeId));
        } else {
          _push2(ssrRenderComponent(_component_Content, {
            class: ["vp-doc plume-content", [$setup.pageName, $setup.enabledExternalLinkIcon && "external-link-icon-enabled"]],
            "vp-content": ""
          }, null, _parent2, _scopeId));
        }
        _push2(`</main>`);
        if ($setup.isPageDecrypted) {
          _push2(ssrRenderComponent($setup["VPDocFooter"], null, {
            "doc-footer-before": withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                ssrRenderSlot(_ctx.$slots, "doc-footer-before", {}, null, _push3, _parent3, _scopeId2);
              } else {
                return [
                  renderSlot(_ctx.$slots, "doc-footer-before", {}, void 0, true)
                ];
              }
            }),
            _: 3
          }, _parent2, _scopeId));
        } else {
          _push2(`<!---->`);
        }
        if ($setup.hasComments) {
          _push2(ssrRenderComponent(_component_CommentService, {
            darkmode: $setup.isDark,
            "vp-comment": ""
          }, null, _parent2, _scopeId));
        } else {
          _push2(`<!---->`);
        }
        ssrRenderSlot(_ctx.$slots, "doc-after", {}, null, _push2, _parent2, _scopeId);
        _push2(`</div></div></div>`);
        ssrRenderSlot(_ctx.$slots, "doc-bottom", {}, null, _push2, _parent2, _scopeId);
        _push2(`</div>`);
      } else {
        return [
          (openBlock(), createBlock("div", {
            key: $setup.page.path,
            class: ["vp-doc-container", {
              "has-sidebar": $setup.hasSidebar,
              "has-aside": $setup.enableAside,
              "is-blog": $setup.isBlogPost,
              "with-encrypt": !$setup.isPageDecrypted
            }]
          }, [
            renderSlot(_ctx.$slots, "doc-top", {}, void 0, true),
            createVNode("div", { class: "container" }, [
              $setup.enableAside ? (openBlock(), createBlock("div", {
                key: 0,
                class: ["aside", { "left-aside": $setup.leftAside }],
                "vp-outline": ""
              }, [
                createVNode("div", { class: "aside-curtain" }),
                createVNode("div", {
                  ref: "asideEl",
                  class: "aside-container"
                }, [
                  createVNode("div", { class: "aside-content" }, [
                    createVNode($setup["VPDocAside"], null, {
                      "aside-top": withCtx(() => [
                        renderSlot(_ctx.$slots, "aside-top", {}, void 0, true)
                      ]),
                      "aside-bottom": withCtx(() => [
                        renderSlot(_ctx.$slots, "aside-bottom", {}, void 0, true)
                      ]),
                      "aside-outline-before": withCtx(() => [
                        renderSlot(_ctx.$slots, "aside-outline-before", {}, void 0, true)
                      ]),
                      "aside-outline-after": withCtx(() => [
                        renderSlot(_ctx.$slots, "aside-outline-after", {}, void 0, true)
                      ]),
                      "aside-ads-before": withCtx(() => [
                        renderSlot(_ctx.$slots, "aside-ads-before", {}, void 0, true)
                      ]),
                      "aside-ads-after": withCtx(() => [
                        renderSlot(_ctx.$slots, "aside-ads-after", {}, void 0, true)
                      ]),
                      _: 3
                    })
                  ])
                ], 512)
              ], 2)) : createCommentVNode("", true),
              createVNode("div", { class: "content" }, [
                createVNode("div", { class: "content-container" }, [
                  renderSlot(_ctx.$slots, "doc-before", {}, void 0, true),
                  createVNode("main", { class: "main" }, [
                    createVNode($setup["VPDocBreadcrumbs"]),
                    createVNode($setup["VPDocMeta"]),
                    !$setup.isPageDecrypted ? (openBlock(), createBlock($setup["VPEncryptPage"], { key: 0 })) : (openBlock(), createBlock(_component_Content, {
                      key: 1,
                      class: ["vp-doc plume-content", [$setup.pageName, $setup.enabledExternalLinkIcon && "external-link-icon-enabled"]],
                      "vp-content": ""
                    }, null, 8, ["class"]))
                  ]),
                  $setup.isPageDecrypted ? (openBlock(), createBlock($setup["VPDocFooter"], { key: 0 }, {
                    "doc-footer-before": withCtx(() => [
                      renderSlot(_ctx.$slots, "doc-footer-before", {}, void 0, true)
                    ]),
                    _: 3
                  })) : createCommentVNode("", true),
                  $setup.hasComments ? (openBlock(), createBlock(_component_CommentService, {
                    key: 1,
                    darkmode: $setup.isDark,
                    "vp-comment": ""
                  }, null, 8, ["darkmode"])) : createCommentVNode("", true),
                  renderSlot(_ctx.$slots, "doc-after", {}, void 0, true)
                ])
              ])
            ]),
            renderSlot(_ctx.$slots, "doc-bottom", {}, void 0, true)
          ], 2))
        ];
      }
    }),
    _: 3
  }, _parent));
}
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/VPDoc.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const VPDoc = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["ssrRender", _sfc_ssrRender$f], ["__scopeId", "data-v-267a8830"], ["__file", "VPDoc.vue"]]);
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "VPFriendsItem",
  props: {
    friend: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const isDark = useDarkMode();
    function getStyle(name, color) {
      if (!color)
        return {};
      const value = isPlainObject(color) ? isDark.value ? color.dark : color.light : color;
      return value ? { [name]: value } : {};
    }
    const friendStyle = computed(() => {
      return {
        ...getStyle("--vp-friends-text-color", props.friend.color),
        ...getStyle("--vp-friends-bg-color", props.friend.backgroundColor),
        ...getStyle("--vp-friends-name-color", props.friend.nameColor)
      };
    });
    const __returned__ = { props, isDark, getStyle, friendStyle, VPLink, VPSocialLinks };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$e(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: ["vp-friend", {
      "only-title": !$props.friend.desc && (!$props.friend.socials || !$props.friend.socials.length),
      "no-desc": !$props.friend.desc
    }],
    style: $setup.friendStyle
  }, _attrs))} data-v-a8a07a87>`);
  _push(ssrRenderComponent($setup["VPLink"], {
    class: "avatar-link",
    href: $props.friend.link,
    "no-icon": ""
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="avatar" style="${ssrRenderStyle({ backgroundImage: `url(${$props.friend.avatar})` })}" data-v-a8a07a87${_scopeId}></div>`);
      } else {
        return [
          createVNode("div", {
            class: "avatar",
            style: { backgroundImage: `url(${$props.friend.avatar})` }
          }, null, 4)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<div class="content" data-v-a8a07a87>`);
  _push(ssrRenderComponent($setup["VPLink"], {
    class: "title",
    href: $props.friend.link,
    "no-icon": ""
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`${ssrInterpolate($props.friend.name)}`);
      } else {
        return [
          createTextVNode(toDisplayString($props.friend.name), 1)
        ];
      }
    }),
    _: 1
  }, _parent));
  if ($props.friend.desc) {
    _push(`<p data-v-a8a07a87>${ssrInterpolate($props.friend.desc)}</p>`);
  } else {
    _push(`<!---->`);
  }
  if ($props.friend.socials) {
    _push(ssrRenderComponent($setup["VPSocialLinks"], {
      links: $props.friend.socials
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div>`);
}
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/VPFriendsItem.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const VPFriendsItem = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["ssrRender", _sfc_ssrRender$e], ["__scopeId", "data-v-a8a07a87"], ["__file", "VPFriendsItem.vue"]]);
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "VPFriendsGroup",
  props: {
    group: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const __returned__ = { VPFriendsItem };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$d(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  var _a;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "vp-friends-group" }, _attrs))} data-v-19fa51db><h3 class="title" data-v-19fa51db>${ssrInterpolate($props.group.title || "My Friends")}</h3>`);
  if ($props.group.desc) {
    _push(`<p class="description" data-v-19fa51db>${ssrInterpolate($props.group.desc)}</p>`);
  } else {
    _push(`<!---->`);
  }
  if ((_a = $props.group.list) == null ? void 0 : _a.length) {
    _push(`<section class="friends-list" data-v-19fa51db><!--[-->`);
    ssrRenderList($props.group.list, (friend, index) => {
      _push(ssrRenderComponent($setup["VPFriendsItem"], {
        key: friend.name + index,
        friend
      }, null, _parent));
    });
    _push(`<!--]--></section>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/VPFriendsGroup.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const VPFriendsGroup = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["ssrRender", _sfc_ssrRender$d], ["__scopeId", "data-v-19fa51db"], ["__file", "VPFriendsGroup.vue"]]);
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "VPFriends",
  setup(__props, { expose: __expose }) {
    __expose();
    const editLink = useEditLink();
    const { frontmatter: matter } = useData();
    const list = computed(() => matter.value.list || []);
    const groups = computed(() => matter.value.groups || []);
    const __returned__ = { editLink, matter, list, groups, VPFriendsGroup, VPFriendsItem, VPLink };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$c(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "vp-friends" }, _attrs))} data-v-963fdc84><h2 class="title" data-v-963fdc84>${ssrInterpolate($setup.matter.title || "My Friends")}</h2>`);
  if ($setup.matter.description) {
    _push(`<p class="description" data-v-963fdc84>${ssrInterpolate($setup.matter.description)}</p>`);
  } else {
    _push(`<!---->`);
  }
  if ($setup.list.length) {
    _push(`<section class="friends-list" data-v-963fdc84><!--[-->`);
    ssrRenderList($setup.list, (friend, index) => {
      _push(ssrRenderComponent($setup["VPFriendsItem"], {
        key: friend.name + index,
        friend
      }, null, _parent));
    });
    _push(`<!--]--></section>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<!--[-->`);
  ssrRenderList($setup.groups, (group, index) => {
    _push(ssrRenderComponent($setup["VPFriendsGroup"], {
      key: index,
      group
    }, null, _parent));
  });
  _push(`<!--]-->`);
  if ($setup.editLink) {
    _push(`<div class="edit-link" data-v-963fdc84>`);
    _push(ssrRenderComponent($setup["VPLink"], {
      class: "edit-link-button",
      href: $setup.editLink.link,
      "no-icon": true
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<span class="vpi-square-pen edit-link-icon" aria-label="edit icon" data-v-963fdc84${_scopeId}></span> ${ssrInterpolate($setup.editLink.text)}`);
        } else {
          return [
            createVNode("span", {
              class: "vpi-square-pen edit-link-icon",
              "aria-label": "edit icon"
            }),
            createTextVNode(" " + toDisplayString($setup.editLink.text), 1)
          ];
        }
      }),
      _: 1
    }, _parent));
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/VPFriends.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const VPFriends = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["ssrRender", _sfc_ssrRender$c], ["__scopeId", "data-v-963fdc84"], ["__file", "VPFriends.vue"]]);
const _sfc_main$b = {};
function _sfc_ssrRender$b(_ctx, _push, _parent, _attrs) {
  const _component_Content = resolveComponent("Content");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "vp-page" }, _attrs))}>`);
  ssrRenderSlot(_ctx.$slots, "page-top", {}, null, _push, _parent);
  _push(ssrRenderComponent(_component_Content, {
    class: "vp-doc plume-content",
    "vp-content": ""
  }, null, _parent));
  ssrRenderSlot(_ctx.$slots, "page-bottom", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/VPPage.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const VPPage = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["ssrRender", _sfc_ssrRender$b], ["__file", "VPPage.vue"]]);
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "VPContent",
  props: {
    isNotFound: { type: Boolean }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const { hasSidebar } = useSidebar();
    const { frontmatter } = useData();
    const { isBlogLayout } = useBlogPageData();
    const route = useRoute();
    watch(
      [isBlogLayout, () => frontmatter.value.pageLayout, () => route.path],
      () => nextTick(() => {
        var _a;
        if (inBrowser) {
          document.documentElement.classList.toggle("bg-gray", isBlogLayout.value);
          const layout = (_a = document.documentElement.className.match(/(?:^|\s)(layout-\S+)(?:$|\s)/)) == null ? void 0 : _a[1];
          if (layout)
            document.documentElement.classList.remove(layout);
          document.documentElement.classList.add(`layout-${isBlogLayout.value ? "blog" : frontmatter.value.pageLayout || "doc"}`);
        }
      }),
      { immediate: true }
    );
    const __returned__ = { props, hasSidebar, frontmatter, isBlogLayout, route, VPBlog, VPHome, VPDoc, VPFriends, VPPage };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$a(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    id: "VPContent",
    "vp-content": "",
    class: ["vp-content", {
      "has-sidebar": $setup.hasSidebar && !$setup.props.isNotFound,
      "is-home": $setup.frontmatter.pageLayout === "home"
    }]
  }, _attrs))} data-v-51eca2ee>`);
  if ($setup.isBlogLayout) {
    _push(ssrRenderComponent($setup["VPBlog"], null, {
      "blog-top": withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          ssrRenderSlot(_ctx.$slots, "blog-top", {}, null, _push2, _parent2, _scopeId);
        } else {
          return [
            renderSlot(_ctx.$slots, "blog-top", {}, void 0, true)
          ];
        }
      }),
      "blog-bottom": withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          ssrRenderSlot(_ctx.$slots, "blog-bottom", {}, null, _push2, _parent2, _scopeId);
        } else {
          return [
            renderSlot(_ctx.$slots, "blog-bottom", {}, void 0, true)
          ];
        }
      }),
      "blog-archives-before": withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          ssrRenderSlot(_ctx.$slots, "blog-archives-before", {}, null, _push2, _parent2, _scopeId);
        } else {
          return [
            renderSlot(_ctx.$slots, "blog-archives-before", {}, void 0, true)
          ];
        }
      }),
      "blog-archives-after": withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          ssrRenderSlot(_ctx.$slots, "blog-archives-after", {}, null, _push2, _parent2, _scopeId);
        } else {
          return [
            renderSlot(_ctx.$slots, "blog-archives-after", {}, void 0, true)
          ];
        }
      }),
      "blog-tags-before": withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          ssrRenderSlot(_ctx.$slots, "blog-tags-before", {}, null, _push2, _parent2, _scopeId);
        } else {
          return [
            renderSlot(_ctx.$slots, "blog-tags-before", {}, void 0, true)
          ];
        }
      }),
      "blog-tags-after": withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          ssrRenderSlot(_ctx.$slots, "blog-tags-after", {}, null, _push2, _parent2, _scopeId);
        } else {
          return [
            renderSlot(_ctx.$slots, "blog-tags-after", {}, void 0, true)
          ];
        }
      }),
      "blog-tags-title-after": withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          ssrRenderSlot(_ctx.$slots, "blog-tags-title-after", {}, null, _push2, _parent2, _scopeId);
        } else {
          return [
            renderSlot(_ctx.$slots, "blog-tags-title-after", {}, void 0, true)
          ];
        }
      }),
      "blog-tags-content-before": withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          ssrRenderSlot(_ctx.$slots, "blog-tags-content-before", {}, null, _push2, _parent2, _scopeId);
        } else {
          return [
            renderSlot(_ctx.$slots, "blog-tags-content-before", {}, void 0, true)
          ];
        }
      }),
      "blog-categories-before": withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          ssrRenderSlot(_ctx.$slots, "blog-categories-before", {}, null, _push2, _parent2, _scopeId);
        } else {
          return [
            renderSlot(_ctx.$slots, "blog-categories-before", {}, void 0, true)
          ];
        }
      }),
      "blog-categories-after": withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          ssrRenderSlot(_ctx.$slots, "blog-categories-after", {}, null, _push2, _parent2, _scopeId);
        } else {
          return [
            renderSlot(_ctx.$slots, "blog-categories-after", {}, void 0, true)
          ];
        }
      }),
      "blog-categories-content-before": withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          ssrRenderSlot(_ctx.$slots, "blog-categories-content-before", {}, null, _push2, _parent2, _scopeId);
        } else {
          return [
            renderSlot(_ctx.$slots, "blog-categories-content-before", {}, void 0, true)
          ];
        }
      }),
      "blog-post-list-before": withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          ssrRenderSlot(_ctx.$slots, "blog-post-list-before", {}, null, _push2, _parent2, _scopeId);
        } else {
          return [
            renderSlot(_ctx.$slots, "blog-post-list-before", {}, void 0, true)
          ];
        }
      }),
      "blog-post-list-after": withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          ssrRenderSlot(_ctx.$slots, "blog-post-list-after", {}, null, _push2, _parent2, _scopeId);
        } else {
          return [
            renderSlot(_ctx.$slots, "blog-post-list-after", {}, void 0, true)
          ];
        }
      }),
      "blog-post-list-pagination-after": withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          ssrRenderSlot(_ctx.$slots, "blog-post-list-pagination-after", {}, null, _push2, _parent2, _scopeId);
        } else {
          return [
            renderSlot(_ctx.$slots, "blog-post-list-pagination-after", {}, void 0, true)
          ];
        }
      }),
      "blog-aside-top": withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          ssrRenderSlot(_ctx.$slots, "blog-aside-top", {}, null, _push2, _parent2, _scopeId);
        } else {
          return [
            renderSlot(_ctx.$slots, "blog-aside-top", {}, void 0, true)
          ];
        }
      }),
      "blog-aside-bottom": withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          ssrRenderSlot(_ctx.$slots, "blog-aside-bottom", {}, null, _push2, _parent2, _scopeId);
        } else {
          return [
            renderSlot(_ctx.$slots, "blog-aside-bottom", {}, void 0, true)
          ];
        }
      }),
      "blog-extract-before": withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          ssrRenderSlot(_ctx.$slots, "blog-extract-before", {}, null, _push2, _parent2, _scopeId);
        } else {
          return [
            renderSlot(_ctx.$slots, "blog-extract-before", {}, void 0, true)
          ];
        }
      }),
      "blog-extract-after": withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          ssrRenderSlot(_ctx.$slots, "blog-extract-after", {}, null, _push2, _parent2, _scopeId);
        } else {
          return [
            renderSlot(_ctx.$slots, "blog-extract-after", {}, void 0, true)
          ];
        }
      }),
      _: 3
    }, _parent));
  } else if ($setup.frontmatter.pageLayout === "page") {
    _push(ssrRenderComponent($setup["VPPage"], null, {
      "page-top": withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          ssrRenderSlot(_ctx.$slots, "page-top", {}, null, _push2, _parent2, _scopeId);
        } else {
          return [
            renderSlot(_ctx.$slots, "page-top", {}, void 0, true)
          ];
        }
      }),
      "page-bottom": withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          ssrRenderSlot(_ctx.$slots, "page-bottom", {}, null, _push2, _parent2, _scopeId);
        } else {
          return [
            renderSlot(_ctx.$slots, "page-bottom", {}, void 0, true)
          ];
        }
      }),
      _: 3
    }, _parent));
  } else if ($setup.frontmatter.pageLayout === "friends") {
    _push(ssrRenderComponent($setup["VPFriends"], null, null, _parent));
  } else if ($setup.frontmatter.pageLayout === "home") {
    _push(ssrRenderComponent($setup["VPHome"], null, {
      "blog-top": withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          ssrRenderSlot(_ctx.$slots, "blog-top", {}, null, _push2, _parent2, _scopeId);
        } else {
          return [
            renderSlot(_ctx.$slots, "blog-top", {}, void 0, true)
          ];
        }
      }),
      "blog-bottom": withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          ssrRenderSlot(_ctx.$slots, "blog-bottom", {}, null, _push2, _parent2, _scopeId);
        } else {
          return [
            renderSlot(_ctx.$slots, "blog-bottom", {}, void 0, true)
          ];
        }
      }),
      "blog-post-list-before": withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          ssrRenderSlot(_ctx.$slots, "blog-post-list-before", {}, null, _push2, _parent2, _scopeId);
        } else {
          return [
            renderSlot(_ctx.$slots, "blog-post-list-before", {}, void 0, true)
          ];
        }
      }),
      "blog-post-list-after": withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          ssrRenderSlot(_ctx.$slots, "blog-post-list-after", {}, null, _push2, _parent2, _scopeId);
        } else {
          return [
            renderSlot(_ctx.$slots, "blog-post-list-after", {}, void 0, true)
          ];
        }
      }),
      "blog-post-list-pagination-after": withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          ssrRenderSlot(_ctx.$slots, "blog-post-list-pagination-after", {}, null, _push2, _parent2, _scopeId);
        } else {
          return [
            renderSlot(_ctx.$slots, "blog-post-list-pagination-after", {}, void 0, true)
          ];
        }
      }),
      _: 3
    }, _parent));
  } else if ($setup.frontmatter.pageLayout && $setup.frontmatter.pageLayout !== "doc") {
    ssrRenderVNode(_push, createVNode(resolveDynamicComponent($setup.frontmatter.pageLayout), null, null), _parent);
  } else {
    _push(ssrRenderComponent($setup["VPDoc"], null, {
      "doc-top": withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          ssrRenderSlot(_ctx.$slots, "doc-top", {}, null, _push2, _parent2, _scopeId);
        } else {
          return [
            renderSlot(_ctx.$slots, "doc-top", {}, void 0, true)
          ];
        }
      }),
      "doc-bottom": withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          ssrRenderSlot(_ctx.$slots, "doc-bottom", {}, null, _push2, _parent2, _scopeId);
        } else {
          return [
            renderSlot(_ctx.$slots, "doc-bottom", {}, void 0, true)
          ];
        }
      }),
      "doc-footer-before": withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          ssrRenderSlot(_ctx.$slots, "doc-footer-before", {}, null, _push2, _parent2, _scopeId);
        } else {
          return [
            renderSlot(_ctx.$slots, "doc-footer-before", {}, void 0, true)
          ];
        }
      }),
      "doc-before": withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          ssrRenderSlot(_ctx.$slots, "doc-before", {}, null, _push2, _parent2, _scopeId);
        } else {
          return [
            renderSlot(_ctx.$slots, "doc-before", {}, void 0, true)
          ];
        }
      }),
      "doc-after": withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          ssrRenderSlot(_ctx.$slots, "doc-after", {}, null, _push2, _parent2, _scopeId);
        } else {
          return [
            renderSlot(_ctx.$slots, "doc-after", {}, void 0, true)
          ];
        }
      }),
      "aside-top": withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          ssrRenderSlot(_ctx.$slots, "aside-top", {}, null, _push2, _parent2, _scopeId);
        } else {
          return [
            renderSlot(_ctx.$slots, "aside-top", {}, void 0, true)
          ];
        }
      }),
      "aside-outline-before": withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          ssrRenderSlot(_ctx.$slots, "aside-outline-before", {}, null, _push2, _parent2, _scopeId);
        } else {
          return [
            renderSlot(_ctx.$slots, "aside-outline-before", {}, void 0, true)
          ];
        }
      }),
      "aside-outline-after": withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          ssrRenderSlot(_ctx.$slots, "aside-outline-after", {}, null, _push2, _parent2, _scopeId);
        } else {
          return [
            renderSlot(_ctx.$slots, "aside-outline-after", {}, void 0, true)
          ];
        }
      }),
      "aside-ads-before": withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          ssrRenderSlot(_ctx.$slots, "aside-ads-before", {}, null, _push2, _parent2, _scopeId);
        } else {
          return [
            renderSlot(_ctx.$slots, "aside-ads-before", {}, void 0, true)
          ];
        }
      }),
      "aside-ads-after": withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          ssrRenderSlot(_ctx.$slots, "aside-ads-after", {}, null, _push2, _parent2, _scopeId);
        } else {
          return [
            renderSlot(_ctx.$slots, "aside-ads-after", {}, void 0, true)
          ];
        }
      }),
      "aside-bottom": withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          ssrRenderSlot(_ctx.$slots, "aside-bottom", {}, null, _push2, _parent2, _scopeId);
        } else {
          return [
            renderSlot(_ctx.$slots, "aside-bottom", {}, void 0, true)
          ];
        }
      }),
      _: 3
    }, _parent));
  }
  _push(`</div>`);
}
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/VPContent.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const VPContent = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["ssrRender", _sfc_ssrRender$a], ["__scopeId", "data-v-51eca2ee"], ["__file", "VPContent.vue"]]);
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "VPFooter",
  setup(__props, { expose: __expose }) {
    __expose();
    const { theme } = useData();
    const { hasSidebar } = useSidebar();
    const footerHeight = useCssVar("--vp-footer-height", inBrowser ? document.body : null);
    const footer = ref(null);
    onMounted(() => {
      if (theme.value.footer && footer.value)
        footerHeight.value = `${footer.value.offsetHeight}px`;
    });
    const __returned__ = { theme, hasSidebar, footerHeight, footer };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$9(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if ($setup.theme.footer) {
    _push(`<footer${ssrRenderAttrs(mergeProps({
      ref: "footer",
      class: ["vp-footer", { "has-sidebar": $setup.hasSidebar }],
      "vp-footer": ""
    }, _attrs))} data-v-3dea0c58><div class="container" data-v-3dea0c58>`);
    if ($setup.theme.footer.message) {
      _push(`<p class="message" data-v-3dea0c58>${$setup.theme.footer.message ?? ""}</p>`);
    } else {
      _push(`<!---->`);
    }
    if ($setup.theme.footer.copyright) {
      _push(`<p class="copyright" data-v-3dea0c58>${$setup.theme.footer.copyright ?? ""}</p>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div></footer>`);
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/VPFooter.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const VPFooter = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["ssrRender", _sfc_ssrRender$9], ["__scopeId", "data-v-3dea0c58"], ["__file", "VPFooter.vue"]]);
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "VPEncryptGlobal",
  setup(__props, { expose: __expose }) {
    __expose();
    const { theme, site } = useData();
    const profile = computed(() => theme.value.profile);
    const title = computed(() => {
      var _a;
      return ((_a = profile.value) == null ? void 0 : _a.name) || site.value.title;
    });
    const __returned__ = { theme, site, profile, title, VPEncryptForm, VPFooter };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$8(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ClientOnly = resolveComponent("ClientOnly");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_ClientOnly, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="vp-global-encrypt" data-v-ce6b094b${_scopeId}><div class="global-encrypt-container" data-v-ce6b094b${_scopeId}>`);
        if ($setup.profile || $setup.title) {
          _push2(`<div class="profile" data-v-ce6b094b${_scopeId}>`);
          if ($setup.profile) {
            _push2(`<p class="${ssrRenderClass([{ circle: $setup.profile.circle }, "avatar"])}" data-v-ce6b094b${_scopeId}><img${ssrRenderAttr("src", $setup.profile.avatar ?? $setup.profile.url)}${ssrRenderAttr("alt", $setup.profile.name)} data-v-ce6b094b${_scopeId}></p>`);
          } else {
            _push2(`<!---->`);
          }
          if ($setup.title) {
            _push2(`<h3 data-v-ce6b094b${_scopeId}>${ssrInterpolate($setup.title)}</h3>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(ssrRenderComponent($setup["VPEncryptForm"], {
          global: "",
          info: $setup.theme.encryptGlobalText
        }, null, _parent2, _scopeId));
        _push2(`</div></div>`);
      } else {
        return [
          createVNode("div", { class: "vp-global-encrypt" }, [
            createVNode("div", { class: "global-encrypt-container" }, [
              $setup.profile || $setup.title ? (openBlock(), createBlock("div", {
                key: 0,
                class: "profile"
              }, [
                $setup.profile ? (openBlock(), createBlock("p", {
                  key: 0,
                  class: ["avatar", { circle: $setup.profile.circle }]
                }, [
                  createVNode("img", {
                    src: $setup.profile.avatar ?? $setup.profile.url,
                    alt: $setup.profile.name
                  }, null, 8, ["src", "alt"])
                ], 2)) : createCommentVNode("", true),
                $setup.title ? (openBlock(), createBlock("h3", { key: 1 }, toDisplayString($setup.title), 1)) : createCommentVNode("", true)
              ])) : createCommentVNode("", true),
              createVNode($setup["VPEncryptForm"], {
                global: "",
                info: $setup.theme.encryptGlobalText
              }, null, 8, ["info"])
            ])
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent($setup["VPFooter"], null, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/VPEncryptGlobal.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const VPEncryptGlobal = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["ssrRender", _sfc_ssrRender$8], ["__scopeId", "data-v-ce6b094b"], ["__file", "VPEncryptGlobal.vue"]]);
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "VPLocalNavOutlineDropdown",
  props: {
    headers: {},
    navHeight: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const { theme } = useData();
    const open = ref(false);
    const vh = ref(0);
    const items2 = ref();
    const btn = ref();
    watch(() => props.headers, () => {
      open.value = false;
    });
    onClickOutside(items2, () => {
      open.value = false;
    }, { ignore: [btn] });
    function toggle() {
      open.value = !open.value;
      vh.value = window.innerHeight + Math.min(window.scrollY - props.navHeight, 0);
    }
    function onItemClick(e) {
      if (e.target.classList.contains("outline-link")) {
        if (items2.value)
          items2.value.style.transition = "none";
        nextTick(() => {
          open.value = false;
        });
      }
    }
    function scrollToTop() {
      open.value = false;
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
    const __returned__ = { props, theme, open, vh, items: items2, btn, toggle, onItemClick, scrollToTop, VPDocOutlineItem };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$7(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: "vp-local-nav-outline-dropdown",
    style: { "--vp-vh": `${$setup.vh}px` }
  }, _attrs))} data-v-2306fda8>`);
  if ($props.headers.length > 0) {
    _push(`<button class="${ssrRenderClass({ open: $setup.open })}" data-v-2306fda8>${ssrInterpolate($setup.theme.outlineLabel || "On this page")} <span class="vpi-chevron-right icon" data-v-2306fda8></span></button>`);
  } else {
    _push(`<button data-v-2306fda8>${ssrInterpolate($setup.theme.returnToTopLabel || "Return to top")}</button>`);
  }
  if ($setup.open) {
    _push(`<div class="items" data-v-2306fda8><div class="header" data-v-2306fda8><a class="top-link" href="#" data-v-2306fda8>${ssrInterpolate($setup.theme.returnToTopLabel || "Return to top")}</a></div><div class="outline" data-v-2306fda8>`);
    _push(ssrRenderComponent($setup["VPDocOutlineItem"], { headers: $props.headers }, null, _parent));
    _push(`</div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/VPLocalNavOutlineDropdown.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const VPLocalNavOutlineDropdown = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["ssrRender", _sfc_ssrRender$7], ["__scopeId", "data-v-2306fda8"], ["__file", "VPLocalNavOutlineDropdown.vue"]]);
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "VPLocalNav",
  props: {
    open: { type: Boolean },
    showOutline: { type: Boolean }
  },
  emits: ["openMenu"],
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const { theme } = useData();
    const { isBlogPost } = useBlogPageData();
    const { hasSidebar } = useSidebar();
    const { y } = useWindowScroll();
    const navHeight = ref(0);
    const headers = useHeaders();
    const empty = computed(() => {
      return headers.value.length === 0 && !hasSidebar.value;
    });
    onMounted(() => {
      navHeight.value = Number.parseInt(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--vp-nav-height"
        )
      );
    });
    const classes = computed(() => {
      return {
        "vp-local-nav": true,
        "fixed": empty.value,
        "reached-top": y.value >= navHeight.value,
        "is-blog": isBlogPost,
        "with-outline": !props.showOutline
      };
    });
    const showLocalNav = computed(() => {
      return (hasSidebar.value || isBlogPost.value) && (!empty.value || y.value >= navHeight.value);
    });
    const __returned__ = { props, theme, isBlogPost, hasSidebar, y, navHeight, headers, empty, classes, showLocalNav, VPLocalNavOutlineDropdown };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$6(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if ($setup.showLocalNav) {
    _push(`<div${ssrRenderAttrs(mergeProps({ class: $setup.classes }, _attrs))} data-v-6dac0e06><button class="${ssrRenderClass([{ hidden: $setup.isBlogPost }, "menu"])}"${ssrIncludeBooleanAttr($setup.isBlogPost) ? " disabled" : ""}${ssrRenderAttr("aria-expanded", $props.open)} aria-controls="SidebarNav" data-v-6dac0e06><span class="vpi-align-left menu-icon" data-v-6dac0e06></span><span class="menu-text" data-v-6dac0e06>${ssrInterpolate($setup.theme.sidebarMenuLabel || "Menu")}</span></button>`);
    if ($props.showOutline) {
      _push(ssrRenderComponent($setup["VPLocalNavOutlineDropdown"], {
        headers: $setup.headers,
        "nav-height": $setup.navHeight
      }, null, _parent));
    } else {
      _push(`<!---->`);
    }
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/VPLocalNav.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const VPLocalNav = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender$6], ["__scopeId", "data-v-6dac0e06"], ["__file", "VPLocalNav.vue"]]);
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "VPSidebarItem",
  props: {
    item: {},
    depth: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const {
      collapsed,
      collapsible,
      isLink,
      isActiveLink,
      hasActiveLink: hasActiveLink2,
      hasChildren,
      toggle
    } = useSidebarControl(computed(() => props.item));
    const sectionTag = computed(() => hasChildren.value ? "section" : `div`);
    const linkTag = computed(() => isLink.value ? "a" : "div");
    const textTag = computed(() => {
      return !hasChildren.value ? "p" : props.depth + 2 === 7 ? "p" : `h${props.depth + 2}`;
    });
    const itemRole = computed(() => isLink.value ? void 0 : "button");
    const classes = computed(() => [
      [`level-${props.depth}`],
      { collapsible: collapsible.value },
      { collapsed: collapsed.value },
      { "is-link": isLink.value },
      { "is-active": isActiveLink.value },
      { "has-active": hasActiveLink2.value }
    ]);
    function onItemInteraction(e) {
      if ("key" in e && e.key !== "Enter")
        return;
      if (!props.item.link) {
        toggle();
      }
    }
    function onCaretClick() {
      if (props.item.link) {
        toggle();
      }
    }
    const __returned__ = { props, collapsed, collapsible, isLink, isActiveLink, hasActiveLink: hasActiveLink2, hasChildren, toggle, sectionTag, linkTag, textTag, itemRole, classes, onItemInteraction, onCaretClick, VPIcon, VPLink };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_VPSidebarItem = resolveComponent("VPSidebarItem", true);
  ssrRenderVNode(_push, createVNode(resolveDynamicComponent($setup.sectionTag), mergeProps({
    class: ["vp-sidebar-item sidebar-item", $setup.classes]
  }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        if ($props.item.text) {
          _push2(`<div class="item"${ssrRenderAttr("role", $setup.itemRole)}${ssrRenderAttr("tabindex", $props.item.items && 0)} data-v-fb1eece1${_scopeId}><div class="indicator" data-v-fb1eece1${_scopeId}></div>`);
          if ($props.item.icon) {
            _push2(ssrRenderComponent($setup["VPIcon"], {
              name: $props.item.icon
            }, null, _parent2, _scopeId));
          } else {
            _push2(`<!---->`);
          }
          if ($props.item.link) {
            _push2(ssrRenderComponent($setup["VPLink"], {
              tag: $setup.linkTag,
              class: "link",
              href: $props.item.link
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderVNode(_push3, createVNode(resolveDynamicComponent($setup.textTag), { class: "text" }, null), _parent3, _scopeId2);
                } else {
                  return [
                    (openBlock(), createBlock(resolveDynamicComponent($setup.textTag), {
                      class: "text",
                      innerHTML: $props.item.text
                    }, null, 8, ["innerHTML"]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            ssrRenderVNode(_push2, createVNode(resolveDynamicComponent($setup.textTag), { class: "text" }, null), _parent2, _scopeId);
          }
          if ($props.item.collapsed != null) {
            _push2(`<div class="caret" role="button" aria-label="toggle section" tabindex="0" data-v-fb1eece1${_scopeId}><span class="vpi-chevron-right caret-icon" data-v-fb1eece1${_scopeId}></span></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div>`);
        } else {
          _push2(`<!---->`);
        }
        if ($props.item.items && $props.item.items.length) {
          _push2(`<div class="items" data-v-fb1eece1${_scopeId}>`);
          if ($props.depth < 5) {
            _push2(`<!--[-->`);
            ssrRenderList($props.item.items, (i) => {
              _push2(ssrRenderComponent(_component_VPSidebarItem, {
                key: i.text,
                item: i,
                depth: $props.depth + 1
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div>`);
        } else {
          _push2(`<!---->`);
        }
      } else {
        return [
          $props.item.text ? (openBlock(), createBlock("div", mergeProps({
            key: 0,
            class: "item",
            role: $setup.itemRole,
            tabindex: $props.item.items && 0
          }, toHandlers(
            $props.item.items ? { click: $setup.onItemInteraction, keydown: $setup.onItemInteraction } : {},
            true
          )), [
            createVNode("div", { class: "indicator" }),
            $props.item.icon ? (openBlock(), createBlock($setup["VPIcon"], {
              key: 0,
              name: $props.item.icon
            }, null, 8, ["name"])) : createCommentVNode("", true),
            $props.item.link ? (openBlock(), createBlock($setup["VPLink"], {
              key: 1,
              tag: $setup.linkTag,
              class: "link",
              href: $props.item.link
            }, {
              default: withCtx(() => [
                (openBlock(), createBlock(resolveDynamicComponent($setup.textTag), {
                  class: "text",
                  innerHTML: $props.item.text
                }, null, 8, ["innerHTML"]))
              ]),
              _: 1
            }, 8, ["tag", "href"])) : (openBlock(), createBlock(resolveDynamicComponent($setup.textTag), {
              key: 2,
              class: "text",
              innerHTML: $props.item.text
            }, null, 8, ["innerHTML"])),
            $props.item.collapsed != null ? (openBlock(), createBlock("div", {
              key: 3,
              class: "caret",
              role: "button",
              "aria-label": "toggle section",
              tabindex: "0",
              onClick: $setup.onCaretClick,
              onKeydown: withKeys($setup.onCaretClick, ["enter"])
            }, [
              createVNode("span", { class: "vpi-chevron-right caret-icon" })
            ], 32)) : createCommentVNode("", true)
          ], 16, ["role", "tabindex"])) : createCommentVNode("", true),
          $props.item.items && $props.item.items.length ? (openBlock(), createBlock("div", {
            key: 1,
            class: "items"
          }, [
            $props.depth < 5 ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList($props.item.items, (i) => {
              return openBlock(), createBlock(_component_VPSidebarItem, {
                key: i.text,
                item: i,
                depth: $props.depth + 1
              }, null, 8, ["item", "depth"]);
            }), 128)) : createCommentVNode("", true)
          ])) : createCommentVNode("", true)
        ];
      }
    }),
    _: 1
  }), _parent);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/VPSidebarItem.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const VPSidebarItem = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$5], ["__scopeId", "data-v-fb1eece1"], ["__file", "VPSidebarItem.vue"]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "VPSidebarGroup",
  props: {
    items: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const disableTransition = ref(true);
    let timer = null;
    onMounted(() => {
      timer = setTimeout(() => {
        timer = null;
        disableTransition.value = false;
      }, 300);
    });
    onBeforeUnmount(() => {
      if (timer != null) {
        clearTimeout(timer);
        timer = null;
      }
    });
    const __returned__ = { disableTransition, get timer() {
      return timer;
    }, set timer(v) {
      timer = v;
    }, VPSidebarItem };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<!--[-->`);
  ssrRenderList($props.items, (item) => {
    _push(`<div class="${ssrRenderClass([{ "no-transition": $setup.disableTransition }, "group"])}" data-v-a86c3179>`);
    _push(ssrRenderComponent($setup["VPSidebarItem"], {
      item,
      depth: 0
    }, null, _parent));
    _push(`</div>`);
  });
  _push(`<!--]-->`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/VPSidebarGroup.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const VPSidebarGroup = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$4], ["__scopeId", "data-v-a86c3179"], ["__file", "VPSidebarGroup.vue"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "VPSidebar",
  props: {
    open: { type: Boolean }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const { sidebarGroups, hasSidebar, sidebarKey } = useSidebar();
    const routePath = useRoutePath();
    const navEl = ref(null);
    const isLocked = useScrollLock(inBrowser ? document.body : null);
    watch(
      [() => props.open, navEl],
      () => {
        var _a;
        if (props.open) {
          isLocked.value = true;
          (_a = navEl.value) == null ? void 0 : _a.focus();
        } else {
          isLocked.value = false;
        }
      },
      { immediate: true, flush: "post" }
    );
    onMounted(() => {
      const activeItem = document.querySelector(
        `.vp-sidebar .vp-link[href*="${routePath.value}"]`
      );
      if (!activeItem || !navEl.value)
        return;
      const { top: navTop, height: navHeight } = navEl.value.getBoundingClientRect();
      const { top: activeTop, height: activeHeight } = activeItem.getBoundingClientRect();
      if (activeTop < navTop || activeTop + activeHeight > navTop + navHeight)
        activeItem.scrollIntoView({ block: "center" });
    });
    const __returned__ = { props, sidebarGroups, hasSidebar, sidebarKey, routePath, navEl, isLocked, VPSidebarGroup, VPTransitionFadeSlideY };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if ($setup.hasSidebar) {
    _push(`<aside${ssrRenderAttrs(mergeProps({
      ref: "navEl",
      class: ["vp-sidebar", { open: $props.open }],
      "vp-sidebar": ""
    }, _attrs))} data-v-b6640f19><div class="curtain" data-v-b6640f19></div>`);
    _push(ssrRenderComponent($setup["VPTransitionFadeSlideY"], null, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<nav id="SidebarNav" class="nav" aria-labelledby="sidebar-aria-label" tabindex="-1" data-v-b6640f19${_scopeId}><span id="sidebar-aria-label" class="visually-hidden" data-v-b6640f19${_scopeId}> Sidebar Navigation </span>`);
          ssrRenderSlot(_ctx.$slots, "sidebar-nav-before", {}, null, _push2, _parent2, _scopeId);
          _push2(ssrRenderComponent($setup["VPSidebarGroup"], { items: $setup.sidebarGroups }, null, _parent2, _scopeId));
          ssrRenderSlot(_ctx.$slots, "sidebar-nav-after", {}, null, _push2, _parent2, _scopeId);
          _push2(`</nav>`);
        } else {
          return [
            (openBlock(), createBlock("nav", {
              id: "SidebarNav",
              key: $setup.sidebarKey,
              class: "nav",
              "aria-labelledby": "sidebar-aria-label",
              tabindex: "-1"
            }, [
              createVNode("span", {
                id: "sidebar-aria-label",
                class: "visually-hidden"
              }, " Sidebar Navigation "),
              renderSlot(_ctx.$slots, "sidebar-nav-before", {}, void 0, true),
              createVNode($setup["VPSidebarGroup"], { items: $setup.sidebarGroups }, null, 8, ["items"]),
              renderSlot(_ctx.$slots, "sidebar-nav-after", {}, void 0, true)
            ]))
          ];
        }
      }),
      _: 3
    }, _parent));
    _push(`</aside>`);
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/VPSidebar.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const VPSidebar = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$3], ["__scopeId", "data-v-b6640f19"], ["__file", "VPSidebar.vue"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "VPSkipLink",
  setup(__props, { expose: __expose }) {
    __expose();
    const route = useRoute();
    const backToTop = ref();
    watch(
      () => route.path,
      () => backToTop.value.focus()
    );
    function focusOnTargetAnchor({ target }) {
      const el = document.getElementById(
        decodeURIComponent(target.hash).slice(1)
      );
      if (el) {
        const removeTabIndex = () => {
          el.removeAttribute("tabindex");
          el.removeEventListener("blur", removeTabIndex);
        };
        el.setAttribute("tabindex", "-1");
        el.addEventListener("blur", removeTabIndex);
        el.focus();
        window.scrollTo(0, 0);
      }
    }
    const __returned__ = { route, backToTop, focusOnTargetAnchor };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<!--[--><span tabindex="-1" data-v-9ba9c8d4></span><a href="#VPContent" class="vp-skip-link visually-hidden" data-v-9ba9c8d4> Skip to content </a><!--]-->`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/components/VPSkipLink.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const VPSkipLink = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2], ["__scopeId", "data-v-9ba9c8d4"], ["__file", "VPSkipLink.vue"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Layout",
  setup(__props, { expose: __expose }) {
    __expose();
    const {
      isOpen: isSidebarOpen,
      open: openSidebar,
      close: closeSidebar
    } = useSidebar();
    const { frontmatter } = useData();
    const { isGlobalDecrypted, isPageDecrypted } = useEncrypt();
    const route = useRoute();
    watch(() => route.path, closeSidebar);
    useCloseSidebarOnEscape(isSidebarOpen, closeSidebar);
    const __returned__ = { isSidebarOpen, openSidebar, closeSidebar, frontmatter, isGlobalDecrypted, isPageDecrypted, route, VPNav, VPBackdrop, VPBackToTop, VPContent, VPEncryptGlobal, VPFooter, VPLocalNav, VPSidebar, VPSkipLink };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Content = resolveComponent("Content");
  if ($setup.frontmatter.pageLayout !== false && $setup.frontmatter.pageLayout !== "custom") {
    _push(`<div${ssrRenderAttrs(mergeProps({
      class: ["theme-plume vp-layout", $setup.frontmatter.pageClass],
      "vp-container": ""
    }, _attrs))} data-v-fb70c005>`);
    if (!$setup.isGlobalDecrypted) {
      _push(ssrRenderComponent($setup["VPEncryptGlobal"], null, null, _parent));
    } else {
      _push(`<!--[-->`);
      ssrRenderSlot(_ctx.$slots, "layout-top", {}, null, _push, _parent);
      _push(ssrRenderComponent($setup["VPSkipLink"], null, null, _parent));
      _push(ssrRenderComponent($setup["VPBackdrop"], {
        show: $setup.isSidebarOpen,
        onClick: $setup.closeSidebar
      }, null, _parent));
      _push(ssrRenderComponent($setup["VPNav"], null, {
        "nav-bar-title-before": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "nav-bar-title-before", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "nav-bar-title-before", {}, void 0, true)
            ];
          }
        }),
        "nav-bar-title-after": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "nav-bar-title-after", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "nav-bar-title-after", {}, void 0, true)
            ];
          }
        }),
        "nav-bar-content-before": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "nav-bar-content-before", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "nav-bar-content-before", {}, void 0, true)
            ];
          }
        }),
        "nav-bar-content-after": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "nav-bar-content-after", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "nav-bar-content-after", {}, void 0, true)
            ];
          }
        }),
        "nav-screen-content-before": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "nav-screen-content-before", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "nav-screen-content-before", {}, void 0, true)
            ];
          }
        }),
        "nav-screen-content-after": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "nav-screen-content-after", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "nav-screen-content-after", {}, void 0, true)
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(ssrRenderComponent($setup["VPLocalNav"], {
        open: $setup.isSidebarOpen,
        "show-outline": $setup.isPageDecrypted,
        onOpenMenu: $setup.openSidebar
      }, null, _parent));
      _push(ssrRenderComponent($setup["VPSidebar"], { open: $setup.isSidebarOpen }, {
        "sidebar-nav-before": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "sidebar-nav-before", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "sidebar-nav-before", {}, void 0, true)
            ];
          }
        }),
        "sidebar-nav-after": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "sidebar-nav-after", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "sidebar-nav-after", {}, void 0, true)
            ];
          }
        }),
        _: 3
      }, _parent));
      ssrRenderSlot(_ctx.$slots, "custom-content", {}, () => {
        _push(ssrRenderComponent($setup["VPContent"], null, {
          "page-top": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "page-top", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "page-top", {}, void 0, true)
              ];
            }
          }),
          "page-bottom": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "page-bottom", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "page-bottom", {}, void 0, true)
              ];
            }
          }),
          "doc-footer-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "doc-footer-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "doc-footer-before", {}, void 0, true)
              ];
            }
          }),
          "doc-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "doc-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "doc-before", {}, void 0, true)
              ];
            }
          }),
          "doc-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "doc-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "doc-after", {}, void 0, true)
              ];
            }
          }),
          "doc-top": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "doc-top", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "doc-top", {}, void 0, true)
              ];
            }
          }),
          "doc-bottom": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "doc-bottom", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "doc-bottom", {}, void 0, true)
              ];
            }
          }),
          "aside-top": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-top", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-top", {}, void 0, true)
              ];
            }
          }),
          "aside-bottom": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-bottom", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-bottom", {}, void 0, true)
              ];
            }
          }),
          "aside-outline-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-outline-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-outline-before", {}, void 0, true)
              ];
            }
          }),
          "aside-outline-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "aside-outline-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "aside-outline-after", {}, void 0, true)
              ];
            }
          }),
          "blog-top": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "blog-top", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "blog-top", {}, void 0, true)
              ];
            }
          }),
          "blog-bottom": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "blog-bottom", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "blog-bottom", {}, void 0, true)
              ];
            }
          }),
          "blog-archives-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "blog-archives-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "blog-archives-before", {}, void 0, true)
              ];
            }
          }),
          "blog-archives-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "blog-archives-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "blog-archives-after", {}, void 0, true)
              ];
            }
          }),
          "blog-tags-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "blog-tags-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "blog-tags-before", {}, void 0, true)
              ];
            }
          }),
          "blog-tags-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "blog-tags-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "blog-tags-after", {}, void 0, true)
              ];
            }
          }),
          "blog-tags-title-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "blog-tags-title-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "blog-tags-title-after", {}, void 0, true)
              ];
            }
          }),
          "blog-tags-content-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "blog-tags-content-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "blog-tags-content-before", {}, void 0, true)
              ];
            }
          }),
          "blog-categories-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "blog-categories-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "blog-categories-before", {}, void 0, true)
              ];
            }
          }),
          "blog-categories-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "blog-categories-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "blog-categories-after", {}, void 0, true)
              ];
            }
          }),
          "blog-categories-content-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "blog-categories-content-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "blog-categories-content-before", {}, void 0, true)
              ];
            }
          }),
          "blog-post-list-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "blog-post-list-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "blog-post-list-before", {}, void 0, true)
              ];
            }
          }),
          "blog-post-list-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "blog-post-list-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "blog-post-list-after", {}, void 0, true)
              ];
            }
          }),
          "blog-post-list-pagination-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "blog-post-list-pagination-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "blog-post-list-pagination-after", {}, void 0, true)
              ];
            }
          }),
          "blog-aside-top": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "blog-aside-top", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "blog-aside-top", {}, void 0, true)
              ];
            }
          }),
          "blog-aside-bottom": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "blog-aside-bottom", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "blog-aside-bottom", {}, void 0, true)
              ];
            }
          }),
          "blog-extract-before": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "blog-extract-before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "blog-extract-before", {}, void 0, true)
              ];
            }
          }),
          "blog-extract-after": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "blog-extract-after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "blog-extract-after", {}, void 0, true)
              ];
            }
          }),
          _: 3
        }, _parent));
      }, _push, _parent);
      _push(ssrRenderComponent($setup["VPBackToTop"], null, null, _parent));
      _push(ssrRenderComponent($setup["VPFooter"], null, null, _parent));
      ssrRenderSlot(_ctx.$slots, "layout-bottom", {}, null, _push, _parent);
      _push(`<!--]-->`);
    }
    _push(`</div>`);
  } else {
    _push(ssrRenderComponent(_component_Content, mergeProps({
      "vp-container": "",
      "vp-content": ""
    }, _attrs), null, _parent));
  }
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/layouts/Layout.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const Layout = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-fb70c005"], ["__file", "Layout.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "NotFound",
  setup(__props, { expose: __expose }) {
    __expose();
    const root = useRouteLocale();
    const { theme } = useData();
    const __returned__ = { root, theme, VPNav, VPFooter, VPSkipLink, get withBase() {
      return withBase;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    "vp-not-found": "",
    class: "theme-plume vp-layout"
  }, _attrs))} data-v-fcc695cf>`);
  ssrRenderSlot(_ctx.$slots, "layout-top", {}, null, _push, _parent);
  _push(ssrRenderComponent($setup["VPSkipLink"], null, null, _parent));
  _push(ssrRenderComponent($setup["VPNav"], null, {
    "nav-bar-title-before": withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        ssrRenderSlot(_ctx.$slots, "nav-bar-title-before", {}, null, _push2, _parent2, _scopeId);
      } else {
        return [
          renderSlot(_ctx.$slots, "nav-bar-title-before", {}, void 0, true)
        ];
      }
    }),
    "nav-bar-title-after": withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        ssrRenderSlot(_ctx.$slots, "nav-bar-title-after", {}, null, _push2, _parent2, _scopeId);
      } else {
        return [
          renderSlot(_ctx.$slots, "nav-bar-title-after", {}, void 0, true)
        ];
      }
    }),
    "nav-bar-content-before": withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        ssrRenderSlot(_ctx.$slots, "nav-bar-content-before", {}, null, _push2, _parent2, _scopeId);
      } else {
        return [
          renderSlot(_ctx.$slots, "nav-bar-content-before", {}, void 0, true)
        ];
      }
    }),
    "nav-bar-content-after": withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        ssrRenderSlot(_ctx.$slots, "nav-bar-content-after", {}, null, _push2, _parent2, _scopeId);
      } else {
        return [
          renderSlot(_ctx.$slots, "nav-bar-content-after", {}, void 0, true)
        ];
      }
    }),
    "nav-screen-content-before": withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        ssrRenderSlot(_ctx.$slots, "nav-screen-content-before", {}, null, _push2, _parent2, _scopeId);
      } else {
        return [
          renderSlot(_ctx.$slots, "nav-screen-content-before", {}, void 0, true)
        ];
      }
    }),
    "nav-screen-content-after": withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        ssrRenderSlot(_ctx.$slots, "nav-screen-content-after", {}, null, _push2, _parent2, _scopeId);
      } else {
        return [
          renderSlot(_ctx.$slots, "nav-screen-content-after", {}, void 0, true)
        ];
      }
    }),
    _: 3
  }, _parent));
  _push(`<div id="VPContent" class="vp-content" data-v-fcc695cf>`);
  ssrRenderSlot(_ctx.$slots, "not-found", {}, () => {
    var _a, _b, _c, _d, _e;
    _push(`<div class="vp-not-found" data-v-fcc695cf><p class="code" data-v-fcc695cf>${ssrInterpolate(((_a = $setup.theme.notFound) == null ? void 0 : _a.code) ?? "404")}</p><h1 class="title" data-v-fcc695cf>${ssrInterpolate(((_b = $setup.theme.notFound) == null ? void 0 : _b.title) ?? "PAGE NOT FOUND")}</h1><div class="divider" data-v-fcc695cf></div><blockquote class="quote" data-v-fcc695cf>${ssrInterpolate(((_c = $setup.theme.notFound) == null ? void 0 : _c.quote) ?? "But if you don't change your direction, and if you keep looking, you may end up where you are heading.")}</blockquote><div class="action" data-v-fcc695cf><a class="link"${ssrRenderAttr("href", $setup.withBase($setup.root))}${ssrRenderAttr("aria-label", ((_d = $setup.theme.notFound) == null ? void 0 : _d.linkLabel) ?? "go to home")} data-v-fcc695cf>${ssrInterpolate(((_e = $setup.theme.notFound) == null ? void 0 : _e.linkText) ?? "Take me home")}</a></div></div>`);
  }, _push, _parent);
  _push(`</div>`);
  _push(ssrRenderComponent($setup["VPFooter"], null, null, _parent));
  ssrRenderSlot(_ctx.$slots, "layout-bottom", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../node_modules/vuepress-theme-plume/lib/client/layouts/NotFound.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const NotFound = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-fcc695cf"], ["__file", "NotFound.vue"]]);
function globalComponents(app) {
  app.component("Badge", VPBadge);
  app.component("VPBadge", VPBadge);
  app.component("VPCard", VPCard);
  app.component("Card", VPCard);
  app.component("VPCardGrid", VPCardGrid);
  app.component("CardGrid", VPCardGrid);
  app.component("VPLinkCard", VPLinkCard);
  app.component("LinkCard", VPLinkCard);
  app.component("VPImageCard", VPImageCard);
  app.component("ImageCard", VPImageCard);
  app.component("Icon", VPIcon);
  app.component("VPIcon", VPIcon);
  app.component("HomeBox", VPHomeBox);
  app.component("VPHomeBox", VPHomeBox);
}
var config_default = defineClientConfig({
  enhance({ app, router }) {
    setupThemeData(app);
    setupDarkMode(app);
    enhanceScrollBehavior(router);
    globalComponents(app);
  },
  setup() {
    setupSidebar();
    setupHeaders();
    setupEncrypt();
    setupWatermark();
  },
  layouts: { Layout, NotFound }
});
const clientConfig11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: config_default
}, Symbol.toStringTag, { value: "Module" }));
const clientConfigs = [
  clientConfig0,
  clientConfig1,
  clientConfig2,
  clientConfig3,
  clientConfig4,
  clientConfig5,
  clientConfig6,
  clientConfig7,
  clientConfig8,
  clientConfig9,
  clientConfig10,
  clientConfig11
].map((m) => m.default).filter(Boolean);
const siteData$1 = JSON.parse('{"base":"/","lang":"ko-KR","title":"","description":"","head":[["link",{"rel":"icon","href":"/favicons/favicon.ico"}],["link",{"rel":"apple-touch-icon","sizes":"180x180","href":"/favicons/apple-touch-icon.png"}],["link",{"rel":"icon","type":"image/png","sizes":"32x32","href":"/favicons/favicon-32x32.png"}],["link",{"rel":"icon","type":"image/png","sizes":"16x16","href":"/favicons/favicon-16x16.png"}],["meta",{"name":"theme-color","content":"#5086a1"}],["meta",{"name":"apple-mobile-web-app-capable","content":"yes"}],["meta",{"name":"apple-mobile-web-app-status-bar-style","content":"black"}]],"locales":{"/":{"lang":"ko-KR","title":"카란다 Docs","description":"카란다 Docs"},"/en/":{"lang":"en-US","title":"Karanda Docs","description":"Karanda Docs"}}}');
var siteData = shallowRef(siteData$1);
var historyCreator = createMemoryHistory;
var createVueRouter = () => {
  const router = createRouter({
    // it might be an issue of vue-router that have to remove the ending slash
    history: historyCreator(removeEndingSlash("/")),
    routes: [
      {
        name: "vuepress-route",
        path: "/:catchAll(.*)",
        components: {}
      }
    ],
    scrollBehavior: (to, _from, savedPosition) => {
      if (savedPosition) return savedPosition;
      if (to.hash) return { el: to.hash };
      return { top: 0 };
    }
  });
  router.beforeResolve(async (to, from) => {
    if (to.path !== from.path || from === START_LOCATION) {
      const route = resolveRoute(to.fullPath);
      if (route.path !== to.fullPath) {
        return route.path;
      }
      const pageChunk = await route.loader();
      to.meta = {
        // attach route meta
        ...route.meta,
        // attach page chunk route meta
        _pageChunk: pageChunk
      };
    } else if (to.path === from.path) {
      to.meta = from.meta;
    }
  });
  return router;
};
var setupGlobalComponents = (app) => {
  app.component("ClientOnly", ClientOnly);
  app.component("Content", Content$1);
  app.component("RouteLink", RouteLink);
};
var setupGlobalComputed = (app, router, clientConfigs2) => {
  const routePath = computed(() => router.currentRoute.value.path);
  const pageChunk = customRef((track, trigger) => ({
    get() {
      track();
      return router.currentRoute.value.meta._pageChunk;
    },
    set(value) {
      router.currentRoute.value.meta._pageChunk = value;
      trigger();
    }
  }));
  const layouts = computed(() => resolvers.resolveLayouts(clientConfigs2));
  const routeLocale = computed(
    () => resolvers.resolveRouteLocale(siteData.value.locales, routePath.value)
  );
  const siteLocaleData = computed(
    () => resolvers.resolveSiteLocaleData(siteData.value, routeLocale.value)
  );
  const pageComponent = computed(() => pageChunk.value.comp);
  const pageData = computed(() => pageChunk.value.data);
  const pageFrontmatter = computed(() => pageData.value.frontmatter);
  const pageHeadTitle = computed(
    () => resolvers.resolvePageHeadTitle(pageData.value, siteLocaleData.value)
  );
  const pageHead = computed(
    () => resolvers.resolvePageHead(
      pageHeadTitle.value,
      pageFrontmatter.value,
      siteLocaleData.value
    )
  );
  const pageLang = computed(
    () => resolvers.resolvePageLang(pageData.value, siteLocaleData.value)
  );
  const pageLayout = computed(
    () => resolvers.resolvePageLayout(pageData.value, layouts.value)
  );
  const clientData = {
    layouts,
    pageData,
    pageComponent,
    pageFrontmatter,
    pageHead,
    pageHeadTitle,
    pageLang,
    pageLayout,
    redirects,
    routeLocale,
    routePath,
    routes,
    siteData,
    siteLocaleData
  };
  app.provide(clientDataSymbol, clientData);
  Object.defineProperties(app.config.globalProperties, {
    $frontmatter: { get: () => pageFrontmatter.value },
    $head: { get: () => pageHead.value },
    $headTitle: { get: () => pageHeadTitle.value },
    $lang: { get: () => pageLang.value },
    $page: { get: () => pageData.value },
    $routeLocale: { get: () => routeLocale.value },
    $site: { get: () => siteData.value },
    $siteLocale: { get: () => siteLocaleData.value },
    $withBase: { get: () => withBase }
  });
  return clientData;
};
var setupUpdateHead = () => {
  const head = usePageHead();
  const lang = usePageLang();
  {
    const ssrContext = useSSRContext();
    if (ssrContext) {
      ssrContext.head = head.value;
      ssrContext.lang = lang.value;
    }
    return;
  }
};
var appCreator = createSSRApp;
var createVueApp = async () => {
  var _a;
  const app = appCreator({
    name: "Vuepress",
    setup() {
      var _a2;
      setupUpdateHead();
      for (const clientConfig of clientConfigs) {
        (_a2 = clientConfig.setup) == null ? void 0 : _a2.call(clientConfig);
      }
      const rootComponents = clientConfigs.flatMap(
        ({ rootComponents: rootComponents2 = [] }) => rootComponents2.map((component) => h(component))
      );
      const pageLayout = usePageLayout();
      return () => [h(pageLayout.value), rootComponents];
    }
  });
  const router = createVueRouter();
  setupGlobalComponents(app);
  setupGlobalComputed(app, router, clientConfigs);
  for (const clientConfig of clientConfigs) {
    await ((_a = clientConfig.enhance) == null ? void 0 : _a.call(clientConfig, { app, router, siteData }));
  }
  app.use(router);
  return {
    app,
    router
  };
};
export {
  _export_sfc as _,
  useLocale as a,
  useSearchIndex as b,
  createVueApp,
  useRouteLocale as u
};
