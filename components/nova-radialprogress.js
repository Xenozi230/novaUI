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

class NovaRadialProgress extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this._value = parseFloat(this.getAttribute("value")) || 0;
        this._max = parseFloat(this.getAttribute("max")) || 100;
        this._size = this.getAttribute("size") || "120px";
        this._color = this.getAttribute("color") || "#6366f1";
        this._bg = this.getAttribute("bg") || "#dddddfff";
        this._stroke = parseInt(this.getAttribute("stroke")) || 10;
        this._textColor = this.getAttribute("text-color") || "#111827";
    }
    static get observedAttributes() {
        return ["value", "max", "size", "color", "bg", "stroke", "text-color"];
    }

    attributeChangedCallback(name, oldValue, newValue) { 
        if (name === "value") this._value = parseFloat(newValue) || 0;
        if (name === "max") this._max = parseFloat(newValue) || 100;
        if (name === "size") this._size = newValue || "120px";
        if (name === "color") this._color = newValue;
        if (name === "bg") this._bg = newValue;
        if (name === "stroke") this._stroke = parseInt(newValue) || 10;
        if (name === "text-color") this._textColor = newValue;

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
                    --size: ${this._size};
                    --progress-color: ${this._color};
                    --bg-color: ${this._bg};
                    --stroke-width: ${this._stroke};
                    --text-color: ${this._textColor};
                }
                .wrapper {
                    position: relative;
                    width: var(--size);
                    height: var(--size);
                }
                svg {
                    width: 100%;
                    height: 100%;
                    transform: rotate(-90deg);
                }
                circle {
                    fill: none;
                    stroke-width: var(--stroke-width);
                    stroke-linecap: round;
                }
                .percent {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-size: calc(var(--size) * 0.22);
                    font-weight: bold;
                    font-family: system-ui, sans-serif;
                    color: var(--text-color);
                }
            </style>
            <div class="wrapper">
                <svg>
                    <circle class="bg"></circle>
                    <circle class="progress"></circle>
                </svg>
                <div class="percent">0%</div>
            </div>
        `;

        this._bgCircle = this.shadowRoot.querySelector(".bg");
        this._progressCircle = this.shadowRoot.querySelector(".progress");
        this._percentLabel = this.shadowRoot.querySelector(".percent");
    }

    update() {
        if(!this._progressCircle) return;

        const percent = Math.min(100, (this._value / this._max) * 100);
        const sizePx = parseInt(this._size);
        const radius = (sizePx / 2) - this._stroke;
        const circumference = radius * 2 * Math.PI;

        this.style.setProperty("--size", this._size);
        this.style.setProperty("--progress-color", this._color);
        this.style.setProperty("--bg-color", this._bg);
        this.style.setProperty("--stroke-width", this._stroke);
        this.style.setProperty("--text-color", this._textColor);

        [this._bgCircle, this._progressCircle].forEach(circle => {
            circle.setAttribute("cx", sizePx / 2);
            circle.setAttribute("cy", sizePx / 2);
            circle.setAttribute("r", radius);
            circle.style.strokeDasharray = circumference;
        });

        this._bgCircle.style.stroke = this._bg;

        this._progressCircle.style.stroke = this._color;
        this._progressCircle.style.strokeDashoffset =circumference - (percent / 100) * circumference;

        this._percentLabel.textContent = Math.round(percent) + "%";
    }
    get value() {
        return this._value; 
    }
    set value(val) {
        this.setAttribute("value", val);
    }
}

customElements.define("nova-radialprogress", NovaRadialProgress);
