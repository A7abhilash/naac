/*********VARIABLES*********/
const selectCriteria = $(".selectCriteria");
var displayCriteriaSection = $(".displayCriteriaSection");
var Wi = $(".Wi");
var KAGPi = $(".KAGPi");
var KAWGPi = $(".KAWGPi");
var GPAi = $(".GPAi");
var CrGPA = $(".CrGPA");
const submit = $(".submit");
const total = $(".total");
const result = $(".result");
var cgpa = $(".cgpa");
var grade = $(".grade");
var outcome = $(".outcome");

/*********EVENT LISTNERS*********/
submit.click(calculateResult);

/*********FUNCTIONS **********/
//Selecting the criteria
function select() {
  displayCriteria(selectCriteria.val());
  event.stopImmediatePropagation();
}

//Displaying the selected criteria
function displayCriteria(criteria) {
  selectCriteria.val(criteria);

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

//Calculating KAWGP correspondingly when user enters the input
function check(i) {
  // console.log(this);
  // console.log(this.KAGPi[i].value);
  if (
    this.KAGPi[i].value === "" ||
    this.KAGPi[i].value < 0 ||
    this.KAGPi[i].value > 4
  ) {
    this.KAGPi[i].value = "";
    this.KAGPi[i].style.border = "2px solid red";
    this.KAGPi[i].placeholder = "Invalid";
    this.KAWGPi[i].innerHTML = "";
  } else {
    this.KAGPi[i].style.border = "2px solid green";
    this.KAWGPi[i].innerHTML = (
      this.Wi[i].innerHTML * this.KAGPi[i].value
    ).toPrecision(4);
    // console.log(this.GPAi[0]);
    // calculateGPA(GPAi[0],0);
  }
  for (let i = 0; i < GPAi.length; i++) {
    calculateGPA(GPAi[i], i);
  }

  while (i >= 0) {
    if (this.KAGPi[i].value === "") {
      this.KAGPi[i].style.border = "2px solid red";
      this.KAGPi[i].placeholder = "Invalid";
    }
    i--;
  }
}

//Calculating result
function calculateResult(event) {
  event.preventDefault();
  let KAWGP = 0;
  let flag = true;
  
  for (let i = 0; i < KAGPi.length; i++) {
    if (KAGPi[i].value === "") {
      window.alert("Invalid Input. Please follow the INSTRUCTIONS.");
      result.css("display", "none");
      // total.css("visibility", "hidden");
      flag = false;
      break;
    }
  }
  
  if (!flag) {
    for (let i = 0; i < KAGPi.length; i++) {
      if (KAGPi[i].value === "") {
        KAGPi[i].placeholder = "Invalid";
        KAGPi[i].style.border = "2px solid red";
      }
    }
    submit.attr('data-toggle','')
    submit.attr('data-target','')
  }
  
  if (flag) {
    for (let i = 0; i < KAWGPi.length; i++) {
      KAWGPi[i].innerHTML = (Wi[i].innerHTML * KAGPi[i].value).toPrecision(4);
      KAWGP += `+ ${KAWGPi[i].innerHTML}`;
    }
    
    for (let i = 0; i < GPAi.length; i++) {
      calculateGPA(GPAi[i], i);
    }
    submit.attr('data-toggle','modal')
    submit.attr('data-target','#myModal')
    displayResult(eval(KAWGP));
  }
}

//Calculating GPA
function calculateGPA(GPAi, j) {
  let GPA = 0;
  let scopeWi = 0;
  let scope = $(GPAi).parent().parent().children();
  // console.log($(scope[0]).children());
  for (let i = 0; i < scope.length; i++) {
    let requiredScope = $(scope[i]).children()[4].innerHTML;
    if (scope[i].className === "") {
      if (requiredScope !== "") {
        // console.log(requiredScope);
        GPA += `+ ${requiredScope}`;
        // console.log(eval(GPA));
      }
    } else {
      scopeWi = $(scope[i]).children()[2].innerHTML;
      GPAi.innerHTML = eval(GPA).toPrecision(4);
      CrGPA[j].innerHTML = (GPAi.innerHTML / scopeWi).toPrecision(3);
      // total.css("visibility", "visible");
    }
  }
}

//Displaying the result
function displayResult(KAWGP) {
  result.css("display", "block");
  // total.css("visibility", "visible");

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
