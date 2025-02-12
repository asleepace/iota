// components/theme-toggle.js
class ThemeToggle extends HTMLElement {
  constructor() {
      super();
      this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
      this.render();
      
      // Initialize theme based on stored preference or system setting
      this.initializeTheme();
  }

  initializeTheme() {
      // Check for saved theme
      const savedTheme = localStorage.getItem('theme');
      console.log('[theme-toggle] Initializing with saved theme:', savedTheme);

      if (savedTheme) {
          this.dispatchThemeEvent(savedTheme);
      } else {
          // Check system preference
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          console.log('[theme-toggle] No saved theme, system prefers dark:', prefersDark);
          this.dispatchThemeEvent(prefersDark ? 'dark' : 'light');
      }

      // Add click handler
      const button = this.shadowRoot.querySelector('button');
      button.addEventListener('click', () => {
          const currentTheme = document.documentElement.getAttribute('data-theme');
          const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
          this.dispatchThemeEvent(newTheme);
      });

      // Listen for system theme changes
      window.matchMedia('(prefers-color-scheme: dark)')
          .addEventListener('change', (e) => {
              if (!localStorage.getItem('theme')) {
                  console.log('[theme-toggle] System theme changed:', e.matches ? 'dark' : 'light');
                  this.dispatchThemeEvent(e.matches ? 'dark' : 'light');
              }
          });
  }

  dispatchThemeEvent(theme) {
      // Dispatch a custom event that will be handled by the parent document
      const event = new CustomEvent('theme-change', {
          bubbles: true,
          composed: true,
          detail: { theme }
      });
      this.dispatchEvent(event);
      
      // Update button text
      const button = this.shadowRoot.querySelector('button');
      button.textContent = theme === 'dark' ? '🌙' : '☀️';
  }

  render() {
      const template = document.createElement('template');
      template.innerHTML = `
          <style>
              button {
                  position: fixed;
                  top: 1rem;
                  right: 1rem;
                  padding: 0.5rem 1rem;
                  border-radius: 5px;
                  border: 1px solid var(--text);
                  background: var(--background);
                  color: var(--text);
                  cursor: pointer;
                  transition: all 0.3s ease;
                  font-size: 1.2rem;
                  line-height: 1;
                  z-index: 1000;
              }
              
              button:hover {
                  opacity: 0.8;
                  transform: scale(1.1);
              }
          </style>
          <button aria-label="Toggle dark mode">🌓</button>
      `;
      
      this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

// Register the custom element
customElements.define('theme-toggle', ThemeToggle);

// Add the theme change handler to the document
document.addEventListener('theme-change', (e) => {
  const theme = e.detail.theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  console.log('[theme-toggle] Theme changed to:', theme);
});