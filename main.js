var dateWrapper = (document.getElementById("input_wrapperDay"));
var monthWrapper = (document.getElementById("input_wrapperMonth"));
var yearWrapper = (document.getElementById("input_wrapperYear"));
var outputDay = document.getElementById("outDate");
var outputMonth = document.getElementById("outMonth");
var outputYear = document.getElementById("outYear");
var Btn = document.getElementById("ageBtn");
var date = new Date();
var theDay = date.getDate();
var theMonth = date.getMonth() + 1;
var month2 = theMonth;
var year = date.getFullYear();
var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var today = theDay.toString();
var month = theMonth.toString();
if (theDay.toString.length == 1) {
    today = "0" + theDay;
}
if (theMonth.toString.length == 1) {
    month = "0" + theMonth;
}
var storageBirthday = localStorage.getItem("Birthday")
    ? JSON.parse(localStorage.getItem("Birthday") || "")
    : 0;
var calculateTheAge = function () {
    var birthdate = parseInt(dateWrapper.value);
    var birthmonth = parseInt(monthWrapper.value);
    var birthyear = parseInt(yearWrapper.value);
    var livedYears = 0;
    var livedMonth = 0;
    var livedDays = 0;
    if (dateWrapper.value == "" ||
        monthWrapper.value == "" ||
        yearWrapper.value == "") {
        var emptyInputs = [];
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
    }
    else if (1 > birthdate ||
        birthdate > monthLength[month2 + 1] ||
        1 > birthmonth ||
        birthmonth > 12 ||
        0 > birthyear ||
        birthyear > year) {
        var invalidValues = [];
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
    }
    else {
        makeError(false);
        if (theMonth > birthmonth ||
            (birthdate >= theDay && theMonth == birthmonth)) {
            livedYears = year - birthyear;
            if (theDay >= birthdate) {
                livedDays = theDay - birthdate;
                livedMonth = theMonth - birthmonth;
            }
            else {
                livedDays = monthLength[theMonth - 1] - birthdate + parseInt(today) + 1;
                livedMonth = theMonth - birthmonth - 1;
            }
        }
        else {
            livedYears = year - birthyear - 1;
            livedMonth = 12 - birthmonth + parseInt(month);
            if (theDay >= birthdate) {
                livedDays = theDay - birthdate;
            }
            else {
                livedDays = monthLength[theMonth - 1] - birthdate + parseInt(today) + 1;
                livedMonth = 12 - birthmonth + parseInt(month) - 1;
            }
        }
        outputDay.innerText = livedDays.toString();
        outputMonth.innerText = livedMonth.toString();
        outputYear.innerText = livedYears.toString();
        var localBirthday = {
            day: birthdate,
            month: birthmonth,
            year: birthyear,
        };
        localStorage.setItem("Birthday", JSON.stringify(localBirthday));
    }
};
Btn.addEventListener("click", calculateTheAge);
var makeError = function (onOrOff, error, list) {
    if (error === void 0) { error = 0; }
    if (list === void 0) { list = []; }
    var names = document.getElementsByClassName("names");
    var inputFields = document.getElementsByClassName("date_wrapper");
    var fields = inputFields[0].children;
    document.querySelectorAll(".boxError").forEach(function (el) { return el.remove(); });
    if (onOrOff == true) {
        monthWrapper.style.border = "1px solid red";
        yearWrapper.style.border = "1px solid red";
        dateWrapper.style.border = "1px solid red";
        for (var i = 0; i < 3; i++) {
            names[i].classList.add("red-headline");
        }
        console.log(fields[0]);
        list.forEach(function (element) {
            console.log(element);
            var message = "";
            if (error == 1) {
                message = "This field is required";
            }
            else if (error == 2) {
                console.log("hey");
                message = "Must be";
                if (element == 0) {
                    message += " a valid day";
                }
                else if (element == 1) {
                    message += " a valid month";
                }
                else if (element == 2) {
                    message += " in the past";
                }
            }
            var notification = document.createTextNode(message);
            var box = document.createElement("div");
            box.className = "boxError";
            box.appendChild(notification);
            fields[element].appendChild(box);
            outputDay.innerText = "--";
            outputMonth.innerText = "--";
            outputYear.innerText = "--";
        });
    }
    else {
        monthWrapper.style.border = "1px solid black";
        yearWrapper.style.border = "1px solid black";
        dateWrapper.style.border = "1px solid black";
        for (var i = 0; i < 3; i++) {
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
