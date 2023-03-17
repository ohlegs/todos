import {createSlice} from '@reduxjs/toolkit';
import DBController, {TASKS} from '../../utils/DBController';

export interface tasksState {
  value:
    | [
        {
          id?: number;
          name: string;
          done: boolean;
        },
      ]
    | [];
  sortMode: 0 | 1 | 2;
}

const initialState: tasksState = {
  value: [],
  sortMode: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addTask: (state, value) => {
      state.value = [...state.value, value.payload];
    },

    sortMode: (state, value) => {
      state.sortMode = value;
    },
    setCompleted: (state, value) => {
      const done = state.value[value.payload.index].done;
      state.value[value.payload.index].done = !done;
      DBController.updateByIdDB(
        [TASKS],
        JSON.stringify(state.value[value.payload.index]),
        value.payload.index,
      );
    },

    removeCurrent: (state, value) => {
      state.value = [
        ...state.value.filter((item, index) => index !== value.payload.index),
      ];
      console.log(value.payload.id, value.payload.index);
      DBController.removeByIdDB(value.payload.id || value.payload.index);
    },
    clearCompleted: (state, value) => {
      state.value.forEach((item, index) => {
        if (item.done === true) {
          console.log();
          DBController.removeByIdDB(item.id);
        }
      });
      state.value = [
        ...state.value.filter((item, index) => item.done !== true),
      ];
    },
    editCurrent: (state, value) => {
      state.value[value.payload.index].name = value.payload.name;
      console.log(state.value[value.payload.index]);
      DBController.updateByIdDB(
        [TASKS],
        JSON.stringify(state.value[value.payload.index]),
        value.payload.index,
      );
    },
  },
});

export const {
  addTask,
  sortMode,
  clearCompleted,
  editCurrent,
  setCompleted,
  removeCurrent,
} = counterSlice.actions;

export default counterSlice.reducer;
