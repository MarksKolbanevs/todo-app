import { createContext, useEffect, useState} from 'react';
import CustomCheckbox from './components/custom-checkbox/CustomCheckbox';
import './styles/index.scss';
import TodoContext from './components/contexts/TodoContext';
import DndTodoList from './components/dnd-todo-list/DndTodoList';
import { v4 as uuidv4 } from 'uuid';
import { ThemeContext } from './components/contexts/ThemeContext';


interface Todo {
  id:string;
  task: string;
  completed: boolean;
}


function App() {
  const [theme,setTheme] = useState("light");
  const [todos, setTodos] = useState<Todo[]>([]); // All todos will be saved here
  const [fetchedTodos,setFetchedTodos] = useState(todos); // Copy of todos to display
  //const [activeTodos,setActiveTodos] = useState(0); // Counting active todos to display how many items left
  let [category,setCategory] = useState("all");

  useEffect(() => {
    // Fetching todos based on category
    switch(category){
      case "all":
        setFetchedTodos(todos);
        break
      case "completed":
        const completedTodos = todos.filter(todo => todo.completed);
        setFetchedTodos(completedTodos);
        break
      case "active":
        const activeTodos = todos.filter(todo => !todo.completed);
        setFetchedTodos(activeTodos);
        break
    }
  }, [category,todos]); // Updating todos list when category or todos has been updated 

  const changeCategory = (newCategory:string) =>{
    setCategory(newCategory);
  }

  const toggleTheme = () =>{
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  }

  const handleSubmitNewTodo = (event: any) => {
    event.preventDefault();
    const form = event.currentTarget;
    const task = form.newTodo.value;
    const newTodo: Todo = { id: uuidv4(), task, completed: false }; // Use a function to generate a unique ID
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const deleteTodo = (indexToDelete : number) =>{
    setTodos(prevTodos => prevTodos.filter((_, index) => index !== indexToDelete));
  }

  const updateTodoState = (index:number) =>{
    const updatedTodos = [...todos];
    updatedTodos[index] = { ...updatedTodos[index], completed: !updatedTodos[index].completed };
    setTodos(updatedTodos);
  }

  const clearCompletedTodos = () => {
    const updatedTodos = todos.filter(todo => !todo.completed);
    setTodos(updatedTodos);
  }

  return (
    <ThemeContext.Provider value={{theme,toggleTheme}}>
    <TodoContext.Provider value = {{todos,setTodos,updateTodoState,deleteTodo,clearCompletedTodos}}>
    <main id={theme}>
      <div className='background-image-container'/>
      <section>
        <div className='main-container'>
          <header>
            <h1>TODO</h1>
            <button onClick={toggleTheme}>
              {theme === "dark" ? <img src="./images/icon-sun.svg"/> : <img src="./images/icon-moon.svg"/> }
            </button>
          </header>
          <form onSubmit={handleSubmitNewTodo}>
            <CustomCheckbox disabled={true}/>
            <input name="newTodo" className='todo-input' placeholder='Create a new to do...'/>
          </form>
          <div className='main-checklist-container'>
            <DndTodoList todos={fetchedTodos}/>
          {/* Footer that will be displayed on big screens */}
          <footer className='footer-on-big-screen'>
            <h4>{fetchedTodos ? fetchedTodos.length : null} items left</h4>
              <ul>
                <li onClick={() => changeCategory("all")} className={category === "all" ? "selected" : ""}>All</li>
                <li onClick={() => changeCategory("active")} className={category === "active" ? "selected" : ""}>Active</li>
                <li onClick={() => changeCategory("completed")} className={category === "completed" ? "selected" : ""}>Completed</li>
              </ul>
            <button onClick={clearCompletedTodos}>Clear completed</button>
          </footer>
          {/* Footer that will be displayed on small screens */}
          <footer className='footer-on-small-screen'>
            <div className='first-action-bar'>
              <h4>{fetchedTodos ? fetchedTodos.length : null} items left</h4>
              <button onClick={clearCompletedTodos}>Clear completed</button>
            </div>
            <div className='second-action-bar'>
              <ul>
                <li onClick={() => changeCategory("all")} className={category === "all" ? "selected" : ""}>All</li>
                <li onClick={() => changeCategory("active")} className={category === "active" ? "selected" : ""}>Active</li>
                <li onClick={() => changeCategory("completed")} className={category === "completed" ? "selected" : ""}>Completed</li>
              </ul>
            </div>
          </footer>
          </div>
        </div>
      </section>
    </main>
    </TodoContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
