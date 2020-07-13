import { html, TemplateResult } from 'lit-html'
import { classMap } from 'lit-html/directives/class-map'
import { CheckboxOption } from '../types'

export const Option = (
  option: CheckboxOption,
  handleChange: (x: CheckboxOption) => void,
): TemplateResult => {
  const classes = { option: true, 'option-checked': option.checked }

  return html`
    <li>
      <label class=${classMap(classes)}>
        <input
          class="option-checkbox"
          type="checkbox"
          value="${option.value}"
          ?checked=${option.checked}
          @change=${() => handleChange(option)}
        />
        <span class="option-text">${option.label}</span>
      </label>
    </li>
  `
}
