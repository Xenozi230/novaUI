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
