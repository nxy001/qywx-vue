/*
 * @Descripttion: rem适配
 * @Author: nixy
 * @Date: 2020/7/14 10:21
 * @LastEditors: NIXY
 * @LastEditTime: 2022-03-03 10:26:21
 */

export const computRem = (doc, win, designWidth) => {
  const docEl = doc.documentElement
  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  const recalc = function () {
    const clientWidth = docEl.clientWidth
    if (!clientWidth) return
    docEl.style.fontSize = 100 * (clientWidth / designWidth || 800) + 'px'
  }
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  recalc()
}
export const nowSize = (val, initWidth = 800) => {
  const nowClientWidth = document.documentElement.clientWidth
  return val * (nowClientWidth / initWidth) + 2
}
