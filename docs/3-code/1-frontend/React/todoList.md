

```js
//React实现方式
const todoList = () => {
  const [todos,setTodos] = useState([]);
  const addTodo = (value) => {
    setTodos([...todos,{id:Date.now(),value,complate: true}])
  }
  const handleToggleTodo = () => {
    setTodos(todos.map(todo=> todo.id !==id ? todo : {...todo,complate: !todo.complate}))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo=> todo.id !==id))
  }
  return (
    <div>
      <TodoInput addTodo={addTodo}/>
      {todos.map((todo,index)=> {
        <TodoItem key={index} handleToggleTodo={handleToggleTodo} deleteTodo ={deleteTodo} todo={todo}/>
      })}
    </div>
  )
}

const TodoInput = ({addTodo}) => {
  const [value,setValue] = useState('');
  const handleInputValue = (e) => {
    setValue(e.target.value);
  }
  const handleAddTodo = () => {
    if(value.trim() !=='') {
      addTodo(value);
      setValue('')
    }
  }
  return (
    <div>
      <input type='text' value={value} onChange={handleInputValue}/>
      <button onClick={handleAddTodo}>添加</button>
    </div>
  )

}
const TodoItem = ({handleToggleTodo,deleteTodo,todo}) => {
  return(
    <div>
      <span style={{textDecoration: todo.complate? 'line-through': 'none'}}>
        {todo.value}
      </span>
      <input type='checkbox' disabled={todo.complate} onChange={()=> handleToggleTodo(todo.id)}/>
      <button onClick={deleteTodo(todo.id)}>删除</button>
    </div>
  )
}

// RN实现方式
const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const addTodo = (value) => {
    setTodos([...todos,{id:Date.now(),value,complate: true}])
  }
  const handleToggle = () => {
    setTodos(todos.map(todo=> todo.id !==id ? todo : {...todo,complate: !todo.complate}))
  }
  const deleteTodo = () => {
    setTodos(todos.filter(todo=> todo.id !==id))
  }
  return(
    <View>
      <TodoInput addTodo={addTodo}/>
      <FlatList data={todos} renderItems={({item})=> (
        <TodoItem item={item} handleToggle={handleToggle} deleteTodo={deleteTodo}/>
      )}
      keyExtractor={item => item.id.toString()}
      />
    </View>
  )
}

const TodoInput = ({addTodo}) => {
  const [inputText, setInputText] = useState('');
  const addInputText = () => {
    if(inputText.trim()!=='') {
      addTodo(inputText)
    }
  }
  return (
    <View>
      <TextInput value={inputText} onChangeText={setInputText}/>
      <Button title='add' onPress={addInputText}/>
    </View>
  )
}
const TodoItem = ({item,handleToggle,deleteTodo}) => {
  return(
    <View>
      <Text onPress={()=> handleToggle(item.id)}>{item.value}</Text>
      <Button title='delete' onPress={()=> deleteTodo(item.id)}></Button>
    </View>
  )
}
```

