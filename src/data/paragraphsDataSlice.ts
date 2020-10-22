import axios from 'axios'
import { createSlice } from '@reduxjs/toolkit';
import { Paragraph } from './types'

export const slice = createSlice({
  name: 'paragraphs',
  initialState: {
    allParagraphs: [],
    filteredParagraphs: [],
    selectedParagraphs: [],
    filter: null
  },
  reducers: {
    updateAllParagraphs: (state, action) => {
        state.allParagraphs = action.payload;
        state.filteredParagraphs = action.payload;
    },
    setFilter: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.filter = action.payload;
      const selectedIds = state.selectedParagraphs.map((p: Paragraph) => p.id)
      state.filteredParagraphs = state.allParagraphs.filter((p: Paragraph) => {
          if (selectedIds.includes(p.id)) return false
          if (!state.filter) return true
          if (p.topic && p.topic.includes(state.filter || '')) return true
          return false
        })
    },
    setSelectedParagraphs: (state, action) => {
      state.selectedParagraphs = action.payload;
    },
    setFilteredParagraphs: (state, action) => {
        state.filteredParagraphs = action.payload;
    }
  },
});

export const { updateAllParagraphs, setFilter, setSelectedParagraphs, setFilteredParagraphs } = slice.actions;


/* / The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = amount => dispatch => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
}; */

export const fetchAllParagraphs = () => (dispatch: Function) => {
  console.log("Fetch all paragraphs called")
    const sheetsUrl = 'https://sheets.googleapis.com/v4/spreadsheets/1xF6OTVysJCQ_MTJEg5uhv2m2WP4xKlln2Py1dI9fTUQ/values/Para%20bank!F6:I?key=AIzaSyCbRwifccXG8NxW4zIK_wbbHSgEskoSkp4'
    axios.get(sheetsUrl)
        .then((response) => {
            const { data: {values = [] } } = response;
            const filteredValues = values.filter((value: any) => value.length > 0);
            const data = filteredValues.map( (value: any, index: number) => {
                const dataPoint = {
                    id: index.toString(10),
                    paragraph: value[0],
                    verticalHeight: value[2],
                    topic: value[3] && value[3].split(',')
                }
                return dataPoint;
            })
            dispatch(updateAllParagraphs(data))
        })
        .catch((e) => {

        })
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const getAllParagraphs = (state: any) => state.paragraphs.allParagraphs;
export const getFilteredParagraphs = (state: any) => state.paragraphs.filteredParagraphs;
export const getSelectedParagraphs = (state: any) => state.paragraphs.selectedParagraphs;
export const getFilter = (state: any) => state.paragraphs.filter;

export default slice.reducer;
