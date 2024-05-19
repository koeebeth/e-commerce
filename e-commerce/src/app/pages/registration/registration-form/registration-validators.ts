import { AbstractControl } from '@angular/forms';

const RegistrationValidators = {
  emailValidation: {
    pattern: {
      regex: /^[\w.]+@([\w]+.)+[\w]+$/,
      errorMsg: 'Email should be in format abc.123@example.com',
    },
    required: true,
  },

  passwordValidation: {
    minlength: 8,
    pattern: {
      regex: /^(?! )((?=\S*\d)(?=\S*[a-z])(?=\S*[A-Z])(?=\S*[\W])\S*)(?<! )$/,
      errorMsg:
        'Password must contain at least one uppercase letter, lowercase letter, number, a special character and no spaces',
    },
    required: true,
  },

  nameValidation: {
    required: true,
    pattern: {
      regex: /^[a-zA-Z-]*[a-zA-Z]+$/,
      errorMsg: 'Name should contain only letters and hyphens and end with a letter',
    },
  },

  streetValidation: {
    required: true,
  },

  cityValidation: {
    required: true,
    pattern: {
      regex: /^[a-zA-Z-]*[a-zA-Z]+$/,
      errorMsg: 'City should contain only letters and hyphens and end with a letter',
    },
  },

  ageValidation: {
    custom: {
      validator: (control: AbstractControl) => {
        const controlValue = +new Date(control.value);
        if (Date.now() - controlValue > 13 * 365 * 24 * 60 * 60 * 1000) {
          return null;
        }

        return {
          age: false,
        };
      },
      name: 'age',
      errorMsg: 'You should be at least 13 years old to register',
    },
  },

  ukPostalcodeValidation: {
    required: true,
    pattern: {
      regex: /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/,
      errorMsg: 'Postal code should be in format A1A 1AA',
    },
  },

  usPostalcodeValidation: {
    required: true,
    pattern: {
      regex: /^[0-9]{5}$/,
      errorMsg: 'Postal code should be in format 12345',
    },
  },
};

export default RegistrationValidators;