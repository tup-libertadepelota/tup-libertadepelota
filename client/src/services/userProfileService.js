const PROFILE_STORAGE_PREFIX = 'user-profile';

function getProfileKey(email) {
  return `${PROFILE_STORAGE_PREFIX}-${email}`;
}

export function getUserProfile(email) {
  if (!email) {
    return {
      birthDate: '',
      address: '',
      phones: [''],
    };
  }

  const storedProfile = localStorage.getItem(getProfileKey(email));

  if (!storedProfile) {
    return {
      birthDate: '',
      address: '',
      phones: [''],
    };
  }

  return JSON.parse(storedProfile);
}

export function saveUserProfile(email, profile) {
  if (!email) return;

  localStorage.setItem(
    getProfileKey(email),
    JSON.stringify({
      birthDate: profile.birthDate,
      address: profile.address,
      phones: profile.phones,
    })
  );
}
