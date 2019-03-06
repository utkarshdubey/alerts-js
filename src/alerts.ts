interface AlertOptions {
    object: {
        title : string;
        message : string;
        icon ? : string;
        action ? : string;
        redirect ? : string;
        buttonText ? : string;
    }
}

class Alert implements AlertOptions {

    constructor(public object: any) { //public title : string, public message : string, public icon ? : string, public action ? : string, public redirect ? : string, public buttonText? : string
        // Implements Interface AlertOptions
    }

    // Alert Function
    alert() {
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

        // Checks whether an icon parameter is passed
        if (this.object.icon) {
            // Creating an icon element
            const iconElem = document.createElement('img');
            switch (this.object.icon) {
                case 'success':
                    iconElem.src = 'icons/success.png';
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
            switch (this.object.action) {
              case 'link':
                if (this.object.redirect) {
                  const buttonElem = document.createElement('a');
                  buttonElem.href = this.object.redirect;
                  buttonElem.textContent = this.object.buttonText || 'Submit';
                  buttonElem.addEventListener('click', close);
                  alertElem.appendChild(buttonElem);
                }
                break;
              default:
                console.error('Unknown action');
                break;
            }
          } else{
                const buttonElem = document.createElement('button');
                buttonElem.textContent = this.object.buttonText || 'Submit';
                buttonElem.addEventListener('click', close);
                alertElem.appendChild(buttonElem);
          }
        
        //   Appending to body element  
          document.body.appendChild(overlayElem);
          overlayElem.appendChild(alertElem);
    }
}