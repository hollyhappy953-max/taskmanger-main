import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/'

const LOGIN_URL = `${BASE_URL}login/`
const REGISTER_URL = `${BASE_URL}register/`
const LOGOUT_URL = `${BASE_URL}logout/`
const AUTHENTICATED_URL = `${BASE_URL}authenticated/`

axios.defaults.withCredentials = true; 

export const login = async (username, password) => {
    try {
        const response = await axios.post(
            LOGIN_URL, 
            { username, password },  // Object shorthand for cleaner syntax
            { withCredentials: true }  // Ensures cookies are included
        );
        
        // Check if the response contains a success attribute (depends on backend response structure)
        return response.data
    } catch (error) {
        console.error("Login failed:", error);
        return false;  // Return false or handle the error as needed
    }
};


export const logout = async () => {
    const response = await axios.post(LOGOUT_URL, { withCredentials: true });
    return response.data;
};

export const register = async (username, email, password) => {
    const response = await axios.post(REGISTER_URL, {username, email, password}, { withCredentials: true });
    return response.data;
};

export const authenticated_user = async () => {
    const response = await axios.post(AUTHENTICATED_URL, { withCredentials: true });
    return response.data
}

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/"
});

export const getTasks = () => API.get("tasks/");
export const createTask = (data) => API.post("tasks/", data);
export const updateTask = (id) => API.patch(`tasks/${id}/`);
export const deleteTask = (id) => API.delete(`tasks/${id}/`);
