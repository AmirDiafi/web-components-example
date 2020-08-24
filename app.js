const template = document.createElement('template')
template.innerHTML = `
<style>
.user-card {
    display: flex;
    margin: 20px auto;
    border: 1px solid #eee;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, .5)
}
h3 {
    color: purple; 
    width: 150px;
    padding-bottom: 5px;
    text-indent: 15px;
    border-bottom: 1px solid #999;
    margin: 10px 0
}
img {
    width: 150px;
    height: 150px;
    border-radius:
    10px;
    margin-right: 20px;
    padding: 5px;
    background: #eee;
    border:1px solid #eee;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, .5)
}

p {
    margin: 5px 0
}

button {
    background: purple;
    color: #FFF;
    border: 1px solid #EEE;
    padding: 5px 20px;
    border-radius: 10px;
    cursor: pointer;
    outline: none !important
}
</style>
<div class=user-card>
    <img />
    <div class='info'>
        <h3></h3>
        <div class='the-info'>
            <p><slot name='article' /></p>
            <p class='contact'>MAIL: <slot name='mail' /></p>
            <p class='contact'>PHONE: <slot name='phone' /></p>
        </div>
        <button id='toggle-info'>hide info</button>
    </div>
</div>
`

class CustomElement extends HTMLElement {
    constructor() {
        super()
        this.showInfo = true
        this.attachShadow({mode: 'open'})
        this.shadowRoot.appendChild(template.content.cloneNode(true))
        this.shadowRoot.querySelector('.info h3').innerHTML = 
            this.getAttribute('name')
        this.shadowRoot.querySelector('img').src = 
            this.getAttribute('avatar')
    }

    toggleInfo() {
        const info = this.shadowRoot.querySelector('.the-info')
        const toggleBtn = this.shadowRoot.querySelector('button#toggle-info')
        this.showInfo = !this.showInfo;
        if (this.showInfo) {
            info.style.display = 'block'
            toggleBtn.textContent = 'hide info'
        }
        else {
            info.style.display = 'none'
            toggleBtn.textContent = 'show info'
        }
    }

    connectedCallback() {
        this.shadowRoot.querySelector('button#toggle-info').
        addEventListener('click', () => this.toggleInfo())
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector('button#toggle-info').
        removeEventListener()
    }
}
window.customElements.define('custem-element', CustomElement)

class Form extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: 'open'})
        this.form = document.createElement('form')
        this.form.innerHTML = `<input type='text' placeholder='username' />`
        this.input = document.createElement('input')
        this.shadowRoot.appendChild(this.form)
        this.p = document.createElement('p')
        this.shadowRoot.appendChild(this.p)
    }

    showVal() {
        this.p.textContent = this.shadowRoot.querySelector('input').value
    }

    connectedCallback() {
        this.shadowRoot.addEventListener('input', () => this.showVal())
    }
}

window.customElements.define('input-file', Form)
