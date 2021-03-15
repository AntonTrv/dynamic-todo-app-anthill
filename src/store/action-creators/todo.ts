import {TodoAction, TodoActionTypes} from "../../types/todo";
import {Dispatch} from "redux";
import axios from "axios";
import {nanoid} from "nanoid";


// http://localhost:8000/todos (should put into .env.local later and use as a global variable)

//fetches Todos list
export const fetchTodos = () => {
    return async (dispatch: Dispatch<TodoAction>) => { //dispatch has equal type of Dispatch(redux) and can only receive UserAction types
        try {
            dispatch({type: TodoActionTypes.FETCH_TODOS})
            const response = await axios.get('http://localhost:8000/todos')
            setTimeout(() => {
                dispatch({type: TodoActionTypes.FETCH_TODOS_SUCCESS, payload: response.data})
            }, 200)
        } catch (e) {
            dispatch({
                type: TodoActionTypes.FETCH_TODOS_ERROR,
                payload: `An Error occurred, you can read more here: ${e.message}`
            })

        }
    }
}


//adds lists of tasks
export const addTodos = (newList: string) => {
    return async (dispatch: Dispatch<TodoAction>) => {
        try {
            dispatch({type: TodoActionTypes.ADD_TODO})
            const response = await axios.post('http://localhost:8000/todos', {
                id: nanoid(),
                title: newList,
                sub_tasks: [{
                    body: "",
                    status: "undone"
                }]
            })
            dispatch({
                type: TodoActionTypes.ADD_TODO_SUCCESS, payload: response.data
            })
        } catch (e) {
            dispatch({
                type: TodoActionTypes.ADD_TODO_ERROR,
                payload: `An Error occurred`
            })
        }
    }
}

//adds task items to list
export const addItemToList = (id: string, oldItems: [], newItem: string) => {
    return async (dispatch: Dispatch<TodoAction>) => {
        try {
            dispatch({type: TodoActionTypes.ADD_TODO})
            const response = await axios.patch(`http://localhost:8000/todos/${id}`, {
                "sub_tasks": [...oldItems, {
                    "body": newItem,
                    "status": true
                }]
            })
            dispatch({type: TodoActionTypes.ADD_ITEM_SUCCESS})
        } catch (e) {
            dispatch({
                type: TodoActionTypes.ADD_TODO_ERROR,
                payload: `An Error occurred`
            })
        }
    }
}

//toggles todos status done/undone
export const toggleItemStatus = (id: string, body: string, oldItems: []) => {
    //creating new sub_tasks array to be sent to state
    const newItemsStatus = oldItems.map((item: any) => item.body === body ? {
        body: item.body,
        status: !item.status
    } : item)

    return async (dispatch: Dispatch<TodoAction>) => {
        try {
            dispatch({type: TodoActionTypes.TOGGLE_ITEM_STATUS})
                const response = await axios.patch(`http://localhost:8000/todos/${id}`, {"sub_tasks": [...newItemsStatus]})
            dispatch({type: TodoActionTypes.TOGGLE_ITEM_STATUS_SUCCESS})

        } catch (e) {
            dispatch({
                type: TodoActionTypes.TOGGLE_ITEM_STATUS_ERROR,
                payload: `An Error occurred`
            })
        }
    }
}

