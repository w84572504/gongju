export default{
  login: (state, data) => {
    localStorage.setItem('sign', data);
    state.sign = data;
  },
  uinfo: (state, data) => {
    localStorage.setItem('data', JSON.stringify(data));
    state.user = JSON.stringify(data);
  },
  logout: (state) => {
    localStorage.removeItem('sign');
    localStorage.removeItem('data');
    state.sign = null
    state.user = {}
  },
  showLoading(state){
    state.LOADING = true
  },
  hideLoading (state) {
    state.LOADING = false
  }
}