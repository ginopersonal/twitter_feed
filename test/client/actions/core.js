import expect from 'expect'
import { updateLocationAction, LOCATION } from '../../../app/actions/core'

describe('core actions', () => {
	it('should update the location path', () => {
		const location = {
			pathname: '/foo/bar'
		};
		const expectedAction = {
			type: LOCATION,
			payload: '/foo/bar'
		};
		expect(updateLocationAction(location)).toEqual(expectedAction)
	})
})