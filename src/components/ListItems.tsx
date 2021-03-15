import React, {useEffect, useState} from 'react';
import {nanoid} from "nanoid";
import {ListItemText, TextField, ListItem} from "@material-ui/core";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from '../hooks/useActions'
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {toggleItemStatus} from "../store/action-creators/todo";

interface SubTask {
    body: string,
    status: boolean
}

const style = {marginBottom: "2px", backgroundColor: "#DEDEDE"}

const ListItems: React.FC = (props: any) => {

    const {todos} = useTypedSelector(state => state.todo)
    const {id} = props.location.state
    const {title, sub_tasks} = todos.filter((t) => t.id === id)[0] || props.location.state
    const {fetchTodos, addItemToList, toggleItemStatus} = useActions();
    const [tasks, setTasks] = useState([sub_tasks])
    const [switchState, setSwitchState] = useState({
        checked: false
    });

    useEffect(() => {
        setTasks(sub_tasks)
    }, [sub_tasks])


    //check the switch position status and display tasks according to it
    useEffect(() => {
        switchState.checked ? setTasks(sub_tasks.filter((t: SubTask) => t.status === true)) : setTasks(sub_tasks || tasks)
    }, [switchState])

    //search bar
    const searchHandleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (switchState.checked) {
            setSwitchState({checked: false})
        }
        let val = e.target.value
        let search = sub_tasks.filter((t: SubTask) => t.body.toLowerCase().includes(val.toLowerCase()))
        setTasks(search)
    }

    //set switch state
    const switchHandleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSwitchState({...switchState, checked: event.target.checked});
    };

    //toggle taask status done/undone
    const toggleStatus = async (e: any) => { //sorry, don't know what types are exactly appropriate here
        e.target.classList.toggle('task_done')
        await toggleItemStatus(id, e.target.innerText, sub_tasks)
        fetchTodos()
    }

    //submit by 'Enter' and add new items
    const handleSubmit = async (e: any) => { //sorry, don't know what types are exactly appropriate here
        if (e.code === "Enter" || e.code === "NumpadEnter") {
            let newItem = e.target.value;
            if (newItem.length) {
                await addItemToList(id, sub_tasks, newItem.trim())
                fetchTodos()
            }
        }
    };


    return (
        <div>
            <h2>{title}</h2>

            <TextField
                id="filled-full-width"
                label="Filter"
                placeholder="List Items"
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="filled"
                onChange={searchHandleChange}
            />

            <Typography component="div">
                <Grid component="label" container alignItems="center" spacing={1}>
                    <Grid item>All</Grid>
                    <Grid item>
                        <Switch
                            checked={switchState.checked}
                            onChange={switchHandleChange}
                            color="primary"
                            name="checked"
                            inputProps={{'aria-label': 'primary checkbox'}}
                        />
                    </Grid>
                    <Grid item>Undone</Grid>
                </Grid>
            </Typography>


            <ul>
                {tasks.length ?

                    (tasks.map((task: SubTask) => (
                        task.status ?
                            //undone tasks
                            <ListItem style={style} button key={nanoid()}>
                                <ListItemText onClick={toggleStatus} className="task" primary={task.body}/>
                            </ListItem>

                            :
                            //done tasks
                            <ListItem style={style} button key={nanoid()}>
                                <ListItemText onClick={toggleStatus} className="task task_done" primary={task.body}/>
                            </ListItem>
                    )))

                    :
                    //fallback
                    <h2>No elements found</h2>

                }


            </ul>


            <TextField
                label="Add"
                placeholder="a new task"
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="filled"
                onKeyDown={handleSubmit}
                name="body"
            />
        </div>
    );
};

export default ListItems;
