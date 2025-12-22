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
    static get observedAttributes() {
        return ["min", "max", "value", "step", "color", "track-color", "size", "disabled", "show-value"];
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: inline-block;
                    width: 200px;
                    --track-color: #e5e7eb;
                    --thumb-color: #6366f1;
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
                    transition: background 0.2s;
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
                    border: none;
                    cursor: pointer;
                }

                .value-display {
                    text-align: center;
                    margin-top: 4px;
                    font-size: 0.85em;
                    color: var(--thumb-color);
                    display: none;
                }
            </style>
            <input type="range" />
            <div class="value-display">0</div>
        `;
    }

    connectedCallback() {
        this.update();
        this.shadowRoot.querySelector("input").addEventListener("input", e => {
            this.setAttribute("value", e.target.value);
            this.updateValueDisplay();
            this.dispatchEvent(new CustomEvent("change", { detail: { value: e.target.value } }));
        });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) this.update();
    }

    update() {
        const slider = this.shadowRoot.querySelector("input");
        slider.min = this.getAttribute("min") || 0;
        slider.max = this.getAttribute("max") || 100;
        slider.value = this.getAttribute("value") || 0;
        slider.step = this.getAttribute("step") || 1;
        slider.disabled = this.hasAttribute("disabled");

        if (this.hasAttribute("color")) this.style.setProperty("--thumb-color", this.getAttribute("color"));
        if (this.hasAttribute("track-color")) this.style.setProperty("--track-color", this.getAttribute("track-color"));

        const size = this.getAttribute("size") || "medium";
        const heights = { 
            small: "4px", 
            medium: "6px", 
            large: "8px", 
            xlarge: "10px" 
        };
        this.style.setProperty("--height", heights[size] || "6px");

        this.updateValueDisplay();
    }

    updateValueDisplay() {
        const valueDisplay = this.shadowRoot.querySelector(".value-display");
        const slider = this.shadowRoot.querySelector("input");
        if (this.hasAttribute("show-value")) {
            valueDisplay.style.display = "block";
            valueDisplay.textContent = slider.value;
        } else {
            valueDisplay.style.display = "none";
        }
    }
}

customElements.define("nova-slider", NovaSlider);
