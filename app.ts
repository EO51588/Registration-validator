function autobind(_: any, _2: string, propertyDes: PropertyDescriptor) {
    const origfn = propertyDes.value;
    return {
      configurable: true,
      get() {
        return origfn.bind(this);
      },
    };
  }
  
  class formInput {
    formEl: HTMLFormElement;
  
    constructor() {
      this.formEl = document.getElementById("userDataForm")! as HTMLFormElement;
      this.formEl.addEventListener("submit", this.formSubmitHandler);
    }
  
    @autobind
    formSubmitHandler(e: Event) {
      e.preventDefault();
      const formData = new FormData(this.formEl);
      const inpuData = Object.fromEntries([...formData]);
  
      this.validateInput(inpuData);
    }
  
    validateInput(formData: any) {
      const userDataArr: any[] = Object.entries(formData);
      let passValidation: number = 0;
  
      userDataArr.forEach(function ([key, val]) {
        // get current inputEl
        const x = document.querySelector(`[name=${key}]`)! as HTMLInputElement;
        let isValid: boolean = true;
  
        // fullname
        if (isValid && key === "full_name") {
          // check for two or more names
          if (!val.trim().split("").includes(" ")) {
            isValid = false;
            alert("Enter alteast two names");
          }
        }
  
        // username
        if (isValid && key === "username") {
          const [min, max] = [5, 12];
  
          // check character length
          if (!(val.length >= min && val.length <= max)) {
            isValid = false;
            alert(
              `Username should have a minimum of ${
                min === 1 ? min + " character" : min + " characters long"
              }, and should not exceed ${max} characters`
            );
          }
  
          // check for whitespace
          if (val.trim().split("").includes(" ")) {
            isValid = false;
            alert("Username should not have whitespaces");
          }
        }
  
        //email
        if (isValid && key === "email") {
          // check for @ symbol
          if (!val.trim().split("").includes("@")) {
            isValid = false;
            alert("Email should include '@'");
          }
  
          // check for whitespace
          if (val.trim().split("").includes(" ")) {
            isValid = false;
            alert("Email should not have whitespaces");
          }
        }
  
        // phone number
        if (isValid && key === "phone") {
          // check if it's a number
          if (!Number.isFinite(+val)) {
            isValid = false;
          }
  
          // check for 10 characters
          if (!(val.length === 10)) {
            isValid = false;
          }
  
          !isValid ? alert("Enter a valid phone number") : "";
        }
  
        // password
        if (isValid && key === "password") {
          // check character length
          const [min, max] = [5, 12];
          if (!(val.length >= min && val.length <= max)) {
            isValid = false;
            alert(
              `Password should have a minimum of ${
                min === 1 ? min + " character" : min + " characters long"
              }, and should not exceed ${max} characters`
            );
          }
  
          // check for whitespace
          if (val.trim().split("").includes(" ")) {
            isValid = false;
            alert("Password should not have whitespaces");
          }
        }
  
        // confirm password
        if (isValid && key === "confirm_password") {
          if (!(formData.password === val)) {
            isValid = false;
            alert("Passwords do not match");
          }
        }
  
        // check gender
        if (!formData.gender) {
          formData.gender = "rather not say";
        }
  
        // highlight invalid inputField
        x.style.color = isValid ? "currentcolor" : "red";
  
        isValid ? passValidation++ : passValidation--;
      });
  
      if (passValidation === 6) {
        alert("Success");
        userDataArr.forEach(function ([key, _]) {
          // get current inputEl
          const x = document.querySelector(`[name=${key}]`)! as HTMLInputElement;
          x.value = "";
        });
      }
    }
  }
  
  new formInput();
  