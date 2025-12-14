class NovaBadge extends HTMLElement {
    static get observedAttributes() {
        return ["label", "color", "size", "icon", "bg", "rounded", "variant"];
    }
    
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    --bg-color: #6366f1;
                    --text-color: #111;
                    --border-color: #6366f1;
                    display: inline-block;
                    font-family: system-ui, sans-serif;
                }
                .badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 4px 10px;
                    font-size: 0.75rem;
                    font-weight: 500;
                    border-radius: 8px;
                    border: 1px solid var(--border-color);
                    background: var(--bg-color);
                    color: var(--text-color);
                    transition: all 0.2s ease;
                    white-space: nowrap;
                    margin: 4px;
                    margin-top: 5px;
                }

                .small { font-size: 0.65rem; padding: 2px 8px; }
                .medium { font-size: 0.75rem; }
                .large { font-size: 0.85rem; padding: 6px 12px; }
                .xlarge { font-size: 1rem; padding: 8px 16px; }

                .solid {
                    background: var(--bg-color);
                }
                .outline {
                    background: transparent;
                    border-color: var(--border-color);
                }

                .soft {
                    background: color-mix(in srgb, var(--bg-color) 20%, transparent);
                    border-color: transparent;
                }

                .rounded {
                    border-radius: 999px;
                }

                .icon {
                    display: none;
                    line-height: 1;
                    font-size: 1em;
                }

                .has-icon .icon {
                    display: inline-flex;
                }
                .icon-only {
                    padding: 6px;
                    justify-content: center;
                    gap: 0;
                }
            </style>

            <span class="badge medium">
                <span class="icon"></span>
                <span class="label"></span>
                <slot hidden></slot>
            </span>
        `;
    }
    connectedCallback() {
        this.update();
    }

    attributeChangedCallback() {
        this.update();
    }

    update() {
        const badge = this.shadowRoot.querySelector(".badge");
        const labelEl = this.shadowRoot.querySelector(".label");
        const iconEl = this.shadowRoot.querySelector(".icon");
        const slot = this.shadowRoot.querySelector("slot");

        badge.className = "badge";
        badge.classList.add(this.getAttribute("size") || "medium");
        badge.classList.add(this.getAttribute("variant") || "solid");
        if (this.getAttribute("rounded")) {
            badge.classList.add("rounded");
        }
        const hasIcon = this.hasAttribute("icon");
        if (hasIcon) {
            badge.classList.add("has-icon");
            iconEl.textContent = this.getAttribute("icon");
        } else {
            iconEl.textContent = "";
        }
        const hasLabel =
            this.hasAttribute("label") || this.textContent.trim().length > 0;

        if (this.hasAttribute("label")) {
            labelEl.textContent = this.getAttribute("label");
            slot.hidden = true;
        } else {
            labelEl.textContent = "";
            slot.hidden = false;
        }
        if (hasIcon && !hasLabel) {
            badge.classList.add("icon-only", "rounded");
        }
        if (this.getAttribute("bg")) {
            this.style.setProperty("--bg-color",this.getAttribute("bg"));
        }
        if (this.getAttribute("color")) {
            this.style.setProperty("--text-color",this.getAttribute("color"));
            this.style.setProperty("--border-color",this.getAttribute("color"));
        }
    }

}
customElements.define("nova-badge", NovaBadge);