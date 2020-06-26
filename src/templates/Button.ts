import { html } from 'lit-html'

export const Button = (label: string, handleClick: Function) =>
  html` <button class="toggle" @click=${handleClick}>${label}</button> `
