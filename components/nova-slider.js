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

class NovaSlider extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode:"open"})

        this._min = parseFloat(this.getAttribute("min")) || 0;
        this._max = parseFloat(this.getAttribute("max")) || 100;
        this._value = parseFloat(this.getAttribute("value")) || 0;
        this._step = parseFloat(this.getAttribute("step")) || 1;
        this._color = this.getAttribute("color") || "#6366f1";
        this._trackColor = this.getAttribute("track-color") || "#e5e7eb";
        this._size = this.getAttribute("size") || "medium";
        this._disabled = this.getAttribute("disabled");
        this._showValue = this.getAttribute("show-value");
    }
    static get observedAttributes() {
        return ["min", "max", "value", "step", "color", "track-color", "size", "disabled", "show-value"];
    }
    attributeChangedCallback(name, oldValue, newValue){
        if(name === "min") this._min = parseFloat(newValue) || 0;
        if(name === "max") this._max = parseFloat(newValue) || 100;
        if(name === "value") this._value = parseFloat(newValue) || 0;
        if(name === "step") this._step = parseFloat(newValue) || 1;
        if(name === "color") this._color = newValue;
        if(name === "track-color") this._trackColor = newValue;
        if(name === "size") this._size = newValue || "medium";
        if(name === "disabled") this._disabled = this.hasAttribute("disabled");
        if(name === "show-value") this._showValue = this.hasAttribute("show-value");

        this.update()
    }
    connectedCallback() {
        this.render()
        this.update()
    }
    render(){
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: inline-block;
                    width: 200px;
                    --track-color: ${this._trackColor};
                    --thumb-color: ${this._color};
                    --height: 6px;
                }

                input[type="range"] {
                    -webkit-appearance: none;
                    width: 100%;
                    height: var(--height);
                    background: var(--track-color);
                    border-radius: 4px;
                    outline: none;
                    cursor: pointer;
                }

                input[type="range"]:disabled {
                    cursor: not-allowed;
                    opacity: 0.6;
                }

                input[type="range"]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: var(--thumb-color);
                    cursor: pointer;
                    border: none;
                }

                .value {
                    margin-top: 4px;
                    text-align: center;
                    font-size: 0.85em;
                    color: var(--thumb-color);
                    display: none;
                }
            </style>

            <input type="range" />
            <div class="value">0</div>
        `;
        this._slider = this.shadowRoot.querySelector("input");
        this._valueLabel = this.shadowRoot.querySelector(".value");

        this._slider.addEventListener("input", () => {
            this.value = this._slider.value;

            this.dispatchEvent(
                new CustomEvent("nova-change", {
                    detail: { value: this._value},
                    bubbles: true
                })
            );
        });
    }

    update() {
        if (!this._slider) return;

        const sizePresets = { 
            small: "4px", 
            medium: "6px", 
            large: "8px", 
            xlarge: "10px" 
        };

        this._slider.min = this._min;
        this._slider.max = this._max;
        this._slider.step = this._step;
        this._slider.value = this._value;
        this._slider.disabled = this._disabled;

        this.style.setProperty("--thumb-color", this._color);
        this.style.setProperty("--track-color", this._trackColor);
        this.style.setProperty("--height", sizePresets[this._size] || "6px");

        if(this._showValue) {
            this._valueLabel.style.display = "block";
            this._valueLabel.textContent = this._value;
        } else {
            this._valueLabel.style.display = "none";
        }
    }

    get value(){
        return this._value;
    }

    set value(val) {
        this._value = Number(val);
        this.setAttribute("value", this._value);
    }
}

customElements.define("nova-slider", NovaSlider);
