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

class NovaProgressBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this._value = parseFloat(this.getAttribute("value")) || 0;
        this._max = parseFloat(this.getAttribute("max")) || 100;
        this._color = this.getAttribute("color") || "#6366f1";
        this._height = this.getAttribute("height") || "16px";
        this._showPercent = this.hasAttribute("show-percent");
        this._percentColor = this.getAttribute("percent-color") || "#111";
        this._bg = this.getAttribute("bg") || "#dddddfff";
    }
    static get observedAttributes() { 
        return ["value", "max", "color", "height", "show-percent", "percent-color","bg"]; 
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "value") this._value = parseFloat(newVal) || 0;
        if (name === "max") this._max = parseFloat(newVal) || 100;
        if (name === "color") this._color = newVal;
        if (name === "height") this._height = newVal;
        if (name === "show-percent") this._showPercent = this.hasAttribute("show-percent");
        if (name === "percent-color") this._percentColor = newVal;
        if (name === "bg") this._bg = newVal;

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
                    width: 100%;
                    --progress-color: ${this._color};
                    --progress-height: ${this._height};
                    --percent-color: ${this._percentColor};
                    --progress-bg: ${this._bg};
                    margin-bottom: 8px;
                }
                .bar-container {
                    width: 100%;
                    background: var(--progress-bg);
                    border-radius: 8px;
                    overflow: hidden;
                    height: var(--progress-height);
                }
                .bar-fill {
                    width: 0%;
                    height: 100%;
                    background: var(--progress-color);
                    transition: width 0.3s ease;
                    border-radius: 8px;
                }
                .percent {
                    text-align: center;
                    margin-top: 4px;
                    color: var(--percent-color);
                    font-size: 0.9em;
                    display: ${this._showPercent ? "block" : "none"};
                }
            </style>
            <div class="bar-container">
                <div class="bar-fill"></div>
            </div>
            <div class="percent">0%</div>
        `;
        this._fill = this.shadowRoot.querySelector(".bar-fill");
        this._percentText = this.shadowRoot.querySelector(".percent");
    }

    update() {
        const percent = Math.min(100, (this._value / this._max) * 100);
        this._fill.style.width = percent + "%";

        this.style.setProperty("--progress-color", this._color);
        this.style.setProperty("--progress-height", this._height);
        this.style.setProperty("--progress-bg", this._bg);
        this.style.setProperty("--percent-color", this._percentColor);

        if (this._showPercent) {
            this._percentText.style.display = "block";
            this._percentText.textContent = Math.round(percent) + "%";
        } else {
            this._percentText.style.display = "none";
        }
    }
    get value() { return this._value; }
    set value(val) { this.setAttribute("value", val); }
}

customElements.define("nova-progressbar", NovaProgressBar);
