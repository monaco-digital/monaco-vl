/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
		enableMonetization: false,
		dsFlow: false,
		academyFlow: false,
		enableNarrative: true,
	},
	reducers: {
		enableMonetization: (state): void => {
			state.enableMonetization = true;
		},
		disableMonetization: (state): void => {
			state.enableMonetization = false;
		},
		enableDsFlow: (state): void => {
			state.dsFlow = true;
		},
		disableDsFlow: (state): void => {
			state.dsFlow = false;
		},
		enableAcademyFlow: (state): void => {
			state.academyFlow = true;
		},
		disableAcademyFlow: (state): void => {
			state.academyFlow = false;
		},
		enableFeature: (state, action: PayloadAction<string>): void => {
			state[action.payload] = true;
		},
		disableFeature: (state, action: PayloadAction<string>): void => {
			state[action.payload] = false;
		},
	},
});

export const {
	enableMonetization,
	disableMonetization,
	enableDsFlow,
	disableDsFlow,
	enableAcademyFlow,
	disableAcademyFlow,
	enableFeature,
	disableFeature,
} = slice.actions;

export default slice.reducer;
