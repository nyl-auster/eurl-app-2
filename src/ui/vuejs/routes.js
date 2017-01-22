import PageAide from './components/pages/PageAide'
import PageSimulateur from './components/pages/PageSimulateur'
import PageAPropos from './components/pages/PageAPropos'
import PageContact from './components/pages/PageContact'
import PageNotFound from './components/pages/PageNotFound'

export default [
  { path: '/', component: PageSimulateur },
  { path: '/aide', component: PageAide },
  { path: '/apropos', component: PageAPropos },
  { path: '/contact', component: PageContact },
  { path: '*', component: PageNotFound }
]
