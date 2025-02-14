//
//  status-badge.js
//  iota
//
//  Created by Colin Teahan on 2/14/25.
//
//  Check the status by hitting our /ping endpoint
//

class StatusBadge extends HTMLElement {
    
    static {
        console.log('[status-toggle] defining status badge!')
        customElements.define('status-badge', StatusBadge);
    }
    
    static styles() { return `
    
    #container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex: 1;
    }

    .online {  background-color: #4CAF50; }
    .offline{  background-color: #f44336; }
    
    .col {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 28px;
        flex: 1;
    }

    #txt {
        text-align: center;
        display: flex;
        flex: 1;
    }
        
    #indicator {
        background-color: #f44336;
        width: 12px;
        height: 100%;
        display: flex;
    }

        
    :host {
        border-left: 2px solid var(--code-bg);
        background: var(--code-bg);
        color: var(--blockquote-text);
        font-size: 13px;
        overflow: hidden;
        display: flex;
        flex-direction: row;
        border-radius: 6px;
        max-width: 96px;
    }
    `}
    
    state = {
        isOnline: false
    }
    
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        const stylesheet = document.createElement('style');
        stylesheet.textContent = StatusBadge.styles();
        
        const content = document.createElement('div')
        content.setAttribute('id', 'container')
        content.innerHTML = `
        <div class="col" id="indicator"></div>
        <div class="col" id="txt">
            <span>connected<span>
        </div>`
        
        this.shadowRoot.appendChild(stylesheet);
        this.shadowRoot.appendChild(content);
    }
    
    async fetchStatus() {
        console.log('[status-toggle] fetching...')
        return fetch('/ping', { method: 'POST' })
            .then((res) => {
                console.log('[status-badge] connected:', res.ok)
                this.state.isOnline = res.ok;
            })
            .catch((err) => {
                console.log('[status-badge] error:', err)
                this.state.isOnline = false;
            })
            .finally(() => {
                this.render()
            })
        
    }


  connectedCallback() {
      this.render();
      this.fetchStatus();
  }

  render() {
      const template = this.shadowRoot.getElementById('indicator')
      template.setAttribute("class", this.state.isOnline ? "online" : "offline");
  }
}
