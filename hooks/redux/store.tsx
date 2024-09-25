import { createStore } from 'redux';

// Initial state
const initialState = {
    currentPlayingVideo: null, // Stores the ID of the currently playing video
};

// Action Types
const SET_CURRENT_PLAYING_VIDEO = 'SET_CURRENT_PLAYING_VIDEO';

// Reducer
const videoReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_PLAYING_VIDEO:
            return {
                ...state,
                currentPlayingVideo: action.payload,
            };
        default:
            return state;
    }
};

// Create Store
const store = createStore(videoReducer);

export default store;

// Action Creator
export const setCurrentPlayingVideo = (videoId) => ({
    type: SET_CURRENT_PLAYING_VIDEO,
    payload: videoId,
});
