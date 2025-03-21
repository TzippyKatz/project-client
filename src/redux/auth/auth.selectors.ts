// import { RootState } from "../store";

// export const selectAuth = (state: RootState) => state.auth

// export const store = configureStore({
//     reducer: {
//       achievements: achievementsReducer,
//       user: userReducer,
//       auth: authReducer,
//       follower: followerReducer,
//       comments: commentReducer,
//       posts: postReducer,
//       challenges: challengeReducer,
//       challengeParticipants: challengeParticipantReducer
//     },
//   });
  
//   // סוגים עבור ה-RootState וה-AppDispatch כדי להשתמש בהם בצדדים אחרים של ה-Redux
//   export type RootState = ReturnType<typeof store.getState>;
//   export type AppDispatch = typeof store.dispatch;
  

import { RootState } from "../store";

export const selectAuth = (state: RootState) => state.auth