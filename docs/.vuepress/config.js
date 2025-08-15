import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { defineNotesConfig, plumeTheme } from 'vuepress-theme-plume'
import { enNotes, koNotes } from './route.js'

export default defineUserConfig({
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
      lang: 'en-US',
      title: 'Karanda Docs',
      description: 'Karanda Docs',
    },
    '/ko/': {
      lang: 'ko-KR',
      title: '카란다 Docs',
      description: '카란다 Docs',
    },
  },
  theme: plumeTheme({
    logo: './karanda_logo.png',
    plugins: {
      search: {
        locales: {
          '/': {
            placeholder: 'Search',
          },
          '/ko/': {
            placeholder: '찾아보기',
          },
        }
      }
    },
    autoFrontmatter: {
      createTime: false,
    },
    locales: {
      '/': {
        selectLanguageName: 'English',
        navbar: [
          {
            text: 'Getting Started',
            link: '/get-started/introduction/'
          },
          {
            text: 'Feature Guide',
            link: '/guides/ship-upgrading/'
          },
          {
            text: 'Posts',
            link: '/blog/'
          }
        ],
        notes: enNotes
      },
      '/ko/': {
        selectLanguageName: '한국어',
        navbar: [
          {
            text: '시작하기',
            link: '/ko/get-started/introduction/'
          },
          {
            text: '사용 가이드',
            link: '/ko/guides/ship-upgrading/'
          },
          {
            text: '포스트',
            link: '/ko/blog/'
          }
        ],
        notes: koNotes,
      },
    },
    social: [
      { icon: 'discord', link: 'https://www.discord.com' }
    ],
    footer: {
      message: 'Powered by Karanda',
      copyright: 'Copyright © 2024-Present All Rights Reserved.'
    },
    outline: [1, 6],
    blog: {
      exclude: ['.vuepress/', '**/README.md'],
    },
    lastUpdated: false
  }),
  bundler: viteBundler(),
})