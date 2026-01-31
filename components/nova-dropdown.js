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

class NovaDropdown extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({ mode: "open" });

        this._label = this.getAttribute("label") || "";
        this._value = this.getAttribute("value") || "";
        this._disabled = this.hasAttribute("disabled");
        this._color = this.getAttribute("color") || "#6366f1";
        this._size = this.getAttribute("size") || "medium";
        this._textColor = this.getAttribute("text-color") || "#000000";
    }

    static get observedAttributes(){
        return ["label", "value", "disabled", "color", "size", "text-color"];
    }

    attributeChangedCallback(name, oldValue, newValue){
        if(name === "label") this._label = newValue || "";
        if(name === "value") this._value = newValue || "";
        if(name === "disabled") this._disabled = this.hasAttribute("disabled");
        if(name === "color") this._color = newValue || "#6366f1";
        if(name === "size") this._size = newValue || "medium";
        if(name === "text-color") this._textColor = newValue || "#000000";

        this.update();
    }

    connectedCallback(){
        this.render();
        this.update();
    }

    render(){
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: inline-block;
                    font-family: inherit;
                    --accent: ${this._color};
                    --font-size: 0.9em;
                    --height: 36px;
                    --text-color: ${this._textColor};
                }

                label {
                    display: block;
                    margin-bottom: 4px;
                    font-size: 0.8em;
                    opacity: 0.8;
                    color: var(--text-color);
                }

                select {
                    width: 100%;
                    height: var(--height);
                    font-size: var(--font-size);
                    padding: 0 10px;
                    border-radius: 6px;
                    border: 1px solid #d1d5db;
                    background: white;
                    cursor: pointer;
                }

                select:focus {
                    outline: none;
                    border-color: var(--accent);
                }

                select:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }
            </style>

            <label id="label"></label>
            <select>
                <slot></slot>
            </select>
        `;

        this._select = this.shadowRoot.querySelector("select");
        this._labelEl = this.shadowRoot.querySelector("#label");
        this._select.addEventListener("change", () => {
            this._value = this._select.value;
            this.setAttribute("value", this._value);

            this.dispatchEvent(
                new CustomEvent("nova-change", {
                    detail: { value: this._value },
                    bubbles: true
                })
            );
        });
    }

    update(){
        if(!this._select) return;

        if (this._label) {
            this._labelEl.textContent = this._label;
            this._labelEl.style.display = "block";
        } else {
            this._labelEl.textContent = "";
            this._labelEl.style.display = "none";
        }

        this._select.innerHTML = "";
        this.querySelectorAll("option").forEach(opt => {
            this._select.appendChild(opt.cloneNode(true));
        });

        if(this._value) {
            this._select.value = this._value;
        }
        this._select.disabled = this._disabled;

        const sizePresets = {
            small: { height: "28px", font: "0.8em" },
            medium: { height: "36px", font: "0.9em" },
            large: { height: "44px", font: "1em" },
            xlarge: { height: "52px", font: "1,1em" }
        };

        const size = sizePresets[this._size] || sizePresets.medium;

        this.style.setProperty("--height", size.height);
        this.style.setProperty("--font-size", size.font);
        this.style.setProperty("--accent", this._color);
        this.style.setProperty("--text-color", this._textColor);
    }

    get value(){
        return this._value;
    }

    set value(val){
        this._value = val;
        this.setAttribute("value", val);
    }
}

customElements.define("nova-dropdown", NovaDropdown);