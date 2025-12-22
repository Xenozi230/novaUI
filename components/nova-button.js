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

class NovaButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this._label = this.getAttribute("label") || "Click Me";
    this._variant = this.getAttribute("variant") || "solid";
    this._size = this.getAttribute("size") || "medium";
    this._color = this.getAttribute("color") || "#6366f1";
    this._textColor = this.getAttribute("text-color") || "#ffffff";
    this._disabled = this.hasAttribute("disabled");
    this._hoverAnimated = this.hasAttribute("hover-animated");
    this._noClickAnimated = this.hasAttribute("noclick-animated");
  }
  static get observedAttributes() {
    return ["label", "variant", "size", "color", "text-color", "disabled", "hover-animated", "noclick-animated"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "label") this._label = newValue;
    if (name === "variant") this._variant = newValue;
    if (name === "size") this._size = newValue;
    if (name === "color") this._color = newValue;
    if (name === "text-color") this._textColor = newValue;
    if (name === "disabled") this._disabled = this.hasAttribute("disabled");
    if (name === "hover-animated") this._hoverAnimated = this.hasAttribute("hover-animated");
    if (name === "noclick-animated") this._noClickAnimated = this.hasAttribute("noclick-animated");

    this.render();
    this.update();
  }

  connectedCallback() {
    this.render();
    this.update();
  }

  render() {
    this.shadowRoot.innerHTML = `
    <style>
        :host {
          display: inline-block;
          font-family: system-ui, sans-serif;
        }

        button {
          all: unset;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          user-select: none;
          transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.2s;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }

        button:disabled {
          cursor: not-allowed;
          opacity: 0.6;
          box-shadow: none;
        }

        .solid {
          background: var(--main-color);
          color: var(--text-color);
        }

        .outline {
          background: transparent;
          border: 2px solid var(--main-color);
          color: var(--main-color);
          box-shadow: none;
        }

        .ghost {
          background: transparent;
          color: var(--main-color);
          box-shadow: none;
        }
      </style>
      <button part="button">${this._label}</button>
    `;
    this._button = this.shadowRoot.querySelector("button");

    this._button.addEventListener("click", () => {
      if (!this._disabled) {
        this.dispatchEvent(new CustomEvent("nova-click", {bubbles: true}));

      }
    });
  }

  update() {
    if(!this._button )return;

    const sizePresets = {
      small: { padding: "6px 12px", font: "12px", radius: "4px" },
      medium: { padding: "10px 18px", font: "14px", radius: "6px" },
      large: { padding: "14px 22px", font: "16px", radius: "8px" },
      xlarge: { padding: "18px 26px", font: "18px", radius: "10px" },
      xxlarge: { padding: "22px 32px", font: "22px", radius: "12px" }
    };
    const size = sizePresets[this._size] || sizePresets.medium;

    this._button.textContent = this._label;
    this._button.disabled = this._disabled;

    this._button.className = this._variant;

    this._button.style.padding = size.padding;
    this._button.style.fontSize = size.fontSize;
    this._button.style.borderRadius = size.radius;

    this._button.style.setProperty("--main-color", this._color);
    this._button.style.setProperty("--text-color", this._textColor);

    if (this._hoverAnimated && !this._disabled) {
      this._button.onmouseenter = () => {
        this._button.style.transform = "scale(1.05)";
        this._button.style.boxShadow = "0 6px 12px rgba(0,0,0,0.3)";
      };
      this._button.onmouseleave = () => {
        this._button.style.transform = "scale(1)";
        this._button.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
      };
    } else {
      this._button.onmouseenter = null;
      this._button.onmouseleave = null;
    }

    if (!this._noClickAnimated && !this._disabled) {
      this._button.onmousedown = () => {
        this._button.style.transform = "scale(0.95)";
      };
      this._button.onmouseup = () => {
        this._button.style.transform = "scale(1.00)";
      };
    } else {
      this._button.onmousedown = null;
      this._button.onmouseup = null;
    }
  }
}
customElements.define("nova-button", NovaButton);
