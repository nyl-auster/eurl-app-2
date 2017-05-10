import PageAide from './components/PageAide'
import PageSimulateur from './components/PageSimulateur'
import PageAPropos from './components/PageAPropos'
import PageContact from './components/PageContact'
import PageChangelog from './components/PageChangelog'
import PageBlog from './components/PageBlog'
import PageNotFound from './components/PageNotFound'
import PageBlogSingle from './components/PageBlogSingle'

export default [
  { path: '/', component: PageSimulateur },
  { path: '/aide', component: PageAide },
  { path: '/apropos', component: PageAPropos },
  { path: '/contact', component: PageContact },
  { path: '/changelog', component: PageChangelog },
  { path: '/blog', component: PageBlog },
  { path: '/blog/:id', component: PageBlogSingle },
  { path: '*', component: PageNotFound }
]
