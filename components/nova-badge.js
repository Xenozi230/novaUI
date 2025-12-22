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

class NovaBadge extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this._variant = this.getAttribute("variant") || "solid";
        this._size = this.getAttribute("size") || "medium";
        this._textColor = this.getAttribute("text-color") || "#111";
        this._bg = this.getAttribute("bg") || "#6366f1";
        this._icon = this.getAttribute("icon") || null;
        this._rounded = this.hasAttribute("rounded");
        this._label = this.getAttribute("label") || this.textContent.trim();
    }
    static get observedAttributes() {
        return ["label", "text-color", "size", "icon", "bg", "rounded", "variant"];
    }   
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "label") this._label = newValue;
        if (name === "text-color") this._textColor = newValue;
        if (name === "size") this._size = newValue;
        if (name === "icon") this._icon = newValue;
        if (name === "bg") this._bg = newValue;
        if (name === "rounded") this._rounded = this.hasAttribute("rounded");
        if (name === "variant") this._variant = newValue;
        this.render();
        this.update();

    }
    connectedCallback(){
        this.render();
        this.update();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    --bg-color: #6366f1;
                    --text-color: #111;
                    --border-color: #6366f1;
                    display: inline-block;
                    font-family: system-ui, sans-serif;
                }
                .badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 4px 10px;
                    font-size: 0.75rem;
                    font-weight: 500;
                    border-radius: 8px;
                    border: 1px solid var(--border-color);
                    background: var(--bg-color);
                    color: var(--text-color);
                    transition: all 0.2s ease;
                    white-space: nowrap;
                    margin: 4px;
                    margin-top: 5px;
                }

                .solid {
                    background: var(--bg-color);
                }
                .outline {
                    background: transparent;
                    border-color: var(--border-color);
                }

                .soft {
                    background: color-mix(in srgb, var(--bg-color) 20%, transparent);
                    border-color: transparent;
                }

                .rounded {
                    border-radius: 999px;
                }

                .icon {
                    display: none;
                    line-height: 1;
                    font-size: 1em;
                }

                .has-icon .icon {
                    display: inline-flex;
                }
                .icon-only {
                    padding: 6px;
                    justify-content: center;
                    gap: 0;
                }
            </style>

            <span class="badge medium">
                <span class="icon">${this._icon || ""}</span>
                <span class="label">${this._label || ""}</span>
                <slot hidden></slot>
            </span>
        `;
        this._element = this.shadowRoot.querySelector(".badge");
        this._iconEl = this.shadowRoot.querySelector(".icon");
        this._labelEl = this.shadowRoot.querySelector(".label");
    }

    update() {
        if (!this._element) return;

        const sizePresets = {
            small: { fontSize: "0.65rem", padding: "2px 8px" },
            medium: { fontSize: "0.75rem", padding: "4px 10px" },
            large: { fontSize: "0.85rem", padding: "6px 12px" },
            xlarge: { fontSize: "1rem", padding: "8px 16px" },
            xxlarge: { fontSize: "1.15rem", padding: "10px 20px" }
        };

        const size = sizePresets[this._size] || sizePresets.medium;
        this._element.style.fontSize = size.fontSize;
        this._element.style.padding = size.padding;

        this._element.className = "badge";
        this._element.classList.add(this._variant);
        if (this._rounded) this._element.classList.add("rounded");

        if (this._icon) {
            this._element.classList.add("has-icon");
            this._iconEl.textContent = this._icon;
        } else {
            this._iconEl.textContent = "";
        }

        const hasLabel = !!this._label;
        this._labelEl.textContent = hasLabel ? this._label : "";
        if (!hasLabel && this._icon) this._element.classList.add("icon-only");

        this._element.style.setProperty("--bg-color", this._bg);
        this._element.style.setProperty("--text-color", this._textColor);
        this._element.style.setProperty("--border-color", this._bg);

    }
}
customElements.define("nova-badge", NovaBadge);