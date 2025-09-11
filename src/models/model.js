
const state = {
    currentUser: null,

};



// Create User Account
export const createUserAccount = async function (formData) {

    const createUser = Object.fromEntries(formData.entries());

    try {

        const res = await fetch('https://dummyjson.com/users/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(createUser)
        });

        if (!res.ok) throw new Error('Failed to Create Account');


    } catch (err) {
        throw new Error(err.message || 'Something went wrong');
    }

};

// Logs user in
export const logUserIn = async function (formData) {

    const currentUser = Object.fromEntries(formData.entries());
    console.log(currentUser);
    try {
        const res = await fetch('https://dummyjson.com/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(currentUser),
        });

        console.log(res);

        if (!res.ok) {
            throw new Error('Login failed');
        }

        const { accessToken, refreshToken } = await res.json();
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

    } catch (err) {
        throw new Error(err.message || 'Something went wrong');
    }
};


// Authorize user with token
export const authorizeUser = async function () {
    try {

        const token = localStorage.getItem('accessToken');

        if (!token) throw new Error(" Login to get started");

        const res = await fetch("https://dummyjson.com/user/me", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) throw new Error("Login not successful");

        const { username, id } = await res.json();


        if (!state.currentUser) {
            state.currentUser = {
                username,
                id
            };
        }


        return state.currentUser;
    } catch (err) {
        throw err;
    }
};

// Refresh Token 
export const refreshAccessToken = async function () {
    const refreshToken = localStorage.getItem('refreshToken');
    try {
        if (!refreshToken) throw new Error("No refresh token found");

        const res = await fetch("https://dummyjson.com/auth/refresh", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken: state.refreshToken }),
        });

        if (!res.ok) throw new Error("Failed to refresh token");

        const { accessToken } = await res.json();
        state.accessToken = accessToken;


        return accessToken;
    } catch (err) {
        throw err;
    }
};


// emilyspass