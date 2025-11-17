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
