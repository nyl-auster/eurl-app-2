import Vue from 'vue'
import App from 'src/App.vue'

describe('App.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(App)
    })
    expect(vm.$el.querySelector('<site-header>').textContent)
      .to.equal('BIM')
  })
})
