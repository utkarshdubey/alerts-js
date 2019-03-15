﻿interface AlertOptions {
    object: {
        theme ?: {
            name ? : string;
            src ? : string;
        }
        title : string;
        message : string;
        icon ? : string;
        timeout ? : number;
        effects ?: string;

        action ?: {
            type ? : string;
            redirect ? : string;
            text ? : string;
        };

        button ?: {
            type ? : string;
            text: string;
            action ?: {
                type  : string;
                redirect  : string;
            };
        }
        customHTML ?: {
            content : string;
        }
        closeButtonText ? : string;
        closeIcon ?: boolean;
    }
}

class Alert implements AlertOptions {

    constructor(public object: any) { //public title : string, public message : string, public icon ? : string, public action ? : string, public redirect ? : string, public buttonText? : string
        // Implements Interface AlertOptions
    }

    // Alert Function
    alert() {
        if(this.object.theme.name == 'default' || !this.object.theme.name){
            // Loading the CSS file for theme
            const bodyHeadElem  = document.getElementsByTagName('head')[0];
            const bodyHeadElemLink  = document.createElement('link');
            bodyHeadElemLink.rel  = 'stylesheet';
            bodyHeadElemLink.type = 'text/css';
            // bodyHeadElemLink.onload = () => {
            document.addEventListener('DOMContentLoaded', () => {
                console.log('Window Onload function');
            }, false);
            bodyHeadElemLink.href = this.object.theme.src || 'https://utkarsh.co/css/default.css';
            // }
            bodyHeadElem.appendChild(bodyHeadElemLink);

        }

        // Remove previous alert if it exists
        if(document.getElementsByClassName('AlertsJS__overlay')[0]){
          const overlayElem = document.getElementsByClassName('AlertsJS__overlay')[0];
          overlayElem.parentNode.removeChild(overlayElem);
        }

        // Creating the overlay element
        const overlayElem: any = document.createElement('div');
        overlayElem.classList.add('AlertsJS__overlay');

        // Creating an alert element
        const alertElem: any = document.createElement('div');
        alertElem.classList.add('AlertsJS__alert');

        // Creating a background element
        const backElem: any = document.createElement('div');
        backElem.classList.add('AlertsJS__background');
        overlayElem.appendChild(backElem);

        // Create an effects div
        if(this.object.timeout){
        const effectsElem: any = document.createElement('div');
        effectsElem.classList.add('AlertsJS__effects');
        alertElem.appendChild(effectsElem);
        effectsElem.style.animation = "random " + this.object.timeout + "s 1 linear both";
        }

        var thisanim: string = "fade";
        //Addition of Effects 
        if(this.object.effects) {
            switch (this.object.effects) {
            case 'fade':
                thisanim = "fade";
                alertElem.style.animation = thisanim + "In .7s ease-in-out 0s 1 normal both";
                break;
            case 'fade-scale':
                thisanim = "fadeScale";
                alertElem.style.animation = thisanim + "In .7s ease-in-out 0s 1 normal both";
                break;
        }
        }else if(!this.object.effects){
            thisanim = "fade";
        }
        // Close Modal Function
        const close: any = () => {
            alertElem.style.animation = thisanim + "Out .7s ease-in-out 0s 1 normal both";
            // alertElem.classList.add('AlertsJS__' + thisanim + 'Out');
            setTimeout(() => {
              if(overlayElem.parentNode){
                overlayElem.parentNode.removeChild(overlayElem);
              }
            }, 500);
        }


        // Listens for ESC to close the modal
        window.addEventListener("keydown", (e) => {
            if(e.keyCode == 27){
                close();
            }
        }, false);
        // Listens for click on outside the modal only if timeout is not there
        if(!this.object.timeout){
            backElem.addEventListener("click", close);
        }
        // Timeout function
        if(this.object.timeout){
            setTimeout(close, this.object.timeout * 1000);
        }

        // Checks whether an icon parameter is passed
        if (this.object.icon) {
            // Creating an icon element
            const iconElem = document.createElement('img');
            switch (this.object.icon) {
                case 'success':
                    iconElem.src = 'icons/success.png';
                    iconElem.draggable = false;
                    break;
            }

            // iconElem.classList.add('icon');
            alertElem.appendChild(iconElem);
        }

        // Checks whether a title is passed
        if(this.object.title){
            // Creating a title element
            const titleElem: any = document.createElement('h1');
            titleElem.textContent = this.object.title;
            alertElem.appendChild(titleElem);
        } else{
            return console.log('No title is provided.');
        }

        // Checks whether a message a passed
        if(this.object.message){
            const messageElem: any = document.createElement('p');
            messageElem.textContent = this.object.message;
            alertElem.appendChild(messageElem);
        } else{
            return console.log('No message is provided.');
        }
        if(this.object.customHTML){
            if(!this.object.customHTML.content) console.error('customHTML should have atleast one identifier or content property.');
            const customElem: any = document.createElement('div');
            customElem.innerHTML = this.object.customHTML.content;
            customElem.classList.add('AlertsJS__customHTML');
            alertElem.appendChild(customElem);
        }
        // Checks whether an action is provided
        if (this.object.action) {
            switch (this.object.action.type) {
              case 'link':
                if (this.object.action.redirect) {
                  const buttonElem = document.createElement('a');
                  buttonElem.href = this.object.action.redirect;
                  buttonElem.textContent = this.object.action.text || 'Ok!';
                  buttonElem.classList.add('AlertsJS__link');
                  buttonElem.addEventListener('click', close);
                  alertElem.appendChild(buttonElem);
                }
                break;
              default:
                console.error('Unknown action');
                break;
            }
          } else{
                const closeButtonElem = document.createElement('button');
                closeButtonElem.textContent = this.object.closeButtonText || 'Submit';
                closeButtonElem.addEventListener('click', close);
                alertElem.appendChild(closeButtonElem);
          }

          if(this.object.button){

              if(this.object.button.action && this.object.button.action.type == 'link' && this.object.button.action.redirect){
                const buttonElemLink = document.createElement('a');
                buttonElemLink.href = this.object.button.action.redirect;
                buttonElemLink.textContent = this.object.button.text;
                buttonElemLink.classList.add("AlertsJS__button")
                alertElem.appendChild(buttonElemLink);
              } else{
                const buttonElem = document.createElement('button');
                buttonElem.textContent = this.object.button.text;
                buttonElem.type = this.object.button.type || null;
                buttonElem.classList.add("AlertsJS__button");
                alertElem.appendChild(buttonElem);
              }

          }

        //   Close Icon Configuration
        if(this.object.closeIcon){
            const closeIconElem = document.createElement('a');
            closeIconElem.textContent = '×';
            closeIconElem.href = '#';
            closeIconElem.classList.add('AlertsJS__closeIcon');
            closeIconElem.addEventListener('click', close);
            alertElem.appendChild(closeIconElem);    
        }
        //   Appending to body element
          document.body.appendChild(overlayElem);
          overlayElem.appendChild(alertElem);
    }
}

const travisCITest: any = () => {
    return true;
}

module.exports = {
	travisCITest: travisCITest
}
