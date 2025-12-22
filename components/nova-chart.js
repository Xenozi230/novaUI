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
