const INIT_STATE = {
    isAdmin: false
};

const appReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case 'SET_IS_ADMIN': {
            return {
                ...state,
                isAdmin: action.payload,
            }
        }

        default:
            return state;
    }
}

export default appReducer