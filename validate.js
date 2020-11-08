function Result(event) {
    const employee_id = document.getElementsByName('employee_id').value;
    //const email = document.getElementById('email').value;

    const checkboxone = document.getElementsByName('checkboxone');
    let checkboxValues = [];
    let check = 0;
    for (let i = 0; i < checkboxone.length; i++) {
        if (checkboxone[i].checked == true) {
            check++;
            checkboxValues.push(checkboxone[i].value);
        }
    }
    const questiontwo = document.getElementsByName('questiontwo');
    let questionTwoValue = '';
    let radionum = 0;
    for (let i = 0; i < questiontwo.length; i++) {
        if (questiontwo[i].checked == true) {
            radionum++;
            questionTwoValue = questiontwo[i].value;
            break;
        }

    }
    const questionthree = document.getElementsByName('questionthree');
    let questionThreeValue = '';
    let radionum2 = 0;
    for (let i = 0; i < questionthree.length; i++) {
        if (questionthree[i].checked == true) {
            radionum2++;
            questionThreeValue = questionthree[i].value;
            break;
        }

    }
    const questionfour = document.getElementsByName('questionfour');
    let questionFourValue = '';
    let radionum3 = 0;
    for (let i = 0; i < questionfour.length; i++) {
        if (questionfour[i].checked == true) {
            radionum3++;
            questionFourValue = questionfour[i].value;
            break;
        }

    }
    const questionfive = document.getElementsByName('questionfive');
    let questionFiveValue = '';
    let radionum4 = 0;
    for (let i = 0; i < questionfive.length; i++) {
        if (questionfive[i].checked == true) {
            radionum4++;
            questionFiveValue = questionfive[i].value;
            break;
        }

    }

    if (  employee_id && checkboxValues.length > 0 && questionTwoValue && questionThreeValue && questionFourValue && questionFiveValue) {
        axios.post('http://localhost:80/survey/addform', {
            employee_id: employee_id,
            //email: email,
            checkboxone: checkboxValues.join(','),
            questiontwo: questionTwoValue,
            questionthree: questionThreeValue,
            questionfour: questionFourValue,
            questionfive: questionFiveValue,
            employee_id: employee_id,
        }).then((response) => {
            console.log(response);
            //window.location.href = 'success.html';
        }).catch((err) => {
            console.log('Error' + err);
        });

    }

    if (employee_id === '' && checkboxValues.length === 0 && questionTwoValue === '' && questionThreeValue === '' && questionFourValue === '' && questionFiveValue === '' ) {
        document.getElementById('error-all').innerHTML = "Please enter all fields";

    }
    else if (employee_id === '') {
        document.getElementById('error-id').innerHTML = "Please enter your employee id";
    }
     else if (checkboxValues.length === 0) {
        document.getElementById('error-symptoms').innerHTML = "Please select an option for question one *";
        return false;
    }
    else if (questionTwoValue === '') {
        document.getElementById('error-one').innerHTML = "Please select yes or no for question 2";
        return false;
    }
    else if (questionThreeValue === '') {
        document.getElementById('error-two').innerHTML = "Please select yes or no for question 3";
        return false;
    }
    else if (questionFourValue === '') {
        document.getElementById('error-three').innerHTML = "Please select yes or no for question 4";
        return false;
    }
    else if (questionFiveValue === '') {
        document.getElementById('error-four').innerHTML = "Please select yes or no for question 5";
        return false;
    } else {
        return true;
    }


    event.preventDefault();
}