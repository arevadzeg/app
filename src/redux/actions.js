export const setUser = (payload) => {
    return {
        type: "SET_USER",
        payload: payload
    };
};


export const setSearch = (payload) => {
    return {
        type: "SET_SEARCH",
        payload: payload
    };
};

export const setSort = (payload) => {
    return {
        type: "SET_SORT",
        payload: payload
    };
};
