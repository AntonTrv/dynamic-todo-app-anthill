import {Button, TextField} from "@material-ui/core";
import {useState} from "react";

interface NewListItemProps {
    addList(list: string): void
}

const AddTodoList: React.FC<NewListItemProps> = ({addList}) => {
    const [list, setList] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setList(e.target.value)
    }

    const handleClick = () => {
        addList(list)
        setList('')
    }
    return (
        <>
            <TextField
                id="filled-full-width"
                label="Create"
                placeholder="New List"
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="filled"
                value={list}
                onChange={handleChange}
            />
            <Button onClick={handleClick} fullWidth variant="contained" color="primary" disableElevation>
                Add
            </Button>

        </>
    );
};

export default AddTodoList;
