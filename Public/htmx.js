class HTMXElement extends HTMLElement {
  static get observedAttributes() {
      return ['url', 'trigger', 'swap'];
  }

  constructor() {
      super();
  }

  connectedCallback() {
      const url = this.getAttribute('url') || '';
      const trigger = this.getAttribute('trigger') || 'load';
      const swap = this.getAttribute('swap') || 'innerHTML';

      // Use a regular div instead of shadow DOM
      this.innerHTML = `
          <div 
              hx-get="${url}"
              hx-trigger="${trigger}"
              hx-swap="${swap}">
              Loading...
          </div>
      `;

      // Tell HTMX to process this element
      setTimeout(() => htmx.process(this), 1_000);
  }
}

customElements.define('htmx-element', HTMXElement);