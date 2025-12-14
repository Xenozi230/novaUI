class NovaInput extends HTMLElement {
    static get observedAttributes() {
        return ["value", "placeholder", "type", "color", "icon", "error", "disabled", "bg", "size"];
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: inline-block;
                    width: auto;

                    --border-color: #d1d5db;
                    --focus-color: #6366f1;
                    --error-color: #ef4444;
                    --bg-color: #fff;

                    font-family: system-ui, sans-serif;
                }

                /* 🎯 Taille dynamique */
                .input-wrapper.small     { padding: 4px 8px;  font-size: 0.8rem;  border-radius: 8px;  min-width: 140px; }
                .input-wrapper.medium    { padding: 6px 10px; font-size: 0.95rem; border-radius: 10px; min-width: 180px; }
                .input-wrapper.large     { padding: 8px 12px; font-size: 1rem;    border-radius: 12px; min-width: 220px; }
                .input-wrapper.xlarge    { padding: 10px 14px; font-size: 1.1rem; border-radius: 14px; min-width: 260px; }
                .input-wrapper.xxlarge   { padding: 12px 16px; font-size: 1.2rem; border-radius: 16px; min-width: 300px; }

                .input-wrapper {
                    position: relative;
                    display: inline-flex;
                    align-items: center;

                    background: var(--bg-color);
                    border: 2px solid var(--border-color);
                    gap: 6px;

                    transition: all 0.2s ease;
                }

                .input-wrapper:hover {
                    border-color: #bfc4ce;
                }

                .input-wrapper:focus-within {
                    border-color: var(--focus-color);
                    box-shadow: 0 0 4px var(--focus-color);
                }

                .icon {
                    font-size: 1.1rem;
                    opacity: 0.7;
                    user-select: none;
                }

                input {
                    flex: 1;
                    border: none;
                    outline: none;
                    background: transparent;
                }

                input.error {
                    color: var(--error-color);
                }

                .input-wrapper.error {
                    border-color: var(--error-color);
                    box-shadow: 0 0 4px var(--error-color);
                }

                .input-wrapper.disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }
            </style>

            <div class="input-wrapper medium">
                <span class="icon" style="display:none"></span>
                <input />
            </div>
        `;
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) this.render();
    }

    render() {
        const wrapper = this.shadowRoot.querySelector(".input-wrapper");
        const input = this.shadowRoot.querySelector("input");
        const iconEl = this.shadowRoot.querySelector(".icon");

        wrapper.classList.remove("small", "medium", "large", "xlarge", "xxlarge");

        const size = this.getAttribute("size") || "medium";
        wrapper.classList.add(size);

        if (this.hasAttribute("value")) input.value = this.getAttribute("value");
        if (this.hasAttribute("placeholder")) input.placeholder = this.getAttribute("placeholder");
        input.type = this.getAttribute("type") || "text";
        if (this.hasAttribute("disabled")) {
            input.disabled = true;
            wrapper.classList.add("disabled");
        } else {
            input.disabled = false;
            wrapper.classList.remove("disabled");
        }
        if (this.hasAttribute("bg")) {
            this.style.setProperty("--bg-color", this.getAttribute("bg"));
        }
        if (this.hasAttribute("color")) {
            this.style.setProperty("--focus-color", this.getAttribute("color"));
        }
        if (this.hasAttribute("error")) {
            wrapper.classList.add("error");
            input.classList.add("error");
        } else {
            wrapper.classList.remove("error");
            input.classList.remove("error");
        }
        if (this.hasAttribute("icon")) {
            iconEl.style.display = "block";
            iconEl.textContent = this.getAttribute("icon");
        } else {
            iconEl.style.display = "none";
        }
    }
}
customElements.define("nova-input", NovaInput);
