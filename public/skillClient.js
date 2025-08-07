function handleAction(state, action) {
    if (action.type == "createProfile") {
      return {...state, page: action.page};
    } else if (action.type == "toggleBackToOne") {
      return {...state, page: "one"};
    } else if (action.type == "setTalks") {
      return {...state, talks: action.talks};
    } else if (action.type == "signingIn") {
      return {...state, page: action.page};
    } else if (action.type == "authSuccess") {
      localStorage.setItem("user", action.user);
      return {...state, page: action.page, user: action.user};
    } else if (action.type == "calorieCalc") {
      fetchOK(talkURL(state.user) + "/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bodyWeight: action.weight,
          maintainGainLose: action.mgv,
          lifeStyle: action.lifestyle,
          weightTrainingMinutes: action.training,
          lowCardioMinutes: action.lowCardio,
          highCardioMinutes: action.highCardio,
          mealNoHand: action.mealNo})
      })
      .then(res => res.json())
      .then(data => {
        const span = document.getElementById("calorieValue");
        if (span) span.textContent = data.calorie;
      })
      .catch(reportError);
      return {...state, page: "", calorieSubmit: "1"};
    } else if (action.type == "toggleToFive") {
      return {...state, page: "five"};
    } else if (action.type == "newUser") {
      fetchOK(talkURL(action.title), {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({password: action.summary})
      }).then(async response => {
        const message = await response.text();
        alert(message);
      }).catch(reportError);
    } else if (action.type == "toggleToProfile") {
      return {...state, page: "frozen"};
    } else if (action.type == "carbs") {
      fetchOK(talkURL(action.title) + "/macros", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          itemCarbHand: action.itemCarbDis,
          amountCarbHand: action.amountCarbDis,
          quantityCarbHand: action.quantityCarbDis
        })
      }).catch(reportError);
    } else if (action.type == "prot") {
      fetchOK(talkURL(action.title) + "/macros", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          itemProtHand: action.itemProtDis,
          amountProtHand: action.amountProtDis,
          quantityProtHand: action.quantityProtDis
        })
      }).catch(reportError);
    } else if (action.type == "fats") {
      fetchOK(talkURL(action.title) + "/macros", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          itemFatsHand: action.itemFatsDis,
          amountFatsHand: action.amountFatsDis,
          quantityFatsHand: action.quantityFatsDis
        })
      }).catch(reportError);
    }
    return state;
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

function renderTwo(dispatch) {
    return elt("div", {className: "container"}, elt("button", {className: "backButtonTwo", type: "button", style: "cursor: pointer", onclick() {
      dispatch({type: "toggleBackToOne"})}}, "Back"), elt("h1", {
        className: "gridLogoTwo"}, "Know what and how to (divide)eat"), elt("form", {id: "gridForm", 
            className: "gridFormClass", onsubmit(event) {
                event.preventDefault();
                dispatch({type: "newUser", title: event.target.title.value, summary: event.target.summary.value});
                event.target.reset();
            }}, elt("div", {
                className: "formEmail"}, elt("label", {
                    for: "title"}, "Title  "), elt("input", {
                        type: "text", id: "title", name: "title", placeholder: "Arun", required: true}), elt("p", {
                            id: "emailError", className: "error-message"})), elt("div", {className: "formPassword"}, elt("label", {
                    for: "summary"}, "Summary   "), elt("input", {
                        type: "text", id: "summary", name: "summary", required: true}), elt("p", {
                            id: "passwordError", className: "error-message"})), elt("button", {type: "submit", style: "cursor: pointer"}, "JOIN")));
                        };

function renderThree(dispatch) {
  return elt("div", {
    className: "containerThree"
  }, elt("button", {
    type: "button", className: "gridLogoThree", onclick () {
      dispatch({
        type: "toggleBackToOne"
      })
    }, style: "all: unset; cursor: pointer; font-size: 1.8em; font-weight: bold; margin-left: 0.5em;"
  }, "<-"
  ), elt("div", {
        className: "signInContainer"
      }, elt("h1", {
        className: "greedLogoThree"
      }, "Sign in"
    ), elt("form", {
      id: "signInForm", className: "welcomeBack", onsubmit(event) {
        event.preventDefault();
        const username = event.target.userName.value;
        const password = event.target.userPassword.value;
        fetchOK(talkURL(username), {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({pass: password})
        })
        .then(() => dispatch({type: "authSuccess", page: "four", user: username}))
        .catch(reportError);
      }
    }, elt("div", {
          className: "greeduserInput"
        }, elt("input", {
            type: "text", name: "userName", placeholder: "Username", required: true
          }
        )
      ), elt("div", {
              className: "greedpassInput"
            }, elt("input", {
                type: "password", name: "userPassword", placeholder: "Password", required: true
              }
            )
          ), elt("div", {
            className: "greedsignInButton"
          }, elt("button", {
                  type: "submit"
                }, "Sign in"
              )
            )
          ), elt("p", {
                    className: "greedbaseLine"
                  }, "New to DIVIDE EAT?", elt("a", {
                      href: ""
                    }, "Join Now"
                  )
                )
              ), elt("div", {
                className: "mainLogo"
              }, "DIVIDE EAT"
            )
          );
        };

