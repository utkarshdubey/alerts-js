const alert = (object) => {
  if (!object) {
    return console.error('You have to provide content');
  }
  const alertElem = document.createElement('div');
  const close = () => {
    alertElem.parentNode.removeChild(alertElem);
  };
  if (object.title) {
    const titleElem = document.createElement('h1');
    titleElem.textContent = object.title;
    alertElem.appendChild(titleElem);
  } else {
    return console.error('You have to provide a title');
  }
  if (object.message) {
    const messageElem = document.createElement('p');
    messageElem.textContent = object.message;
    alertElem.appendChild(messageElem);
  } else {
    return console.error('You have to provide a message');
  }
  if (object.action) {
    switch (object.action) {
      case 'link':
        if (object.redirect) {
          const buttonElem = document.createElement('a');
          buttonElem.href = object.redirect;
          buttonElem.textContent = object.buttonText || 'Submit';
          buttonElem.addEventListener('click', close);
          alertElem.appendChild(buttonElem);
        }
        break;
      default:
        break;
    }
  } else {
    const buttonElem = document.createElement('button');
    buttonElem.textContent = object.buttonText || 'Submit';
    buttonElem.addEventListener('click', close);
    alertElem.appendChild(buttonElem);
  }
  if (object.icon) {
    const iconElem = document.createElement('img');
    switch (object.icon) {
      case 'success':
        iconElem.src = 'icons/success.png';
        break;
    }
    // iconElem.classList.add('icon');
    alertElem.appendChild(iconElem);
  }
  document.body.appendChild(alertElem);
};

alert({
  title: 'Hello!',
  message: 'Approved',
  icon: 'success',
  // action: 'link',
  // redirect: '/test',
  buttonText: 'Submit',
});
