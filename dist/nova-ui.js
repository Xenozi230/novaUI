// AUTO-GENERATED NOVAUI


// --- nova-badge.js ---
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

// --- nova-button.js ---
class NovaButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this._disabled = this.hasAttribute("disabled");
  }
  connectedCallback() {
    const label = this.getAttribute("label") || "Click Me";
    const animated = this.hasAttribute("hover-animated");
    const customColor = this.getAttribute("color") || "#6366f1";
    const textColor = this.getAttribute("text-color") || "#ffffff";
    const size = this.getAttribute("size") || "medium";
    const variant = this.getAttribute("variant") || "solid";
    const clickAnimated = !this.hasAttribute("noclick-animated");

   
    const btn = document.createElement("button");
    btn.textContent = label;

    btn.style.cssText = `
      border: none;
      cursor: ${this._disabled ? "not-allowed" : "pointer"};
      font-size: 16px;
      transition: all 0.3s ease;
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      margin: 2px;
      ${this._disabled ? "opacity: 0.6;" : ""}
    `;

    const sizeMap = {
      small: { padding: "6px 12px", font: "12px", radius: "4px" },
      medium: { padding: "10px 18px", font: "14px", radius: "6px" },
      large: { padding: "14px 22px", font: "16px", radius: "8px" },
      xlarge: { padding: "18px 26px", font: "18px", radius: "10px" },
      xxlarge: { padding: "22px 32px", font: "22px", radius: "12px" }
    };
    const selected = sizeMap[size] || sizeMap.m;

    btn.style.padding = selected.padding;
    btn.style.fontSize = selected.font;
    btn.style.borderRadius = selected.radius;

    const mainColor  = customColor || "#6366f1";
    const text = textColor || "#ffffff";

    if (variant === "solid") {
      btn.style.background = mainColor;
      btn.style.color = text;
      btn.style.border = "none";
    }
    if (variant === "outline") {
      btn.style.background = "transparent";
      btn.style.border = `2px solid ${mainColor}`;
      btn.style.color = mainColor;
      btn.style.boxShadow = "none";
    } 
    if (variant === "ghost") {
      btn.style.background = "transparent";
      btn.style.border = "none";
      btn.style.color = mainColor;
      btn.style.boxShadow = "none";
    }

    if(customColor && variant === "solid"){
      btn.style.background = customColor;
    }

    if (textColor) {
      btn.style.color = textColor;
    }

    if(animated){
      btn.addEventListener("mouseover", () => {
        btn.style.transform = "scale(1.05)";
        btn.style.boxShadow = "0 6px 12px rgba(0,0,0,0.3)";
      });
      btn.addEventListener("mouseout", () => {
        btn.style.transform = "scale(1)";
        btn.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
      });
    }
    if(clickAnimated){
      btn.addEventListener("mousedown", () => {
        btn.style.transform = "scale(0.95)";
      });
      btn.addEventListener("mouseup", () => {
        btn.style.transform = "scale(1.00)";
      });
    }

    btn.addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("nova-click", { bubbles: true}));
    });
  
    this.shadowRoot.appendChild(btn);
  }
}
customElements.define("nova-button", NovaButton);


// --- nova-card.js ---
class NovaCard extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute("title") || "";
    const align = this.getAttribute("title-align") || "left";
    const sizetitle = this.getAttribute("title-size") || "18px";
    const colortitle = this.getAttribute("title-color") || "black";
    const background = this.getAttribute("background-color") || "white";
    this.innerHTML = `
      <div style="
        padding:16px;
        border-radius:12px;
        background:white;
        box-shadow:0 4px 15px rgba(0,0,0,0.1);
        margin:10px 0;
        background: ${background};
      ">
      ${title ? `
        <div style="font-size:18px; 
        font-weight:600; 
        margin-bottom:10px;
        text-align:${align};
        font-size: ${sizetitle};
        color: ${colortitle};
      ">
        ${title}
      </div>` : ""}

      <div  class="card-content">
        ${this.innerHTML}
      </div>
    `;
  }
}
customElements.define("nova-card", NovaCard);


// --- nova-chart.js ---
class NovaChart extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const type = this.getAttribute("type") || "bar";
    const data = JSON.parse(this.getAttribute("data") || "[]");
    this.shadowRoot.innerHTML = `<canvas></canvas>`;
    const canvas = this.shadowRoot.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 300;
    canvas.height = 200;
    if(type === "bar") this.renderBar(ctx, data);
  }

  renderBar(ctx, data){
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    const max = Math.max(...data);
    const barWidth = w / data.length;
    data.forEach((val,i)=>{
      const barHeight = (val/max)*h;
      ctx.fillStyle="#6366f1";
      ctx.fillRect(i*barWidth, h-barHeight, barWidth-6, barHeight);
    });
  }
}
customElements.define("nova-chart", NovaChart);


