class NovaButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    const label = this.getAttribute("label") || "Click Me";
    const animated = this.hasAttribute("hover-animated");
    const disabled = this.hasAttribute("disabled");
    const customColor = this.getAttribute("color");
    const textColor = this.getAttribute("text-color");
    const size = this.getAttribute("size") || "m";
    const clickAnimated = !this.hasAttribute("noclick-animated");

   
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.disabled = disabled;

    btn.style.cssText = `
      padding: 12px 20px;
      border-radius: 6px;
      background: #6366f1;
      color: white;
      border: none;
      cursor: pointer;
      font-size: 16px;
      transition: all 0.3s ease;
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    `;

    const sizeMap = {
      s: { padding: "6px 12px", font: "12px", radius: "4px" },
      m: { padding: "10px 18px", font: "14px", radius: "6px" },
      l: { padding: "14px 22px", font: "16px", radius: "8px" },
      xl: { padding: "18px 26px", font: "18px", radius: "10px" },
      xxl: { padding: "22px 32px", font: "22px", radius: "12px" }
    };
    const selected = sizeMap[size] || sizeMap.m;

    btn.style.padding = selected.padding;
    btn.style.fontSize = selected.font;
    btn.style.borderRadius = selected.radius;

    if(customColor){
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
