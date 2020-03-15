export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */'@/views/home/index'),
    meta: {
      title: '7天亲子教育线上训练营'
    }
  },
  {
    path: '/listen',
    name: 'listen',
    // route level code-splitting
    // this generates a separate chunk (listen.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "listen" */ '@/views/Listen.vue'),
    meta: {
      title: '爱家读书'
    }
  },
  {
    path: '/successSingle',
    name: 'successSingle',
    // route level code-splitting
    // this generates a separate chunk (listen.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "listen" */ '@/views/home/successSingle.vue'),
    meta: {
      title: '报名成功'
    }
  },
  {
    path: '/successGroup',
    name: 'successGroup',
    // route level code-splitting
    // this generates a separate chunk (listen.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "listen" */ '@/views/home/successGroup.vue'),
    meta: {
      title: '邀新人拼团'
    }
  },
  {
    path: '/mainWx',
    name: 'mainWx',
    // route level code-splitting
    // this generates a separate chunk (listen.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "mainWx" */ '@/views/home/mainWx.vue'),
    meta: {
      title: '《7天亲子活动训练营》拼团'
    }
  },
  {
    path: '/successWx',
    name: 'successWx',
    component: () => import(/* webpackChunkName: "listen" */ '@/views/home/successWx.vue'),
    meta: {
      title: '邀新人拼团'
    }
  },
  {
    path: '/audio',
    name: 'audio',
    component: () => import(/* webpackChunkName: "listen" */ '@/views/audio.vue'),
    meta: {
      title: '邀拼团audio'
    }
  },
  {
    path: '/audioXG',
    name: 'audioXG',
    component: () => import(/* webpackChunkName: "listen" */ '@/views/audioXG.vue'),
    meta: {
      title: '邀迭代拼团audio'
    }
  },
  {
    path: '/echarts',
    name: 'echarts',
    component: () => import(/* webpackChunkName: "listen" */ '@/views/echarts.vue'),
    meta: {
      title: '邀迭代拼团audio'
    }
  },
]