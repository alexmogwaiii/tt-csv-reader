import { STATES } from './states';

export const validateUsers = (data) => {
  const validatedUsers = data.map((user, index) => ({
    ...user.data,
    age: {
      value: user.data.age,
      status: validateAge(user.data.age),
    },
    experience: {
      value: user.data.experience,
      status: validateExperience(user.data.age, user.data.experience),
    },
    yearlyIncome: {
      value: +user.data.yearlyIncome.toFixed(2),
      status: validateYearlyIncome(user.data.yearlyIncome),
    },
    licenseStates: validateLicenseStates(user.data.licenseStates),
    expirationDate: validateDate(user.data.expirationDate),
    phone: validatePhone(user.data.phone),
    hasChildren: validateChildren(user.data.hasChildren),
    licenseNumber: validateLicense(user.data.licenseNumber),
    email: validateEmail(user.data.email),
    id: index + 1,
  }));

  return validatedUsers;
};

const validateAge = age => (age >= 21);

const validateExperience = (currentAge, experience) => {
  if (experience >= 0 && experience <= currentAge) {
    return true;
  }

  return false;
};

const validateYearlyIncome = (yearlyIncome) => {
  if (yearlyIncome > 1000000) {
    return false;
  }

  return true;
};

const validateLicenseStates = (licenseStates) => {
  const invalidStateName = {
    value: licenseStates,
    status: false,
  };

  if (!licenseStates) {
    return invalidStateName;
  }

  const baseStatesArray = licenseStates.split(' | ');

  const stateNames = baseStatesArray.map((userState) => {
    if (userState.length > 2) {
      return STATES.find(state => (
        state.name === userState
      ));
    }

    return STATES.find(state => (
      state.abbreviation === userState
    ));
  });

  if (stateNames.includes(undefined)) {
    return invalidStateName;
  }

  return {
    value: stateNames.map(stn => stn.abbreviation).join(', '),
    status: true,
  };
};

const validateDate = (dateString) => {
  let status = true;
  const currentDate = new Date();
  const userDate = new Date(dateString);
  const firstFormat = 'YYYY-MM-DD';
  const secondFormat = 'MM/DD/YYYY';

  if (userDate < currentDate) {
    status = false;
  }

  if (!matchFormat(dateString, firstFormat)
    && !matchFormat(dateString, secondFormat)) {
    status = false;
  }

  return {
    value: dateString,
    status,
  };
};

function toFormat(date, format) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return format
    .replace('DD', day.toString().padStart(2, '0'))
    .replace('MM', month.toString().padStart(2, '0'))
    .replace('YYYY', year);
}

function matchFormat(dateString, format) {
  return toFormat(new Date(dateString), format) === dateString;
}

const validatePhone = (phone) => {
  const phoneToString = `${phone}`;

  if (!phone) {
    return {
      value: phone,
      status: false,
    };
  }

  const match = phoneToString
    .match(/^([+]{0,1})?([0-9]{0,10})?(\+1[0-9]{10})?$/);

  return {
    value: phoneToString,
    status: !!match,
  };
};

const validateChildren = (hasChildren) => {
  if (typeof (hasChildren) === 'boolean' || hasChildren === null) {
    return {
      value: hasChildren ? 'TRUE' : 'FALSE',
      status: true,
    };
  }

  return {
    value: hasChildren,
    status: false,
  };
};

const validateLicense = (license) => {
  const match = license.match(/[\w\W]{1,6}/g);

  return {
    value: license,
    status: !!(!!match && license.length === 6),
  };
};

const validateEmail = (email) => {
  if (!email) {
    return {
      value: email,
      status: false,
    };
  }

  const emailToLowerCase = email.toLowerCase();

  const re = /\S+@\S+\.\S+/;

  return {
    value: emailToLowerCase,
    status: re.test(emailToLowerCase),
  };
};
