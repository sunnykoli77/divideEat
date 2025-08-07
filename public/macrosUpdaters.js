export function updateTotalCarbs(page, talk) {
    let totalConsumed = 0;
    const serverCalorie = Math.round((Number(talk?.calorie) * 0.45) / 4);
    const serverPerMealCalorie = Math.round(((Number(talk?.calorie) * 0.45) / 4) / Number(talk?.mealNoHand));
    if (isNaN(serverCalorie) || isNaN(serverPerMealCalorie)) {
        console.error("Invalid calorie value in talk object");
        return;
    }
    const sectionOne = page.querySelector(".macrosSectionOne");

    const sectionEntries = sectionOne.querySelectorAll(".addEntry span");
    if (sectionEntries.length > 0) {
        sectionEntries.forEach(span => {
            const val = Number(span.textContent);
            if (!isNaN(val)) totalConsumed += val;
        })
    };
    const totalMacros = serverCalorie - totalConsumed;
    const totalPerMealMacros = adjustPerMeal(serverPerMealCalorie, totalConsumed);
        
    page.querySelector(".macrosLineOne span").textContent = totalMacros;
    page.querySelector(".macrosSubLineOne span").textContent = totalPerMealMacros;
};

export function updateTotalProts(page, talk) {
    let totalConsumed = 0;
    const serverCalorie = Math.round((Number(talk?.calorie) * 0.35) / 4);
    const serverPerMealCalorie = Math.round(((Number(talk?.calorie) * 0.35) / 4) / Number(talk?.mealNoHand));
    if (isNaN(serverCalorie) || isNaN(serverPerMealCalorie)) {
        console.error("Invalid calorie value in talk object");
        return;
    }
    const sectionTwo = page.querySelector(".macrosSectionTwo");

    const sectionEntries = sectionTwo.querySelectorAll(".addEntry span");
    if (sectionEntries.length > 0) {
        sectionEntries.forEach(span => {
            const val = Number(span.textContent);
            if (!isNaN(val)) totalConsumed += val;
        })
    };
    const totalMacros = serverCalorie - totalConsumed;
    const totalPerMealMacros = adjustPerMeal(serverPerMealCalorie, totalConsumed);
        
    page.querySelector(".macrosLineTwo span").textContent = totalMacros;
    page.querySelector(".macrosSubLineTwo span").textContent = totalPerMealMacros;
};

export function updateTotalFats(page, talk) {
    let totalConsumed = 0;
    const serverCalorie = Math.round((Number(talk?.calorie) * 0.20) / 9);
    const serverPerMealCalorie = Math.round(((Number(talk?.calorie) * 0.20) / 9) / Number(talk?.mealNoHand));
    if (isNaN(serverCalorie) || isNaN(serverPerMealCalorie)) {
        console.error("Invalid calorie value in talk object");
        return;
    }
    const sectionThree = page.querySelector(".macrosSectionThree");

    const sectionEntries = sectionThree.querySelectorAll(".addEntry span");
    if (sectionEntries.length > 0) {
        sectionEntries.forEach(span => {
            const val = Number(span.textContent);
            if (!isNaN(val)) totalConsumed += val;
        })
    };
    const totalMacros = serverCalorie - totalConsumed;
    const totalPerMealMacros = adjustPerMeal(serverPerMealCalorie, totalConsumed);
        
    page.querySelector(".macrosLineThree span").textContent = totalMacros;
    page.querySelector(".macrosSubLineThree span").textContent = totalPerMealMacros;
};

export function updateCarbsLeftOne(talk) {
    const initialCarbsOneElement = document.querySelector(".macrosLineOne span");
    const initialCarbsPerMealElement = document.querySelector(".macrosSubLineOne span");
    const serverPerMealCalorie = Math.round(((Number(talk?.calorie) * 0.45) / 4) / Number(talk?.mealNoHand));

    let initialCarbsOne = Number(initialCarbsOneElement.textContent);
    let initialCarbsPerMeal = Number(initialCarbsPerMealElement.textContent);

    const sectionOne = document.querySelector(".macrosSectionOne");
    const spans = sectionOne.querySelectorAll(".addEntry span");
    const lastSpan = spans[spans.length - 1];
    const lastValue = Number(lastSpan.textContent);

    initialCarbsOneElement.textContent = initialCarbsOne - lastValue;

    let obtainedCalorie = subtractReset(initialCarbsPerMeal, lastValue, serverPerMealCalorie);
    initialCarbsPerMealElement.textContent = obtainedCalorie;
}

