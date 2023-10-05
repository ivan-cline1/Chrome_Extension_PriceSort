
chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if (msg.name === 'step2') {
    
    chrome.runtime.sendMessage({name:'htmlData'});
    var regexObject = new regexSelection(msg.select)
    
    var filteredList = scrapePage(regexObject);
    displayPrices(filteredList);

  }
})
//Object in order to define the selection
class regexSelection{
  constructor(unitType){

    switch (unitType) {
      case "ounce":
        this.regexPattern = /(\$ ?\d+(\.\d+)?\s*\/\s*[A-Za-z]+)/;
        this.unitList= ["Count", "Unit", "count", "unit", "Each", "each"];
        break;
      case "units":
        this.regexPattern =  /\$\d+(?:\.\d+)?\s*\/\s*[A-Za-z]+/;
        this.unitList= ["Oz", "Ounce", "ounce", "oz", "Pound", "Lb", "pound", "lb"];
        break;
  
      case "calorie":
        this.regexPattern =  /\$\d+(?:\.\d+)?\s*\/\s*[A-Za-z]+/;
        this.unitList= ["Oz", "Ounce", "ounce", "oz", "Pound", "Lb", "pound", "lb"];
        break;
  
      case "pure_cost":
        this.regexPattern =  /\$\d+(?:\.\d+)?\s*\/\s*[A-Za-z]+/;
        this.unitList= ["Oz", "Ounce", "ounce", "oz", "Pound", "Lb", "pound", "lb"];
        break;
  
      default:
        this.regexPattern =  /\$\d+(?:\.\d+)?\s*\/\s*[A-Za-z]+/;
        this.unitList= ["Oz", "Ounce", "ounce", "oz", "Pound", "Lb", "pound", "lb"];
    }
  }
}
function scrapePage(regexObject) {

  //Specific Regex for selection, it currently only sorts by ounce
  // switch (selection) {
  //   case "ounce":
  //     var regexSelect= new regexSelection(["Count", "Unit", "count", "unit", "Each", "each"], /\$\d+(?:\.\d+)?\s*\/\s*[A-Za-z]+/);
  //     var regexPattern = /\$\d+(?:\.\d+)?\s*\/\s*[A-Za-z]+/;
  //     var removedVals = ["Count", "Unit", "count", "unit", "Each", "each"];
  //     break;

  //   case "units":
  //     var regexSelect= new regexSelection(["Count", "Unit", "count", "unit", "Each", "each"], /\$\d+(?:\.\d+)?\s*\/\s*[A-Za-z]+/);
  //     var regexPattern = /\$\d+(?:\.\d+)?\s*\/\s*[A-Za-z]+/;
  //     var removedVals = ["Oz", "Ounce", "ounce", "oz", "Pound", "Lb", "pound", "lb"];
  //     break;

  //   case "calorie":
  //     var regexSelect= new regexSelection(["Count", "Unit", "count", "unit", "Each", "each"], /\$\d+(?:\.\d+)?\s*\/\s*[A-Za-z]+/);
  //     var regexPattern = /\$\d+(?:\.\d+)?\s*\/\s*[A-Za-z]+/;
  //     break;

  //   case "pure_cost":
  //     var regexSelect= new regexSelection(["Count", "Unit", "count", "unit", "Each", "each"], /\$\d+(?:\.\d+)?\s*\/\s*[A-Za-z]+/);
  //     var regexPattern = /\$\d+(?:\.\d+)?\s*\/\s*[A-Za-z]+/;
  //     break;

  //   default:
  //     var regexPattern = /\$\d+(?:\.\d+)?\s*\/\s*[A-Za-z]+/;
  // }
  // var regexPattern = regexObject.regexPattern;
  var removedVals = regexObject.unitList;
  const regexPattern =  /\$\d+(?:\.\d+)?\s*\/\s*[A-Za-z]+/;

  // Get all elements to search within
  const elements = document.getElementsByTagName("*");
  var elementList = new Set();
  const classList = [0];
  // Iterate over the elements and check if their text content matches the regex pattern
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const textContent = element.textContent;
    if (regexPattern.test(textContent)) {
      let closestElement = element
      while (closestElement && (!closestElement.className || closestElement.className.trim() === '')) {
        closestElement = closestElement.parentNode;
      }
      if (closestElement && closestElement.className) {
        const className = closestElement.className.trim();
        classList[0] = className;
      }
    }
  }
  elementList = Array.from(elementList);
  classTag = classList[0];
  neededPrices = document.getElementsByClassName(classTag);
  priceList = [];

  for (let i = 0; i < neededPrices.length; i++) {
    const price = neededPrices[i];
    const priceTextContent = price.textContent;
    priceList.push(priceTextContent)
  }



  let filteredList = priceList.filter(item => {
    for (let substring of removedVals) {
      if (item.includes(substring)) {
        return false;
      }
    }
    return true;
  });
  console.log(filteredList.sort());
  return filteredList.sort();


}

function displayPrices(filteredList) {

  chrome.runtime.sendMessage({ elements: filteredList });
}


