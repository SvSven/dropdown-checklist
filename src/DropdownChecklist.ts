import { html, css, LitElement, property, PropertyValues } from 'lit-element'
import { CheckboxOption } from './types'
import * as template from './templates'

export class DropdownChecklist extends LitElement {
  @property({ type: Array }) options: CheckboxOption[] = []

  @property({ type: String }) label = 'Select'

  @property({ type: Function }) handleChange!: Function

  @property({ type: Boolean }) menuOpen = false

  constructor() {
    super()

    const defaultChangeHandler = () => {
      const event = new CustomEvent('SelectionChanged', {
        detail: {
          options: this.options,
        },
      })
      this.dispatchEvent(event)
    }

    this.handleChange = this.handleChange || defaultChangeHandler
  }

  updated(changedProperties: PropertyValues) {
    if (changedProperties.has('options')) {
      this.handleChange(this.options)
    }
  }

  __toggleMenu() {
    this.menuOpen = !this.menuOpen
  }

  __selectOption(option: CheckboxOption) {
    const oldOptions = [...this.options]
    option.checked = !option.checked
    this.requestUpdate('options', oldOptions)
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
