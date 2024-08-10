import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'lefv.io',
  tagline: 'we are what we do',
  favicon: 'img/lefv.logo.jpeg',

  // Set the production url of your site here
  url: 'https://lefv.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'lefv-org', // Usually your GitHub org/user name.
  projectName: 'lefv-io', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/lefv_social_card.png',
    navbar: {
      title: 'lefv.io',
      logo: {
        alt: 'lefv.io',
        src: 'img/lefv.logo.jpeg',
      },
      items: [
        {
            to: '/blog', 
            label: 'Blog', 
            position: 'left'
        },
        {
          type: 'docSidebar',
          sidebarId: 'projectSideBar',
          position: 'left',
          label: 'Projects',
        },
        {
          href: 'https://github.com/gwicho38/lefv_io',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Projects',
              to: '/projects/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
                label: 'Stack Exchange',
                href: 'https://stackexchange.com/users/17999810/gwicho38'
            },
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/users/13081992/gwicho38?tab=profile',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/luis-fernandez-de-la-vara/',
            },
            {
              label: 'Twitter/X',
              href: 'https://x.com/gwicho38',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/gwicho38/lefv_io',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} lefv-org. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
