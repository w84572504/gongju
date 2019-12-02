//验证手机号
function checkPhone(phone){

  if(!(/^1\d{10}$/.test(phone))){
    return false;
  }
  return true
}
//防抖函数
const debounce = (func, wait) => {
  let timeout = '';
  return (v) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(v);
    }, wait);
  }
}
//button 按钮返回信息
function btnText(status){
  let text = "";
  //标的状态(状态0-初发布 1-初审中 2-初审未通过 3-复审中 4-复审未通过 5-筹款中 6-满标待放款 7-还款中 8-已还完 9-已流标)
  switch (status) {
    case 3:
      text='已过期'
      break;
    case 4:
      text='已满标'
      break;
    case 5:
      text='立即出借'
      break;
    case 6:
      text='满标待放款'
      break;
    case 7:
      text='还款中'
      break;
    case 8:
      text='已还完'
      break;
    default:
      text='审核中'
      break;
  }
  return text
}
export default {
  checkPhone,debounce,btnText
}