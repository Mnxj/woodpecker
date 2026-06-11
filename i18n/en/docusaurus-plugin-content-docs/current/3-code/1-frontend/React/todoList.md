

```js
// React implementation
const todoList = () => {
  const [todos, setTodos] = useState([]);
  const addTodo = (value) => {
    setTodos([...todos, { id: Date.now(), value, complete: true }])
  }
  const handleToggleTodo = () => {
    setTodos(todos.map(todo => todo.id !== id ? todo : { ...todo, complete: !todo.complete }))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }
  return (
    <div>
      <TodoInput addTodo={addTodo} />
      {todos.map((todo, index) => {
        <TodoItem key={index} handleToggleTodo={handleToggleTodo} deleteTodo={deleteTodo} todo={todo} />
      })}
    </div>
  )
}

const TodoInput = ({ addTodo }) => {
  const [value, setValue] = useState('');
  const handleInputValue = (e) => {
    setValue(e.target.value);
  }
  const handleAddTodo = () => {
    if (value.trim() !== '') {
      addTodo(value);
      setValue('')
    }
  }
  return (
    <div>
      <input type='text' value={value} onChange={handleInputValue} />
      <button onClick={handleAddTodo}>Add</button>
    </div>
  )

}
const TodoItem = ({ handleToggleTodo, deleteTodo, todo }) => {
  return (
    <div>
      <span style={{ textDecoration: todo.complete ? 'line-through' : 'none' }}>
        {todo.value}
      </span>
      <input type='checkbox' disabled={todo.complete} onChange={() => handleToggleTodo(todo.id)} />
      <button onClick={deleteTodo(todo.id)}>Delete</button>
    </div>
  )
}

// React Native implementation
const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const addTodo = (value) => {
    setTodos([...todos, { id: Date.now(), value, complete: true }])
  }
  const handleToggle = () => {
    setTodos(todos.map(todo => todo.id !== id ? todo : { ...todo, complete: !todo.complete }))
  }
  const deleteTodo = () => {
    setTodos(todos.filter(todo => todo.id !== id))
  }
  return (
    <View>
      <TodoInput addTodo={addTodo} />
      <FlatList data={todos} renderItems={({ item }) => (
        <TodoItem item={item} handleToggle={handleToggle} deleteTodo={deleteTodo} />
      )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  )
}

const TodoInput = ({ addTodo }) => {
  const [inputText, setInputText] = useState('');
  const addInputText = () => {
    if (inputText.trim() !== '') {
      addTodo(inputText)
    }
  }
  return (
    <View>
      <TextInput value={inputText} onChangeText={setInputText} />
      <Button title='add' onPress={addInputText} />
    </View>
  )
}
const TodoItem = ({ item, handleToggle, deleteTodo }) => {
  return (
    <View>
      <Text onPress={() => handleToggle(item.id)}>{item.value}</Text>
      <Button title='delete' onPress={() => deleteTodo(item.id)}></Button>
    </View>
  )
}
```

