import { loadFromLocalStorage, saveToLocalStorage } from "./localStorageHelpers.js"


export function savePageFour(user) {
    const container = document.querySelector(".containerFour");
    if (!container) return {};

    const data = {};
    
    container.querySelectorAll("button, input, span").forEach(el => {

        if (el.tagName == "BUTTON") {
            if (el.id == "yetDisabled") {
                data[el.id] = el.disabled;
            } else if (el.id == "submitBtn") {
                data[el.id] = el.textContent;
            }
        }

        if (el.tagName == "INPUT") {
            data[el.id] = el.value;
        } 
        
        if (el.tagName == "SPAN" ) {
            if (el.classList.length > 0) {
                const classKey = el.classList[0];
                if (!Array.isArray(data[classKey])) {
                    data[classKey] = [];
                }
                data[classKey].push(el.textContent);
            } else {
                data.totalCalories = el.textContent;
            }
        } 
        return saveToLocalStorage(user, "page4", data);
    });
}

export function restorePageFour(user) {
    const savedData = loadFromLocalStorage(user, "page4");
    if (!savedData) return;

    const container = document.querySelector(".containerFour");
    if (!container) return;

    Object.keys(savedData).forEach(key => {
        if (Array.isArray(savedData[key])) {
            const spanElements = container.querySelectorAll(`.${key}`);
            if (spanElements.length > 0) {
                spanElements.forEach((el, index) => {
                    el.textContent = savedData[key][index] || "";
                });
            } 
        } else if (key === "totalCalories") {
            const totalSpan = container.querySelector("h2 span");
            if (totalSpan) {
                totalSpan.textContent = savedData[key];
            }
        } else {
            const el = container.querySelector(`[id="${key}"]`);
            if (el) {
                if (el.tagName == "BUTTON") {
                    if (el.id == "yetDisabled") {
                        el.disabled = savedData[key];
                    } else if (el.id == "submitBtn") {
                        el.textContent = savedData[key];
                    }
                } else if (el.tagName == "INPUT") {
                    el.value = savedData[key];
                }
            }
        }
    });
}

export function savePageFive(user) {
    const entries = {};
    ["macrosSectionOne", "macrosSectionTwo", "macrosSectionThree"].forEach(sectionClass => {
        const section = document.querySelector(`.${sectionClass}`);
        const sectionEntries = section.querySelectorAll(".addEntry");
        entries[sectionClass] = [];
        sectionEntries.forEach(entry => {
            const food = entry.querySelector("h1")?.textContent || "";
            const amount = entry.querySelector("span")?.textContent || "";
            entries[sectionClass].push({ food, amount });
        });
    });
    saveToLocalStorage(user, "page5", entries);
}

export function restorePageFive(user) {
    const entries = loadFromLocalStorage(user, "page5");
    if (!entries) return;

    ["macrosSectionOne", "macrosSectionTwo", "macrosSectionThree"].forEach(sectionClass => {
        const section = document.querySelector(`.${sectionClass}`);

        entries[sectionClass].forEach(entry => {
            const entryElement = elt("div", {
                className: "addEntry"}, elt("h1", 
                    null, entry.food), elt("p",
                        null, " chosen has "), elt("span", 
                            null, entry.amount), elt("p", 
                                null, " grams "), elt("button", {
                                    type: "button", style: "margin-left: 10px; cursor: pointer;", onclick() {
                                        addBackToMacros(entry.amount, sectionClass);
                                        entryElement.remove();
                                    }
                                }, "x")
                            );

                            section.appendChild(entryElement);
                        });
                    })
                };

function addBackToMacros(amount, sectionClass) {
    if (sectionClass == "macrosSectionOne") {
        const initialMacrosOneElement = document.querySelector(".macrosLineOne span");
        let currentValue = Number(initialMacrosOneElement.textContent);
        if (isNaN(currentValue)) currentValue = 0;
        initialMacrosOneElement.textContent = currentValue + Number(amount);
    } else if (sectionClass == "macrosSectionTwo") {
        const initialMacrosTwoElement = document.querySelector(".macrosLineTwo span");
        let currentValue = Number(initialMacrosTwoElement.textContent);
        if (isNaN(currentValue)) currentValue = 0;
        initialMacrosTwoElement.textContent = currentValue + Number(amount);
    } else if (sectionClass == "macrosSectionThree") {
        const initialMacrosThreeElement = document.querySelector(".macrosLineThree span");
        let currentValue = Number(initialMacrosThreeElement.textContent);
        if (isNaN(currentValue)) currentValue = 0;
        initialMacrosThreeElement.textContent = currentValue + Number(amount);
    };
}

                
function elt(type, props, ...children) {
  let dom = document.createElement(type);
  if (props) {
    for (let prop in props) {
      if (prop === "list") {
        dom.setAttribute("list", props[prop]); // ✅ set as attribute
      } else {
        dom[prop] = props[prop]; // assign other props normally
      }
    }
  };
  for (let child of children) {
    if (typeof child != "string") dom.appendChild(child);
    else dom.appendChild(document.createTextNode(child));
  }
  return dom;
}