import { html, fixture, expect } from '@open-wc/testing'

import { DropdownChecklist } from '../src/DropdownChecklist.js'
import '../dropdown-checklist.js'

describe('DropdownChecklist', () => {
  it('passes the a11y audit', async () => {
    const el: DropdownChecklist = await fixture(html`
      <dropdown-checklist></dropdown-checklist>
    `)

    await expect(el).shadowDom.to.be.accessible()
  })
})
