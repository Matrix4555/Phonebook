import $ from 'jquery';

export function checkInput(field) {
    const element = `#input-${field}`;
    $(element).css('border-color', !$(element).val() ? 'red' : 'lime');
}

export function checkPhone(inputted) {

    const isEventCheck = typeof inputted !== 'string';
    let input = isEventCheck ? $('#input-phone').val() : inputted;

    if(!input) {
        $('#input-phone').css('border-color', 'red');
        return false;
    }    

    if(input[0] === '+')
        input = input.slice(1);

    if(input.length < 2) {
        $('#input-phone').css('border-color', 'red');
        return false;
    }

    if(!Number.isInteger(+input)) {
        $('#input-phone').css('border-color', 'red');
        return false;
    }

    $('#input-phone').css('border-color', 'lime');
    return true;
}

export function checkEmail(inputted) {

    const isEventCheck = typeof inputted !== 'string';
    const input = isEventCheck ? $('#input-email').val() : inputted;

    if(!input.includes('@')) {
        $('#input-email').css('border-color', 'red');
        return false;
    }

    const rightSide = input.slice(input.indexOf('@'));
    if(!rightSide.includes('.')) {
        $('#input-email').css('border-color', 'red');
        return false;
    }

    $('#input-email').css('border-color', 'lime');
    return true;
}

export function checkAndGetInputs() {

    let cancel = false;
    const fields = ['#input-surname', '#input-name', '#input-birthday'];
    let counter = 0;

    const surname = $(fields[0]).val();
    const name = $(fields[1]).val();
    const birthday = $(fields[2]).val();

    for(const input of [surname, name, birthday]) {
        if(!input) {
            $(fields[counter]).css('border-color', 'red');
            cancel = true;
        }
        counter++;
    }

    const phone = $('#input-phone').val();
    if(!checkPhone(phone))                      // if phone is incorrent
        cancel = true;

    const email = $('#input-email').val();
    if(!checkEmail(email))                      // if email is incorrent
        cancel = true;

    return cancel ? null : {
        surname: surname.trim(),
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        birthday: changeDateFormat(birthday)
    };
}

function changeDateFormat(original) {
    const year = original.slice(0, 4);
    const month = original.slice(5, 7);
    const day = original.slice(8);
    return `${day}.${month}.${year}`;
}
