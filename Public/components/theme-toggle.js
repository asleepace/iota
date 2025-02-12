class ThemeToggle extends HTMLElement {
  constructor() {
      super();
      this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
      // Initial render
      this.render();
      
      // Check for saved theme preference
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
          document.documentElement.setAttribute('data-theme', savedTheme);
      }

      // Add click handler
      this.shadowRoot.querySelector('button').addEventListener('click', () => {
          const root = document.documentElement;
          const currentTheme = root.getAttribute('data-theme');
          const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
          
          root.setAttribute('data-theme', newTheme);
          localStorage.setItem('theme', newTheme);
      });
  }

  render() {
      this.shadowRoot.innerHTML = `
          <style>
              button {
                  position: fixed;
                  top: 1rem;
                  right: 1rem;
                  padding: 0.5rem 1rem;
                  border-radius: 5px;
                  border: 1px solid var(--text, #2c3e50);
                  background: var(--background, #fafaf8);
                  color: var(--text, #2c3e50);
                  cursor: pointer;
                  transition: all 0.3s ease;
                  font-size: 1rem;
              }
              
              button:hover {
                  opacity: 0.8;
              }
          </style>
          <button aria-label="Toggle dark mode">
              🌓
          </button>
      `;
  }
}

customElements.define('theme-toggle', ThemeToggle);