// --- nova-checkbox.js ---
class NovaCheckbox extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this._checked = this.hasAttribute("checked");
        this._color = this.getAttribute("color") || "#6366f1";
        this._textColor = this.getAttribute("text-color") || "#000";
        this._size = this.getAttribute("size") || "medium";
    }
    
    connectedCallback() {
        this.render();
        this.setupEvents();
        this.updateVisuals();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .wrapper {
                display: flex;
                align-items: center;
                gap: 10px;
                cursor: pointer;
                user-select: none;
                font-family: sans-serif;
                }

                .box {
                width: 22px;
                height: 22px;
                border-radius: 6px;
                border: 2px solid #ccc;
                transition: background 0.2s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 2px;
                }

                .label {
                font-size: 14px;
                }
            </style>

            <div class="wrapper">
                <div class="box"></div>
                <div class="label">${this.getAttribute("label") || ""}</div>
            </div>
        `;

        this._elements = {
            box : this.shadowRoot.querySelector('.box'),
            label : this.shadowRoot.querySelector('.label'),
            wrapper : this.shadowRoot.querySelector('.wrapper')
        };
    }

    setupEvents() {
        this._elements.wrapper.addEventListener('click', () => this.toggle());
    }

    toggle() {
        this._checked = !this._checked;
        this.updateVisuals();

        this.dispatchEvent(
            new CustomEvent('nova-change', {
                detail: { checked: this._checked },
                bubbles: true,
            })
        );
    }

    updateVisuals() {
        const { box, label } = this._elements;

        const sizeMap = {
            small: "14px",
            medium: "18px",
            large: "22px",
            xlarge: "26px"
        };
        const textSizeMap = {
            small: "12px",
            medium: "14px",
            large: "16px",
            xlarge: "18px"
        };

        const boxSize = sizeMap[this._size] || sizeMap.medium;
        const textSize = textSizeMap[this._size] || textSizeMap.medium;

        box.style.width = boxSize;
        box.style.height = boxSize;
        label.style.fontSize = textSize;

        box.style.background = this._checked ? this._color : 'white';
        box.style.borderColor = this._checked ? this._color : '#ccc';

        this._elements.label.style.color = this.getAttribute("text-color") || this._textColor;

        if (this._checked) this.setAttribute("checked", "");
        else this.removeAttribute("checked");
    }

    get checked() {
        return this._checked;
    }

    set checked(value) {
        this._checked = Boolean(value);
        this.updateVisuals();
    }
}
customElements.define("nova-checkbox", NovaCheckbox);

// --- nova-input.js ---
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


// --- nova-loading.js ---
class NovaSpinner extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this._variant = this.getAttribute("variant") || "spinner"; 
    this._size = this.getAttribute("size") || "medium";
    this._color = this.getAttribute("color") || "#6366f1";
    this._thickness = this.getAttribute("thickness") || "4";
    this._speed = this.getAttribute("speed") || "0.8s";
  }

  static get observedAttributes() {
    return ["variant", "size", "color", "thickness", "speed"];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === "variant") this._variant = newVal;
    if (name === "size") this._size = newVal;
    if (name === "color") this._color = newVal;
    if (name === "thickness") this._thickness = newVal;
    if (name === "speed") this._speed = newVal;
    this.render();
    this.update();
  }

  connectedCallback() {
    this.render();
    this.update();
  }

  render() {
    const isDots = this._variant === "dots";

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        /* SPINNER STYLE */
        .spinner {
          border-radius: 50%;
          border-style: solid;
          border-color: transparent;
          border-top-color: ${this._color};
          animation: spin var(--speed) linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* DOTS STYLE */
        .dots {
          display: flex;
          gap: 6px;
        }

        .dot {
          width: var(--dot-size);
          height: var(--dot-size);
          border-radius: 50%;
          background: ${this._color};
          animation: bounce var(--speed) infinite ease-in-out;
        }

        .dot:nth-child(2) { animation-delay: calc(var(--speed) / 4); }
        .dot:nth-child(3) { animation-delay: calc(var(--speed) / 2); }

        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.4); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }
      </style>

      ${
        isDots
          ? `
            <div class="dots">
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
            </div>
          `
          : `
            <div class="spinner"></div>
          `
      }
    `;

    this._element = this.shadowRoot.querySelector(
      this._variant === "dots" ? ".dots" : ".spinner"
    );
  }

  update() {
    if (!this._element) return;

    const sizePresets = {
      small: 20,
      medium: 30,
      large: 40,
      xlarge: 50,
      xxlarge: 60,
    };

    const dotSizePresets = {
      small: 5,
      medium: 8,
      large: 10,
      xlarge: 13,
      xxlarge: 17,
    };

    const spinnerSize = sizePresets[this._size] || sizePresets.medium;
    const dotSize = dotSizePresets[this._size] || dotSizePresets.medium;

    this._element.style.setProperty("--speed", this._speed);

    if (this._variant === "spinner") {
      this._element.style.width = `${spinnerSize}px`;
      this._element.style.height = `${spinnerSize}px`;
      this._element.style.borderWidth = `${this._thickness}px`;
      this._element.style.borderTopColor = this._color;
    }
    if (this._variant === "dots") {
      const dots = this.shadowRoot.querySelectorAll(".dot");
      dots.forEach(dot => {
        dot.style.width = `${dotSize}px`;
        dot.style.height = `${dotSize}px`;
        dot.style.background = this._color;
        dot.style.setProperty("--speed", this._speed);
      });
    }
  }
}

customElements.define("nova-spinner", NovaSpinner);


// --- nova-progressbar.js ---
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


// --- nova-radialprogress.js ---
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


// --- nova-slider.js ---
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
        const heights = { small: "4px", medium: "6px", large: "8px", xlarge: "10px" };
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


// --- nova-step.js ---
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


// --- nova-toggle.js ---
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

