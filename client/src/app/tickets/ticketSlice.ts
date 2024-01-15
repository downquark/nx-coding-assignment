import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'
// import { Ticket } from '@acme/shared-models';

export interface TicketState {
  value: number
}

const initialState: TicketState = {
  value: 0,
}

export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    assign: (state) => { // ticketId: number, userId: number
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    complete: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    add: (state) => { //, action: PayloadAction<Ticket>
      // state.value += action.payload
      state.value += 1
    },
  },
})

// Action creators are generated for each case reducer function
export const { assign, complete, add } = ticketSlice.actions

export default ticketSlice.reducer