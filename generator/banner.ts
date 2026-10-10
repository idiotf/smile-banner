export interface BannerGeneratingOptions {
  imageUrl?: string
  backgroundColor: string
  spaceHeight: number
  selectedIconHtml: string
}

export function generateBannerSvg(options: BannerGeneratingOptions) {
  return `<svg xmlns="http://www.w3.org/2000/svg">${
    `<style>${
      `#t{transform:translate(0,calc(100% - ${options.spaceHeight}px))}` +
      `#e{transform:translate(calc(50% - 417px))}` +
      `@media(max-width:1199px){#e{transform:translate(154px)}}` +
      `@media(max-width:767px){#e{transform:translate(120px)}}` +
      `#i{height:calc(100% - 16px)}` +
      `#t>rect{width:92520px;height:${options.spaceHeight + 4}px;fill:#fff}` +
      (options.imageUrl === undefined
        ? ''
        : `#a{${
            `transform:translate(calc(50% - 600px));` +
            `height:calc(100% - ${options.spaceHeight}px)`
          }}`)
    }</style>` +
    `<rect ${
      `id="i" ` +
      `width="100%" ` +
      `height="100%" ` +
      `fill="${options.backgroundColor}"`
    }/>` +
    (options.imageUrl === undefined
      ? ''
      : `<image ${
          `id="a" ` +
          `href="${options.imageUrl}" ` +
          `width="1200" ` +
          `height="${210 - options.spaceHeight}" ` +
          `preserveAspectRatio="xMidYMid slice"`
        }/>`) +
    `<g id="t">${
      `<rect/>`.repeat(64) + `<g id="e">${options.selectedIconHtml}</g>`
    }</g>`
  }</svg>`
}
