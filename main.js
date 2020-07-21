/*********VARIABLES*********/
const selectCriteria = $(".selectCriteria");
var displayCriteriaSection = $(".displayCriteriaSection");
const submit = $(".submit");

const result = $(".result");
var cgpa = $(".cgpa");
var grade = $(".grade");
var outcome = $(".outcome");

/*********EVENT LISTNERS*********/
submit.click(calculateResult);

/*********FUNCTIONS **********/
//Selecting the criteria
function select() {
  //   console.log(selectCriteria.val());
  result.css("display", "none");
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
