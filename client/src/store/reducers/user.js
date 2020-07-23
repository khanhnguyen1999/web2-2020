const initState = {
    user: {
        id:3,
        email:'chi1caithoi@gmail.com',
        username: 'khaidang',
        displayName:'Khai Dang'
    }
}

const user = (state = initState, action) => {
    switch(action.type){
        case 'LOGIN_ERROR':
            console.log('login error');
            return {
            ...state,
            authError: 'Login failed'
            }
        default:
            return {...state}
    }
};
export default user;