export function addBackToCarbs(amount, talk) {
    const initialCarbsOneElement = document.querySelector(".macrosLineOne span");
    const initialCarbsPerMealElement = document.querySelector(".macrosSubLineOne span");
    const serverPerMealCalorie = Math.round(((Number(talk?.calorie) * 0.45) / 4) / Number(talk?.mealNoHand));

    let currentValue = Number(initialCarbsOneElement.textContent);
    let currentPerMealValue = Number(initialCarbsPerMealElement.textContent);

    if (isNaN(currentValue)) currentValue = 0;
    if (isNaN(currentPerMealValue)) currentPerMealValue = 0;

    initialCarbsOneElement.textContent = currentValue + Number(amount);

    let obtainedValue = addReset(amount, currentPerMealValue, serverPerMealCalorie);
    initialCarbsPerMealElement.textContent = obtainedValue;
}

export function updateProtsLeftOne(talk) {
    const initialProtsOneElement = document.querySelector(".macrosLineTwo span");
    const initialProtsPerMealElement = document.querySelector(".macrosSubLineTwo span");
    const serverPerMealCalorie = Math.round(((Number(talk?.calorie) * 0.35) / 4) / Number(talk?.mealNoHand));

    let initialProtsOne = Number(initialProtsOneElement.textContent);
    let initialProtsPerMeal = Number(initialProtsPerMealElement.textContent);

    const sectionTwo = document.querySelector(".macrosSectionTwo");
    const spans = sectionTwo.querySelectorAll(".addEntry span");
    const lastSpan = spans[spans.length - 1];
    const lastValue = Number(lastSpan.textContent);

    initialProtsOneElement.textContent = initialProtsOne - lastValue;

    let obtainedCalorie = subtractReset(initialProtsPerMeal, lastValue, serverPerMealCalorie);
    initialProtsPerMealElement.textContent = obtainedCalorie;
}

export function addBackToProts(amount, talk) {
    const initialProtsOneElement = document.querySelector(".macrosLineTwo span");
    const initialProtsPerMealElement = document.querySelector(".macrosSubLineTwo span");
    const serverPerMealCalorie = Math.round(((Number(talk?.calorie) * 0.35) / 4) / Number(talk?.mealNoHand));

    let currentValue = Number(initialProtsOneElement.textContent);
    let currentPerMealValue = Number(initialProtsPerMealElement.textContent);

    if (isNaN(currentValue)) currentValue = 0;
    if (isNaN(currentPerMealValue)) currentPerMealValue = 0;

    initialProtsOneElement.textContent = currentValue + Number(amount);

    let obtainedValue = addReset(amount, currentPerMealValue, serverPerMealCalorie);
    initialProtsPerMealElement.textContent = obtainedValue;
}
  
export function updateFatsLeftOne(talk) {
    const initialFatsOneElement = document.querySelector(".macrosLineThree span");
    const initialFatsPerMealElement = document.querySelector(".macrosSubLineThree span");
    const serverPerMealCalorie = Math.round(((Number(talk?.calorie) * 0.2) / 9) / Number(talk?.mealNoHand));

    let initialFatsOne = Number(initialFatsOneElement.textContent);
    let initialFatsPerMeal = Number(initialFatsPerMealElement.textContent);

    const sectionThree = document.querySelector(".macrosSectionThree");
    const spans = sectionThree.querySelectorAll(".addEntry span");
    const lastSpan = spans[spans.length - 1];
    const lastValue = Number(lastSpan.textContent);

    initialFatsOneElement.textContent = initialFatsOne - lastValue;

    let obtainedCalorie = subtractReset(initialFatsPerMeal, lastValue, serverPerMealCalorie);
    initialFatsPerMealElement.textContent = obtainedCalorie;
}

export function addBackToFats(amount, talk) {
    const initialFatsOneElement = document.querySelector(".macrosLineThree span");
    const initialFatsPerMealElement = document.querySelector(".macrosSubLineThree span");
    const serverPerMealCalorie = Math.round(((Number(talk?.calorie) * 0.2) / 9) / Number(talk?.mealNoHand));

    let currentValue = Number(initialFatsOneElement.textContent);
    let currentPerMealValue = Number(initialFatsPerMealElement.textContent);

    if (isNaN(currentValue)) currentValue = 0;
    if (isNaN(currentPerMealValue)) currentPerMealValue = 0;

    initialFatsOneElement.textContent = currentValue + Number(amount);

    let obtainedValue = addReset(amount, currentPerMealValue, serverPerMealCalorie);
    initialFatsPerMealElement.textContent = obtainedValue;
}

function subtractReset(variable, obValue, originalVal) {
    let result = variable - obValue;
    let finalValue;

    if (result < 0) {
        return finalValue = originalVal + result;
    } else {
        return finalValue = result;
    }
};

function addReset(deductedGram, variableVal, originalVal) {
    let result = variableVal + Number(deductedGram);
    let finalResult;

    if (result > originalVal) {
        let overVal = result - originalVal;
        return finalResult = overVal;
    }
    return result;
};

function adjustPerMeal(perMeal, conCal) {
    let ans = perMeal - conCal;
    let res;

    if (ans < 0 ) {
        return res = conCal % perMeal;
    } else {
        return ans;
    };
}