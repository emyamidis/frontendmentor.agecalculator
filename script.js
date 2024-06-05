// Input
const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");

// Output
const dayOutput = document.getElementById("DD");
const monthOutput = document.getElementById("MM");
const yearOutput = document.getElementById("YY");

const allInput = document.querySelectorAll('input[type="number"]');
const button = document.getElementById("submit-button")

const date = new Date();
const currentDate = date.getDate();
const currentMonth = date.getMonth() + 1;
const currentYear = date.getFullYear();



const validateParameter = {
    day: {maxLength: 2, minValue: 1, maxValue: 31},
    month: { maxLength: 2, minValue: 1, maxValue: 12},
    year: {maxLength: 4, minValue: 1900, maxValue: currentYear}
}

function isFutureDate(yearValue, monthValue, dayValue) {
    return (yearValue > currentYear || 
        (yearValue === currentYear && 
            (monthValue > currentMonth || 
                (monthValue === currentMonth && 
                    dayValue > currentDate))))
}


function validateInput(input, maxLength, minValue, maxValue) {
    if (input.value.length === 0) {
        input.style.borderColor = '';
        return false; // Consider empty fields as invalid
    }
    if (input.value.length > maxLength) {
        input.value = input.value.slice(0, input.maxLength)
    }

    let value = parseInt(input.value);
    if (isNaN(value) || value < minValue || value > maxValue) {
        input.style.borderColor = 'red';
        return false;
    } else {
        input.style.borderColor = '';
        return true;
    }
}



function validateInputs() {

    const dayParameter = validateParameter.day;
    const monthParameter = validateParameter.month;
    const yearParameter = validateParameter.year;

    const yearValue = parseInt(yearInput.value, 10);
    const monthValue = parseInt(monthInput.value, 10);
    const dayValue = parseInt(dayInput.value, 10);

    let dayIsValid = validateInput(dayInput, dayParameter.maxLength, dayParameter.minValue, day.maxValue);
    let monthIsValid = validateInput(monthInput, monthParameter.maxLength, monthParameter.minValue, monthParameter.maxValue);
    let yearIsValid = validateInput(yearInput, yearParameter.maxLength, yearParameter.minValue, yearParameter.maxValue);

    if (!dayIsValid || !monthIsValid || !yearIsValid) {
        alert("Please input a valid date");
        return false;
    }

    if (isFutureDate(yearValue, monthValue, dayValue)) {
        alert("Date is in the future")
        return false;
    } 
    
    return true;
}

function calculateAge() {

    const yearValue = parseInt(yearInput.value, 10);
    const monthValue = parseInt(monthInput.value, 10);
    const dayValue = parseInt(dayInput.value, 10);

    let years = currentYear - yearValue
    let months, days;

    if (currentMonth < monthValue) {
        years--;
        months = 12 - (monthValue - currentMonth);
    } else {
         months = currentMonth - monthValue
    }

    if (currentDate < dayValue) {
        months--;
        const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
        const daysInLastMonth = getDaysInMonth(lastMonth, currentYear);
        days = daysInLastMonth - (dayValue - currentDate);
    }   else {
        days = currentDate - dayValue;
    } 

    return {years, months, days}; 


   
}

const getDaysInMonth = (month, year) => {
    const isLeapYear = year % 4 === 0 || (year % 100 === 0 || year % 400 === 0);
    const getDaysInMonth = [
        31,
        isLeapYear ? 29 : 28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31,
    ];
    return getDaysInMonth(month - 1)
}


allInput.forEach(input => {
    const params = validateParameter[input.id];
    console.log('Input ID:', input.id);
    console.log('Params:', params);

    input.addEventListener('input', () => {
        validateInput(input, params.maxLength, params.minValue, params.maxValue);
   

    });

    });



    button.addEventListener('click', () => {
        if (validateInputs()) {
            const { years, months, days } = calculateAge();
            yearOutput.innerHTML = years;
            monthOutput.innerHTML = months;
            dayOutput.innerHTML = days;
        }
    });




