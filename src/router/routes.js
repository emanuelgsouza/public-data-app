
export default [
  {
    path: '/',
    redirect: { name: 'cep.consult' },
    component: () => import('layouts/default'),
    children: [
      {
        path: '/cep/consult',
        name: 'cep.consult',
        component: () => import('pages/cep/consult')
      },
      {
        path: '/cep/search',
        name: 'cep.search',
        component: () => import('pages/cep/search')
      }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
