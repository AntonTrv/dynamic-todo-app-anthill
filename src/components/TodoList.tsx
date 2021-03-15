import React, {useEffect} from 'react';
import {useTypedSelector} from "../hooks/useTypedSelector";
import Preloader from "./Preloader";
import {nanoid} from "nanoid";
import {useActions} from '../hooks/useActions'
import AddTodoList from "./AddTodoList";
import {Link} from 'react-router-dom';
import {ListItem, ListItemText} from "@material-ui/core";

interface TodoDescription {
    body: string;
    status: boolean;
}

const style = {marginBottom: "2px", backgroundColor: "#DEDEDE"}


const TodoList: React.FC = () => {

    const {todos, loading, error} = useTypedSelector(state => state.todo);
    const {fetchTodos, addTodos} = useActions();

    useEffect(() => {
        fetchTodos()
    }, [])

    if (loading) {
        return <Preloader/>
    }

    if (error) {
        return <h2>Error occurred...</h2>
    }


    return (


        <>
            <h1>Yet another Todo app</h1>

            {todos.map(todo =>
                <ListItem style={style} button key={nanoid()}>
                    <Link className="task" key={nanoid()} to={{pathname: `/item/${todo.id}`, state: todo}}>

                        <article><span className="list">{todo.title}</span>
                            (
                            <span
                                className="list enumiration">
                                {todo.sub_tasks.filter((s: TodoDescription) => s.status && s.body).length}
                                /
                                {todo.sub_tasks.filter((s: TodoDescription) => s.body).length}
                    </span>
                            )

                        </article>

                    </Link>
                </ListItem>)}
            <>
                <AddTodoList addList={addTodos}/>
            </>
        </>

    );
};

export default TodoList;
