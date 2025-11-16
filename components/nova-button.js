class NovaButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <button style="
        padding:10px 16px;
        border-radius:12px;
        background:#6366f1;
        color:white;
        border:none;
        cursor:pointer;
      ">
        ${this.textContent}
      </button>
    `;
  }
}
customElements.define("nova-button", NovaButton);
