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

class NovaCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this._title  = this.getAttribute("title") || "";
    this._titleAlign = this.getAttribute("title-align") || "left";
    this._titleSize = this.getAttribute("title-size") || "medium";
    this._titleColor = this.getAttribute("title-color") || "#111";
    this._background = this.getAttribute("background") || "#fff";
    this._padding = this.getAttribute("padding") || "medium";
  }
  static get observedAttributes() {
    return ["title", "title-align", "title-size", "title-color", "background", "padding"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "title") this._title = newValue;
    if (name === "title-align") this._titleAlign = newValue;
    if (name === "title-size") this._titleSize = newValue;
    if (name === "title-color") this._titleColor = newValue;
    if (name === "background") this._background = newValue;
    if (name === "padding") this._padding = newValue;

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
          display: block;
          font-family: system-ui, sans-serif;
        }

        .card {
          background: var(--bg);
          border-radius: 14px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          transition: all 0.2s ease;
          margin: 10px 0;
        }

        .title {
          font-weight: 600;
          margin-bottom: 10px;
        }

        .content {
          display: block;
        }
      </style>

      <div class="card">
        ${this._title ? `<div class="title"></div>` : ""}
        <div class="content">
          <slot></slot>
        </div>
      </div>
    `;
    this._card = this.shadowRoot.querySelector(".card");
    this._titleEl = this.shadowRoot.querySelector(".title");
  }

  update() {
    if (!this._card) return;

    const paddingPresets = {
      small: "10px",
      medium: "16px",
      large: "22px",
      xlarge: "28px",
      xxlarge: "34px"
    };
    const titleSizePresets = {
      small: "14px",
      medium: "18px",
      large: "22px",
      xlarge: "26px",
      xxlarge: "30px"
    };

    const validAligns = ["left", "center", "right"];
    const align = validAligns.includes(this._titleAlign) ? this._titleAlign : "left";

    this._card.style.setProperty("--bg", this._background);
    this._card.style.padding = paddingPresets[this._padding] || paddingPresets.medium;

    if (this._titleEl) {
      this._titleEl.textContent = this._title;
      this._titleEl.style.color = this._titleColor;
      this._titleEl.style.textAlign = align;
      this._titleEl.style.fontSize = titleSizePresets[this._titleSize] || titleSizePresets.medium;
    }
  }
}
customElements.define("nova-card", NovaCard);
