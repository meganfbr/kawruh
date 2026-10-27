
import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Welcome to Kawruh',
    },
    {
      type: 'category',
      label: 'Python Programming',
      collapsed: false,
      link: {
        type: 'generated-index',
        title: 'Python Programming',
        description:
          'Pelajari Python dari dasar hingga penerapannya dalam Data Science dan Artificial Intelligence.',
        slug: '/python',
      },
      items: [
        {
          type: 'doc',
          id: 'python/getting-started',
          label: 'Getting Started',
        },
        {
          type: 'doc',
          id: 'python/introduction',
          label: 'Python Introduction',
        },
        {
          type: 'doc',
          id: 'python/variables',
          label: 'Variables',
        },
        {
          type: 'doc',
          id: 'python/data-types',
          label: 'Data Types',
        },
        {
          type: 'doc',
          id: 'python/operators',
          label: 'Operators',
        },
        {
          type: 'doc',
          id: 'python/strings',
          label: 'Strings',
        },
        {
          type: 'doc',
          id: 'python/numbers',
          label: 'Numbers',
        },
        {
          type: 'doc',
          id: 'python/booleans',
          label: 'Booleans',
        },
        {
          type: 'doc',
          id: 'python/lists',
          label: 'Lists',
        },
        {
          type: 'doc',
          id: 'python/tuples',
          label: 'Tuples',
        },
        {
          type: 'doc',
          id: 'python/sets',
          label: 'Sets',
        },
        {
          type: 'doc',
          id: 'python/dictionaries',
          label: 'Dictionaries',
        },
        {
          type: 'doc',
          id: 'python/conditions',
          label: 'Conditions',
        },
        {
          type: 'doc',
          id: 'python/loops',
          label: 'Loops',
        },
        {
          type: 'doc',
          id: 'python/functions',
          label: 'Functions',
        },
        {
          type: 'doc',
          id: 'python/input-output',
          label: 'Input And Output',
        },
        {
          type: 'doc',
          id: 'python/exceptions',
          label: 'Exceptions',
        },
        {
          type: 'doc',
          id: 'python/modules',
          label: 'Modules',
        },
        {
          type: 'doc',
          id: 'python/file-handling',
          label: 'File Handling',
        },
        {
          type: 'doc',
          id: 'python/comprehensions',
          label: 'Comprehensions',
        },
        {
          type: 'doc',
          id: 'python/classes-objects',
          label: 'Classes And Objects',
        },
        {
          type: 'doc',
          id: 'python/python-for-data-science',
          label: 'Python For Data Science',
        },
      ],
    },
  ],
};

export default sidebars;
