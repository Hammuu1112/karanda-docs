import { defineNotesConfig } from 'vuepress-theme-plume'

const enNotes = defineNotesConfig({
    dir: 'notes',
    link: '/',
    notes: [
        {
            dir: 'get-started',
            link: '/get-started/',
            sidebar: [
                { text: 'Introduction', link: 'introduction' },
                {
                    text: 'Installation',
                    prefix: 'installation',
                    collapsed: true,
                    items: [
                        'android',
                        'web',
                        'windows'
                    ]
                },
                { text: 'Sign Up & Log In', link: 'login' },
            ]
        },
        {
            dir: 'guides',
            link: '/guides/',
            sidebar: [
                { text: 'Ship Upgrading', link: 'ship-upgrading', icon: 'fa6-solid:ship' },
            ]
        }
    ]
})

const koNotes = defineNotesConfig({
    dir: 'notes',
    link: '/ko/',
    notes: [
        {
            dir: 'get-started',
            link: '/get-started/',
            sidebar: [
                { text: '서비스 소개', link: 'introduction' },
                {
                    text: '설치 방법',
                    prefix: 'installation',
                    collapsed: true,
                    items: [
                        'android',
                        'web',
                        'windows'
                    ]
                },
                { text: '회원가입 & 로그인', link: 'login' },
            ]
        },
        {
            dir: 'guides',
            link: '/guides/',
            sidebar: [
                { text: '선박 증축', link: 'ship-upgrading', icon: 'fa6-solid:ship' },
            ]
        }
    ]
})

module.exports = { enNotes, koNotes }