import { html, fixture, expect, oneEvent } from '@open-wc/testing'

import { DropdownChecklist } from '../src/DropdownChecklist'
import '../dropdown-checklist'

import * as template from '../src/templates'

const mockOptions = [
  {
    label: 'Test checked',
    value: 'checked',
    checked: true,
  },
  {
    label: 'Test unchecked',
    value: 'unchecked',
    checked: false,
  },
]

describe('DropdownChecklist', async () => {
  const Dropdown: DropdownChecklist = await fixture(html`
    <dropdown-checklist
      .options=${mockOptions}
      .label="Dropdown"
    ></dropdown-checklist>
  `)

  it('DropdownChecklist has default property values', async () => {
    const el: DropdownChecklist = await fixture(html`
      <dropdown-checklist></dropdown-checklist>
    `)

    expect(el.label).to.equal('Select')
    expect(el.options.length).to.equal(0)
  })

  it('menu displays placeholder text if no options available', async () => {
    const el: DropdownChecklist = await fixture(html`
      <dropdown-checklist .menuOpen=${true}></dropdown-checklist>
    `)

    expect(
      el.shadowRoot!.querySelector('.menu')?.textContent?.trim(),
    )!.to.equal('No available options.')
  })

  it('toggles the menu open and closed', async () => {
    expect(Dropdown.menuOpen).to.be.false
    expect(Dropdown.shadowRoot!.querySelector('.menu'))!.to.be.null

    await Dropdown.__toggleMenu()
    expect(Dropdown.menuOpen).to.be.true
    expect(Dropdown.shadowRoot!.querySelector('.menu'))!.to.not.be.null

    await Dropdown.__toggleMenu()
    expect(Dropdown.menuOpen).to.be.false
    expect(Dropdown.shadowRoot!.querySelector('.menu'))!.to.be.null
  })

  it('toggles selected options', async () => {
    Dropdown.__selectOption(mockOptions[1])
    expect(Dropdown.options[1].checked).to.be.true

    const { detail } = await oneEvent(Dropdown, 'SelectionChanged')
    expect(detail.options).to.not.be.null
    expect(detail.options[1].checked).to.be.true

    Dropdown.__selectOption(mockOptions[1])
    expect(Dropdown.options[1].checked).to.be.false
    expect(detail.options[1].checked).to.be.false

    await Dropdown.__toggleMenu()
    const el = Dropdown.shadowRoot?.querySelector(
      `input[value="${mockOptions[1].value}"]`,
    )
    el!.dispatchEvent(new Event('change'))
    expect(Dropdown.options[1].checked).to.be.true
  })

  it('DropdownChecklist passes the a11y audit', async () => {
    expect(Dropdown).shadowDom.to.be.accessible()
  })
})

describe('Button template', async () => {
  const Button = await fixture(
    template.Button('Select', () => true, false, true),
  )

  it('renders the Button with correct label', () => {
    expect(Button.querySelector('.toggle-label')?.textContent).to.equal(
      'Select',
    )
  })

  it('renders an icon on the toggle button if set to true', () => {
    expect(Button.querySelector('.icon')).to.not.be.null
  })

  it('does not render an icon on the toggle button if set to false', async () => {
    const btn = await fixture(
      template.Button('Select', () => true, false, false),
    )
    expect(btn.querySelector('.icon')).to.be.null
  })

  it('Button passes a11y audit', () => {
    expect(Button).to.be.accessible()
  })
})

describe('Option template', async () => {
  const Option = await fixture(
    template.Option(mockOptions[0], () => {
      Option.dispatchEvent(new CustomEvent('done', { detail: true }))
      return true
    }),
  )

  it('renders the Option with correct label', () => {
    expect(Option.querySelector('label')!.textContent?.trim()).to.equal(
      mockOptions[0].label,
    )
  })

  it('renders the Option with correct value', () => {
    expect(Option.querySelector('input')!.value).to.equal(mockOptions[0].value)
  })

  it('renders the Option with checked attribute if checked is true', () => {
    expect(Option.querySelector('input')!.getAttribute('checked')).to.exist
  })

  const OptionUnchecked = await fixture(
    template.Option(mockOptions[1], () => true),
  )

  it('renders the Option without checked attribute if checked is false', () => {
    expect(OptionUnchecked.querySelector('input')!.getAttribute('checked')).to
      .not.exist
  })

  it('Option passes a11y audit', () => {
    expect(Option).to.be.accessible()
  })
})
