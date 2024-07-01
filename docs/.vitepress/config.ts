import { defineConfig } from 'vitepress';

export default defineConfig({
  title: '@abyss.ts',
  description: 'A bootstrap for Node.js frameworks.',
  srcDir: './src',
  base: '/abyss-ts/',
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
            text: 'What is @abyss.ts?',
            link: '/introduction/what-is-it',
          },
          {
            text: 'Getting Started',
            link: '/introduction/getting-started',
          },
        ],
      },
      {
        text: 'Fundamentals',
        items: [
          {
            text: 'Controller',
            link: '/fundamentals/controller',
          },
          {
            text: 'Dependency Injection',
            link: '/fundamentals/dependency-injection',
          },
        ],
      },
      {
        text: 'Changelogs',
        items: [
          {
            text: 'core',
            link: '/changelogs/core',
            docFooterText: 'Changelogs - core',
          },
          {
            text: 'express-runner',
            link: '/changelogs/express-runner',
            docFooterText: 'Changelogs - express-runner',
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
      { icon: 'github', link: 'https://github.com/zgid123/abyss-ts' },
    ],
  },
});
