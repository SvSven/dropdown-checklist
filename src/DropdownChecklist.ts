import { html, css, LitElement, property, PropertyValues } from 'lit-element'
import { CheckboxOption } from './types'
import { defaultTheme } from './defaultTheme'
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
        ${template.Button(
          this.label,
          this.__toggleMenu.bind(this),
          this.menuOpen,
        )}
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
    return [
      defaultTheme,
      css`
        :host {
          display: block;
          font-family: var(--font-family);
        }

        .dropdown {
          display: inline-block;
          position: relative;
        }

        .toggle {
          display: inline-block;
          cursor: pointer;
          padding: var(--button-padding);
          background: var(--button-background);
          border: var(--button-border);
          border-radius: var(--button-border-radius);
          color: var(--button-font-color);
          font-size: var(--button-font-size);
          transition: var(--button-transition);
        }

        .toggle:hover,
        .toggle-active {
          background: var(--button-background-hover);
          border: var(--button-border-hover);
          color: var(--button-font-color-hover);
        }

        .menu {
          position: absolute;
          width: max-content;
          list-style: none;
          margin: var(--menu-margin);
          padding: var(--menu-padding);
          background: var(--menu-background);
          box-shadow: var(--menu-box-shadow);
          font-size: var(--menu-font-size);
          color: var(--menu-font-color);
        }

        .option {
          display: flex;
          align-items: center;
          padding: var(--option-padding);
          cursor: pointer;
        }

        .option:hover {
          background: var(--option-background-hover);
          color: var(--option-font-color-hover);
        }

        .option-checked {
          background: var(--option-background-checked);
          color: var(--option-font-color-checked);
        }

        .option-checkbox,
        .option-text {
          display: inline-block;
        }

        .option-checkbox {
          margin-right: 8px;
        }
      `,
    ]
  }
}
