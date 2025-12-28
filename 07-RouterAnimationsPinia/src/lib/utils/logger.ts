import type { NavigationGuard } from 'vue-router'

// use negative hues for b/w bg: -1 black ... -100 white
const getStyles = (hue: number) => {
  const isGrey = hue < 0
  const h = isGrey ? 0 : hue % 360
  const s = isGrey ? 0 : 50
  const l = isGrey ? Math.min(Math.abs(hue), 100) : 50

  const color = isGrey && l > 50 ? 'black' : 'white'
  const background = `hsl(${h}, ${s}%, ${l}%)`
  return `color: ${color}; background: ${background}; padding: 2px 4px;`
}

interface RouteLogger {
  header: string
      to: NavigationGuard['arguments']
    from: NavigationGuard['arguments']
   next?: NavigationGuard['arguments']
     hue: number
}

export default function routeLogger({ header, to, from, next, hue }: RouteLogger) {
  const style = getStyles(hue)

  const message = `
${header}
to:        ${to.fullPath}
from:      ${from.fullPath}
!!next()?: ${!!next}
`.trim()

  console.log(`%c${message}`, style)
}
