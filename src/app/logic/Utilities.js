import { ONLY_CAPITAL_CHARS } from "../assets/constants";

export function formatDate(unformattedDate) {
    let date = new Date(unformattedDate);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let min = date.getMinutes();
    if (("" + month).length < 2) {
        month = "0" + month;
    }
    if (("" + day).length < 2) {
        day = "0" + day;
    }
    if (("" + hour).length < 2) {
        hour = "0" + hour;
    }
    if (("" + min).length < 2) {
        min = "0" + min;
    }
    let formatDateTime = "" + year + "-" + month + "-" + day + " " + hour + ":" + min;
    return formatDateTime;
}

export function loadingEvaluator(loadingList) {
    for (let i = 0; i < loadingList.length; i++) {
        let loading = loadingList[i] === "" || loadingList[i] === null || loadingList[i] === undefined;
        if (loading) {
            return true;
        }
    }
    return false;
}

export function isEmptyEvaluator(item) {
    if (item === "" || item === null || typeof item === "undefined") {
        return true;
    }
    else {
        return false;
    }
}

export function changeQuantityEngine(choice, currentQuantity, minQuantity, maxQuantity) {
    if (currentQuantity === "" || currentQuantity === "NaN" || typeof currentQuantity === "undefined") {
        if (choice === "-") {
            return "1";
        }
        else if (choice === "+") {
            return "1";
        }
        return currentQuantity;
    }
    let currentQuantityInt = parseInt(currentQuantity, 10);
    if (choice === "+") {
        currentQuantityInt++;
        if (currentQuantityInt < minQuantity) {
            return "" + minQuantity;
        }
        if (currentQuantityInt > maxQuantity) {
            return "" + maxQuantity;
        }
        return "" + currentQuantityInt;
    }
    else if (choice === "-") {
        currentQuantityInt--;
    }
    else if (choice === "set") {
        if (currentQuantity === "-") {
            return currentQuantity;
        }
    }
    if (currentQuantityInt < minQuantity) {
        return "" + minQuantity;
    }
    if (currentQuantityInt > maxQuantity) {
        return "" + maxQuantity;
    }
    return "" + currentQuantityInt;
}

export function formatNumber(unformattedPrice, lang, exact) {
    unformattedPrice = unformattedPrice.replace(/\s+/g, '');
    let priceArray = unformattedPrice.split('.');
    let format = "$1,";
    let decimalSeparator = ".";
    if (lang === "sv") {
        format = "$1 ";
        decimalSeparator = ",";
    }
    else if (lang === "en") {
        format = "$1,";
        decimalSeparator = ".";
    }
    if (priceArray[0].length >= 5) {
        priceArray[0] = priceArray[0].replace(/(\d)(?=(\d{3})+$)/g, format);
    }
    if (priceArray[1] > 0) {
        let deciArray = priceArray[1].split("");
        for (let i = deciArray.length - 1; i >= 0; i--) {
            if (deciArray[i] === "0") {
                deciArray.pop();
            }
            else {
                break;
            }
        }
        priceArray[1] = deciArray.join("");
        return priceArray.join(decimalSeparator);
    }
    else if (exact) {
        return priceArray[0] + decimalSeparator + "00";
    }
    else {
        return priceArray[0];
    }
}

export function extractData(data) {
    let dataArray = [];
    let keyValue = 0;
    data.forEach(function (childSnap) {
        dataArray.push({
            keyValue: keyValue,
            courseId: childSnap.key,
            courseCode: childSnap.child("courseCode").val(),
            courseName: childSnap.child("courseName").val(),
            courseExamination: childSnap.child("courseExamination").val(),
            courseInfo: childSnap.child("courseInfo").val(),
            courseUpdated: childSnap.child("courseUpdated").val(),
        });
        keyValue++;
    });
    return dataArray.reverse();
}

export function extractSingleData(data) {
    let courseData = {
        courseId: data.key,
        courseCode: data.child("courseCode").val(),
        courseName: data.child("courseName").val(),
        courseExamination: data.child("courseExamination").val(),
        courseInfo: data.child("courseInfo").val(),
        courseUpdated: data.child("courseUpdated").val(),
    };
    return courseData;
}

export function checkCourseData(courseCode) {
    let obj = {
        status: false,
        errorMessage: "",
    }
    if (isEmptyEvaluator(courseCode)) {
        obj.status = true;
        obj.errorMessage = "You need to enter a course code";
        return obj;
    }
    if (courseCode.length < 6) {
        obj.status = true;
        obj.errorMessage = "Course code need to be at least 6 characters";
        return obj;
    }
    if (courseCode.length < 6) {
        obj.status = true;
        obj.errorMessage = "Course code need to be at least 6 characters";
        return obj;
    }
    let courseCodePart = courseCode.substring(0, 2);
    if (!courseCodePart.match(ONLY_CAPITAL_CHARS)) {
        obj.status = true;
        obj.errorMessage = "Course code need to start with two capital characters";
        return obj;
    }
    return obj;
}

export function alertData(data) {
    alert(JSON.stringify(data));
}