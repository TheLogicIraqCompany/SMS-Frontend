import type { VerticalNavItems } from '@/@layouts/types'

export default [
  {
    title: 'الصفحة الرئيسية',
    to: { path: '/home' },
    icon: { icon: 'tabler-home' },

    // roles: ['admin'],
  },
  {
    title: 'Second page',
    to: { name: 'second-page' },
    icon: { icon: 'tabler-file' },
  },
] as VerticalNavItems
