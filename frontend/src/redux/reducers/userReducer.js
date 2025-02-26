import { LOGIN, LOGOUT } from "../actions/userActions";

const initialState = {
    user: {
        name: '',
        email: '',
        user: 0,
        password: ''
    }
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                user: {
                    name: action.payload.name,
                    email: action.payload.email,
                    user: action.payload.user,
                    password: action.payload.password
                }
            }
        
        case LOGOUT:
            return initialState;
    
        default:
            return state;
    }
}

export default userReducer;
