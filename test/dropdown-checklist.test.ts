import { html, fixture, expect } from '@open-wc/testing';

import {DropdownChecklist} from '../src/DropdownChecklist.js';
import '../dropdown-checklist.js';

describe('DropdownChecklist', () => {
  it('has a default title "Hey there" and counter 5', async () => {
    const el: DropdownChecklist = await fixture(html`
      <dropdown-checklist></dropdown-checklist>
    `);

    expect(el.title).to.equal('Hey there');
    expect(el.counter).to.equal(5);
  });

  it('increases the counter on button click', async () => {
    const el: DropdownChecklist = await fixture(html`
      <dropdown-checklist></dropdown-checklist>
    `);
    el.shadowRoot!.querySelector('button')!.click();

    expect(el.counter).to.equal(6);
  });

  it('can override the title via attribute', async () => {
    const el: DropdownChecklist = await fixture(html`
      <dropdown-checklist title="attribute title"></dropdown-checklist>
    `);

    expect(el.title).to.equal('attribute title');
  });

  it('passes the a11y audit', async () => {
    const el: DropdownChecklist = await fixture(html`
      <dropdown-checklist></dropdown-checklist>
    `);

    await expect(el).shadowDom.to.be.accessible();
  });
});
