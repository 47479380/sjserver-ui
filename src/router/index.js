import Vue from 'vue'
import VueRouter from 'vue-router'
import Directory from "../views/Directory";
import Home from "../views/Home";

Vue.use(VueRouter)

  const routes = [

  {
    path: '/dir',
    name: 'directory',
    component: Directory,

  },

  {
    path: '/',
    name: 'home',
    component: Home
  },
]

const router = new VueRouter({
  mode:"history",
  routes
})
router.beforeEach((to,_,next) => {

  //给path设置默认值
  if (to.name===Directory.name&&to.query.path===undefined){
    router.push({
      path:"/dir",
      query:{
        path:""
      }
    })
  }
  next()
})

export default router
