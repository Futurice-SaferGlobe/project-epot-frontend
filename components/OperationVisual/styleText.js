import { style } from './style'

export const styleText = selection => {
  selection
    .style('color', style.titleColor.normal)
    .style('fill', style.titleColor.normal)
    .style('font-size', style.fontSize)
    .style('font-family', 'Nunito-sans')
}
