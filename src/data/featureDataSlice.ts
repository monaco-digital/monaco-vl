import { createSlice } from '@reduxjs/toolkit';

/** *
 * Store for feature switching.
 *
 * Features under development should be initially committed in a disabled state so the code can deploy to prod without breaking anything.
 * After the feature is fully ready for users, change initialState to true to switch it on for everyone.
 *
 * Feature can be enabled in a single session by setting ?enableMonetization=true in the query string (see <main> component).
 *
 * Feature switches should be regularly cleaned up and removed from the codebase once the feature is permanently enabled in prod.
 */
export const slice = createSlice({
	name: 'feature',
	initialState: {
		enableMonetization: true,
	},
	reducers: {
		enableMonetization: (state): void => {
			state.enableMonetization = true;
		},
		disableMonetization: (state): void => {
			state.enableMonetization = false;
		},
	},
});

export const { enableMonetization, disableMonetization } = slice.actions;

export default slice.reducer;
