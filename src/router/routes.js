
export default [
  {
    path: '/',
    redirect: { name: 'cep.index' },
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/index') },
      {
        path: '/cep',
        name: 'cep.index',
        redirect: { name: 'cep.consult' },
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
      }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
