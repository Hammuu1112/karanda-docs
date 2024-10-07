import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { defineNotesConfig, plumeTheme } from 'vuepress-theme-plume'

export default defineUserConfig({
  lang: 'ko-KR',
  head: [
    ['link', { rel: "icon", href: "/favicons/favicon.ico" }],
    ['link', { rel: "apple-touch-icon", sizes: "180x180", href: "/favicons/apple-touch-icon.png" }],
    ['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicons/favicon-32x32.png" }],
    ['link', { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicons/favicon-16x16.png" }],
    ['meta', { name: 'theme-color', content: '#5086a1' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],
  locales: {
    '/': {
      lang: 'ko-KR',
      title: '카란다 Docs',
      description: '카란다 Docs',
    },
    '/en/': {
      lang: 'en-US',
      title: 'Karanda Docs',
      description: 'Karanda Docs',
    },
  },
  theme: plumeTheme({
    logo: './karanda_logo.png',
    plugins: {
      search: {
        locales: {
          '/': {
            placeholder: '찾아보기',
          },
          '/en/': {
            placeholder: 'Search',
          }
        }
      }
    },
    locales: {
      '/': {
        selectLanguageName: '한국어',
        navbar: [
          {
            text: '시작하기',
            link: '/docs/get-started/installation'
          }
        ],
        sidebar: {
          '/docs/': [
            {
              text: 'Get-started',
              prefix: 'get-started',
              collapsed: false,
              items: [
                {text: 'installation', link: 'installation'}
              ]
            }
          ],
        },
        notes: false,
      },
      '/en/': {
        selectLanguageName: 'English',
        navbar: [
          {
            text: 'Get-started',
            link: '/en/docs/get-started/installation/'
          }
        ],
        sidebar: {
          '/en/docs/': [
            {
              text: 'Get-started',
              prefix: 'get-started',
              items: [
                {text: 'installation', link: 'installation'}
              ]
            }
          ],
        },
        notes: false,
      }
    },
    social: [
      { icon: 'discord', link: 'https://www.discord.com' }
    ],
    footer: {
      message: 'Powered by Karanda',
      copyright: 'Copyright © 2024-Present All Rights Reserved.'
    },
    outline: [1, 6],
    blog: false,
  }),
  bundler: viteBundler(),
})