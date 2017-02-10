import PageAide from './components/PageAide'
import PageSimulateur from './components/PageSimulateur'
import PageAPropos from './components/PageAPropos'
import PageContact from './components/PageContact'
import PageNotFound from './components/PageNotFound'

export default [
  { path: '/', component: PageSimulateur },
  { path: '/aide', component: PageAide },
  { path: '/apropos', component: PageAPropos },
  { path: '/contact', component: PageContact },
  { path: '*', component: PageNotFound }
]
