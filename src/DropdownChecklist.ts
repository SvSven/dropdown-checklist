import { html, css, LitElement, property } from 'lit-element'

export class DropdownChecklist extends LitElement {
  @property({ type: String }) title = 'Hey there'

  @property({ type: Number }) counter = 5

  __increment() {
    this.counter += 1
  }

  render() {
    return html`
      <h2>${this.title} Nr. ${this.counter}!</h2>
      <button @click=${this.__increment}>increment</button>
    `
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
    `
  }
}
