class NovaCard extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div style="
        padding:16px;
        border-radius:12px;
        background:white;
        box-shadow:0 4px 15px rgba(0,0,0,0.1);
      ">
        ${this.innerHTML}
      </div>
    `;
  }
}
customElements.define("nova-card", NovaCard);
