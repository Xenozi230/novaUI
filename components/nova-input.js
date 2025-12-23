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

class NovaInput extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this._value = this.getAttribute("value") || "";
        this._placeholder = this.getAttribute("placeholder") || "";
        this._type = this.getAttribute("type") || "text";
        this._color = this.getAttribute("color") || "#6366f1";
        this._bg = this.getAttribute("bg") || "#fff";
        this._icon = this.getAttribute("icon") || "";
        this._error = this.hasAttribute("error");
        this._disabled = this.hasAttribute("disabled");
        this._size = this.getAttribute("size") || "medium";

        
    }
    static get observedAttributes() {
        return ["value", "placeholder", "type", "color", "bg", "icon", "error", "disabled", "size"];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "value") this._value = newValue;
        if (name === "placeholder") this._placeholder = newValue;
        if (name === "type") this._type = newValue || "text";
        if (name === "color") this._color = newValue;
        if (name === "bg") this._bg = newValue;
        if (name === "icon") this._icon = newValue;
        if (name === "error") this._error = this.hasAttribute("error");
        if (name === "disabled") this._disabled = this.hasAttribute("disabled");
        if (name === "size") this._size = newValue;

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
                --border-color: #d1d5db;
                --focus-color: ${this._color};
                --error-color: #ef4444;
                --bg-color: ${this._bg};
                margin: 2px;
            }

            .input-wrapper {
                position: relative;
                display: inline-flex;
                align-items: center;
                background: var(--bg-color);
                border: 2px solid var(--border-color);
                gap: 6px;
                transition: all 0.2s ease;
            }

            .input-wrapper:hover { border-color: #bfc4ce; }
            .input-wrapper:focus-within { border-color: var(--focus-color); box-shadow: 0 0 4px var(--focus-color); }
            .input-wrapper.error { border-color: var(--error-color); box-shadow: 0 0 4px var(--error-color); }
            .input-wrapper.disabled { opacity: 0.6; cursor: not-allowed; }

            input {
                flex: 1;
                border: none;
                outline: none;
                background: transparent;
            }

            input.error { color: var(--error-color); }

            .icon { font-size: 1.1rem; opacity: 0.7; user-select: none; display: none; }
        </style>

        <div class="input-wrapper">
            <span class="icon">${this._icon}</span>
            <input type="${this._type}" placeholder="${this._placeholder}" value="${this._value}" />
        </div>
        `;
        this._wrapper = this.shadowRoot.querySelector(".input-wrapper");
        this._input = this.shadowRoot.querySelector("input");
        this._iconEl = this.shadowRoot.querySelector(".icon");
    }
    update() {
        if (!this._wrapper) return;

        const sizes = {
            small: { padding: "4px 8px", fontSize: "0.8rem", borderRadius: "8px", minWidth: "140px" },
            medium: { padding: "6px 10px", fontSize: "0.95rem", borderRadius: "10px", minWidth: "180px" },
            large: { padding: "8px 12px", fontSize: "1rem", borderRadius: "12px", minWidth: "220px" },
            xlarge: { padding: "10px 14px", fontSize: "1.1rem", borderRadius: "14px", minWidth: "260px" },
            xxlarge: { padding: "12px 16px", fontSize: "1.2rem", borderRadius: "16px", minWidth: "300px" }
        };

        const s = sizes[this._size] || sizes.medium;
        Object.assign(this._wrapper.style, s);

        this._input.value = this._value;
        this._input.placeholder = this._placeholder;
        this._input.type = this._type;

        this._wrapper.classList.toggle("error", this._error);
        this._input.classList.toggle("error", this._error);

        this._wrapper.classList.toggle("disabled", this._disabled);
        this._input.disabled = this._disabled;

        if (this._icon) {
            this._iconEl.style.display = "block";
            this._iconEl.textContent = this._icon;
        } else {
            this._iconEl.style.display = "none";
        }

        this.style.setProperty("--bg-color", this._bg);
        this.style.setProperty("--focus-color", this._color);
    }   

    get value() { return this._input.value; }
    set value(val) { this._value = val; this.setAttribute("value", val); }
}
customElements.define("nova-input", NovaInput);
