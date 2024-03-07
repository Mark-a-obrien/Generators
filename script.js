const initialiseBoxShadow = (horizontalSlider, verticalSlider, blurSlider, spreadSlider, opacitySlider, horizontalSliderValue, verticalSliderValue, blurSliderValue, spreadSliderValue, opacitySliderValue) => {
  const box = document.querySelector(".box");
  const boxShadowStyleTextElement = document.querySelector(".box-shadow-style-text");
  let styleText;
  const maxValue = 200;
  const minValue = -200;
  const blurMaxValue = 300;
  const blurMinValue = 0;

  let boxShadow = {
    horizontal:horizontalSlider.value,
    vertical:verticalSlider.value,
    blur:blurSlider.value,
    spread:spreadSlider.value,
    opacity:opacitySlider.value
  }

  return {
    updateStyle: () => { // updates the box shadow of the box element

      const opacity = boxShadow.opacity/100; // Converts opacity to a decimal value
      styleText = `-webkit-box-shadow: ${boxShadow.horizontal}px ${boxShadow.vertical}px ${boxShadow.blur}px ${boxShadow.spread}px rgba(230,220,78,${opacity});
      -moz-box-shadow: ${boxShadow.horizontal}px ${boxShadow.vertical}px ${boxShadow.blur}px ${boxShadow.spread}px rgba(230,220,78,${opacity});
      box-shadow: ${boxShadow.horizontal}px ${boxShadow.vertical}px ${boxShadow.blur}px ${boxShadow.spread}px rgba(230,220,78,${opacity});`

      box.style = styleText;
      boxShadowStyleTextElement.textContent = styleText;
    },
    // the change functions sets the slider value, texfield value to the same value. So when one is update they both are
    changeHorizontalLength: (val) => {
      if (val > maxValue) val=maxValue;
      else if (val < minValue) val=minValue;
      boxShadow.horizontal = horizontalSlider.value = horizontalSliderValue.value = val;
    },
    changeVerticalLength: (val) => {
      if (val > maxValue) val=maxValue;
      else if (val < minValue) val=minValue;
      boxShadow.vertical = verticalSlider.value = verticalSliderValue.value = val;
      
    },
    changeBlur: (val) => {
      if (val > blurMaxValue) val=blurMaxValue;
      else if (val < blurMinValue) val=blurMinValue;
      boxShadow.blur = blurSlider.value = blurSliderValue.value = val;
    },
    changeSpread: (val) => {
      if (val > maxValue) val=maxValue;
      else if (val < minValue) val=minValue;
      boxShadow.spread = spreadSlider.value = spreadSliderValue.value = val;
    },
    changeOpacity: (val) => {
      // if (val > maxValue) val=maxValue;
      // else if (val < minValue) val=minValue;
      boxShadow.opacity = opacitySlider.value = opacitySliderValue.value = val;
    },
    getStyleText: () => {
      return styleText;
    }
  }
}



// querries sliders from the DOM
const horizontalSlider = document.querySelector(".horizontal-slider");
const verticalSlider = document.querySelector(".vertical-slider");
const blurSlider = document.querySelector(".blur-slider");
const spreadSlider = document.querySelector(".spread-slider");
const opacitySlider = document.querySelector(".opacity-slider");

// Querries textfield values from the DOM
const horizontalSliderValue = document.querySelector(".horizontal-slider-value");
const verticalSliderValue = document.querySelector(".vertical-slider-value");
const blurSliderValue = document.querySelector(".blur-slider-value");
const spreadSliderValue = document.querySelector(".spread-slider-value");
const opacitySliderValue = document.querySelector(".opacity-slider-value");




const copyStyleElement = document.querySelector(".copy-style");

// initialises the box shadow to align with the value on the sliders
const boxshadow = initialiseBoxShadow(horizontalSlider, 
                                      verticalSlider, 
                                      blurSlider, 
                                      spreadSlider,
                                      opacitySlider,
                                      horizontalSliderValue,
                                      verticalSliderValue,
                                      blurSliderValue,
                                      spreadSliderValue,
                                      opacitySliderValue);
boxshadow.updateStyle();


// adds event listers to sliders and textfields to updates value when provided with input
const createEventListener = (sliderValue, change) => {

  sliderValue.addEventListener("input", () => {
    if (isNaN(parseInt(sliderValue.value))) return;
    change(parseInt(sliderValue.value));  
    boxshadow.updateStyle();
  });
}

createEventListener(horizontalSlider, boxshadow.changeHorizontalLength);
createEventListener(verticalSlider, boxshadow.changeVerticalLength);
createEventListener(blurSlider, boxshadow.changeBlur);
createEventListener(spreadSlider, boxshadow.changeSpread);
createEventListener(opacitySlider, boxshadow.changeOpacity);

createEventListener(horizontalSliderValue, boxshadow.changeHorizontalLength);
createEventListener(verticalSliderValue, boxshadow.changeVerticalLength);
createEventListener(blurSliderValue, boxshadow.changeBlur);
createEventListener(spreadSliderValue, boxshadow.changeSpread);
createEventListener(opacitySliderValue, boxshadow.changeOpacity);


// Copies the current box shadow style to clipboard
copyStyleElement.addEventListener("click", () => {
  console.log("Copied")

  navigator.clipboard.writeText(boxshadow.getStyleText()) 
});



