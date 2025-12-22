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
    static get observedAttributes() {
        return ["value", "max", "size", "color", "bg", "stroke", "text-color"];
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    --size: 120px;
                    --progress-color: #6366f1;
                    --bg-color: #000000ff;
                    --stroke-width: 10;
                    --text-color: #111827;
                    display: inline-block;
                }

                .wrapper {
                    position: relative;
                    width: var(--size);
                    height: var(--size);
                }

                svg {
                    transform: rotate(-90deg);
                    width: 100%;
                    height: 100%;
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
                    font-family: sans-serif;
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
    }

    connectedCallback() { this.update(); }
    attributeChangedCallback() { this.update(); }

    update() {
        const value = parseFloat(this.getAttribute("value")) || 0;
        const max = parseFloat(this.getAttribute("max")) || 100;
        const percent = Math.min(100, (value / max) * 100);

        const size = this.getAttribute("size") || "120px";
        const color = this.getAttribute("color") || "#6366f1";
        const bg = this.getAttribute("bg") || "#dddddfff";
        const stroke = this.getAttribute("stroke") || 10;
        const textColor = this.getAttribute("text-color") || "#111827";

        this.style.setProperty("--size", size);
        this.style.setProperty("--progress-color", color);
        this.style.setProperty("--bg-color", bg);
        this.style.setProperty("--stroke-width", stroke);
        this.style.setProperty("--text-color", textColor);

        const radius = (parseInt(size) / 2) - stroke;
        const circumference = radius * 2 * Math.PI;

        const svg = this.shadowRoot.querySelector("svg");
        const bgCircle = this.shadowRoot.querySelector(".bg");
        const progressCircle = this.shadowRoot.querySelector(".progress");
        const percentLabel = this.shadowRoot.querySelector(".percent");

        bgCircle.setAttribute("cx", size.replace("px", "") / 2);
        bgCircle.setAttribute("cy", size.replace("px", "") / 2);
        bgCircle.setAttribute("r", radius);
        bgCircle.style.stroke = bg;

        progressCircle.setAttribute("cx", size.replace("px", "") / 2);
        progressCircle.setAttribute("cy", size.replace("px", "") / 2);
        progressCircle.setAttribute("r", radius);
        progressCircle.style.stroke = color;
        progressCircle.style.strokeDasharray = circumference;
        progressCircle.style.strokeDashoffset = circumference - (percent / 100) * circumference;

        percentLabel.textContent = Math.round(percent) + "%";
    }
}

customElements.define("nova-radialprogress", NovaRadialProgress);
