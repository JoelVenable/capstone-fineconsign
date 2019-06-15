

export function checkEmployeeAccess(user, employeePropToCheck) {
  if (!user) return false; // Checks logged in state
  if (user.userType !== 'employee') return false;
  return user.employee[employeePropToCheck];
}

export const checkLoggedIn = user => (!!user);

export const checkNotCustomer = (user) => {
  const loggedIn = checkLoggedIn(user);
  return loggedIn && user.userType !== 'customer';
};
