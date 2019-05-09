import Vue from 'vue'
import Router from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import links from '../nav.route'
console.log(links)
import MintUI from 'mint-ui'
Vue.use(MintUI)

import Gheader from '@/components/GlobleHeader'
import Gfooter from '@/components/GlobleFooter'
import HelloWorld from '@/components/HelloWorld'
import Toast from '@/components/Toast'
import Tabbar from '@/components/Tabbar'
import Indicator from '@/components/Indicator'
import Loadmore from '@/components/Loadmore'
import InfiniteScroller from '@/components/InfiniteScroll'
import Message_box from '@/components/MessageBox'
import ActionSheeter from '@/components/ActionSheet'
import Popup from '@/components/Popup'
import Swipe from '@/components/Swipe'
import LazyLoad from '@/components/LazyLoad'
import Range from '@/components/Range'
import Progress from '@/components/Progress'
import Picker from '@/components/Picker'
import DateTimePicker from '@/components/DateTimePicker'
import IndexList from '@/components/IndexList'
import PaletteButton from '@/components/PaletteButton'
import MTHeader from '@/components/MTHeader'
import Navbar from '@/components/Navbar'
import PullDown from '@/components/PullDown'
import PullUp from '@/components/PullUp'
import MTButton from '@/components/MTButton'
import Cell from '@/components/Cell'
import CellSwipe from '@/components/CellSwipe'
import Spinner from '@/components/Spinner'
import TabContainer from '@/components/TabContainer'
import Search from '@/components/Search'
import Switcher from '@/components/Switch'
import CheckList from '@/components/CheckList'
import Radio from '@/components/Radio'
import Field from '@/components/Field'
import Badge from '@/components/Badge'
import Test from '@/components/Test'
import MyVue from '@/components/Test/MyVue'
import Map from '@/components/Map'
import CustomAdd from '@/components/Custom/CustomAdd'
import ReportDetail from '@/components/WorkReport/ReportDetail'
import ReportList from '@/components/WorkReport/ReportList'
import ErrorPage from '@/components/Error/ErrorPage'
import Header from '@/components/Common/Header'

Vue.component('gheader',Gheader)
Vue.component('gfooter',Gfooter)
Vue.component('myheader',Header)



Vue.use(Router)
Vue.use(BootstrapVue);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Toast',
      component: Toast
    },
    {
      path: '/Tabbar',
      component: Tabbar
    },
    {
      path: '/Indicator',
      component: Indicator
    },
    {
      path: '/Loadmore',
      component: Loadmore
    },
    {
      path: '/InfiniteScroll',
      component: InfiniteScroller
    },
    {
      path: '/MessageBox',
      component: Message_box
    },
    {
      path: '/ActionSheet',
      component: ActionSheeter
    },
    {
      path: '/Popup',
      component: Popup
    },
    {
      path: '/Swipe',
      component: Swipe
    },
    {
      path: '/LazyLoad',
      component: LazyLoad
    },
    {
      path: '/Range',
      component: Range
    },
    {
      path: '/Progress',
      component: Progress
    },
    {
      path: '/Picker',
      component: Picker
    },
    {
      path: '/DateTimePicker',
      component: DateTimePicker
    },
    {
      path: '/IndexList',
      component: IndexList
    },
    {
      path: '/PaletteButton',
      component: PaletteButton
    },
    {
      path: '/MTHeader',
      component: MTHeader
    },
    {
      path: '/Navbar',
      component: Navbar
    },
    {
      path: '/PullDown',
      component: PullDown
    },
    {
      path: '/PullUp',
      component: PullUp
    },
    {
      path: '/Button',
      component: MTButton
    },
    {
      path: '/Cell',
      component: Cell
    },
    {
      path: '/CellSwipe',
      component: CellSwipe
    },
    {
      path: '/Spinner',
      component: Spinner
    },
    {
      path: '/TabContainer',
      component: TabContainer
    },
    {
      path: '/Search',
      component: Search
    },
    {
      path: '/Switch',
      component: Switcher
    },
    {
      path: '/CheckList',
      component: CheckList
    },
    {
      path: '/Radio',
      component: Radio
    },
    {
      path: '/Field',
      component: Field
    },
    {
      path: '/Badge',
      component: Badge
    },
    {
      path: '/Test',
      component: Test
    },
    {
      path: '/MyVue',
      component: MyVue
    },
    {
      path: '/Map',
      component: Map
    },
    {
      path: '/CustomAdd',
      component: CustomAdd
    },
    {
      path: '/ReportList',
      component: ReportList
    },
    {
      path: '/ReportDetail',
      name: 'ReportDetail',
      component: ReportDetail
    },
    {
      path: '/ErrorPage',
      component: ErrorPage
    },
    {
      path: '/Header',
      component: Header
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
