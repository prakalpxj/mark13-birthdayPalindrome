function reverseStr(str) {
    var listOfChars = str.split('');

    var reverseListOfChars = listOfChars.reverse();
    var reversedStr = reverseListOfChars.join('');

    return reversedStr;
}


function isPalindrome(str) {
    var reverse = reverseStr(str)
    return reverse === str;
}

function convertDateToString(date) {

    var dateStr = { day: '', month: '', year: '' };

    if (date.day < 10) {
        dateStr.day = "0" + date.day;
    } else {
        dateStr.day = date.day.toString();
    }

    if (date.month < 10) {
        dateStr.month = "0" + date.month;
    } else {
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();
    return dateStr;
}

function getDateInAllFormats(date) {
    var dateStr = convertDateToString(date);
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yyddmm = dateStr.year.slice(-2) + dateStr.day + dateStr.month;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
}





function checkPalindromeForAllDateFormats(date) {
    var isPalin = false;
    var listOfPalindromes = getDateInAllFormats(date);

    for (var i = 0; i < listOfPalindromes.length; i++) {
        if (isPalindrome(listOfPalindromes[i])) {
            isPalin = true;
            break;
        }
    }

    return isPalin;
}

function isLeapYear(year) {
    if (year % 400 === 0) return true;

    if (year % 100 === 0) return false;

    if (year % 4 === 0) return true;

    return false;
}
function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        }
        else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }
    } else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }

    if (month > 12) {
        month = 1;
        year++;
    }
    return {
        day: day,
        month: month,
        year: year
    }
}

function getNextPalindromeDate(date) {
    var ctr = 0;
    var nextDate = getNextDate(date);

    while (1) {
        ctr++;
        var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if (isPalindrome) {
            break;
        }

        nextDate = getNextDate(nextDate);
    }

    return [ctr, nextDate];
}

var date = {
    day: 11,
    month: 02,
    year: 2021
}

var dateInputRef = document.querySelector("#bday-input");
var showBtnRef = document.querySelector("#show-btn");
var resultRef = document.querySelector("#result");


function clickHandler(e) {
    var bdayStr = dateInputRef.value;

    if (bdayStr !== '') {
        var listOfDate = bdayStr.split("-");

        var date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        };

        var flag = checkPalindromeForAllDateFormats(date);

        if (flag) {
            resultRef.innerText = "Yay! Your birthday is Palindrome"
        }
        else {
            var [ctr, nextDate] = getNextPalindromeDate(date);
            resultRef.innerText = `The nearest Palindrome is ${ctr} days away on  ${nextDate.day} - ${nextDate.month} - ${nextDate.year}`
        }
    }

}

showBtnRef.addEventListener('click', clickHandler);

