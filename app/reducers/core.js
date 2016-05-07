// set the store with a path variable when location changes
export default {
	location: {
		LOCATION: (state, action) => ({path: action.payload}),
		DEFAULT: (state = { path: '/' }) => state
	}
};
