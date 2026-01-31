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
class NovaRadio extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode:"open"})

        this._name = this.getAttribute("name") || "";
        this._label = this.getAttribute("label") || "check me";
        this._checked = this.hasAttribute("checked");
        this._disabled = this.hasAttribute("disabled");
        this._color = this.getAttribute("color") || "#6366f1";
        this._size = this.getAttribute("size") || "medium";
        this._textColor = this.getAttribute("text-color") || "#000000";

    }
    static get observedAttributes(){
        return["name", "label", "checked", "disabled", "color", "size", "text-color"]
    }
    attributeChangedCallback(name, oldValue, newValue){
        if(name === "name") this._name = newValue || "";
        if(name === "label") this._label = newValue || "";
        if(name === "checked") this._checked = this.hasAttribute("checked");
        if(name === "disabled") this._disabled = this.hasAttribute("disabled");
        if(name === "color") this._color = newValue || "#6366f1";
        if(name === "size") this._size = newValue || "medium";
        if(name === "text-color") this._textColor = newValue || "#000000";
        
        this.update() 
    }
    connectedCallback(){
        this.render()
        this.update()
    }
    render(){
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: inline-block;
                    align-items: center;
                    gap: 8px;
                    margin: 6px 5px;
                    cursor: pointer;
                    --radio-color: ${this._color};
                    --text-color: ${this._textColor};
                    --radio-size: 16px;
                    --dot-size: 8px;
                    --font-size: 0.9em;
                }

                label {
                    display: flex;
                    gap: 5px;
                    cursor: pointer;
                    align-items: center;
                    color: var(--text-color);
                    font-size: var(--font-size);
                }

                :host([disabled]) {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                input {
                    display: none;
                }

                .radio {
                    width: var(--radio-size);
                    height: var(--radio-size);
                    border-radius: 50%;
                    border: 2px solid #9ca3af;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .radio::after {
                    content: "";
                    width: var(--dot-size);
                    height: var(--dot-size);
                    border-radius: 50%;
                    background: var(--radio-color);
                    transform: scale(0);
                    transition: 0.15s ease;
                }

                input:checked + .radio {
                    border-color: var(--radio-color);
                }

                input:checked + .radio::after {
                    transform: scale(1);
                }

                span {
                    font-size: 0.9em;
                    user-select: none;
                }
            </style>

            <label>
                <input type="radio">
                <div class="radio"></div>
                <span>${this._label}</span>
            </label>
        `;
        this._input = this.shadowRoot.querySelector("input");
        this.shadowRoot.querySelector("label")
        .addEventListener("click", (e) => {
            if(this._disabled) return;
            this.check();
        })
    }
    update(){
        if(!this._input) return;

        const sizePresets = {
            small: {
                radio: "12px",
                dot: "6px",
                font: "0.8em"
            },
            medium: {
                radio: "16px",
                dot: "8px",
                font: "0.9em"
            },
            large: {
                radio: "20px",
                dot: "10px",
                font: "1em"
            },
            xlarge: {
                radio: "24px",
                dot: "12px",
                font: "1.1em"
            }
        };

        const size = sizePresets[this._size] || sizePresets.medium;
        this.style.setProperty("--radio-size", size.radio);
        this.style.setProperty("--dot-size", size.dot);
        this.style.setProperty("--font-size", size.font);


        this._input.name = this._name;
        this._input.checked = this._checked;
        this._input.disabled = this._disabled;

        const span = this.shadowRoot.querySelector("span");
        if(span) span.textContent = this._label;

        this.style.setProperty("--radio-color", this._color);
        this.style.setProperty("--text-color", this._textColor);

    }

    check(){
        if(this._checked) return;

        document
        .querySelectorAll(`nova-radio[name="${this._name}"]`)
        .forEach(radio => {
            radio._checked = false;
            radio.removeAttribute("checked")
            radio.update();
        });

        this._checked =true;
        this.setAttribute("checked", "");

        this.dispatchEvent(
            new CustomEvent("nova-change",{
                detail: {
                    name: this._name
                },
                bubbles: true
            })
        );
    }
    get checked(){
        return this._checked;
    }
    set checked(val){
        val ? this.setAttribute("checked", "") : this.removeAttribute("checked");
    }
}
customElements.define("nova-radio", NovaRadio);