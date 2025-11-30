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