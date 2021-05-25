// import { chunkArr } from './utils'
function Fn (state, props, ctx) {
  return {
    getData: function (data) {
      if (!Array.isArray(data)) {
        state.menuData = []
        state.originMenu = state.menuData
        return
      }
      const _data = JSON.parse(JSON.stringify(data))
      const value = props.defaultPorp.value
      const label = props.defaultPorp.label

      const hData = _data.map(item => {
        state.menuMap[item[value]] = item
        item.hValue = item[value]
        item.hText = item[label]
        item.hLabel = item[label]
        return item
      })
      // console.log('[处理过的data]', hData)
      state.menuData = hData
      state.originMenu = state.menuData // 存储一份用来筛选
    }
  }
}
export default Fn
