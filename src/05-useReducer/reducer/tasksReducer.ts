import * as z from "zod";

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

interface TasksState {
    todos: Todo[];
    lenght: number;
    completed: number;
    pending: number;
}

export type TaskAction = 
    | { type: 'ADD_TODO', payload: { text: string } }
    | { type: 'TOGGLE_TODO', payload: { id: number } }
    | { type: 'DELETE_TODO', payload: { id: number } };

export const initialTasksState: TasksState = {
    todos: [],
    lenght: 0,
    completed: 0,
    pending: 0,
};

const TodoSchema = z.object({
    id: z.number(),
    text: z.string(),
    completed: z.boolean(),
});

const TasksStateSchema = z.object({
    todos: z.array(TodoSchema),
    lenght: z.number(),
    completed: z.number(),
    pending: z.number(),
});

export const getInitialTasksState = (): TasksState => {
    const storedState = localStorage.getItem('tasksState');

    if (!storedState) {
        return initialTasksState;
    }

    // Validar mediante Zod
    const parseResult = TasksStateSchema.safeParse(JSON.parse(storedState));
    if (parseResult.error) {
        console.log(parseResult.error);
        
        return initialTasksState;
    }

    return parseResult.data;
}


export const tasksReducer = (state: TasksState, action: TaskAction): TasksState => {

    switch (action.type) {
        case 'ADD_TODO': {
            const newTodo: Todo = {
                id: Date.now(),
                text: action.payload.text,
                completed: false,
            };
            return {
                ...state,
                todos: [...state.todos, newTodo],
                lenght: state.todos.length + 1,
                pending: state.pending + 1,
            };
        }

        case 'TOGGLE_TODO': {
            const updatedTodos = state.todos.map(todo => {
                if (todo.id === action.payload.id) {
                    return { ...todo, completed: !todo.completed };
                }
                return todo;
            });

            return {
                ...state,
                todos: updatedTodos,
                lenght: updatedTodos.length,
                completed: updatedTodos.filter(todo => todo.completed).length,
                pending: updatedTodos.filter(todo => !todo.completed).length,
            };
        }

        case 'DELETE_TODO': {
            const currentTodos = state.todos.filter(todo => todo.id !== action.payload.id);
            return {
                ...state,
                todos: currentTodos,
                lenght: currentTodos.length,
                completed: currentTodos.filter(todo => todo.completed).length,
                pending: currentTodos.filter(todo => !todo.completed).length,

            };
        }

        default:
            return state;
    } 
}