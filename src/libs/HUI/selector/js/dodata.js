// import { chunkArr } from './utils'
function Fn (state, props, ctx) {
  return {
    getData: function (data) {
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

      // // 对数组进行分页处理
      // if (hData.length <= 20) {
      //   state.menuData = hData
      //   state.originMenu = state.menuData // 存储一份用来筛选
      // } else {
      //   // 保存分页信息
      //   state.scrollInfo.data = chunkArr(hData, state.scrollInfo.size)
      //   state.scrollInfo.count = hData.length
      //   state.scrollInfo.pageCount = state.scrollInfo.data.length

      //   // 初始为第一页
      //   state.menuData = state.scrollInfo.data[0]
      //   state.originMenu = state.scrollInfo.data[0] // 存储一份用来筛选

      //   console.log('scroll info', state.scrollInfo)
      // }
    }
  }
}
export default Fn
