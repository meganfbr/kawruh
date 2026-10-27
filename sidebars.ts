
import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Python Programming',
      collapsed: false,
      link: {
        type: 'generated-index',
        title: 'Python Programming',
        description: 'Pelajari Python dari dasar.',
        slug: '/python',
      },
      items: [
        'python/getting-started',
        'python/introduction',
      ],
    },
  ],
};

export default sidebars;
