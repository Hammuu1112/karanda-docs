import { defineClientConfig } from 'vuepress/client'
import Tabs from '/workspaces/karanda-guide/node_modules/vuepress-plugin-md-power/lib/client/components/Tabs.vue'
import CodeTabs from '/workspaces/karanda-guide/node_modules/vuepress-plugin-md-power/lib/client/components/CodeTabs.vue'
import Plot from '/workspaces/karanda-guide/node_modules/vuepress-plugin-md-power/lib/client/components/Plot.vue'
import FileTreeItem from '/workspaces/karanda-guide/node_modules/vuepress-plugin-md-power/lib/client/components/FileTreeItem.vue'

export default defineClientConfig({
  enhance({ router, app }) {
    app.component('Tabs', Tabs)
    app.component('CodeTabs', CodeTabs)
    app.component('Plot', Plot)
    app.component('FileTreeItem', FileTreeItem)
  }
})
