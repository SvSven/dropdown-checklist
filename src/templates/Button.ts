import { html, TemplateResult } from 'lit-html'
import { classMap } from 'lit-html/directives/class-map'

export const Button = (
  label: string,
  handleClick: () => void,
  isActive: boolean,
): TemplateResult => {
  const classes = { toggle: true, 'toggle-active': isActive }

  return html`
    <button class=${classMap(classes)} @click=${handleClick}>${label}</button>
  `
}
