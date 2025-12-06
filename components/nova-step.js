class NovaStep extends HTMLElement {
    static get observedAttributes() {
        return ["active", "completed", "label", "data-content"];
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: flex;
                flex-direction: column;
                align-items: center;
                position: relative;
                font-family: sans-serif;

                --step-size: 32px;
                --circle-font-size: 14px;
                --color-default: #d1d5db;
                --color-active: #6366f1;
                --color-completed: #16a34a;
                --text-color: #111;
            }

            .circle {
                width: var(--step-size);
                height: var(--step-size);
                border-radius: 50%;
                background: var(--color-default);
                display: flex;
                justify-content: center;
                align-items: center;
                color: white;
                font-weight: bold;
                font-size: var(--circle-font-size);
                transition: .2s ease;
                z-index: 2;
            }

            :host([active]) .circle {
                background: var(--color-active);
            }

            :host([completed]) .circle {
                background: var(--color-completed);
            }

            .label {
                margin-top: calc(var(--step-size) / 6);
                font-size: var(--circle-font-size);
                color: var(--text-color);
            }

            .connector {
                position: absolute;
                top: calc(var(--step-size)/2 - (var(--step-size)/16));
                left: calc(-50% - var(--step-size)/2);
                width: calc(100% + var(--step-size));
                height: calc(var(--step-size)/8);
                background: var(--color-default);
                z-index: 1;
            }

            :host([completed]) .connector {
                background: var(--color-completed);
            }
        </style>

        <div class="connector"></div>
        <div class="circle"></div>
        <div class="label"></div>
        `;
    }

    connectedCallback() { this.update(); }
    attributeChangedCallback(name, oldValue, newValue) { if (oldValue !== newValue) this.update(); }

    update() {
        const label = this.shadowRoot.querySelector(".label");
        const circle = this.shadowRoot.querySelector(".circle");
        const connector = this.shadowRoot.querySelector(".connector");

        label.textContent = this.getAttribute("label") || "Step";

        const parent = this.parentElement;
        if (parent && parent.tagName === "NOVA-STEPS") {
            const steps = [...parent.querySelectorAll("nova-step")];
            const index = steps.indexOf(this) + 1;
            circle.textContent = this.getAttribute("data-content") ?? index;
        }

        const prev = this.previousElementSibling instanceof NovaStep ? this.previousElementSibling : null;
        connector.style.display = prev ? "block" : "none";
    }
}

customElements.define("nova-step", NovaStep);

class NovaSteps extends HTMLElement {
    static get observedAttributes() {
        return ["current", "size", "color", "done-color", "text-color"];
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 24px;
                padding: 20px;

                --color-default: #d1d5db;
                --color-active: #6366f1;
                --color-completed: #16a34a;
                --text-color: #111;

                --step-size: 32px;
                --circle-font-size: 14px;
            }
        </style>
        <slot></slot>
        `;
    }

    connectedCallback() { this.updateSteps(); }
    attributeChangedCallback(name, oldValue, newValue) { if (oldValue !== newValue) this.updateSteps(); }

    updateSteps() {
        const current = parseInt(this.getAttribute("current")) || 1;
        const steps = [...this.querySelectorAll("nova-step")];

        const sizeAttr = this.getAttribute("size");
        const sizes = {
            small: { step: "27px", font: "10px" },
            medium: { step: "28px", font: "12px" },
            large: { step: "36px", font: "16px" },
            xlarge: { step: "44px", font: "18px" },
            xxlarge: { step: "56px", font: "22px" }
        };
        let stepSize = "32px";
        let fontSize = "14px";
        if (sizeAttr && sizes[sizeAttr]) {
            stepSize = sizes[sizeAttr].step;
            fontSize = sizes[sizeAttr].font;
        }

        const colorActive = this.getAttribute("color") || getComputedStyle(this).getPropertyValue("--color-active");
        const colorDone = this.getAttribute("done-color") || getComputedStyle(this).getPropertyValue("--color-completed");
        const textColor = this.getAttribute("text-color") || getComputedStyle(this).getPropertyValue("--text-color");

        steps.forEach((step, index) => {
            const num = index + 1;

            step.removeAttribute("active");
            step.removeAttribute("completed");

            if (num < current) step.setAttribute("completed", "");
            if (num === current) step.setAttribute("active", "");

            step.style.setProperty("--step-size", stepSize);
            step.style.setProperty("--circle-font-size", fontSize);

            step.style.setProperty("--color-active", colorActive);
            step.style.setProperty("--color-completed", colorDone);
            step.style.setProperty("--text-color", textColor);
        });

        this.style.setProperty("gap", `calc(${stepSize} + 8p)`);
    }
}

customElements.define("nova-steps", NovaSteps);
