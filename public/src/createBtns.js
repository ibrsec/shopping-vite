

export const createButtons = (categories) => {
    const buttonStyles = [
      "btn-primary",
      "btn-secondary",
      "btn-success",
      "btn-info",
      "btn-warning",
      "btn-danger",
    ];
    let i = 0;
    const buttonsTexts = Object.keys(categories);
    // buttonsTexts.unshift("ALL");
    const buttons = buttonsTexts.map((item) => ({ text: item, style: buttonStyles[i++] }));
  console.log('buttons :>> ', buttons);
  const buttonSection = document.querySelector("#btns");
  buttons.forEach(eachButton =>{
        let button = document.createElement("button");
        button.textContent = eachButton.text;
        button.classList.add("btn", eachButton.style);
        buttonSection.appendChild(button);
  
  })
  
  };