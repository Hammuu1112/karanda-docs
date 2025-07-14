import {defineNotesConfig} from 'vuepress-theme-plume'

const enNotes = defineNotesConfig({
    dir: 'notes',
    link: '/',
    notes: [{
        dir: 'get-started',
        link: '/get-started/',
        sidebar: []
    }]
})

const koNotes = defineNotesConfig({
    dir: 'ko/notes',
    link: '/',
    notes: [{
        dir: 'get-started',
        link: '/get-started/',
        sidebar: []
    }]
})

module.exports = {enNotes, koNotes}