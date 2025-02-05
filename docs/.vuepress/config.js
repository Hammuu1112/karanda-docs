import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { defineNotesConfig, plumeTheme } from 'vuepress-theme-plume'

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
            text: 'Document',
            link: '/documents/get-started/installation/'
          },
          {
            text: 'Posts',
            link: '/blog/'
          }
        ],
        notes: {
          dir: '/',
          link: '/notes/',
          notes: [
            {
              dir: 'documents',
              link: '/documents/',
              sidebar: [
                {
                  text: 'Get-started',
                  prefix: 'get-started',
                  collapsed: false,
                  items: [
                    { text: 'Installation', link: 'installation/' },
                    { text: 'Account', link: 'account/' },
                  ]
                },
                {
                  text: 'Services',
                  prefix: 'services',
                  collapsed: false,
                  items: [
                    { text: 'Ship upgrading', link: 'ship-upgrading/', icon: 'fa6-solid:ship' },
                  ]
                },
              ]
            }
          ]
        }
      },
      '/ko/': {
        selectLanguageName: '한국어',
        navbar: [
          {
            text: '문서',
            link: '/ko/documents/get-started/installation/'
          },
          {
            text: '포스트',
            link: '/ko/blog/'
          }
        ],
        notes: {
          dir: '/ko/',
          link: '/ko/notes/',
          notes: [
            {
              dir: 'documents',
              link: '/documents/',
              sidebar: [
                {
                  text: '시작하기',
                  prefix: 'get-started',
                  collapsed: false,
                  items: [
                    { text: '설치', link: 'installation/' },
                    { text: '사용자', link: 'account/' },
                  ]
                },
                {
                  text: '서비스',
                  prefix: 'services',
                  collapsed: false,
                  items: [
                    { text: '선박 증축', link: 'ship-upgrading/', icon: 'fa6-solid:ship' },
                    { text: '이벤트 캘린더', link: 'event-calendar/', icon: 'material-symbols:celebration-outline' },
                  ]
                },
              ]
            }
          ],
        },
        outlineLabel: '현재 페이지',
        nextPageLabel: '다음 페이지',
        prevPageLabel: '이전 페이지',
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