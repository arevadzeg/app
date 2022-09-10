const INIT_STATE = {
    user: null,
    search: ""
};

const appReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case 'SET_USER': {
            return {
                ...state,
                user: action.payload,
            }
        }

        case "SET_SEARCH": {
            return {
                ...state,
                search: action.payload,
            }
        }

        default:
            return state;
    }
}

export default appReducer