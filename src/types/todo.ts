export interface TodoState { //description of initial state types to be used in TodoReducer (state:TodoState)
    todos: any[],
    loading: boolean,
    error: null | string
}

//description of types for action types
export enum TodoActionTypes {
    FETCH_TODOS = 'FETCH_TODOS',
    FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS',
    FETCH_TODOS_ERROR = 'FETCH_TODOS_ERROR',
    ADD_TODO = 'ADD_TODO',
    ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS',
    ADD_TODO_ERROR = 'ADD_TODO_ERROR',
    ADD_ITEM = 'ADD_ITEM',
    ADD_ITEM_SUCCESS = "ADD_ITEM_SUCCESS",
    TOGGLE_ITEM_STATUS = "TOGGLE_ITEM_STATUS",
    TOGGLE_ITEM_STATUS_SUCCESS = "TOGGLE_ITEM_STATUS",
    TOGGLE_ITEM_STATUS_ERROR = "TOGGLE_ITEM_STATUS",
}


//actions descriptions
interface FetchTodosAction {
    type: TodoActionTypes.FETCH_TODOS
}

interface FetchTodosSuccessAction {
    type: TodoActionTypes.FETCH_TODOS_SUCCESS,
    payload: []
}

interface FetchTodosErrorAction {
    type: TodoActionTypes.FETCH_TODOS_ERROR,
    payload: string
}

interface AddTodoAction {
    type: TodoActionTypes.ADD_TODO
}

interface AddTodoSuccessAction {
    type: TodoActionTypes.ADD_TODO_SUCCESS,
    payload: any
}

interface AddTodoErrorAction {
    type: TodoActionTypes.ADD_TODO_ERROR,
    payload: string
}

interface AddItemAction {
    type: TodoActionTypes.ADD_ITEM
}

interface AddItemSuccessAction {
    type: TodoActionTypes.ADD_ITEM_SUCCESS
}

interface ToggleItemStatusAction {
    type: TodoActionTypes.TOGGLE_ITEM_STATUS
}

interface ToggleItemStatusSuccessAction {
    type: TodoActionTypes.TOGGLE_ITEM_STATUS_SUCCESS
}

interface ToggleItemStatusErrorAction {
    type: TodoActionTypes.TOGGLE_ITEM_STATUS_ERROR
}


//combine all actions in one type to be used in todoReducer ( action:TodoAction )

export type TodoAction =
    FetchTodosAction
    | FetchTodosSuccessAction
    | FetchTodosErrorAction
    | AddTodoAction
    | AddTodoSuccessAction
    | AddTodoErrorAction
    | AddItemSuccessAction
    | AddItemAction
    | ToggleItemStatusAction
    | ToggleItemStatusSuccessAction
    | ToggleItemStatusErrorAction;