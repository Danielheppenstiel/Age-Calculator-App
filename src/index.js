// VARIABLES

    // FORM DOM ELEMENTS
const form = document.getElementById('info-form');
const dayInput = document.getElementById('day');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');
const inputs = document.querySelectorAll('input');
const labels = document.querySelectorAll('label.label');
const submitBtn = document.getElementById('submit-button');

    // ERROR ELEMENTS
const mainError = document.getElementById('main-error');
const dayError = document.getElementById('day-error');
const monthError = document.getElementById('month-error');
const yearError = document.getElementById('year-error');

    // RESULT ELEMENTS
const yearNumber = document.getElementById('year-number');
const monthNumber = document.getElementById('month-number');
const dayNumber = document.getElementById('day-number');

// CALC FUNCTION
function calcAge() {
    const currentDate = new Date();
    
    // calc year
    let years = currentDate.getFullYear() - yearInput.value;
    
    // calc month
    let months = currentDate.getMonth() - monthInput.value;
    if (months < 0) {
        months += 12;
        years--;
    };
    
    // calc days
    let currentDay = currentDate.getDate();
    let birthDay = dayInput.value;
    let days;

    if (currentDay < birthDay) {
        const prevMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() -1, 0);
        days = prevMonthDate.getFullYear - birthDay + currentDay;
        months--;
    } else {
        days = currentDay - birthDay;
    };


    return {
        years,
        months,
        days
    };

};

// Vaild Date
function isValidDate(year, month, day) {

    const date = new Date(`${year}-${month}-${day}`);

    const isValidDay = date.getDate() == day;
    const isValidMonth = date.getMonth() + 1 == month;
    const isValidYear = date.getFullYear() == year;


    return isValidDay && isValidMonth && isValidYear;

};

// ERRORS RESET
function resetError() {
    yearError.innerText = '';
    monthError.innerText = '';
    dayError.innerText = '';

    inputs.forEach(input => {
        input.style.borderColor = '';
    });
    labels.forEach(label => {
        label.style.color = '';
    });
};

// ERROR HANDLING
function handleError() {

    if (dayInput.value === '' && monthInput.value !== '' && yearInput.value !== '') {
        dayError.innerText = 'Field Empty';
    } else if (monthInput.value === '' && dayInput.value !== '' && yearInput.value !== '') {
        monthError.innerText = 'Field Empty';
    } else if (yearInput.value === '' && dayInput.value !== '' && monthInput.value !== '') {
        yearError.innerText = 'Field Empty';
    } else if (yearInput.value === '' && dayInput.value === '' && monthInput.value !== '') {
        yearError.innerText = 'Field Empty';
        dayError.innerText = 'Field Empty';
    } else if (yearInput.value !== '' && dayInput.value === '' && monthInput.value === '') {
        dayError.innerText = 'Field Empty';
        monthError.innerText = 'Field Empty';
    } else if (yearInput.value === '' && dayInput.value !== '' && monthInput.value === '') {
        yearError.innerText = 'Field Empty';
        monthError.innerText = 'Field Empty';
    };

    setTimeout(function() {
        resetError();
    }, 2000);

};

// MAIN EXECUTION
function calculate(e) {

    e.preventDefault();


    if (dayInput.value === '' || monthInput.value === '' || yearInput === '') {
        handleError();
    } else if (!isValidDate(yearInput.value, monthInput.value, dayInput.value)) {
        dayError.innerHTML = 'Invaild date';
        inputs.forEach(input => {
            input.style.borderColor = 'hsl(0, 100%, 67%)';
        });
        labels.forEach(label => {
            label.style.color = 'hsl(0, 100%, 67%)';
        });

    } else {
        const age = calcAge();
        yearNumber.innerText = age.years;
        monthNumber.innerText = age.months;
        dayNumber.innerText = age.days;
        resetError();
    };


};

// EVENT LISTENERS
submitBtn.addEventListener('click', calculate);

