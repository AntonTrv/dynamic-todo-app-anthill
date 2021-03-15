import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import  ActionCreators from '../store/action-creators/index';


export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(ActionCreators, dispatch); //redux method takes in a list of action creators, binds them to be used as a dispatcher
}