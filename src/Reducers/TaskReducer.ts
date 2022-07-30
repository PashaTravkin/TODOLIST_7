import {TasksStateType} from "../App";
import {v1} from "uuid";

export const TaskReducer = (state: TasksStateType, action: tsarType) => {
        switch (action.type) {
            case "CHANGE-TASK-TITLE": {
                let todolistTasks = state[action.payload.todolistId]
                let task = todolistTasks.find(t => t.id === action.payload.id);
                if (task) {
                    task.title = action.payload.newTitle;
                    // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
                }
                return ({...state})
            }
            case "ADD-TASK": {
                let task = {id: v1(), title: action.payload.title, isDone: false};
                let todolistTasks = state[action.payload.todolistId];
                state[action.payload.todolistId] = [task, ...todolistTasks];
                return ({...state})
            }
            case "REMOVE-TASK": {
                let todolistTasks = state[action.payload.todolistId];
                state[action.payload.todolistId] = todolistTasks.filter(t => t.id != action.payload.id);
                return ({...state})
            }
            case "CHANGE-STATUS": {
                let todolistTasks = state[action.payload.todolistId];
                let task = todolistTasks.find(t => t.id === action.payload.id);
                if (task) {
                    task.isDone = action.payload.isDone;
                }
                return ({...state})
            }
            case "TASKS-FOR-NEW-TODOLIST": {
                return ({...state, [action.payload.newTodolistId]: []})
            }
            case "REMOVE-TASKS-FOR-REMOVE-TODOLIST": {
                return ({...state})
            }

            default:
                return state
        }
    }
;

type tsarType = changeTaskTitleACType
    | addTaskACType
    | removeTaskACType
    | changeStatusACType
    | tasksForNewTodoListACType
    | removeTasksForRemoveTodoListACType

type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type removeTaskACType = ReturnType<typeof removeTaskAC>
type changeStatusACType = ReturnType<typeof changeStatusAC>
type tasksForNewTodoListACType = ReturnType<typeof tasksForNewTodoListAC>
type removeTasksForRemoveTodoListACType = ReturnType<typeof removeTasksForRemoveTodoListAC>


export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string) => {
    return {
        type: "CHANGE-TASK-TITLE",
        payload: {
            id: id,
            newTitle: newTitle,
            todolistId: todolistId
        }
    } as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: "ADD-TASK",
        payload: {
            title: title,
            todolistId: todolistId
        }
    } as const
}
export const removeTaskAC = (id: string, todolistId: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            id: id,
            todolistId: todolistId
        }
    } as const
}
export const changeStatusAC = (id: string, isDone: boolean, todolistId: string) => {
    return {
        type: "CHANGE-STATUS",
        payload: {
            id: id,
            isDone: isDone,
            todolistId: todolistId
        }
    } as const
}
export const tasksForNewTodoListAC = (newTodolistId: string) => {
    return {
        type: "TASKS-FOR-NEW-TODOLIST",
        payload: {
            newTodolistId: newTodolistId
        }
    } as const
}
export const removeTasksForRemoveTodoListAC = () => {
    return {
        type: "REMOVE-TASKS-FOR-REMOVE-TODOLIST",
        payload: {}
    } as const
}


export default TaskReducer;