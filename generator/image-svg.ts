export function generateImageSvg(blobUrl: string, width: number, height: number) {
  return `<image href="${blobUrl}" width="${width}" height="${height}"/>`
}
