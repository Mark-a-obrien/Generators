// Intialising variablesr4r

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

// Querries colors values from the DOM
const shadowColor = document.querySelector(".shadow-color");
const backgroundColorInput = document.querySelector(".background-color");
const boxColor = document.querySelector(".box-color");


const box = document.querySelector(".box");
const insetButton = document.querySelector(".inset")
const copyStyleElement = document.querySelector(".copy-style");





const initialiseBoxShadow = (horizontalSlider, verticalSlider, blurSlider, spreadSlider, opacitySlider, horizontalSliderValue, verticalSliderValue, blurSliderValue, spreadSliderValue, opacitySliderValue) => {
  const box = document.querySelector(".box");
  const boxShadowStyleTextElement = document.querySelector(".box-shadow-style-text");
  const boxBackground = document.querySelector(".box-background");
  let styleText;
  const maxValue = 200;
  const minValue = -200;
  const blurMaxValue = 300;
  const blurMinValue = 0;
  let isInset = false;

  let boxShadow = {
    horizontal:horizontalSlider.value,
    vertical:verticalSlider.value,
    blur:blurSlider.value,
    spread:spreadSlider.value,
    opacity:opacitySlider.value
  };

  let boxRGBA = {
    red: 255,
    green: 255,
    blue: 255,  
    opacity: 1
  }

  let shadowRGB = {
    red: 255,
    green: 255,
    blue: 255,
  }

  let backgroundRGB = {
    red: 255,
    green: 100,
    blue: 255,
  }

  return {
    updateStyle: () => { // updates the box shadow of the box element

      const inset = isInset ? "inset" : "";

      const opacity = boxShadow.opacity/100; // Converts opacity to a decimal value
      styleText = `-webkit-box-shadow: ${inset} ${boxShadow.horizontal}px ${boxShadow.vertical}px ${boxShadow.blur}px ${boxShadow.spread}px rgba(${shadowRGB.red},${shadowRGB.green},${shadowRGB.blue},${opacity});
      -moz-box-shadow: ${inset} ${boxShadow.horizontal}px ${boxShadow.vertical}px ${boxShadow.blur}px ${boxShadow.spread}px rgba(${shadowRGB.red},${shadowRGB.green},${shadowRGB.blue},${opacity});
      box-shadow: ${inset} ${boxShadow.horizontal}px ${boxShadow.vertical}px ${boxShadow.blur}px ${boxShadow.spread}px rgba(${shadowRGB.red},${shadowRGB.green},${shadowRGB.blue},${opacity});
      
      background-color:rgba(${boxRGBA.red},${boxRGBA.green},${boxRGBA.blue}, ${boxRGBA.opacity});
      `

      box.style = styleText;
      boxShadowStyleTextElement.textContent = styleText;


      boxBackground.style =  `background-color:rgb(${backgroundRGB.red},${backgroundRGB.green},${backgroundRGB.blue});`;
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
    },
    changeBoxRGB: (rgba) => {
      boxRGBA.red = rgba.red;
      boxRGBA.green = rgba.green;
      boxRGBA.blue = rgba.blue;
      boxRGBA.opacity = rgba.opacity;
    },
    changeBackgroundRGB: (rgba) => {
      backgroundRGB.red = rgba.red;
      backgroundRGB.green = rgba.green;
      backgroundRGB.blue = rgba.blue;
    },
    changeShadowRGB: (rgba) => {
      shadowRGB.red = rgba.red;
      shadowRGB.green = rgba.green;
      shadowRGB.blue = rgba.blue;
    },
    setIsInset: () => {
      isInset = !isInset;
    }
  }
}

// Gets the color input from color input fields on the DOM
const getColorInput = (colorElement) => {
  const rgb = {
    red:parseInt(colorElement.value.substr(1,2), 16),
    green:parseInt(colorElement.value.substr(3,2), 16),
    blue:parseInt(colorElement.value.substr(5,2), 16),
    opacity: 1
  }

  return rgb;
}


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


boxshadow.changeShadowRGB(getColorInput(shadowColor));
boxshadow.changeBackgroundRGB(getColorInput(backgroundColorInput));
boxshadow.changeBoxRGB(getColorInput(boxColor));
boxshadow.updateStyle();


// Adds event listers to colors
const createChangeColorEventListener = (colorElement, change) => {
  colorElement.addEventListener("input", () => {
    change(getColorInput(colorElement));
    boxshadow.updateStyle();
  });
}

// Adds event listers to sliders and textfields to updates value when provided with input
const createEventListener = (sliderValue, change) => {

  sliderValue.addEventListener("input", () => {
    if (isNaN(parseInt(sliderValue.value))) return;
    change(parseInt(sliderValue.value));  
    boxshadow.updateStyle();
  });
}

// Adding event sliders 
createEventListener(horizontalSlider, boxshadow.changeHorizontalLength);
createEventListener(verticalSlider, boxshadow.changeVerticalLength);
createEventListener(blurSlider, boxshadow.changeBlur);
createEventListener(spreadSlider, boxshadow.changeSpread);
createEventListener(opacitySlider, boxshadow.changeOpacity);

// Adding event textfields 
createEventListener(horizontalSliderValue, boxshadow.changeHorizontalLength);
createEventListener(verticalSliderValue, boxshadow.changeVerticalLength);
createEventListener(blurSliderValue, boxshadow.changeBlur);
createEventListener(spreadSliderValue, boxshadow.changeSpread);
createEventListener(opacitySliderValue, boxshadow.changeOpacity);

// Adding event colors 
createChangeColorEventListener(shadowColor, boxshadow.changeShadowRGB);
createChangeColorEventListener(backgroundColorInput, boxshadow.changeBackgroundRGB);
createChangeColorEventListener(boxColor, boxshadow.changeBoxRGB);


// Sets the box shadow to either inset or outline 
insetButton.addEventListener("click", () => {
  let text = insetButton.textContent.toLowerCase();

  text === "outline" ? insetButton.textContent="Inset" : insetButton.textContent="Outline"

  boxshadow.setIsInset();
  boxshadow.updateStyle();
})


const delay = (time) => {
  return new Promise(resolve => setTimeout(resolve, time));
}

const copyButtonText = copyStyleElement.textContent;
// Copies the current box shadow style to clipboard
copyStyleElement.addEventListener("click", () => {
  copyStyleElement.textContent ="Copied";
  navigator.clipboard.writeText(boxshadow.getStyleText()) 
  delay(1000).then(() => copyStyleElement.textContent = copyButtonText);
});



