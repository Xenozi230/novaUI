class NovaProgressBar extends HTMLElement {
    static get observedAttributes() { 
        return ["value", "max", "color", "height", "show-percent", "percent-color","bg"]; 
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                    --progress-color: #6366f1;
                    --progress-height: 16px;
                    --percent-color: #111;
                    --progress-bg: #dddddfff;
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
                }
            </style>
            <div class="bar-container">
                <div class="bar-fill"></div>
            </div>
            <div class="percent" style="display:none">0%</div>
        `;
    }

    connectedCallback() { this.update(); }
    attributeChangedCallback(name, oldValue, newValue) { if(oldValue !== newValue) this.update(); }

    update() {
        const fill = this.shadowRoot.querySelector(".bar-fill");
        const percentText = this.shadowRoot.querySelector(".percent");

        const value = parseFloat(this.getAttribute("value")) || 0;
        const max = parseFloat(this.getAttribute("max")) || 100;
        const percent = Math.min(100, (value / max) * 100);
        fill.style.width = percent + "%";
        
        if (this.hasAttribute("color")) this.style.setProperty("--progress-color", this.getAttribute("color"));
        if (this.hasAttribute("height")) this.style.setProperty("--progress-height", this.getAttribute("height"));
        if (this.hasAttribute("bg")) this.style.setProperty("--progress-bg", this.getAttribute("bg"));

        if (this.hasAttribute("show-percent")) {
            percentText.style.display = "block";
            percentText.textContent = Math.round(percent) + "%";
            if (this.hasAttribute("percent-color")) {
                this.style.setProperty("--percent-color", this.getAttribute("percent-color"));
            }
        } else {
            percentText.style.display = "none";
        }
    }
}

customElements.define("nova-progressbar", NovaProgressBar);
