import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from "../store/reducers";

export const useTypedSelector:TypedUseSelectorHook<RootState> = useSelector; //custom hook to replace standard useSelector one and pass it properties
                                                                            // from the original rootReducer