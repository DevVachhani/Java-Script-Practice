/*****************************************************************************
 * Structuring code with MODULES
 * MODULES ARE:
 * -Important aspect of any robust application's architecture;
 * -Keep the units of code for a project both cleanly separated and organized;
 * -Encapsulate some data into privacy and expose other data publicly.
 *
 * Separate the to-do-list into modules where all the peices of code are related to one another; for example is it for the UI is it data separate them into their own modules
 ****************************************************************************/

/****************************************************************************
 * BUDGETY TO-DO LIST #1
 * Add event handler
 * Get input values
 * Add the new item to our data structure
 * Add the new item to the UI
 * Calculate the budget
 * Update the UI
 *
 * MODULES FOR THESE TASKS
 * UI MODULE
 * -Get iput values
 * -Add the new item to the UI
 * -update the UI
 *
 * DATA MODULE
 * -Add the new item to our data structure
 * -Calculate budget
 *
 * CONTROLLER MODULE
 * -Add event handler
 ****************************************************************************/

// Create the Data Module with use the IIFE and Closure
var budgetController = (function () {
  //   Budget Controller Code

  // Adding the constructor for the Income and Expanse
  var Expanse = function (id, description, amount) {
    this.id = id;
    this.description = description;
    this.amount = amount;
    this.percentage = -1;
  };

  Expanse.prototype.calcPercentage = function (totalIncome) {
    if (data.total.inc > 0)
      this.percentage = Math.round((this.amount / totalIncome) * 100);
    else this.percentage = -1;
  };

  // Access the Percentage
  Expanse.prototype.getPercentage = function () {
    return this.percentage;
  };

  var Income = function (id, description, amount) {
    this.id = id;
    this.description = description;
    this.amount = amount;
  };

  var calculateToatal = function (type) {
    var sum = 0;

    data.allItems[type].forEach(function (curr) {
      sum = sum + curr.amount;
    });

    data.total[type] = sum;
  };

  // To store the exapnses and income of all the entry we enter we need one data structre to store all entred income and expanses
  // we use variable but it make too much complex our project to understan our project so,
  // we use object which store all the value of data
  // use an array to store the all the income and expanses

  var data = {
    allItems: {
      exp: [],
      inc: [],
    },
    total: {
      exp: 0,
      inc: 0,
    },
    budget: 0,
    percentage: -1,
  };

  // Adding the item in data object and categorize in the inco and exp
  // For that we need to create a public method

  return {
    addItems: function (type, desc, amount) {
      var newItem, ID;

      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
        // .id is help to retrive the element on the given index
      } else {
        ID = 0;
      }
      // we can't uses the index of an array because if we start to remvoe the items it will change the index of item as well as chagne the id of the item also
      // if our array is [1,2,3,4,5,6,7,8] and if  we delete the element 3,4,5
      // so new array is [1,2,6,7,8] if we want to insert new element so we want the
      // id = 9 that we get using above ID formula

      // create newItem basec on type inc and exp
      if (type === "exp") {
        // create the instace of Expanses Constructor
        newItem = new Expanse(ID, desc, amount);
      } else if (type === "inc") {
        // cerate the instance of Income Constructor
        newItem = new Income(ID, desc, amount);
      }
      // Push the value of ITEM as per it's type
      data.allItems[type].push(newItem);

      // return the newItem
      return newItem;
    },

    budgetCalculate: function () {
      // 1. Calculate the total income and expanse
      calculateToatal("exp");
      calculateToatal("inc");

      // 2. CalculateBudget = income - expanse
      data.budget = data.total.inc - data.total.exp;

      // 3. Calculate the percentage of income we spent
      if (data.total.inc > 0)
        data.percentage = Math.round((data.total.exp / data.total.inc) * 100);
      else data.percentage = -1;
    },

    getBudget: function () {
      return {
        budget: data.budget,
        percentage: data.percentage,
        totalIncome: data.total.inc,
        totalExpanse: data.total.exp,
      };
    },

    calculatePercentage: function () {
      data.allItems.exp.forEach(function (curr) {
        curr.calcPercentage(data.total.inc);
      });
    },

    getPercentage: function () {
      var allPerc = data.allItems.exp.map(function (index) {
        return index.getPercentage();
      });

      return allPerc;
    },

    deleteItem: function (type, id) {
      var ids, index;

      ids = data.allItems[type].map(function (curr) {
        return curr.id;
      });
      // Map return the set of an array

      index = ids.indexOf(id);

      if (index !== -1) {
        data.allItems[type].splice(index, 1);
        // splice method take two parameter 1st is position and 2nd is the no of item you want to delete
      }
    },

    testing: function () {
      console.log(data);
    },
  };
})();
// Here we use IIFE function to create the module so the all the method and variable in side the budgetController is private which is not able to access outside the IIFE function but here we use the one closure which is able to access outside the IIFE

