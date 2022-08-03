export const formatNumber = (val) => {
  if (!val) {
    return "0"
  }
  return val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
}

export function shortWalletAddr(address) {
  if(address) 
      return address.slice(0,5) + "..." + address.slice(-4)
  return '';
}

export function decodeBase64(data, sliceLength) {
  if (!data)
    return null
  
  // remove leading part
  let base64Part = data.slice(sliceLength)

  try {
    let utf8String = decodeURIComponent(escape(window.atob(base64Part)))
    return utf8String
  }
  catch (error) {
    return null
  }
}