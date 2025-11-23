class NovaCheckbox extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this._checked = this.hasAttribute("checked");
    this._disabled = this.hasAttribute("disabled");
  }
  connectedCallback() {
    const label = this.getAttribute("label") || "";
    const size = this.getAttribute("size") || "medium";
    const color = this.getAttribute("color") || "#6366f1";
    this._textColor = this.getAttribute("text-color") || "#000000";
    
    const sizeMap = {
      small: "14px",
      medium: "18px",
      large: "22px",
      xlarge: "26px"
    };
    const textSizeMap = {
      small: "12px",
      medium: "14px",
      large: "16px",
      xlarge: "18px"
    };
    const boxSize = sizeMap[size] || sizeMap.m;

    const wrapper = document.createElement("label");
    wrapper.style.cssText = `
      display: flex;
      align-items: center;
      cursor: ${this._disabled ? "not-allowed" : "pointer"};
      gap: 10px;
      user-select: none;
      font-size: 14px;
    `;

    const box = document.createElement("div");
    box.style.cssText = `
      width: ${boxSize};
      height: ${boxSize};
      border: 2px solid ${color};
      border-radius: 4px;
      transition: 0.25s;
      box-shadow: 0 2px 6px rgba(0,0,0,0.15);
      background: ${this._checked ? color : "white"};
      ${this._disabled ? "opacity: 0.6;" : ""}
      margin: 2px;
    `;

    const text = document.createElement("span");
    text.textContent = this.getAttribute("label") || "";
    text.style.color = this._textColor;
    text.style.fontSize = textSizeMap[size] || "14px";

    wrapper.appendChild(box);
    if (label) wrapper.appendChild(text);

    if (!this._disabled) {
      wrapper.addEventListener("click", () => this.toggle());
    }

    this.shadowRoot.appendChild(wrapper);
    this._elements = { box };
    this._color = color;
  }

  toggle() {
    this._checked = !this._checked;
    this.updateVisuals();
    this.dispatchEvent(
      new CustomEvent("nova-change", {
        detail: { checked: this._checked },
        bubbles: true
      })
    );
  }

  updateVisuals() {
    const { box } = this._elements;
    box.style.background = this._checked ? this._color : "white";
    this._elements.label.style.color = this.getAttribute("text-color") || this._textColor;

    if (this._checked) {
      this.setAttribute("checked", "");
    } else {
      this.removeAttribute("checked");
    }
  }
  get checked() {
    return this._checked;
  }
  set checked(value) {
    this._checked = Boolean(value);
    this.updateVisuals();
  }
}
customElements.define("nova-checkbox", NovaCheckbox);
