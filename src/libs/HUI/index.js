import selector from './selector'
const HUI = {}
const components = [
  selector
]
HUI.install = (Vue) => {
  components.map(comp => {
    Vue.component(comp.name, comp)
  })
}

export default HUI
