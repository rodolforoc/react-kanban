import React, { useState, useEffect, useContext } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Button } from '@material-ui/core';
import { v4 as uuid } from 'uuid';
import api from '../services/api';
import history from '../history';
import { Context } from '../Context/AuthContext';

const itemsFromBackend = [
  { id: uuid(), titulo: "First task" },
  { id: uuid(), titulo: "Second task" },
  { id: uuid(), titulo: "Third task" },
  { id: uuid(), titulo: "Fourth task" },
  { id: uuid(), titulo: "Fifth task" }
];

const columnsFromBackend = {
  [uuid()]: {
    name: "BackLog",
    items: itemsFromBackend
  },
  [uuid()]: {
    name: "To do",
    items: []
  },
  [uuid()]: {
    name: "In Progress",
    items: []
  },
  [uuid()]: {
    name: "Done",
    items: []
  }
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};

export default function Board() {
  const { handleLogout } = useContext(Context);
  const [columns, setColumns] = useState(columnsFromBackend);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
   async function loadTasks() {
      const response = await api.get('/assignment');
      console.log(response.data);
      setTasks(response.data); 
    }
    
    loadTasks();
  }, []);


  return (
    <div>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        style={{
          marginBottom: '15px'
        }}
        onClick={() => history.push('/task')}
      >
        Adicionar nova tarefa
      </Button>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        style={{
          marginBottom: '15px'
        }}
        onClick={() => history.push('/planning')}
      >
        Ir pra Planning
      </Button>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="secondary"
        onClick={handleLogout}
      >
        Sair
      </Button>
      <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
        <DragDropContext
          onDragEnd={result => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}
                key={columnId}
              >
                <h2>{column.name}</h2>
                <div style={{ margin: 8 }}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "lightblue"
                              : "lightgrey",
                            padding: 4,
                            width: 250,
                            minHeight: 500
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: "none",
                                        padding: 16,
                                        margin: "0 0 8px 0",
                                        minHeight: "50px",
                                        backgroundColor: snapshot.isDragging
                                          ? "#263B4A"
                                          : "#456C86",
                                        color: "white",
                                        ...provided.draggableProps.style
                                      }}
                                      onDoubleClick={() => history.push(`/task/${item.id}`)}
                                    >
                                      {item.titulo}
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
}