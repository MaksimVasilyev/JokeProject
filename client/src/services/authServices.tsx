import axios from "axios";
import Cookies from 'js-cookie';

const BASE_URL =
  process.env.REACT_APP_SERVER_URL || "http://localhost:3000/users";

interface Credentials {
  email: string;
  password: string;
}

interface userData {
  email: string;
  password: string;
  passwordConfirm: string;
}

interface passwordData {
  passwordCurrent: string;
  password: string;
  passwordConfirm: string;
}
interface resetPasswordData {
  password: string;
  passwordConfirm: string;
}

// Function to make login request
export const login = async (credentials: Credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, credentials, { withCredentials: true });
    const { user } = response.data.data;
    const token = Cookies.get('jwt');
    console.log(token)
    return { token, user };
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "An error occurred");
  }
};

// export const verification = async (token: string) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/verify`,{}, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     const user = response.data.data.user;

//     if (user) {
//       // Token verification successful
//       console.log("success", user)
//       return user; // Return the user object
//     } else {
//       // Token verification failed
//       throw new Error('Token verification failed');
//     }
//   } catch (error) {
//     // Handle error (e.g., display an error message)
//     throw error;
//   }
// };

// Function to make signup request
export const signup = async (userData: userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, userData, { withCredentials: true });
    const { user } = response.data.data;
    const token = Cookies.get('jwt');

    return { token, user };
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "An error occurred");
  }
};

// // Function to make update password request
export const updatePassword = async (
  oldToken: string,
  passwordData: passwordData
) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/updateMyPassword`,
      passwordData,
      {
        headers: { Authorization: `Bearer ${oldToken}` },
      }
    );
    const { user } = response.data.data;
    const newToken = Cookies.get('jwt');
    console.log(response.data);
    console.log(newToken, user);
    return { newToken, user };
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "An error occurred");
  }
};

// Function to make forget password request
export const forgotPassword = async (email: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/forgotPassword`, { email });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "An error occurred");
  }
};

export const ResetPassword = async (
  resetToken: string,
  passwordData: resetPasswordData
) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/resetPassword/${resetToken}`,
      passwordData
    );
    const { user } = response.data.data;
    const token = Cookies.get('jwt');
    return { token, user };
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "An error occurred");
  }
};

export {};
