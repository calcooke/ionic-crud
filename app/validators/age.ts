import { FormControl } from '@angular/forms';

export class AgeValidator {

    //This wont work because age is a date, not a number.
    //Will return if i figure out how to get this going with a date string
    // The date is stored like "2009-09-30"

    static isValid(control: FormControl): any {

        if(isNaN(control.value)){
            return {
                "not a number": true
            };
        }

        if(control.value % 1 !== 0){
            return {
                "not a whole number": true
            };
        }

        if(control.value < 7){
            return {
                "too young": true
            };
        }

        if (control.value > 10){
            return {
                "too old": true
            };
        }

        return null;
    }

}