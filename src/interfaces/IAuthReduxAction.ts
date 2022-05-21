// ========== IAuthReduxAction
// import all modules
import { AuthReduxTypes } from '../types';

export interface IAuthReduxAction {
	type: AuthReduxTypes,
	payload: {
		data: {
			accessToken: string;
			refreshToken: string;
		}
	}
}
