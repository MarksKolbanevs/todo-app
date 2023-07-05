import React, { createContext } from 'react';

interface Todo {
  id:string;
  task: string;
  completed: boolean;
}

interface TodoContextProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  updateTodoState:(index: number) => void;
  deleteTodo:(index:number) => void;
  clearCompletedTodos:(index:number) => void;
}

export const TodoContext = createContext<TodoContextProps>({
  todos: [],
  setTodos: () => {},
  updateTodoState: () => {},
  deleteTodo:() => {},
  clearCompletedTodos:() => {},
});

export default TodoContext;
