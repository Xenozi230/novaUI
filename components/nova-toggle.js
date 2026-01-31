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

class NovaToggle extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this._checked = this.hasAttribute("checked");
        this._disabled = this.hasAttribute("disabled");
        this._size = this.getAttribute("size") || "medium";
        this._color = this.getAttribute("color") || "#6366f1";
        this._textColor = this.getAttribute("text-color") || "#000";
        this._label = this.getAttribute("label") || "test";
    }

    static get observedAttributes() {
        return ["checked", "disabled", "size", "color", "text-color", "label"];
    } 

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "checked") this._checked = this.hasAttribute("checked");
        if (name === "disabled") this._disabled = this.hasAttribute("disabled");
        if (name === "size") this._size = newValue || "medium";
        if (name === "color") this._color = newValue;
        if (name === "text-color") this._textColor = newValue;
        if (name === "label") this._label = newValue || "";
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
                    --track-color: #ccc;
                    --active-color: ${this._color};
                    margin: 2px;
                }

                .wrapper {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    user-select: none;
                }

                .track {
                    position: relative;
                    border-radius: 999px;
                    background: var(--track-color);
                    transition: 0.25s;
                }

                .thumb {
                    position: absolute;
                    top: 2px;
                    background: white;
                    border-radius: 50%;
                    transition: 0.25s;
                }

                .label {
                    color: ${this._textColor};
                }
            </style>

            <div class="wrapper">
                <div class="track">
                    <div class="thumb"></div>
                </div>
                <span class="label"></span>
            </div>
        `;
        this._wrapper = this.shadowRoot.querySelector(".wrapper");
        this._track = this.shadowRoot.querySelector(".track");
        this._thumb = this.shadowRoot.querySelector(".thumb");
        this._labelEL = this.shadowRoot.querySelector(".label");

        this._wrapper.addEventListener("click", () => {
            if (this._disabled) return;
            this.checked = !this._checked;

            this.dispatchEvent(new CustomEvent("nova-change", {
                detail: { checked: this._checked },
                bubbles: true
            }));
        });
    }

    update() {
        if (!this._wrapper) return;

        const widthMap = {
            small: 30,
            medium: 40,
            large: 50,
            xlarge: 60
        };
        const heightMap = {
            small: 16,
            medium: 20,
            large: 24,
            xlarge: 28
        };
        const textSizeMap = {
            small: "12px",
            medium: "14px",
            large: "16px",
            xlarge: "18px"
        };

        const w = widthMap[this._size] || 40;
        const h = heightMap[this._size] || 20;
        const thumbSize = h - 4;

        this._track.style.width = `${w}px`;
        this._track.style.height = `${h}px`;
        this._track.style.background = this._checked ? this._color : "#ccc";

        this._thumb.style.width = `${thumbSize}px`;
        this._thumb.style.height = `${thumbSize}px`;
        this._thumb.style.left = this._checked ? `${w - h + 2}px` : "2px";

        this._labelEL.textContent = this._label;
        this._labelEL.style.fontSize = textSizeMap[this._size] || "14px";
        this._labelEL.style.display = this._label ? "inline" : "none";
        this._labelEL.style.color = this._textColor;

        this._wrapper.style.cursor = this._disabled ? "not-allowed" : "pointer";
        this._wrapper.style.opacity = this._disabled ? "0.6" : "1";

    }
    toggle() {
        if (this.hasAttribute("checked")) {
            this.removeAttribute("checked");
        } else {
            this.setAttribute("checked", "");
        }

        this.dispatchEvent(
            new CustomEvent("nova-change", {
                detail: { checked: this.hasAttribute("checked") },
                bubbles: true
            })
        );
    }
    get checked() {
        return this._checked;
    }
    set checked(val) {
        val ? this.setAttribute("checked", "") : this.removeAttribute("checked");
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(val) {
        val ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
    }
}

customElements.define("nova-toggle", NovaToggle);
