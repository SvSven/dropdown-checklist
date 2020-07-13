import {
  html,
  css,
  LitElement,
  property,
  PropertyValues,
  TemplateResult,
  CSSResultArray,
} from 'lit-element'
import { CheckboxOption } from './types'
import { defaultTheme } from './defaultTheme'
import * as template from './templates'

export class DropdownChecklist extends LitElement {
  @property({ type: Array }) options: CheckboxOption[] = []

  @property({ type: String }) label = 'Select'

  @property({ type: Function }) handleChange!: (x: CheckboxOption[]) => void

  @property({ type: Boolean }) menuOpen = false

  @property({ type: Boolean }) hasIcon = true

  constructor() {
    super()

    const defaultChangeHandler = (): void => {
      const event = new CustomEvent('SelectionChanged', {
        detail: {
          options: this.options,
        },
      })
      this.dispatchEvent(event)
    }

    this.handleChange = this.handleChange || defaultChangeHandler
    this.__handleClickOutside = this.__handleClickOutside.bind(this)
  }

  updated(changedProperties: PropertyValues): void {
    if (changedProperties.has('options')) {
      this.handleChange(this.options)
    }
  }

  __toggleMenu(): void {
    this.menuOpen = !this.menuOpen
  }

  __selectOption(option: CheckboxOption): void {
    const oldOptions = [...this.options]
    option.checked = !option.checked
    this.requestUpdate('options', oldOptions)
  }

  __handleClickOutside(event: any): void {
    if (this.menuOpen && event.target !== this) {
      this.__toggleMenu()
    }
  }

  connectedCallback(): void {
    super.connectedCallback()
    document.addEventListener('click', this.__handleClickOutside)
  }

  disconnectedCallback(): void {
    document.removeEventListener('click', this.__handleClickOutside)
    super.disconnectedCallback()
  }

  render(): TemplateResult {
    return html`
      <div class="dropdown">
        ${template.Button(
          this.label,
          this.__toggleMenu.bind(this),
          this.menuOpen,
          this.hasIcon,
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

  static get styles(): CSSResultArray {
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
          display: flex;
          align-items: center;
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

        .toggle .icon {
          margin-left: 0.3em;
          stroke-width: 3;
          stroke: var(--button-font-color);
          width: 1.2em;
          height: 1.2em;
        }

        .toggle:hover .icon,
        .toggle-active .icon {
          stroke: var(--button-font-color-hover);
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