import { restorePageFour, savePageFive, savePageFour, restorePageFive } from "./pageSavers.js"

function renderFour(dispatch, app, talk) {
  const reverseMgvLifestyle = {
    13: "Gain Body Fat/Increase Muscle",
    10: "Maintain Body Fat/Increase Muscle",
    7: "Lose Body Fat/Increase Muscle",
    6: "Lose High Percentage Body Fat",
    3: "Sedentary",
    5: "Moderate/Active",
    10: "Very Active"
  };

  return elt("div", {
    className: "containerFour"}, elt("div", {
      className: "header"
    }, elt("h1", {
      className: "gridLogo"
    }, "DIVIDE EAT"), elt("button", {
        id: "signingOut", type: "button", style: "cursor: pointer", onclick () {
          app.pageFour[talk.title] = document.querySelector(".containerFour").cloneNode(true);
          savePageFour(talk.title);
          dispatch({type: "toggleBackToOne"})
        }
      }, "Sign Out")
    ), elt("div", {
      className: "bodyFour"
    }, elt("button", {
      id: "yetDisabled", type: "button", style: "cursor: pointer", disabled: true, onclick(event) {
        event.target.removeAttribute("disabled");
        app.pageFour[talk.title] = document.querySelector(".containerFour").cloneNode(true);
        savePageFour(talk.title);
        dispatch({type: "toggleToFive", page: "five"})}
      }, "Next"), elt("h1", {
      className: "graedLogoFour"}, "Calculate your calorie requirement per day"), elt("form", {
        className: "calorieForm", onsubmit(event) {
          event.preventDefault();
          const field = event.target;
          const submitBtn = document.getElementById("submitBtn");
          const disabledNext = document.getElementById("yetDisabled");

          if(submitBtn.textContent == "SUBMIT") {
            const mgvLifestyle = {
              "Gain Body Fat/Increase Muscle": 13,
              "Maintain Body Fat/Increase Muscle": 10,
              "Lose Body Fat/Increase Muscle": 7,
              "Lose High Percentage Body Fat": 6,
              "Sedentary": 3,
              "Moderate/Active": 5,
              "Very Active": 10
            }
            const mgvInput = field.mgvList.value;
            const lifestyleInput = field.lifestyleList.value;
            dispatch({type: "calorieCalc", weight: Number(field.bodyWeight.value), mgv: mgvLifestyle[mgvInput], lifestyle: mgvLifestyle[lifestyleInput], training: Number(field.weightTraining.value), lowCardio: Number(field.lowCardio.value), highCardio: Number(field.highCardio.value), mealNo: Number(field.mealNumber.value)});
            [...field.elements].forEach(input => {
              if (input.tagName == "INPUT") {
                const text = document.createElement("span");
                text.textContent = input.value;
                text.className = "frozenSpan";
                input.hidden = true;
                input.parentNode.insertBefore(text, input.nextSibling);
              }
            });
            submitBtn.textContent = "EDIT"
            disabledNext.disabled = false;
          } else {
            [...field.elements].forEach(input => {
              if (input.tagName == "INPUT") {
                input.hidden = false;
                const text = input.parentNode.querySelector(".frozenSpan");
                if (text) text.remove();
              }
            });
            submitBtn.textContent = "SUBMIT";
            disabledNext.disabled = true;
          }
        }
      }, elt("div", null, elt("label", {
          htmlFor: "bodyWeight"}, "Body Weight: "), elt("input", {
            id: "bodyWeight", name: "bodyWeight", type: "number", value: talk ? talk.bodyWeight : "", required: true, autoComplete: "off"}), elt("p", 
              null, "pounds")), elt("div", 
                null, elt("label", {
              htmlFor: "mgvList"}, "MGV: "), elt("input", {
                id: "mgvList", type: "text", name: "mgvList", list: "loseGain", value: reverseMgvLifestyle[talk?.maintainGainLose] ?? "", required: true}), elt("datalist", {
                  id: "loseGain"}, elt("option", {
                    value: "Gain Body Fat/Increase Muscle"}), elt("option", {
                      value: "Maintain Body Fat/Increase Muscle"}), elt("option", {
                        value: "Lose Body Fat/Increase Muscle"}), elt("option", {
                          value: "Lose High Percentage Body Fat"}))), elt("div", 
                            null, elt("label", {
              htmlFor: "lifestyleList"}, "Lifestyle: "), elt("input", {
                id: "lifestyleList", type: "text", name: "lifestyleList", list: "lifeList", value: reverseMgvLifestyle[talk?.lifeStyle] ?? "", required: true}), elt("datalist", {
                  id: "lifeList"}, elt("option", {
                    value: "Sedentary"}), elt("option", {
                      value: "Moderate/Active"}), elt("option", {
                        value: "Very Active"}))), elt("div", {
                          id: "exerciseContainer"}, elt("strong", 
                            null, "Exercise: "), elt("select", {
                              id: "exerciseList", onchange: allowSelectFields}, elt("option", {
                                value: "none"}, "No exercise"), elt("option", {
                                value: "weight"}, "Weight training"), elt("option",{
                                value: "low"}, "Weight training and low-impact cardio"), elt("option", {
                                  value: "high"}, "Weight training and high-impact cardio"))), elt("div", {
                                    className: "containerOne"}, elt("label", {
                            htmlFor: "weightTraining"}, "Weight training: "), elt("input", {
                              id: "weightTraining", type: "number", name: "weightTraining", value: reverseMgvLifestyle[talk?.weightTrainingMinutes] ?? "", min: "15", disabled: true}), elt("p", 
                                null, "minutes")), elt("div", {className: "containerTwo"}, elt("label", {
                            htmlFor: "lowCardio"}, "Low impact Cardio: "), elt("input", {
                              id: "lowCardio", type: "number", name: "lowCardio", value: reverseMgvLifestyle[talk?.lowCardioMinutes] ?? "", disabled: true}), elt("p", 
                                null, "minutes")), elt("div", {id: "high"}, elt("label", {
                            htmlFor: "highCardio"}, "High impact Cardio: "), elt("input", {
                              id: "highCardio", type: "number", name: "highCardio", value: reverseMgvLifestyle[talk?.highCardioMinutes] ?? "", disabled: true}), elt("p", 
                                null, "minutes")), elt("div", {
                                  className: "mealsNumber"
                                }, elt("label", {
                                  htmlFor: "meal"
                                }, "No. of meals per day: "
                              ), elt("input", {
                                id: "meal", type: "number", name: "mealNumber", min: "1", max: "6", required: true
                              })), elt("h2", 
                            null, "TOTAL CALORIES PER DAY: ", elt("span", {
                              id: "calorieValue"}, "0")), elt("div", 
                                null, elt("button", {
                                  id: "submitBtn", type: "submit", style: "cursor: pointer;"}, "SUBMIT")))))
                                }

