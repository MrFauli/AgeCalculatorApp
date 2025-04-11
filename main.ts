const dateWrapper = <HTMLInputElement>(
  document.getElementById("input_wrapperDay")
);
const monthWrapper = <HTMLInputElement>(
  document.getElementById("input_wrapperMonth")
);
const yearWrapper = <HTMLInputElement>(
  document.getElementById("input_wrapperYear")
);
let outputDay = <HTMLHeadingElement>document.getElementById("outDate");
let outputMonth = <HTMLHeadingElement>document.getElementById("outMonth");
let outputYear = <HTMLHeadingElement>document.getElementById("outYear");
const Btn = <HTMLInputElement>document.getElementById("ageBtn");
const date = new Date();
let theDay: number = date.getDate();
let theMonth: number = date.getMonth() + 1;
let month2: number = theMonth;
const year = date.getFullYear();
const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let today: string = theDay.toString();
let month: string = theMonth.toString();
if (theDay.toString.length == 1) {
  today = "0" + theDay;
}
if (theMonth.toString.length == 1) {
  month = "0" + theMonth;
}
let storageBirthday = localStorage.getItem("Birthday")
  ? JSON.parse(localStorage.getItem("Birthday") || "")
  : 0;

let calculateTheAge = () => {
  let birthdate = parseInt(dateWrapper.value);
  let birthmonth = parseInt(monthWrapper.value);
  let birthyear = parseInt(yearWrapper.value);
  let livedYears = 0;
  let livedMonth = 0;
  let livedDays = 0;
  if (
    dateWrapper.value == "" ||
    monthWrapper.value == "" ||
    yearWrapper.value == ""
  ) {
    let emptyInputs = <number[]>[];
    if (dateWrapper.value == "") {
      emptyInputs.push(0);
    }
    if (monthWrapper.value == "") {
      emptyInputs.push(1);
    }
    if (yearWrapper.value == "") {
      emptyInputs.push(2);
    }
    makeError(true, 1, emptyInputs);
  } else if (
    1 > birthdate ||
    birthdate > monthLength[month2 + 1] ||
    1 > birthmonth ||
    birthmonth > 12 ||
    0 > birthyear ||
    birthyear > year
  ) {
    let invalidValues = <number[]>[];
    console.log(month);
    console.log(monthLength[month]);
    if (1 > birthdate || birthdate > monthLength[month2 + 1]) {
      invalidValues.push(0);
    }
    if (1 > birthmonth || birthmonth > 12) {
      invalidValues.push(1);
    }
    if (0 > birthyear || birthyear > year) {
      invalidValues.push(2);
    }
    console.log("List", invalidValues);
    makeError(true, 2, invalidValues);
  } else {
    makeError(false);

    if (
      theMonth > birthmonth ||
      (birthdate >= theDay && theMonth == birthmonth)
    ) {
      livedYears = year - birthyear;
      if (theDay >= birthdate) {
        livedDays = theDay - birthdate;
        livedMonth = theMonth - birthmonth;
      } else {
        livedDays = monthLength[theMonth - 1] - birthdate + parseInt(today) + 1;
        livedMonth = theMonth - birthmonth - 1;
      }
    } else {
      livedYears = year - birthyear - 1;
      livedMonth = 12 - birthmonth + parseInt(month);
      if (theDay >= birthdate) {
        livedDays = theDay - birthdate;
      } else {
        livedDays = monthLength[theMonth - 1] - birthdate + parseInt(today) + 1;
        livedMonth = 12 - birthmonth + parseInt(month) - 1;
      }
    }

    outputDay.innerText = livedDays.toString();
    outputMonth.innerText = livedMonth.toString();
    outputYear.innerText = livedYears.toString();
    const localBirthday = {
      day: birthdate,
      month: birthmonth,
      year: birthyear,
    };
    localStorage.setItem("Birthday", JSON.stringify(localBirthday));
  }
};

Btn.addEventListener("click", calculateTheAge);

let makeError = (onOrOff, error = 0, list = <number[]>[]) => {
  const names = document.getElementsByClassName("names");
  const inputFields = document.getElementsByClassName("date_wrapper");
  const fields = inputFields[0].children;
  document.querySelectorAll(".boxError").forEach((el) => el.remove());
  if (onOrOff == true) {
    monthWrapper.style.border = "1px solid red";
    yearWrapper.style.border = "1px solid red";
    dateWrapper.style.border = "1px solid red";

    for (let i = 0; i < 3; i++) {
      names[i].classList.add("red-headline");
    }
    console.log(fields[0]);
    list.forEach((element) => {
      console.log(element);
      let message = "";
      if (error == 1) {
        message = "This field is required";
      } else if (error == 2) {
        console.log("hey");
        message = "Must be";
        if (element == 0) {
          message += " a valid day";
        } else if (element == 1) {
          message += " a valid month";
        } else if (element == 2) {
          message += " in the past";
        }
      }
      let notification = document.createTextNode(message);
      let box = document.createElement("div");
      box.className = "boxError";
      box.appendChild(notification);
      fields[element].appendChild(box);
      outputDay.innerText = "--";
      outputMonth.innerText = "--";
      outputYear.innerText = "--";
    });
  } else {
    monthWrapper.style.border = "1px solid black";
    yearWrapper.style.border = "1px solid black";
    dateWrapper.style.border = "1px solid black";
    for (let i = 0; i < 3; i++) {
      names[i].classList.remove("red-headline");
    }
  }
  console.log(error);
  console.log(list);
};
if (storageBirthday != 0) {
  dateWrapper.value = storageBirthday.day;
  monthWrapper.value = storageBirthday.month;
  yearWrapper.value = storageBirthday.year;
  calculateTheAge();
}
