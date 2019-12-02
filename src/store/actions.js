export default{
  alogin: ({commit }, data) => {
    commit('login',data)
  },
  uinfo:({commit }, data) => {
    commit('uinfo',data)
  },
  alogout: ({commit }) => {
    commit('logout')
  },
}