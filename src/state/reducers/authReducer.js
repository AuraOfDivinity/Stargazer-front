const initialState = {
    isAuthenticated: false,
    user: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'LOG_IN': {
            return {
                ...state,
                isAuthenticated: true,
            }
        }
        default: {
            return state;
        }
    }
}