import { html, css, LitElement, property } from 'lit-element'
import { CheckboxOption } from './types'
import * as template from './templates'

export class DropdownChecklist extends LitElement {
  @property({ type: Array }) options: CheckboxOption[] = []

  @property({ type: String }) label = 'Select'

  @property({ type: Function }) handleChange!: Function

  @property({ type: Boolean }) menuOpen = false

  public selectedOptions: String[] = []

  updated() {
    this.selectedOptions = this.options
      .filter((i: CheckboxOption) => i.checked)
      .map((i: CheckboxOption) => i.value)
  }

  __toggleMenu() {
    this.menuOpen = !this.menuOpen
    this.requestUpdate()
  }

  __selectOption(value: string) {
    this.selectedOptions = this.selectedOptions.includes(value)
      ? this.selectedOptions.filter((i) => i !== value)
      : [...this.selectedOptions, value]

    this.handleChange(this.selectedOptions)
  }

  render() {
    return html`
      <div class="dropdown">
        ${template.Button(this.label, this.__toggleMenu.bind(this))}
        ${this.menuOpen
          ? html`
              <ul class="menu">
                ${this.options.length > 0
                  ? this.options.map((option: CheckboxOption) =>
                      template.Option(option, this.__selectOption.bind(this)),
                    )
                  : 'No available options.'}
              </ul>
            `
          : null}
      </div>
    `
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      .dropdown {
        position: relative;
      }

      .toggle {
      }

      .menu {
        position: absolute;
        list-style: none;
        padding: 1em;
        background: #fff;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
      }

      .option {
        margin-bottom: 0.5em;
      }

      .option:last-child {
        margin-bottom: 0;
      }
    `
  }
}
