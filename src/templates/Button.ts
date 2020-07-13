import { html, svg, TemplateResult } from 'lit-html'
import { classMap } from 'lit-html/directives/class-map'

export const Button = (
  label: string,
  handleClick: () => void,
  isActive: boolean,
  hasIcon: boolean,
): TemplateResult => {
  const classes = { toggle: true, 'toggle-active': isActive }

  const icon = svg`
    <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z"/>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  `

  return html`
    <button class=${classMap(classes)} @click=${handleClick}>
      <span class="toggle-label">${label}</span> ${hasIcon ? icon : null}
    </button>
  `
}
