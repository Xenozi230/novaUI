/*! 
* Nova UI 
* © 2025 Xenozi230
*
* License: Dual License 
* 
* 1. Non-Commercial Use: 
* Free to use for personal, educational, or non-commercial projects. 
* You may copy, modify, and distribute the code for non-commercial purposes. 
* See NOCOMMERCIAL-LICENSE.md for more details.
*
* 2. Commercial Use: 
* A commercial license is required for any use in commercial projects, 
* including selling, integrating in a product, or any revenue-generating use. 
* See COMMERCIAL-LICENSE.md for more details and purchasing a commercial license.
* 
* Full license text in LICENSES folder 
*/

class NovaSpinner extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this._variant = this.getAttribute("variant") || "spinner"; 
    this._size = this.getAttribute("size") || "medium";
    this._color = this.getAttribute("color") || "#6366f1";
    this._thickness = this.getAttribute("thickness") || "4";
    this._speed = this.getAttribute("speed") || "0.8s";
  }

  static get observedAttributes() {
    return ["variant", "size", "color", "thickness", "speed"];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === "variant") this._variant = newVal;
    if (name === "size") this._size = newVal;
    if (name === "color") this._color = newVal;
    if (name === "thickness") this._thickness = newVal;
    if (name === "speed") this._speed = newVal;
    this.render();
    this.update();
  }

  connectedCallback() {
    this.render();
    this.update();
  }

  render() {
    const isDots = this._variant === "dots";

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        /* SPINNER STYLE */
        .spinner {
          border-radius: 50%;
          border-style: solid;
          border-color: transparent;
          border-top-color: ${this._color};
          animation: spin var(--speed) linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* DOTS STYLE */
        .dots {
          display: flex;
          gap: 6px;
        }

        .dot {
          width: var(--dot-size);
          height: var(--dot-size);
          border-radius: 50%;
          background: ${this._color};
          animation: bounce var(--speed) infinite ease-in-out;
        }

        .dot:nth-child(2) { animation-delay: calc(var(--speed) / 4); }
        .dot:nth-child(3) { animation-delay: calc(var(--speed) / 2); }

        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.4); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }
      </style>

      ${
        isDots
          ? `
            <div class="dots">
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
            </div>
          `
          : `
            <div class="spinner"></div>
          `
      }
    `;

    this._element = this.shadowRoot.querySelector(
      this._variant === "dots" ? ".dots" : ".spinner"
    );
  }

  update() {
    if (!this._element) return;

    const sizePresets = {
      small: 20,
      medium: 30,
      large: 40,
      xlarge: 50,
      xxlarge: 60,
    };
    const dotSizePresets = {
      small: 5,
      medium: 8,
      large: 10,
      xlarge: 13,
      xxlarge: 17,
    };

    const spinnerSize = sizePresets[this._size] || sizePresets.medium;
    const dotSize = dotSizePresets[this._size] || dotSizePresets.medium;

    this._element.style.setProperty("--speed", this._speed);

    if (this._variant === "spinner") {
      this._element.style.width = `${spinnerSize}px`;
      this._element.style.height = `${spinnerSize}px`;
      this._element.style.borderWidth = `${this._thickness}px`;
      this._element.style.borderTopColor = this._color;
    }
    if (this._variant === "dots") {
      const dots = this.shadowRoot.querySelectorAll(".dot");
      dots.forEach(dot => {
        dot.style.width = `${dotSize}px`;
        dot.style.height = `${dotSize}px`;
        dot.style.background = this._color;
        dot.style.setProperty("--speed", this._speed);
      });
    }
  }
}

customElements.define("nova-spinner", NovaSpinner);
