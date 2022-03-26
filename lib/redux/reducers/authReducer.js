const initState = null;

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN':
      state = action.payload;
      return state;

    case 'LOGOUT':
      return null;
    default:
      console.log(state);
      return state;
  }
};

export default authReducer;
