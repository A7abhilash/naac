/*********VARIABLES*********/
const selectCriteria = $(".selectCriteria");
var displayCriteriaSection = $(".displayCriteriaSection");
const submit = $(".submit");
const alert = $(".alert");
const result = $('.result');
var cgpa = $(".cgpa");
var grade = $(".grade");
var outcome = $(".outcome");
/*********EVENT LISTNERS*********/
submit.click(calculateResult);

/*********FUNCTIONS **********/
//Selecting the criteria
function select() {
  //   console.log(selectCriteria.val());
  result.css('display','none')
  displayCriteria(selectCriteria.val());
  event.stopImmediatePropagation();
}

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

//Calculation of Result
function calculateResult(event) {
  event.preventDefault();

  //Get the current scope of criteria
  let scope = $(this).parent().children()[1];
  scope = $(scope).children()[1];
  scope = $(scope).children().children();
  // console.log(scope);
  let flag = true;

  //get the values of current criteria's Wi
  let W = 0; //sum of all Wi
  let Wi = [];
  for (let i = 2; i < scope.length; i = i + 5) {
    Wi.push(scope[i].innerHTML);
  }

  //get the values of current criteria's KAGPi
  let KAGPi = [];
  for (let j = 3; j < scope.length; j = j + 5) {
    KAGPi.push(scope[j].children[0].value);
  }
  // console.log(KAGPi);

  //calculate the KAWGPi and display it
  let KAWGP = 0; //sum of all KAWGPi
  let KAWGPi = [];
  for (i in KAGPi) {
    if (KAGPi[i] === "" || KAGPi[i] < 0 || KAGPi[i] > 4) {
      displayAlert();
      flag = false;
    } else {
      KAWGPi.push(Wi[i] * KAGPi[i]);
      KAWGP += KAWGPi[i];
      W += `+ ${Wi[i]}`;
    }
  }
  // console.log(eval(W));
  // console.log(KAWGP);
  // console.log(KAWGP/eval(W));
  for (let k = 4, j = 0; k < scope.length, j < Wi.length; k = k + 5, j++) {
    if (flag) {
      scope[k].innerHTML = KAWGPi[j];
    } else {
      scope[k].innerHTML = "";
    }
    // console.log(scope[k].innerHTML);
  }
  // console.log(Wi);
  if (flag) {
    displayResult(eval(W), KAWGP);
  }
}

//Displaying result
function displayResult(W, KAWGP) {
  result.css('display','block')

  let CGPA = (KAWGP / W).toPrecision(3);
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
  } else  {
    grade.html("D");
    outcome.html("Not Accredited");
    outcome.css("color", "red");
  }
}

//Displaying alert
function displayAlert() {
  alert.css("visibility", "visible");
  setTimeout(() => alert.css("visibility", "hidden"), 3000);
  result.css('display','none');
}
