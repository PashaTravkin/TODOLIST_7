import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {Container, Grid, Paper} from "@mui/material";
import BarApp from "./AppBar";
import TasksReducer, {
    addTaskAC,
    changeStatusAC,
    changeTaskTitleAC,
    removeTaskAC, removeTasksForRemoveTodoListAC,
    tasksForNewTodoListAC
} from "./Reducers/TaskReducer";
import TodoListsReducer, {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./Reducers/TodoListsReducer";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchTodolists] = useReducer(TodoListsReducer, [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    function addTodolist(title: string) {
        let newTodolistId = v1();
        dispatchTodolists(addTodolistAC(title,newTodolistId))
        dispatchTasks(tasksForNewTodoListAC(newTodolistId))
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatchTodolists(changeFilterAC(value, todolistId))
    }

    function removeTodolist(id: string) {
        // засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
        // setTodolists(todolists.filter(tl => tl.id != id));
        dispatchTodolists(removeTodolistAC(id))
        // удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
        delete tasks[id]; // удаляем св-во из объекта... значением которого являлся массив тасок
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        dispatchTasks(removeTasksForRemoveTodoListAC())
        // setTasks({...tasks});
    }

    function changeTodolistTitle(id: string, title: string) {
        dispatchTodolists(changeTodolistTitleAC(id, title))
        // найдём нужный todolist
        // const todolist = todolists.find(tl => tl.id === id);
        // if (todolist) {
        //     // если нашёлся - изменим ему заголовок
        //     todolist.title = title;
        //     setTodolists([...todolists]);
        // }
    }

    let [tasks, dispatchTasks] = useReducer(TasksReducer, {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    });

    function addTask(title: string, todolistId: string) {
        dispatchTasks(addTaskAC(title, todolistId))
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        dispatchTasks(changeTaskTitleAC(id, newTitle, todolistId))
    }

    function removeTask(id: string, todolistId: string) {
        dispatchTasks(removeTaskAC(id, todolistId))
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        dispatchTasks(changeStatusAC(id, isDone, todolistId))
    }

    return (
        <div className="App">
            <BarApp/>

            <Container fixed>
                <Grid container style={{padding: '10px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>

                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                            }

                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }</Grid>
            </Container>

        </div>
    );
}

export default App;
