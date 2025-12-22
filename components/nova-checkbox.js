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

class NovaCheckbox extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this._checked = this.hasAttribute("checked");
        this._label = this.getAttribute("label") || "";
        this._color = this.getAttribute("color") || "#6366f1";
        this._textColor = this.getAttribute("text-color") || "#000";
        this._size = this.getAttribute("size") || "medium";
        this._disabled = this.hasAttribute("disabled");
    }
    static get observedAttributes() {
        return ["checked", "label", "color", "text-color", "size", "disabled"];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "checked") this._checked = this.hasAttribute("checked");
        if (name === "label") this._label = newValue;
        if (name === "color") this._color = newValue;
        if (name === "text-color") this._textColor = newValue;
        if (name === "size") this._size = newValue;
        if (name === "disabled") this._disabled = this.hasAttribute("disabled");

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

            .wrapper {
            display: flex;
            align-items: center;
            gap: 10px;
            cursor: pointer;
            user-select: none;
            }

            .wrapper.disabled {
            opacity: 0.6;
            cursor: not-allowed;
            }

            .box {
            border-radius: 6px;
            border: 2px solid #ccc;
            background: #fff;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            }

            .label {
            white-space: nowrap;
            }
        </style>

        <div class="wrapper">
            <div class="box"></div>
            <div class="label">${this._label}</div>
        </div>
        `;
        this._wrapper = this.shadowRoot.querySelector(".wrapper");
        this._box = this.shadowRoot.querySelector(".box");
        this._labelEL = this.shadowRoot.querySelector(".label");

        this._wrapper.addEventListener('click', () => {
            if (this._disabled) return
            this.toggle();
        });

    }

    update() {
        if(!this._box) return;

        const sizePresets = {
            small: { box: 14, font: 12 },
            medium: { box: 18, font: 14 },
            large: { box: 22, font: 16 },
            xlarge: { box: 26, font: 18 },
            xxlarge: { box: 30, font: 20 }
        };

        const size = sizePresets[this._size] || sizePresets.medium;

        this._box.style.width = `${size.box}px`;
        this._box.style.height = `${size.box}px`;

        this._labelEL.style.fontSize = `${size.font}px`;
        this._labelEL.style.color = this._textColor;

        this._box.style.background = this._checked ? this._color : '#fff';
        this._box.style.borderColor = this._checked ? this._color : '#ccc';
        
        this._wrapper.classList.toggle('disabled', this._disabled);
    }

    toggle() {
        this.checked = !this._checked;

        this.dispatchEvent(
            new CustomEvent("nova-change", {
                detail: { checked: this._checked },
                bubbles: true
            })
        );
    }
    get checked() {
        return this._checked;
    }
    set checked(value) {
        this._checked = Boolean(value);
        if (this._checked) this.setAttribute("checked", "");
        else this.removeAttribute("checked");
    }
}
customElements.define("nova-checkbox", NovaCheckbox);