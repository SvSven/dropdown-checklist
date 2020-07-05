import { css } from 'lit-element'

export const defaultTheme = css`
  :host {
    --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;

    --button-padding: 0.5em 1em;
    --button-border-radius: 3px;
    --button-background: #ffffff;
    --button-border: solid 2px #1565c0;
    --button-font-color: #1565c0;
    --button-font-size: 1em;

    --button-background-hover: #1565c0;
    --button-border-hover: solid 2px #1565c0;
    --button-font-color-hover: #ffffff;

    --menu-margin: 0.5em 0 0;
    --menu-padding: 0;
    --menu-background: #ffffff;
    --menu-box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16),
      0 3px 6px rgba(0, 0, 0, 0.23);
    --menu-font-size: 1em;
    --menu-font-color: #353535;

    --option-padding: 1em;
    --option-background-hover: #e8eaf6;
    --option-font-color-hover: #353535;
    --option-background-checked: #e8eaf6;
    --option-font-color-checked: #353535;
  }
`
