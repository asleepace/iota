class ThemeToggle extends HTMLElement {
  constructor() {
      super();
      this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
      this.render();
      
      // Get root element
      this.root = document.documentElement;
      
      // Check for saved theme and apply it
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
          this.setTheme(savedTheme);
      } else {
          // Check system preference
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          this.setTheme(prefersDark ? 'dark' : 'light');
      }

      // Add click handler
      this.shadowRoot.querySelector('button').addEventListener('click', () => {
          const currentTheme = this.root.getAttribute('data-theme');
          const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
          this.setTheme(newTheme);
      });

      // Listen for system theme changes
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
          if (!localStorage.getItem('theme')) {  // Only if user hasn't set preference
              this.setTheme(e.matches ? 'dark' : 'light');
          }
      });
  }

  setTheme(theme) {
      this.root.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      
      // Update button text based on current theme
      const button = this.shadowRoot.querySelector('button');
      button.textContent = theme === 'dark' ? '🌙' : '☀️';
  }

  render() {
      this.shadowRoot.innerHTML = `
          <style>
              :host {
                  position: fixed;
                  top: 1rem;
                  right: 1rem;
                  z-index: 1000;
              }
              
              button {
                  padding: 0.5rem 1rem;
                  border-radius: 5px;
                  border: 1px solid var(--text, currentColor);
                  background: var(--background, transparent);
                  color: var(--text, currentColor);
                  cursor: pointer;
                  transition: all 0.3s ease;
                  font-size: 1.2rem;
                  line-height: 1;
              }
              
              button:hover {
                  opacity: 0.8;
                  transform: scale(1.1);
              }
          </style>
          <button aria-label="Toggle dark mode">🌓</button>
      `;
  }
}

customElements.define('theme-toggle', ThemeToggle);