function allowSelectFields() {
  const selectField = document.getElementById("exerciseList");
  const weightInput = document.getElementById("weightTraining");
  const lowInput = document.getElementById("lowCardio");
  const highInput = document.getElementById("highCardio");

  function resetAndDisable(input) {
    if (input.value !== "") {
      input.dataset.prevValue = input.value;
    }
    input.value = "";
    input.disabled = true;
  }

  function enableAndRestore(input) {
    input.disabled = false;
    if (input.dataset.prevValue !== undefined) {
      input.value = input.dataset.prevValue;
    }
  }

  if (selectField.value == "none") {
    resetAndDisable(weightInput);
    resetAndDisable(lowInput);
    resetAndDisable(highInput);
  } else if (selectField.value == "weight") {
    enableAndRestore(weightInput);
    resetAndDisable(lowInput);
    resetAndDisable(highInput);
  } else if (selectField.value == "low") {
    enableAndRestore(weightInput);
    enableAndRestore(lowInput);
    resetAndDisable(highInput);
  } else if (selectField.value == "high") {
    enableAndRestore(weightInput);
    resetAndDisable(lowInput);
    enableAndRestore(highInput);
  }
}

import { updateTotalCarbs, updateTotalProts, updateTotalFats, updateCarbsLeftOne, updateProtsLeftOne, updateFatsLeftOne, addBackToCarbs, addBackToProts, addBackToFats } from "./macrosUpdaters.js"

