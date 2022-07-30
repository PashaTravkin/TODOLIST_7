import {FilterValuesType, TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";

const TodoListsReducer = (state: Array<TodolistType>, action: tsarType) => {
        switch (action.type) {
            case "ADD-TODOLIST": {

                let newTodolist: TodolistType = {id: action.payload.newTodolistId, title: action.payload.title, filter: 'all'};
                return ([newTodolist, ...state])
            }
            case "CHANGE-FILTER":{
                let todolist = state.find(tl => tl.id === action.payload.todolistId);
                if (todolist) {
                    todolist.filter = action.payload.value;
                }
                return ({...state})
            }
            case "REMOVE-TODOLIST":{
                return state.filter(el=>el.id!=action.payload.id)
            }
            case "CHANGE_TODOLIST-TITLE":{
                const todolist = state.find(el => el.id === action.payload.id);
                if (todolist) {
                    todolist.title = action.payload.title;
                }
                return ([...state])
            }
            default:
                return state
        }
    }
;

type tsarType = addTodolistACType
    |changeFilterACType|removeTodolistACType
    |changeTodolistTitleACType

type addTodolistACType = ReturnType<typeof addTodolistAC>
type changeFilterACType = ReturnType<typeof changeFilterAC>
type removeTodolistACType = ReturnType<typeof removeTodolistAC>
type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>


export const addTodolistAC = (title: string, newTodolistId:string) => {
    return {
        type: "ADD-TODOLIST",
        payload: {
            title: title,
            newTodolistId:newTodolistId
        }
    } as const
}
export const changeFilterAC = (value: FilterValuesType, todolistId: string) => {
    return {
        type: "CHANGE-FILTER",
        payload: {
            value:value,
            todolistId:todolistId
        }
    } as const
}
export const removeTodolistAC = (id: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {
            id:id
        }
    } as const
}
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: "CHANGE_TODOLIST-TITLE",
        payload: {
            id:id,
            title:title
        }
    } as const
}


export default TodoListsReducer;