import Vue from 'vue'
import VueRouter from 'vue-router'
import store from 'store/index'

Vue.use(VueRouter)

// 登录
const LoginIndex = () => import('views/login/LoginIndex');
const Login = () => import('views/login/Login');

// 用户中心
const UserIndex = () => import('views/user/UserIndex');
const User = () => import('views/user/User');
const Search = () => import('views/user/Search');
const Tool = () => import('views/user/Tool');
const FromSub = () => import('views/user/FromSub');
const Info = () => import('views/user/Info');
const EditPass = () => import('views/user/EditPass');
const DoPage = () => import('views/user/DoPage');

const routes = [
  {
    path: '/',
    redirect: '/login/login'
  },
  {
    path: '/login',
    component: LoginIndex,
    meta: {
      islogin: false
    },
    children:[
      {
        path:'login',
        name: 'login',
        component:Login,
        meta: {
          islogin: false
        },
      }
    ],
  },
  {
    path: '/user',
    name: 'user',
    component: UserIndex,
    meta: {
      islogin: true
    },
    children:[
      {
        path:'search',
        name: 'search',
        component:Search,
        meta: {
          islogin: true
        },
      },
      {
        path:'home',
        name: 'home',
        component:User,
        meta: {
          islogin: true
        },
      },
      {
        path:'tool',
        name: 'tool',
        component:Tool,
        meta: {
          islogin: true
        },
      },
      {
        path:'fromsub/:id',
        name: 'fromsub',
        component:FromSub,
        meta: {
          islogin: true
        },
      },
      {
        path:'info',
        name: 'info',
        component:Info,
        meta: {
          islogin: true
        },
      },
      {
        path:'editpass',
        name: 'editpass',
        component:EditPass,
        meta: {
          islogin: true
        },
      },
      {
        path:'dopage',
        name: 'dopage',
        component:DoPage,
        meta: {
          islogin: true
        },
      }
    ],
  },
];
// 页面刷新时，重新赋值token
if (localStorage.getItem('sign')) {
  store.commit('login', localStorage.sign)
  store.commit('uinfo', JSON.parse(localStorage.data))
}
const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.islogin)) {
    if (store.state.sign) {
      next();
    } else {
      next({
        path: '/login/login',
        // query: {redirect: to.fullPath}
      })
    }
  }else {
    next();
  }
})

export default router
