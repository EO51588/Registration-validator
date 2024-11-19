"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function autobind(_, _2, propertyDes) {
    const origFn = propertyDes.value;
    return {
        configurable: true,
        get() {
            return origFn.bind(this);
        },
    };
}
class FormInput {
    constructor() {
        this.formEl = document.getElementById("userDataForm");
        this.formEl.addEventListener("submit", this.formSubmitHandler.bind(this));
    }
    formSubmitHandler(e) {
        e.preventDefault();
        const formData = new FormData(this.formEl);
        const inputData = Object.fromEntries([...formData]);
        this.validateInput(inputData);
    }
    validateInput(formData) {
        const userDataArr = Object.entries(formData); // Entries of the formData object
        let passValidation = 0;
        userDataArr.forEach(([key, value]) => {
            const inputEl = document.querySelector(`[name=${key}]`);
            let isValid = true;
            switch (key) {
                case "full_name":
                    if (value.trim().split(" ").length < 2) {
                        isValid = false;
                        alert("Enter at least two names.");
                    }
                    break;
                case "username":
                    if (value.length < 5 || value.length > 12 || /\s/.test(value)) {
                        isValid = false;
                        alert("Username must be 5-12 characters long and contain no spaces.");
                    }
                    break;
                case "email":
                    if (!value.includes("@") || /\s/.test(value)) {
                        isValid = false;
                        alert("Enter a valid email address without spaces.");
                    }
                    break;
                case "phone":
                    if (!/^\d{10}$/.test(value)) {
                        isValid = false;
                        alert("Phone number must be exactly 10 digits.");
                    }
                    break;
                case "password":
                    if (value.length < 5 || value.length > 12 || /\s/.test(value)) {
                        isValid = false;
                        alert("Password must be 5-12 characters long and contain no spaces.");
                    }
                    break;
                case "confirm_password":
                    if (value !== formData.password) {
                        isValid = false;
                        alert("Passwords do not match.");
                    }
                    break;
                case "gender":
                    if (!value) {
                        formData.gender = "rather not say"; // Default gender
                    }
                    break;
                default:
                    break;
            }
            inputEl.style.color = isValid ? "currentcolor" : "red"; // Set color based on validity
            isValid ? passValidation++ : passValidation--;
        });
        if (passValidation === userDataArr.length) {
            alert("Success!");
            this.clearForm(userDataArr);
        }
    }
    clearForm(userDataArr) {
        userDataArr.forEach(([key]) => {
            const inputEl = document.querySelector(`[name=${key}]`);
            inputEl.value = ""; // Reset the input values
        });
    }
}
__decorate([
    autobind
], FormInput.prototype, "formSubmitHandler", null);
new FormInput();