const suggestionMap = new Map();
function renderFive(dispatch, talk, app) {
  return elt("div", {
    className: "highFive"}, elt("button", {
      id: "backFive", type: "button", style: "cursor: pointer;", onclick() {
        savePageFive(talk.title);
        app.pageFive[talk.title] = document.querySelector(".highFive");
        dispatch({type: "toggleToProfile"})
      }}, "Back"), elt("section", {
        className: "macrosContainer"}, elt("strong", {
                      className: "macrosLineOne"}, "Carbohydrates left to be consumed for today", elt("span", 
                        null), elt("p", 
                          null, "grams")
                        ), elt("strong", {
                      className: "macrosSubLineOne"}, "Carbohydrates left to be consumed per meal", elt("span", 
                        null), elt("p", 
                          null, "grams")
                        ), elt("section", {
      className: "macrosSectionOne"}), elt("form", {
        className: "macrosForm", onsubmit(event) {
          event.preventDefault();

          const foodField = event.target.foodItemText.value;
          let amountField = event.target.carbItemNumber.value;
          const quantityField = event.target.carbItemNumber2.value;

          const createAndAppendEntry = (resolvedAmount) => {
            dispatch({
              type: "carbs", title: talk.title, itemCarbDis: foodField, amountCarbDis: Number(resolvedAmount), quantityCarbDis: Number(quantityField)
            });

            event.target.reset();
            
            const entryElement = elt("div", {
              className: "addEntry"
            }, elt("h1", 
              null, foodField
            ), elt("p", 
                null, " chosen has "
              ), elt("span", 
                  null, resolvedAmount
                ), elt("p", 
                    null, " grams carbohydrates "
                  ), elt("button", {
                    type: "button", style: "margin-left: 10px; cursor: pointer;", onclick() {
                      addBackToCarbs(resolvedAmount, talk);
                      entryElement.remove();
                    }
                  }, "x")
                );
                  
                document.querySelector(".macrosSectionOne").appendChild(entryElement);
                updateCarbsLeftOne(talk);
              };

              if (!amountField && quantityField) {
                fetchOK(talkURL(talk.title) + "/fetch-macros", {
                  method: "POST",
                  headers: {"Content-Type": "application/json"},
                  body: JSON.stringify({ carbFood: foodField })
                })
                .then(res => res.json())
                .then(data => {
                  if (data.nutPerHundred !== undefined && data.nutPerHundred !== null) {
                    const calcAmount = ((data.nutPerHundred * quantityField) / 100).toFixed(2);
                    createAndAppendEntry(calcAmount);
                  } else {
                    alert("Carbohydrates amount 'per hudred' not found on the server.");
                  }
                })
                .catch(reportError);
              } else {
                createAndAppendEntry(amountField);
              };  
            }
    }, elt("input", {
          id: "foodItemText", list: "foodCarbSuggestions", type: "text", name: "foodItemText", placeholder: "e.g. butter/apple/basmati/lays/coke-cola", required: true, oninput(event) {
            const dataList = document.querySelector("#foodCarbSuggestions");
            const query = event.target.value.trim();
            if (query.length < 1) {
              dataList.innerHTML = "";
              return;
            }

            fetchOK(talkURL(talk.title) + "/keyword", {
              method: "POST",
              headers: {"Content-type": "application/json"},
              body: JSON.stringify({
                keyWord: query
            })})
            .then(response => response.json())
            .then(data => {
              dataList.innerHTML = "";
              suggestionMap.clear();

              if (data.match && data.match.length > 0) {
                data.match.forEach(entry => {
                  suggestionMap.set(entry.food, {
                    nutInHand: entry.nutInHand,
                    quantityInHand: entry.quantityInHand
                  });

                  const option = elt("option", {
                    value: entry.food}, `${entry.food} ${entry.nutInHand} grams in ${entry.quantityInHand} grams`
                )
                dataList.appendChild(option);
              })}
            })
            .catch(reportError);
          }, onchange(event) {
            const selectedValue = event.target.value;
            if (suggestionMap.has(selectedValue)) {
              const { nutInHand, quantityInHand } = suggestionMap.get(selectedValue);
              document.querySelector("#carbItemNumber").value = nutInHand;
              document.querySelector("#carbItemNumber2").value = quantityInHand;
            }
          }
          }), elt("datalist", {
            id: "foodCarbSuggestions"
          }), elt("input", {
            id: "carbItemNumber", type: "number", name: "carbItemNumber"}), elt("p", 
              null, "g in"), elt("input", {
                id: "carbItemNumber2", type: "number", name: "carbItemNumber2", required: true, min: "1"}), elt("p", 
                  null, "g"), elt("button", {
                    type: "submit"}, ">")
                  )), elt("section", {
        className: "macrosContainer"}, elt("strong", {
                      className: "macrosLineTwo"}, "Proteins left to be consumed for today", elt("span", 
                        null), elt("p", 
                          null, "grams")
                        ), elt("strong", {
                      className: "macrosSubLineTwo"}, "Proteins left to be consumed per meal", elt("span", 
                        null), elt("p", 
                          null, "grams")
                        ), elt("section", {
                    className: "macrosSectionTwo"}), elt("form", {
        className: "macrosForm", onsubmit(event) {
          event.preventDefault();
          const foodField = event.target.foodItemText.value;
          let amountField = event.target.protItemNumber.value;
          const quantityField = event.target.protItemNumber2.value;

          const createAndAppendEntry = (resolvedAmount) => {
            dispatch({
              type: "prot", title: talk.title, itemProtDis: foodField, amountProtDis: Number(resolvedAmount), quantityProtDis: Number(quantityField)
            });

            event.target.reset();
            
            const entryElement = elt("div", {
              className: "addEntry"
            }, elt("h1", 
              null, foodField
            ), elt("p", 
                null, " chosen has "
              ), elt("span", 
                  null, resolvedAmount
                ), elt("p", 
                    null, " grams proteins "
                  ), elt("button", {
                    type: "button", style: "margin-left: 10px; cursor: pointer;", onclick() {
                      addBackToProts(resolvedAmount, talk);
                      entryElement.remove();
                    }
                  }, "x")
                );
                  
                document.querySelector(".macrosSectionTwo").appendChild(entryElement);
                updateProtsLeftOne(talk);
              };

              if (!amountField && quantityField) {
                fetchOK(talkURL(talk.title) + "/fetch-macros", {
                  method: "POST",
                  headers: {"Content-Type": "application/json"},
                  body: JSON.stringify({ protFood: foodField })
                })
                .then(res => res.json())
                .then(data => {
                  if (data.nutPerHundred !== undefined && data.nutPerHundred !== null) {
                    const calcAmount = ((data.nutPerHundred * quantityField) / 100).toFixed(2);
                    createAndAppendEntry(calcAmount);
                  } else {
                    alert("Proteins amount 'per hudred' not found on the server.");
                  }
                })
                .catch(reportError);
              } else {
                createAndAppendEntry(amountField);
              };
        }
      }, elt("input", {
          id: "foodItemText", list: "foodProtSuggestions", type: "text", name: "foodItemText", placeholder: "e.g. butter/apple/basmati/lays/coke-cola", required: true, oninput(event) {
            const dataProtList = document.querySelector("#foodProtSuggestions");
            const query = event.target.value.trim();
            if (query.length < 1) {
              dataProtList.innerHTML = "";
              return;
            }

            fetchOK(talkURL(talk.title) + "/keyword", {
              method: "POST",
              headers: {"Content-type": "application/json"},
              body: JSON.stringify({
                keyWord: query
            })})
            .then(response => response.json())
            .then(data => {
              dataProtList.innerHTML = "";
              suggestionMap.clear();

              if (data.protCatch && data.protCatch.length > 0) {
                data.protCatch.forEach(entry => {
                  suggestionMap.set(entry.food, {
                    nutInHand: entry.nutInHand,
                    quantityInHand: entry.quantityInHand
                  });

                  const option = elt("option", {
                    value: entry.food}, `${entry.food} ${entry.nutInHand} grams in ${entry.quantityInHand} grams`
                )
                dataProtList.appendChild(option);
              })}
            })
            .catch(reportError);
          }, onchange(event) {
            const selectedValue = event.target.value;
            if (suggestionMap.has(selectedValue)) {
              const { nutInHand, quantityInHand } = suggestionMap.get(selectedValue);
              document.querySelector("#protItemNumber").value = nutInHand;
              document.querySelector("#protItemNumber2").value = quantityInHand;
            }
          }}), elt("datalist", {
            id: "foodProtSuggestions"
          }), elt("input", {
            id: "protItemNumber", type: "number", name: "protItemNumber"}), elt("p", 
              null, "g in"), elt("input", {
                id: "protItemNumber2", type: "number", name: "protItemNumber2", required: true, min: "1"}), elt("p", 
                  null, "g"), elt("button", {
                    type: "submit"}, ">")
                  )), elt("section", {
        className: "macrosContainer"}, elt("strong", {
                      className: "macrosLineThree"}, "Fats left to be consumed for today", elt("span", 
                        null), elt("p", 
                          null, "grams")
                        ), elt("strong", {
                      className: "macrosSubLineThree"}, "Fats left to be consumed per meal", elt("span", 
                        null), elt("p", 
                          null, "grams")
                        ), elt("section", {
                    className: "macrosSectionThree"}), elt("form", {
        className: "macrosForm", onsubmit(event) {
          event.preventDefault();
          const foodField = event.target.foodItemText.value;
          let amountField = event.target.fatsItemNumber.value;
          const quantityField = event.target.fatsItemNumber2.value;

          const createAndAppendEntry = (resolvedAmount) => {
            dispatch({
              type: "fats", title: talk.title, itemFatsDis: foodField, amountFatsDis: Number(resolvedAmount), quantityFatsDis: Number(quantityField)
            });

            event.target.reset();
            
            const entryElement = elt("div", {
              className: "addEntry"
            }, elt("h1", 
              null, foodField
            ), elt("p", 
                null, " chosen has "
              ), elt("span", 
                  null, resolvedAmount
                ), elt("p", 
                    null, " grams fats "
                  ), elt("button", {
                    type: "button", style: "margin-left: 10px; cursor: pointer;", onclick() {
                      addBackToFats(resolvedAmount, talk);
                      entryElement.remove();
                    }
                  }, "x")
                );
                  
                document.querySelector(".macrosSectionThree").appendChild(entryElement);
                updateFatsLeftOne(talk);
              };

              if (!amountField && quantityField) {
                fetchOK(talkURL(talk.title) + "/fetch-macros", {
                  method: "POST",
                  headers: {"Content-Type": "application/json"},
                  body: JSON.stringify({ fatsFood: foodField })
                })
                .then(res => res.json())
                .then(data => {
                  if (data.nutPerHundred !== undefined && data.nutPerHundred !== null) {
                    const calcAmount = ((data.nutPerHundred * quantityField) / 100).toFixed(2);
                    createAndAppendEntry(calcAmount);
                  } else {
                    alert("Fats amount 'per hudred' not found on the server.");
                  }
                })
                .catch(reportError);
              } else {
                createAndAppendEntry(amountField);
              };
        }
      }, elt("input", {
          id: "foodItemText", list: "foodFatsSuggestions", type: "text", name: "foodItemText", placeholder: "e.g. butter/apple/basmati/lays/coke-cola", required: true, oninput(event) {
            const dataFatsList = document.querySelector("#foodFatsSuggestions");
            const query = event.target.value.trim();
            if (query.length < 1) {
              dataFatsList.innerHTML = "";
              return;
            }

            fetchOK(talkURL(talk.title) + "/keyword", {
              method: "POST",
              headers: {"Content-type": "application/json"},
              body: JSON.stringify({
                keyWord: query
            })})
            .then(response => response.json())
            .then(data => {
              dataFatsList.innerHTML = "";
              suggestionMap.clear();

              if (data.fatsCatch && data.fatsCatch.length > 0) {
                data.fatsCatch.forEach(entry => {
                  suggestionMap.set(entry.food, {
                    nutInHand: entry.nutInHand,
                    quantityInHand: entry.quantityInHand
                  });

                  const option = elt("option", {
                    value: entry.food}, `${entry.food} ${entry.nutInHand} grams in ${entry.quantityInHand} grams`
                )
                dataFatsList.appendChild(option);
              })}
            })
            .catch(reportError);
          }, onchange(event) {
            const selectedValue = event.target.value;
            if (suggestionMap.has(selectedValue)) {
              const { nutInHand, quantityInHand } = suggestionMap.get(selectedValue);
              document.querySelector("#fatsItemNumber").value = nutInHand;
              document.querySelector("#fatsItemNumber2").value = quantityInHand;
            }
          }}), elt("datalist", {
            id: "foodFatsSuggestions"
          }), elt("input", {
            id: "fatsItemNumber", type: "number", name: "fatsItemNumber"}), elt("p", 
              null, "g in"), elt("input", {
                id: "fatsItemNumber2", type: "number", name: "fatsItemNumber2", required: true, min: "1"}), elt("p", 
                  null, "g"), elt("button", {
                    type: "submit"}, ">")
                  ))
                )
              }





