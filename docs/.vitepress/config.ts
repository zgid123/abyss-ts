import { defineConfig } from 'vitepress';

export default defineConfig({
  title: '@abyssts',
  description: 'A bootstrap for Node.js frameworks.',
  srcDir: './src',
  base: '/abyssts/',
  themeConfig: {
    nav: [
      {
        text: 'Guide',
        link: '/introduction/what-is-it',
      },
    ],
    sidebar: [
      {
        text: 'Introduction',
        items: [
          {
            text: 'What is @abyssts?',
            link: '/introduction/what-is-it',
          },
          {
            text: 'Getting Started',
            link: '/introduction/getting-started',
          },
        ],
      },
      {
        text: 'Changelogs',
        items: [
          {
            text: 'core',
            link: '/changelogs/core',
          },
          {
            text: 'express-runner',
            link: '/changelogs/express-runner',
          },
        ],
      },
    ],
    outline: {
      level: 'deep',
      label: 'On this page',
    },
    lastUpdated: {
      text: 'Last updated',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium',
      },
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/zgid123/abyssts' },
    ],
  },
});