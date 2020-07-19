/*********VARIABLES*********/
const selectCriteria = $(".selectCriteria");
var displayCriteriaSection = $(".displayCriteriaSection");

/*********FUNCTIONS **********/
//Selecting the criteria
select = () => {
  //   console.log(selectCriteria.val());
  displayCriteria(selectCriteria.val());
  event.stopImmediatePropagation();
};

//Displaying the selected criteria
displayCriteria = (criteria) => {
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
};


