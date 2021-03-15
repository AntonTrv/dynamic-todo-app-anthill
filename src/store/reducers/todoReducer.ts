import {TodoAction, TodoActionTypes, TodoState} from "../../types/todo";


const initialState = {
    todos: [],
    loading: false,
    error: null
}

export const todoReducer = (state: TodoState = initialState, action: TodoAction): TodoState => {
    switch (action.type) {
        case TodoActionTypes.FETCH_TODOS:
            return {...state, loading: true}
        case TodoActionTypes.FETCH_TODOS_SUCCESS:
            return {...state, loading: false, todos: action.payload}
        case TodoActionTypes.FETCH_TODOS_ERROR:
            return {...state, loading: false, error: action.payload}
        case TodoActionTypes.ADD_TODO:
            return{...state, loading: true}
        case TodoActionTypes.ADD_TODO_SUCCESS:
            return {...state,loading: false, todos: [...state.todos, action.payload]}
        case TodoActionTypes.ADD_TODO_ERROR:
            return {...state, loading: false, error: action.payload}
        case TodoActionTypes.ADD_ITEM:
            return {...state, loading: true}
        case TodoActionTypes.ADD_ITEM_SUCCESS:
            return {...state, loading: false}
        case TodoActionTypes.TOGGLE_ITEM_STATUS:
            return {...state, loading: true}
        case TodoActionTypes.TOGGLE_ITEM_STATUS_SUCCESS:
            return {...state, loading: false}
        case TodoActionTypes.TOGGLE_ITEM_STATUS_ERROR:
            return {...state, loading: false}
        default:
            return state
    }
}