// budgetController.TestMethod(7);

// Create the UI Module with use the IIFE and Closure

var UIcontroller = (function () {
  //   UI Controller Code

  // All the class of UI is here
  // Dom_Steings is private object to access out side the scope we need the getter
  var DOM_Strings = {
    inputType: ".add__type",
    inputDesc: ".add__description",
    inputValue: ".add__value",
    add_btn: ".add__btn",
    incomeContainer: ".income__list",
    expanseContainer: ".expenses__list",
    budgetLable: ".budget__value",
    incomeLable: ".budget__income--value",
    expanseLable: ".budget__expenses--value",
    percentageLable: ".budget__expenses--percentage",
    container: ".container",
    expansePercentage: ".item__percentage",
    monthLable: ".budget__title--month",
  };

  var formatNumber = function (num, type) {
    var numsplit, int, dec, sing;

    num = Math.abs(num);
    num = num.toFixed(2);

    numsplit = num.split(".");

    int = numsplit[0];

    if (int.length > 3) {
      int = int.substr(0, int.length - 3) + "," + int.substr(int.length - 3, 3);
    }

    dec = numsplit[1];

    type === "exp" ? (sing = "-") : (sing = "+");

    return sing + " " + int + "." + dec;
  };

  var nodeListForEach = function (list, callback) {
    for (var i = 0; i < list.length; i++) {
      callback(list[i], i);
    }
  };

  // Here we need to return the value of the inputs
  // to rather than return the 3 input fields value we use the one object to return the value of the 3 input fields
  return {
    getInput: function () {
      return {
        type: document.querySelector(DOM_Strings.inputType).value, // for value +(inc) and for -(exp)
        description: document.querySelector(DOM_Strings.inputDesc).value,
        amount: parseFloat(
          document.querySelector(DOM_Strings.inputValue).value
        ),
        // if the class name of the field is change we need to change is as many time we use in the places we use so , if the class name is chagne we create and object here which store the name of all the classes we use so if any change happen we need to change on the object value
        // amount is data type is float not a string so that why we use the parseFloat
      };
    },
    showOnUI: function (obj, type) {
      var template, update_template, element;

      // create the HTML string with placeholder text
      // % text % it is the placeholder
      // here place holder is {%id%}{%desc%}{%amount%}

      if (type === "inc") {
        element = DOM_Strings.incomeContainer;
        template =
          '<div class="item clearfix" id="inc-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%amount%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === "exp") {
        element = DOM_Strings.expanseContainer;
        template =
          '<div class="item clearfix" id="exp-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%amount%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      // replace the %placehodler% with actual value that we get from the object
      update_template = template.replace("%id%", obj.id);
      update_template = update_template.replace("%desc%", obj.description);
      update_template = update_template.replace(
        "%amount%",
        formatNumber(obj.amount, type)
      );

      // Update the Element on the UI
      document
        .querySelector(element)
        .insertAdjacentHTML("beforeend", update_template);
    },

    deleteListItem: function (selectorId) {
      var ele;

      ele = document.getElementById(selectorId);
      ele.parentNode.removeChild(ele);
    },

    // Input Fields Create Function execut after the value added
    clearFields: function () {
      var fields, fieldArr;

      // Select description and amount field

      fields = document.querySelectorAll(
        DOM_Strings.inputDesc + ", " + DOM_Strings.inputValue
      );

      // Now we use the slice function to slice form the ,
      // but fiedls is not array it is string value so
      fieldArr = Array.prototype.slice.call(fields);

      // Use for-each loop to travarse it
      fieldArr.forEach(function (curr) {
        curr.value = "";
      });

      fieldArr[0].focus();
    },

    diplayBudget: function (obj) {
      var type;
      obj.budget > 0 ? (type = "inc") : (type = "exp");

      document.querySelector(DOM_Strings.budgetLable).textContent =
        formatNumber(obj.budget, type);
      document.querySelector(DOM_Strings.incomeLable).textContent =
        formatNumber(obj.totalIncome, "inc");
      document.querySelector(DOM_Strings.expanseLable).textContent =
        formatNumber(obj.totalExpanse, "exp");

      if (obj.percentage > 0) {
        document.querySelector(DOM_Strings.percentageLable).textContent =
          obj.percentage + "%";
      } else {
        document.querySelector(DOM_Strings.percentageLable).textContent = "---";
      }
    },

    displayPercentage: function (percentages) {
      var fields = document.querySelectorAll(DOM_Strings.expansePercentage);

      nodeListForEach(fields, function (curr, index) {
        if (percentages[index] > 0) curr.textContent = percentages[index] + "%";
        else curr.textContent = "---";
      });
    },

    displayMonth: function () {
      var date, month, year;
      // create the date object

      date = new Date();

      const index = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      month = date.getMonth();

      year = date.getFullYear();

      document.querySelector(DOM_Strings.monthLable).textContent =
        index[month] + " " + year;
    },

    changeType: function () {
      var fiedls;

      fiedls = document.querySelectorAll(
        DOM_Strings.inputType +
          "," +
          DOM_Strings.inputDesc +
          "," +
          DOM_Strings.inputValue
      );

      nodeListForEach(fiedls, function (curr) {
        curr.classList.toggle("red-focus");
      });

      document.querySelector(DOM_Strings.add_btn).classList.toggle("red");
    },

    //    work like getter that work in OOPs
    getDomString: function () {
      return DOM_Strings;
    },
  };
})();

// Create the Controller Module with use the IIFE and Closure that is help to connect the UI and Data Module to connect with each other
// To connect both module we pass both module as an arguments to IIFE

// we pass as budgetCtrl name beacause if the budgetController Name change we need to change all the time we use inside the Controller module and if we pass argument as  the budgetCtrl name and the  function name is change so we need to only change the name at the end of IIFE where we call the Module which make lot easier in the code

var Controller = (function (budgetCtrl, UICtrl) {
  //   Main Controller Code which connect the DATA and UI Controller

  // Event Handler code here
  // Set up the eventlistner in one function which execute only when the our applicaiton is started

  var setupEvnetnListnere = function () {
    // Fetch the value of Class name for getDomeString
    var DOM_class = UICtrl.getDomString();

    // Use the Event Listner here for click
    var click_btn = document.querySelector(DOM_class.add_btn);
    click_btn.addEventListener("click", insertItem);

    // We need the Enter Key event listner also because when we get the value form the user press the Enter Key at that time also we need to store the value

    var Enter_key_press = document.addEventListener(
      "keypress",
      function (event) {
        // keypress event is execute when any key press on the keyboard
        // To identify the Enter key we use the keycode and to use the key we need to pass and event as an argument in eventlistener function

        // console.log(event);

        if (event.key === "Enter") {
          insertItem();
        }
      }
    );
    document
      .querySelector(DOM_class.container)
      .addEventListener("click", deleteItem);

    document
      .querySelector(DOM_class.inputType)
      .addEventListener("change", UICtrl.changeType);
  };
  // We need to perfom same event on the click_btn and Enter_key_press
  // so if we write the both code in the same function it's not follow the DRY Principle so to follow the DRY(Do not Repeat Your code ) we use the one function or function expression and wrap the code inside it

  // Function that Update the budget
  var updateBudget = function () {
    // 5. Calculate the budget
    budgetCtrl.budgetCalculate();

    // 6. Return the budget
    var answers = budgetCtrl.getBudget();

    // console.log(answer);

    // 7. Display the Budget on th UI
    UICtrl.diplayBudget(answers);
  };

  // Function update Percentage
  var updatePercentage = function () {
    // 1. Calculate the Percentage
    budgetCtrl.calculatePercentage();

    // 2. Read percentage from the budget Controller
    var percen = budgetCtrl.getPercentage();
    // 3. Update percentage in UI
    // console.log(percen);
    UICtrl.displayPercentage(percen);
  };

  var insertItem = function () {
    var input, newItem;
    // 1. Get the value of field of input data
    input = UICtrl.getInput();
    // console.log(input);

    // We need to exectue below description field only when there is some string in description and amount is number
    // no need to execute when the description field empty and amount in NAN and amount is === 0

    if (
      input.description !== "" &&
      !isNaN(input.amount) &&
      input.amount !== 0
    ) {
      // 2. Add the item to the budget controller
      newItem = budgetCtrl.addItems(
        input.type,
        input.description,
        input.amount
      );
      // console.log((newItem));

      // 3. Add the item to the UI
      UICtrl.showOnUI(newItem, input.type);

      // 4. Clear the input Fields
      UICtrl.clearFields();

      // 5. updateBudget
      updateBudget();

      // 6. updateBudget
      updatePercentage();
    }
  };

  var deleteItem = function (event) {
    var itemId, newitemId, type, id;

    itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;

    if (itemId) {
      newitemId = itemId.split("-");

      // console.log(newitemId);
      type = newitemId[0];
      id = parseInt(newitemId[1]);

      // For Deltetion

      // 1. Delete the item from data structure
      budgetCtrl.deleteItem(type, id);
      // 2. Delete the item from UI
      UICtrl.deleteListItem(itemId);

      // 3. Recalculate the budget and Update it to UI
      updateBudget();

      // 4. Update Percentage
      updatePercentage();
    }
  };

  // return object which make our applicaiton start
  return {
    init: function () {
      console.log("Application is started");
      UICtrl.displayMonth();
      // initally all the values are 0
      UICtrl.diplayBudget({
        budget: 0,
        percentage: 0,
        totalIncome: 0,
        totalExpanse: 0,
      });
      setupEvnetnListnere();
    },
  };
})(budgetController, UIcontroller);

// call the init() function outside
Controller.init();
