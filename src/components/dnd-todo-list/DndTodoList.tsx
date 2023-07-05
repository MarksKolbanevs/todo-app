import "./index.scss";
import "./../../styles/index.scss";

import { useContext, useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import CustomCheckbox from '../custom-checkbox/CustomCheckbox';
import TodoContext from '../contexts/TodoContext';
import { ThemeContext } from '../contexts/ThemeContext';

interface Todo {
  id:string;
  task: string;
  completed: boolean;
}

export default function DndTodoList(props:{todos:Todo[]}){
  const [droppableItems, updateDroppableItems] = useState<Todo[]>([]);
  const { updateTodoState,deleteTodo,setTodos } = useContext(TodoContext);
  const contextValue = useContext(ThemeContext);
  
  useEffect(() => {
    updateDroppableItems(props.todos);
  }, [props.todos]);

  const handleOnDragEnd = (result: any) => {
    if(!result.destination) return;
    const updatedItems = Array.from(droppableItems);
    const [reorderedItem] = updatedItems.splice(result.source.index, 1);
    updatedItems.splice(result.destination.index, 0, reorderedItem);

    setTodos(updatedItems); // Updating todos indexes and using Provider to update droppableItems
  };
    return(
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId='droppableItems'>
          {(provided) => (
            <div className="todos-container" {...provided.droppableProps} ref={provided.innerRef}>
              {droppableItems.map((value, index) => (
                <Draggable key={value.id} draggableId={value.id} index={index}>
                  {(provided) => (
                    <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className={`${contextValue!.theme} ${value.completed ? 'todo-container completed' : 'todo-container'}`}>
                      <CustomCheckbox completed={value.completed} onClick = {() => updateTodoState(index)}/>
                      <p>{value.task}</p>
                      <button onClick={() => deleteTodo(index)}><img src="./images/icon-cross.svg"/></button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
}
