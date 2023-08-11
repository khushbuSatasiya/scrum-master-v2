import CryptoJS from "crypto-js";

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

const setAuthData = (data: any): void => {
  console.log("KEY:", process.env);

  const cipherText = CryptoJS.AES.encrypt(JSON.stringify(data), KEY);
  localStorage.setItem("authData", cipherText.toString());
};

const getAuthData = () => {
  try {
    const data = localStorage.authData;
    if (data) {
      const bytes = CryptoJS.AES.decrypt(data.toString(), KEY);
      const decryptedData = JSON.parse(
        bytes.toString(CryptoJS.enc.Utf8)
      ) as any;
      console.log("decryptedData:", decryptedData);
      return decryptedData;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};

/**
 * function to get user access token
 */
const getAccessToken = (): boolean | string => {
  const data = getAuthData();
  if (data && data.token) {
    return data.token;
  } else {
    return "";
  }
};

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

const removeAuthData = (): void => {
  localStorage.removeItem("authData");
};

const authService = {
  checkLogin: checkLogin,
  getAccessToken: getAccessToken,
  // getUserData: getUserData,
  setAuthData: setAuthData,
  getAuthData: getAuthData,
  removeAuthData: removeAuthData,
  // setUserData: setUserData,
  setSelectedOrg: setSelectedOrg,
  getSelectedOrg: getSelectedOrg,
  //   getOrg: getOrg,
};

export default authService;
