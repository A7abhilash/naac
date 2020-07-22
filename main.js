/*********VARIABLES*********/
// const selectCriteria = $(".selectCriteria");
var displayCriteriaSection = $(".displayCriteriaSection");

var Wi = $(".Wi");
var KAGPi = $(".KAGPi");
var KAWGPi = $(".KAWGPi");
var GPAi = $(".GPAi");
var CrGPA=$('.CrGPA')
const submit = $(".submit");
const total = $(".total");
const result = $(".result");
var cgpa = $(".cgpa");
var grade = $(".grade");
var outcome = $(".outcome");

/*********EVENT LISTNERS*********/
submit.click(calculateResult);

/*********FUNCTIONS **********/

//Displaying the selected criteria
function displayCriteria(criteria) {
  if (criteria !== "") {
    displayCriteriaSection.children().filter((child) => {
      // console.log(displayCriteriaSection.children()[child].className !== criteria);
      if (displayCriteriaSection.children()[child].className !== criteria) {
        let hide = displayCriteriaSection.children()[child].className;
        // console.log("true block");
        $(`.${hide}`).css("display", "none");
      } else {
        // console.log("false block");
        $(`.displayCriteriaSection .${criteria}`).css("display", "block");
      }
    });
  }
}

function calculateResult(event) {
  event.preventDefault();
  let KAWGP = 0;
  let flag = true;

  for (let i = 0; i < KAGPi.length; i++) {
    if (KAGPi[i].value === "" || KAGPi[i].value < 0 || KAGPi[i].value > 4) {
      window.alert("Invalid Input. Please follow the INSTRUCTIONS.");
      result.css("display", "none");
      total.css("visibility", "hidden");
      flag = false;
      break;
    }
  }

  if (flag) {
    for (let i = 0; i < KAWGPi.length; i++) {
      KAWGPi[i].innerHTML = (Wi[i].innerHTML * KAGPi[i].value).toPrecision(4);
      KAWGP += `+ ${KAWGPi[i].innerHTML}`;
    }

    for (let i = 0; i < GPAi.length; i++) {
      calculateGPA(GPAi[i],i);
    }
    displayResult(eval(KAWGP));
  }
}

//Calculating GPA
function calculateGPA(GPAi,j) {
  let GPA = 0;
  let scopeWi = 0;
  let scope = $(GPAi).parent().parent().children();

  for (let i = 0; i < scope.length; i++) {
    let requiredScope = $(scope[i]).children()[4].innerHTML;
    if (scope[i].className === "") {
      // console.log(requiredScope);
      GPA += `+ ${requiredScope}`;
    } else {
      scopeWi = $(scope[i]).children()[2].innerHTML;
      GPAi.innerHTML = eval(GPA).toPrecision(4);
      CrGPA[j].innerHTML = (GPAi.innerHTML/scopeWi).toPrecision(3)
    }
  }
}

//Displaying the result
function displayResult(KAWGP) {
  result.css("display", "block");
  total.css("visibility", "visible");

  let CGPA = (KAWGP / 1000).toPrecision(3);
  cgpa.html(CGPA);

  if (CGPA > 1.5) {
    if (CGPA > 3.5) {
      grade.html("A++");
    } else if (CGPA > 3.25) {
      grade.html("A+");
    } else if (CGPA > 3) {
      grade.html("A");
    } else if (CGPA > 2.75) {
      grade.html("B++");
    } else if (CGPA > 2.5) {
      grade.html("B+");
    } else if (CGPA > 2) {
      grade.html("B");
    } else if (CGPA > 1.5) {
      grade.html("C");
    }
    outcome.html("Accredited");
    outcome.css("color", "green");
  } else {
    grade.html("D");
    outcome.html("Not Accredited");
    outcome.css("color", "red");
  }
}
