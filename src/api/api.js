import axios from 'axios';

const api = axios.create({
    // 'https://menuserver-eight.vercel.app', 
    baseURL: 'http://localhost:3002',
});


export const createUserApi = async (email, password, restaurantName) => {
    try {
        const response = await api.post(
            "/signup",
            {
                email,
                password,
                restaurantName,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data
    } catch (error) {
        throw error
    }
}

export const loginUserApi = async (email, password) => {
    console.log(email)
    try {
        const response = await api.post(
            "/login",
            { email, password },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateCategoryApi = async (categoryId, title, selectedIcon, token) => {
    try {
        const response = await api.put(
            `/updatedCategory/${categoryId}`,
            { title, selectedIcon },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createCategoryApi = async (title, selectedIcon, token) => {
    try {
        const response = await api.post(
            "/addCategory",
            { title, selectedIcon },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${token}`,
                },
            }
        ); 
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteCategoryApi = async()=>{
    try {
        
    } catch (error) {
        
    }
}

export default api;
