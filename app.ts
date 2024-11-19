function autobind(_: any, _2: string, propertyDes: PropertyDescriptor) {
    const origFn = propertyDes.value;
    return {
      configurable: true,
      get() {
        return origFn.bind(this);
      },
    };
  }
  
  class FormInput {
    formEl: HTMLFormElement;
  
    constructor() {
      this.formEl = document.getElementById("userDataForm")! as HTMLFormElement;
      this.formEl.addEventListener("submit", this.formSubmitHandler.bind(this));
    }
  
    @autobind
    formSubmitHandler(e: Event) {
      e.preventDefault();
      const formData = new FormData(this.formEl);
      const inputData = Object.fromEntries([...formData]);
      this.validateInput(inputData);
    }
  
    validateInput(formData: Record<string, any>) {
      const userDataArr = Object.entries(formData);  // Entries of the formData object
      let passValidation = 0;
  
      userDataArr.forEach(([key, value]: [string, any]) => {  // Explicitly typing key and value
        const inputEl = document.querySelector(`[name=${key}]`)! as HTMLInputElement;
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
              formData.gender = "rather not say";  // Default gender
            }
            break;
  
          default:
            break;
        }
  
        inputEl.style.color = isValid ? "currentcolor" : "red";  // Set color based on validity
        isValid ? passValidation++ : passValidation--;
      });
  
      if (passValidation === userDataArr.length) {
        alert("Success!");
        this.clearForm(userDataArr);
      }
    }
  
    clearForm(userDataArr: [string, any][]) {
      userDataArr.forEach(([key]) => {
        const inputEl = document.querySelector(`[name=${key}]`)! as HTMLInputElement;
        inputEl.value = "";  // Reset the input values
      });
    }
  }
  
  new FormInput();
  