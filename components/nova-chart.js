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
