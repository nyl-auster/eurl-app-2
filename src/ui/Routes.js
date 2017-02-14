import PageAide from './components/PageAide'
import PageSimulateur from './components/PageSimulateur'
import PageAPropos from './components/PageAPropos'
import PageContact from './components/PageContact'
import PageQuestionsEtReponses from './components/PageQuestionsEtReponses'
import PageChangelog from './components/PageChangelog'
import PageNews from './components/PageNews'
import PageNotFound from './components/PageNotFound'

export default [
  { path: '/', component: PageSimulateur },
  { path: '/aide', component: PageAide },
  { path: '/apropos', component: PageAPropos },
  { path: '/contact', component: PageContact },
  /*{ path: '/questions-et-reponses', component: PageQuestionsEtReponses },*/
  { path: '/changelog', component: PageChangelog },
  { path: '/news', component: PageNews },
  { path: '*', component: PageNotFound }
]
