import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login/BaseLogin'
import Music from '@/components/music/Music'
import MuiscBox from '@/components/music/MuiscBox'
import hotmusic from '@/components/music/hotmusic'
import recomond from '@/components/music/recomond'
import search from '@/components/search'
import playmusic from '@/components/playmusic'

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/Login',
      component:Login
    },
    {
      path:'/music',
      component:Music,
      children:[
        {
          path:'/',
          component:MuiscBox
        }
      ]
    },
    {
      path:'/MuiscBox',
      component:MuiscBox,
      children:[
        {
          path:'/',
          component:recomond
        },
        {
          path:'/hot',
          component:hotmusic
        },
        {
          path:'/search',
          component:search
        }
      ]
    },
    {
      path:'/play',
      name:'play',
      component:playmusic
    }

  ]
})
