
import {
    CLEAR_ALERT,
    DISPLAY_ALERT,
    TOGGLE_SIDEBAR,
} from "../context/actions";

const toggleSidebar = (dispatch) => {
    dispatch({ type: TOGGLE_SIDEBAR })
}

const displayAlert = (dispatch) => {
    dispatch({ type: DISPLAY_ALERT })
    clearAlert(dispatch)
}

const clearAlert = (dispatch) => {
    setTimeout(() => {
        dispatch({ type: CLEAR_ALERT })
    }, 3000);
}


export { toggleSidebar, displayAlert, clearAlert }