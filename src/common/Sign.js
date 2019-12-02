import md5 from 'js-md5';

function Sign(url,list,SID = null){
  let obj = {}
  let tmp = Date.parse( new Date() ).toString();
  let uix = tmp.substr(0,10);
  let args = "";
  let argss = "";
  let newkey = Object.keys(list).sort();
  for(let i = 0; i < newkey.length; i++) {
    obj[newkey[i]] =list[newkey[i]]
    args +="&"+newkey[i]+"="+list[newkey[i]]
  }
  if (args !== '' && args !== undefined){
    args = args.substr(1,args.length-1);
  }
  let min = parseInt(Math.random()*27)
  if (args !== '' && args !== undefined){
    args = md5(args)
  }else{
    args = 'd41d8cd98f00b204e9800998ecf8427e'
  }
  args = args.toUpperCase()
  let mod = args.substring(min,min+4)
  if (SID){
    obj.bcsid = SID
  }
  obj.min= min
  obj.mod = mod
  obj.uix = uix
  let newkeys = Object.keys(obj).sort();
  for(let i = 0; i < newkeys.length; i++) {
    argss +=newkeys[i]+obj[newkeys[i]]
  }
  let mixSign = md5(uix+min+argss+mod+uix)
  let maxSign = mixSign.toUpperCase()
  let xCont = uix +'_'+mod +'_'+maxSign +'_'+min
  return xCont
}

export default {
  Sign
}