async function pollTalks(update) {
  let tag = undefined;
  for (;;) {
    let response;
    try {
      response = await fetchOK("/talks", {
        headers: tag && {"If-None-Match": tag,
                         "Prefer": "wait=90"}
      });
    } catch (e) {
      console.log("Request failed: " + e);
      await new Promise(resolve => setTimeout(resolve, 500));
      continue;
    }
    if (response.status == 304) continue;
    tag = response.headers.get("ETag");
    update(await response.json());
  }
}

function fetchOK(talkURL, options) {
  return fetch(talkURL, options).then(async response => {
    if (response.status < 400) return response;
    let message = await response.text();
    throw new Error(message || response.statusText);
  });
}

function talkURL(title) {
  return "/talks/" + encodeURIComponent(title);
}


function reportError(error) {
  alert(String(error));
}

class App {
    constructor(state, dispatch) {
        this.dom = document.querySelector("body");
        const pageContainer = this.dom.querySelector(".container");
        this.pageOne = pageContainer.cloneNode(true);
        this.pageFour = {};
        this.pageFive = {};
        this.dispatch = dispatch;
        this.syncState(state);
    }

    syncState(state) {
      if (state.talks !== this.talks) {
        this.talks = state.talks;
        console.log("Current talks:", this.talks);
      };
      let entireTalk = this.talks?.find?.(talk => talk.title == state.user) || null;
      let frozenTalk = this.pageFour[state.user];
      if (state.page == "two") {
        state.page = "";
        this.dom.textContent = "";
        this.dom.appendChild(renderTwo(this.dispatch));
      } else if (state.page == "one") {
        state.page = "";
        this.dom.textContent = "";
        this.dom.appendChild(this.pageOne);
        const button = this.pageOne.querySelector(".gridSignUp");
        button.addEventListener("click", () => {
          this.dispatch({type: "createProfile", page: "two"});
        });
        const buttonTwo = this.pageOne.querySelector(".gridWelcome");
        buttonTwo.addEventListener("click", () => {
          this.dispatch({type: "signingIn", page: "three"});
        });
      } else if (state.page == "three") {
        state.page = "";
        this.dom.textContent = "";
        this.dom.appendChild(renderThree(this.dispatch));
      } else if ((state.page == "four" && state.calorieSubmit.length == 0) || (state.page == "four" && (!frozenTalk))) { 
        state.page = "";
        if (!entireTalk) {// new user toggling in from page 3 with no need for the entireTalk
          this.dom.textContent = "";
          this.dom.appendChild(renderFour(this.dispatch, this));
          allowSelectFields();
        } else {// existing user toggling in from page 3 with unfrozen page (with submit button), in which case entireTalk is needed
          this.dom.textContent = "";
          this.dom.appendChild(renderFour(this.dispatch, this, entireTalk));
          restorePageFour(state.user);
        }
      } else if (state.page == "five") {
        state.page = "";
        if (this.pageFive[state.user]) {
          this.dom.textContent = ""; 
          this.dom.appendChild(this.pageFive[state.user]);
          updateTotalCarbs(this.dom, entireTalk);
          updateTotalProts(this.dom, entireTalk);
          updateTotalFats(this.dom, entireTalk);
        } else if (!this.pageFive[state.user] && localStorage.getItem(`page5_${state.user}`)) {
          this.dom.textContent = "";
          const secondFivePage = renderFive(this.dispatch, entireTalk, this);
          this.dom.appendChild(secondFivePage);
          restorePageFive(state.user);
          updateTotalCarbs(this.dom, entireTalk);
          updateTotalProts(this.dom, entireTalk);
          updateTotalFats(this.dom, entireTalk);
        } else {
          const firstFivePage = renderFive(this.dispatch, entireTalk, this); 
          updateTotalCarbs(firstFivePage, entireTalk);
          updateTotalProts(firstFivePage, entireTalk);
          updateTotalFats(firstFivePage, entireTalk);
          this.dom.textContent = "";
          this.dom.appendChild(firstFivePage);
        }
      } else if ((state.page == "frozen") || (state.page == "four" && frozenTalk)) {// probably when toggling from page five to four (frozen || unfrozen)
        state.page = "";
      this.dom.textContent = "";
      this.dom.appendChild(this.pageFour[state.user]);

      const submitBtn = this.pageFour[state.user].querySelector("#submitBtn");
      const signingOutButton = this.pageFour[state.user].querySelector("#signingOut");
      signingOutButton.onclick = () => {
        if (submitBtn.textContent === "SUBMIT") {
          delete this.pageFour[state.user];
        } else if (submitBtn.textContent === "EDIT") {
          savePageFour(state.user);
        }
        this.dispatch({type: "toggleBackToOne"});
      };

      const nextButton = this.pageFour[state.user].querySelector("#yetDisabled");
      nextButton.onclick = () => {
        savePageFour(frozenTalk.title);
        this.dispatch({type: "toggleToFive", page: "five"});
      };

      const calorieForm = this.pageFour[state.user].querySelector(".calorieForm");
      calorieForm.onsubmit = (event) => {
        event.preventDefault();
        const field = event.target;

          if(submitBtn.textContent == "SUBMIT") {
            const mgvLifestyle = {
              "Gain Body Fat/Increase Muscle": 13,
              "Maintain Body Fat/Increase Muscle": 10,
              "Lose Body Fat/Increase Muscle": 7,
              "Lose High Percentage Body Fat": 6,
              "Sedentary": 3,
              "Moderate/Active": 5,
              "Very Active": 10
            }
            const mgvInput = field.mgvList.value;
            const lifestyleInput = field.lifestyleList.value;
            this.dispatch({type: "calorieCalc", weight: Number(field.bodyWeight.value), mgv: mgvLifestyle[mgvInput], lifestyle: mgvLifestyle[lifestyleInput], training: Number(field.weightTraining.value), lowCardio: Number(field.lowCardio.value), highCardio: Number(field.highCardio.value), mealNo: Number(field.mealNumber.value)});
            [...field.elements].forEach(input => {
              if (input.tagName == "INPUT") {
                const text = document.createElement("span");
                text.textContent = input.value;
                text.className = "frozenSpan";
                input.hidden = true;
                input.parentNode.insertBefore(text, input.nextSibling);
              }
            });
            submitBtn.textContent = "EDIT"
          } else {
            [...field.elements].forEach(input => {
              if (input.tagName == "INPUT") {
                input.hidden = false;
                const text = this.pageFour[state.user].querySelector(".frozenSpan");
                if (text) text.remove();
              }
            });
            submitBtn.textContent = "SUBMIT";
          }
        }

        const exerciseSelect = this.pageFour[state.user].querySelector("#exerciseList");
        exerciseSelect.onchange = () => {
          const weightInput = this.pageFour[state.user].querySelector("#weightTraining");
          const lowInput = this.pageFour[state.user].querySelector("#lowCardio");
          const highInput = this.pageFour[state.user].querySelector("#highCardio");

          function resetAndDisable(input) {
            if (input.value !== "") {
              input.dataset.prevValue = input.value;
            }
            input.value = "";
            input.disabled = true;
          }
          
          function enableAndRestore(input) {
            input.disabled = false;
            if (input.dataset.prevValue !== undefined) {
              input.value = input.dataset.prevValue;
            }
          }
          if (exerciseSelect.value == "none") {
            resetAndDisable(weightInput);
            resetAndDisable(lowInput);
            resetAndDisable(highInput);
          } else if (exerciseSelect.value == "weight") {
            enableAndRestore(weightInput);
            resetAndDisable(lowInput);
            resetAndDisable(highInput);
          } else if (exerciseSelect.value == "low") {
            enableAndRestore(weightInput);
            enableAndRestore(lowInput);
            resetAndDisable(highInput);
          } else if (exerciseSelect.value == "high") {
            enableAndRestore(weightInput);
            resetAndDisable(lowInput);
            enableAndRestore(highInput);
          }
        }
      }
    };
  }

function runApp() {
    let state = {page: "one", talks: "", user: "", calorieSubmit: ""}; 
    let app;
    function dispatch(action) {
        state = handleAction(state, action);
        app.syncState(state);
    }
    app = new App(state, dispatch);

    document.getElementById("joinNow").addEventListener("click", () => {
        dispatch({type: "createProfile", page: "two"});
    });

    document.getElementById("signIn").addEventListener("click", () => {
      dispatch({type: "signingIn", page: "three"});
    });

    pollTalks(talks => {
      dispatch({type: "setTalks", talks});
    }).catch(reportError);
}

runApp()