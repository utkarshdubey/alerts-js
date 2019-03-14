// This is just a sample script. Paste your real code (javascript or HTML) here.
class Alert {
    constructor(a) {
        this.object = a
    }
    alert() {
        if ("default" == this.object.theme.name || !this.object.theme.name) {
            const a = document.getElementsByTagName("head")[0],
                b = document.createElement("link");
            b.rel = "stylesheet", b.type = "text/css", document.addEventListener("DOMContentLoaded", () => {
                console.log("Window Onload function")
            }, !1), b.href = this.object.theme.src || "https://utkarsh.co/css/default.css", a.appendChild(b)
        }
        if (document.getElementsByClassName("AlertsJS__overlay")[0]) {
            const a = document.getElementsByClassName("AlertsJS__overlay")[0];
            a.parentNode.removeChild(a)
        }

        const a = document.createElement("div");
        a.classList.add("AlertsJS__overlay");
        const trial = document.createElement("div");
        //ANSHUL TOUCHED THE CODE HERE
        trial.classList.add("AlertsJS__background"), a.appendChild(trial);
        const b = document.createElement("div");
        b.classList.add("AlertsJS__alert");
        if(this.object.timeout){
        const c = document.createElement("div");
        c.classList.add("AlertsJS__effects"), b.appendChild(c);
		c.style.animation = "random " + this.object.timeout + "s 1 linear both";
        }
        //ANSHUL FINISHED HERE, STARTED AGAIN THO AT THE BOTTOM

        const d = () => {
            a.classList.add("AlertsJS__fadeOut"), setTimeout(() => {
                a.parentNode && a.parentNode.removeChild(a)
            }, 700)
        };
        if (window.addEventListener("keydown", a => {
                27 == a.keyCode && d()
            }, !1), this.object.timeout && setTimeout(d, 1e3 * this.object.timeout), this.object.icon) {
            const a = document.createElement("img");
            switch (this.object.icon) {
                case "success":
                    a.src = "icons/success.png", a.draggable = !1;
            }
            b.appendChild(a)
        }
        if (this.object.title) {
            const a = document.createElement("h1");
            a.textContent = this.object.title, b.appendChild(a)
        } else return console.log("No title is provided.");
        if (this.object.message) {
            const a = document.createElement("p");
            a.textContent = this.object.message, b.appendChild(a)
        } else return console.log("No message is provided.");
        if (this.object.customHTML) {
            this.object.customHTML.content || console.error("customHTML should have atleast one identifier or content property.");
            const a = document.createElement("div");
            a.innerHTML = this.object.customHTML.content, a.classList.add("AlertsJS__customHTML"), b.appendChild(a)
        }
        if (this.object.action) switch (this.object.action.type) {
            case "link":
                if (this.object.action.redirect) {
                    const a = document.createElement("a");
                    a.href = this.object.action.redirect, a.textContent = this.object.action.text || "Ok!", a.classList.add("AlertsJS__link"), a.addEventListener("click", d), b.appendChild(a)
                }
                break;
            default:
                console.error("Unknown action");
        } else {
            const a = document.createElement("button");
            a.textContent = this.object.closeButtonText || "Submit", a.addEventListener("click", d), b.appendChild(a)
        }
        if (this.object.button)
            if (this.object.button.action && "link" == this.object.button.action.type && this.object.button.action.redirect) {
                const a = document.createElement("a");
                a.href = this.object.button.action.redirect, a.textContent = this.object.button.text, a.classList.add("AlertsJS__button"), b.appendChild(a)
            } else {
                const a = document.createElement("button");
                a.textContent = this.object.button.text, a.type = this.object.button.type || null, a.classList.add("AlertsJS__button"), b.appendChild(a)
            } if (this.object.closeIcon) {
            const a = document.createElement("a");
            a.textContent = "\xD7", a.href = "#", a.classList.add("AlertsJS__closeIcon"), a.addEventListener("click", d), b.appendChild(a)
        }
        document.body.appendChild(a), a.appendChild(b)

        //ANSHUL TOUCHED THE CODE HERE
        if(!this.object.timeout){
           document.getElementsByClassName("AlertsJS__background")[0].addEventListener("click", d);
         }

    }

}
const travisCITest = () => !0;
module.exports = {
    travisCITest: travisCITest
};

