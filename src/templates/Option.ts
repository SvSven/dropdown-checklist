import { html } from 'lit-html'
import { CheckboxOption } from '../types'

export const Option = (option: CheckboxOption, handleChange: Function) =>
  html`
    <li class="option">
      <label>
        <input
          type="checkbox"
          value="${option.value}"
          ?checked=${option.checked}
          @change=${(e: Event) =>
            handleChange((<HTMLInputElement>e.target).value)}
        />
        ${option.label}
      </label>
    </li>
  `
