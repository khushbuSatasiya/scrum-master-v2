import CryptoJS from "crypto-js";
import {
  UserData,
  UserProfileResponse,
} from "features/login/interface/login.interface";
const KEY: string = process.env.REACT_APP_ENCRYPTION_KEY as string;

/**
 * function to check if user is logged in or not
 */
const checkLogin = (): boolean => {
  if (localStorage.authData) {
    return true;
  } else {
    return false;
  }
};

/**
 * function to get user access token
 */
const getAccessToken = (): boolean | string => {
  try {
    const data = localStorage.authData;

    if (data) {
      const bytes = CryptoJS.AES.decrypt(data.toString(), KEY);
      const decryptedData: UserData = JSON.parse(
        bytes.toString(CryptoJS.enc.Utf8)
      );
      return decryptedData && decryptedData.token ? decryptedData.token : false;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};

/**
 * function to get user data
 */
const getUserData = (): UserProfileResponse => {
  const data = localStorage.userData;
  if (data) {
    const bytes = CryptoJS.AES.decrypt(data.toString(), KEY);
    const decryptedData: UserProfileResponse = JSON.parse(
      bytes.toString(CryptoJS.enc.Utf8)
    );
    if (!decryptedData) {
      return {} as UserProfileResponse;
    }
    return decryptedData;
  } else {
    return {} as UserProfileResponse;
  }
};

/**
 * function to set user authentication data
 */
const setAuthData = (data: UserData): void => {
  const cipherText = CryptoJS.AES.encrypt(JSON.stringify(data), KEY);
  localStorage.setItem("authData", cipherText.toString());
};

/**
 * function to set user organizationData data
 */
const setSelectedOrg = (
  data: { label: string; value: string } | null
): void => {
  localStorage.setItem("selectedOrg", JSON.stringify(data));
};

/**
 * function to get user organizationData data
 */
const getSelectedOrg = (): { label: string; value: string } | null => {
  const selectedOrg = localStorage.getItem("selectedOrg");
  if (selectedOrg === "undefined") {
    return null;
  }
  return selectedOrg ? JSON.parse(selectedOrg) : null;
};

/**
 * function to set user authentication data
 */
const setUserData = (data: UserProfileResponse): void => {
  const cipherText = CryptoJS.AES.encrypt(JSON.stringify(data), KEY);
  localStorage.setItem("userData", cipherText.toString());
};

/**
 * function to get user authentication data
 */
const getAuthData = (): UserData | undefined => {
  const data = localStorage.authData;

  if (data) {
    const bytes = CryptoJS.AES.decrypt(data.toString(), KEY);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  } else {
    return;
  }
};

/**
 * function to remove user authentication data
 */
const removeAuthData = (): void => {
  localStorage.removeItem("authData");
};

/**
 * function to get Organization token
 */
// const getOrg = () => {
// 	try {
// 		const data = localStorage.authData;

// 		if (data) {
// 			const bytes = CryptoJS.AES.decrypt(data.toString(), KEY);
// 			const decryptedData: UserData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
// 			return decryptedData && decryptedData.user.organizations ? decryptedData.user.organizations : [];
// 		} else {
// 			return [];
// 		}
// 	} catch (e) {
// 		return [];
// 	}
// };

const authService = {
  checkLogin: checkLogin,
  getAccessToken: getAccessToken,
  getUserData: getUserData,
  setAuthData: setAuthData,
  getAuthData: getAuthData,
  removeAuthData: removeAuthData,
  setUserData: setUserData,
  setSelectedOrg: setSelectedOrg,
  getSelectedOrg: getSelectedOrg,
  //   getOrg: getOrg,
};

export default authService;
