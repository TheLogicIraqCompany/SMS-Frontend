import type { HorizontalNavItems } from '@layouts/types'

export default [
  {
    title: 'الصفحة الرئيسية',
    to: { path: '/home' },
    icon: { icon: 'tabler-home' },

    // roles: ['admin'],
  },
  {
    title: 'الرسائل  ',
    to: { path: '/messages' },
    icon: { icon: 'tabler-messages' },

    // roles: ['admin'],
  },
  {
    title: 'المشاريع  ',
    to: { path: '/projects' },
    icon: { icon: 'tabler-devices-down' },

    // roles: ['admin'],
  },
  {
    title: 'المحفظة  ',
    to: { path: '/balance' },
    icon: { icon: 'tabler-coins' },

    // roles: ['admin'],
  },
] as HorizontalNavItems
