export const LOCATION = 'LOCATION';

// executed when location update pushed through router

export function updateLocationAction(location) {
	return {
		type: LOCATION,
		payload: location.pathname
	};
}
