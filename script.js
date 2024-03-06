


const initialiseBoxShadow = (horizontal, vertical, blur, spread) => {
  const box = document.querySelector(".box");
  const boxShadowStyleTextElement = document.querySelector(".box-shadow-style-text");

  let styleText;

  let boxShadow = {
    horizontal,
    vertical,
    blur,
    spread
  }

  return {
    updateStyle: () => { // updates the box shadow of the box element
      styleText = `-webkit-box-shadow: ${boxShadow.horizontal}px ${boxShadow.vertical}px ${boxShadow.blur}px ${boxShadow.spread}px rgba(230,220,78,0.75);
      -moz-box-shadow: ${boxShadow.horizontal}px ${boxShadow.vertical}px ${boxShadow.blur}px ${boxShadow.spread}px rgba(230,220,78,0.75);
      box-shadow: ${boxShadow.horizontal}px ${boxShadow.vertical}px ${boxShadow.blur}px ${boxShadow.spread}px rgba(230,220,78,0.75);`

      box.style = styleText;
      boxShadowStyleTextElement.textContent = styleText;
    },
    changeHorizontalLength: (val) => {
      boxShadow.horizontal = val;
    },
    changeVerticalLength: (val) => {
      boxShadow.vertical = val;
    },
    changeBlur: (val) => {
      boxShadow.blur = val;
    },
    changeSpread: (val) => {
      boxShadow.spread = val;
    },
    getStyleText: () => {
      return styleText;
    }
  }
}



// querries sliders from the dom
const horizontalSlider= document.querySelector(".horizontal-slider");
const verticalSlider= document.querySelector(".vertical-slider");
const blurSlider= document.querySelector(".blur-slider");
const spreadSlider= document.querySelector(".spread-slider");

const copyStyleElement = document.querySelector(".copy-style");

// initialises the box shadow to align with the value on the sliders
const boxshadow = initialiseBoxShadow(horizontalSlider.value, verticalSlider.value, blurSlider.value, spreadSlider.value);
boxshadow.updateStyle();



// Event listeners 
horizontalSlider.addEventListener("input", () => {
  boxshadow.changeHorizontalLength(parseInt(horizontalSlider.value));
  boxshadow.updateStyle();
});

verticalSlider.addEventListener("input", () => {
  boxshadow.changeVerticalLength(parseInt(verticalSlider.value));
  boxshadow.updateStyle();
});

blurSlider.addEventListener("input", () => {
  boxshadow.changeBlur(parseInt(blurSlider.value));
  boxshadow.updateStyle();
});

spreadSlider.addEventListener("input", () => {
  boxshadow.changeSpread(parseInt(spreadSlider.value));
  boxshadow.updateStyle();
});


// Copies the current box shadow style to clipboard
copyStyleElement.addEventListener("click", () => {
  console.log("Copied")

  navigator.clipboard.writeText(boxshadow.getStyleText()) 
});



