interface AlertOptions {
    object: {
        theme ?: {
            name ? : string;
            src ? : string;
        }
        title : string;
        message : string;
        icon ? : string;

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
        closeButtonText ? : string;
    }
}

class Alert implements AlertOptions {

    constructor(public object: any) { //public title : string, public message : string, public icon ? : string, public action ? : string, public redirect ? : string, public buttonText? : string
        // Implements Interface AlertOptions
    }

    // Alert Function
    alert() {

        if(this.object.theme){
            console.log(`Entered the theme ${this.object.theme.name}`);
        } 
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

        // Creating the overlay element
        const overlayElem: any = document.createElement('div');
        overlayElem.classList.add('AlertsJS__overlay');

        // Creating an alert element
        const alertElem: any = document.createElement('div');
        alertElem.classList.add('AlertsJS__alert');

        // Close Modal Function
        const close: any = () => {
            overlayElem.parentNode.removeChild(overlayElem);
        }

        // Listens for ESC to close the modal
        window.addEventListener("keydown", (e) => {
            if(e.keyCode == 27){
                close();
            }
        }, false);        

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

        // Checks whether an action is provided
        if (this.object.action) {
            switch (this.object.action.type) {
              case 'link':
                if (this.object.action.redirect) {
                  const buttonElem = document.createElement('a');
                  buttonElem.href = this.object.action.redirect;
                  buttonElem.textContent = this.object.action.text || 'Ok!';
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
                alertElem.appendChild(buttonElemLink);
              } else{
                const buttonElem = document.createElement('button');
                buttonElem.textContent = this.object.button.text;
                buttonElem.type = this.object.button.type || null;
                alertElem.appendChild(buttonElem);
              }
              
          }
        //   Appending to body element  
          document.body.appendChild(overlayElem);
          overlayElem.appendChild(alertElem);
    }
}