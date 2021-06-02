import {getCurrentStory} from "./story";
import {FETCH_STORY, FETCH_STORY_START, SUCCESS} from "./types";
import api from "../utils";

export const fetchAuthorsStory = () => async (dispatch) => {
    await getCurrentStory(dispatch);
};

export const getCurrentStory = async (dispatch) => {
    dispatch({ type: FETCH_STORY_START });
    const { error, travels, closeContacts, ...story } = await api("micropubs/");
    dispatch({
        type: FETCH_STORY,
        payload: {
            status: error || { type: SUCCESS },
            story: (!error && story) || null,
            travels: (!error && travels) || [],
            closeContacts: (!error && closeContacts) || [],
        },
    });
    return story;
};
