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
    }

  static get observedAttributes() {
        return ["checked", "disabled", "size"];
    } 

  attributeChangedCallback(name, oldValue, newValue) {
        if (name === "checked") {
        this._checked = this.hasAttribute("checked");
        }
        if (name === "disabled") {
        this._disabled = this.hasAttribute("disabled");
        }
        if (name === "size") {
        this._size = newValue;
        }
        this.updateVisuals();
    }

  connectedCallback() {
        const labelTxt = this.getAttribute("label") || "";

        const wrapper = document.createElement("div");
        wrapper.style.cssText = `
        display:flex;
        align-items:center;
        gap:10px;
        cursor:${this._disabled ? "not-allowed" : "pointer"};
        user-select:none;
        margin:2px;
        `;

        const sizeMap = {
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


        const track = document.createElement("div");
        track.style.cssText = `
        width:${sizeMap[this._size] || 40}px;
        height:${heightMap[this._size] || 20}px;
        background:${this._checked ? this._color : "#ccc"};
        border-radius:999px;
        position:relative;
        transition:0.25s;
        box-shadow: inset 0 2px 8px rgba(0,0,0,0.2);
        flex-shrink:0;
        `;

        const thumb = document.createElement("div");
        thumb.style.cssText = `
        width:${(heightMap[this._size] || 20) - 4}px;
        height:${(heightMap[this._size] || 20) - 4}px;
        background:white;
        border-radius:50%;
        position:absolute;
        top:2px;
        left:${this._checked ? `${(sizeMap[this._size] || 40) - (heightMap[this._size] || 20)}px` : "2px"};
        transition:0.25s;
        box-shadow:0 2px 4px rgba(0,0,0,0.2);
        `;

        track.appendChild(thumb);

        const label = document.createElement("span");
        label.textContent = labelTxt;
        label.style.cssText = `
        color:${this._textColor};
        font-size:14px;
        `;

        wrapper.appendChild(track);
        if (labelTxt) wrapper.appendChild(label);

        wrapper.addEventListener("click", () => {
        if (this._disabled) return;
        this.toggle();
        });

        this.shadowRoot.appendChild(wrapper);

        this._elements = { wrapper, track, thumb, label };
        this.updateVisuals();
    }

    toggle() {
        this._checked = !this._checked;
        this.updateVisuals();
        this.dispatchEvent(
        new CustomEvent("nova-change", {
            detail: { checked: this._checked },
            bubbles: true
        })
        );
    }

  updateVisuals() {
        if (!this._elements) return;

        const { wrapper, track, thumb, label } = this._elements;

        const sizeMap = {
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

        if (label) {
            label.style.fontSize = textSizeMap[this._size] || "14px";
        }

        const trackW = sizeMap[this._size] || 40;
        const trackH = heightMap[this._size] || 20;
        const thumbSize = trackH - 4;

        track.style.background = this._checked ? this._color : "#ccc";

        thumb.style.left = this._checked
        ? `${trackW - trackH + 2}px`
        : "2px";

        thumb.style.width = `${thumbSize}px`;
        thumb.style.height = `${thumbSize}px`;

        wrapper.style.opacity = this._disabled ? "0.6" : "1";
        wrapper.style.cursor = this._disabled ? "not-allowed" : "pointer";

        if (this._checked) this.setAttribute("checked", "");
        else this.removeAttribute("checked");

        if (this._disabled) this.setAttribute("disabled", "");
        else this.removeAttribute("disabled");
    }

  get checked() {
        return this._checked;
    }
  set checked(v) {
        this._checked = Boolean(v);
        this.updateVisuals();
    }

  get disabled() {
        return this._disabled;
    }
  set disabled(v) {
        this._disabled = Boolean(v);
        this.updateVisuals();
    }
}

customElements.define("nova-toggle", NovaToggle);
