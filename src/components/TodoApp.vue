<template>
  <div class="hello">
    <h1>Todo App</h1>
    <form @submit="addTodo" class="todo-input">
      <div class="col-5">
        <input v-model="todoName" name="message" type="text" class="add-input form-control" required placeholder="Add new todo">

        <div class="input-group">
          <input id="file" name="image"  type="file" class="form-control" placeholder="Add image to task">
          <button @click="clearFile" class="btn btn-outline-secondary" type="button" >Clear</button> </div>
      </div>
      <button
          class="btn btn-primary"
      >
        Add
      </button>
    </form>
    <div class="wrap">
      <table class="table ">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col" class="text-start">Message</th>
          <th scope="col" class="text-start">Image</th>
          <th scope="col">Completed</th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
          <TodoItem
            v-for="todo in todos"
            :oneTaskData="todo"
            :key="todo.id"
            v-on:complete="(value)=> completeItem(value, todo.id)"
            @save="(name)=> saveEditedItem(name, todo)"
            @delete="deleteItem(todo.id)"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

import {defineComponent, onMounted, ref} from "vue";
import api from '../lib/axios'
import TodoItem from "@/components/TodoItem";
export default defineComponent({
  name: "TodoApp",
  components:{
    TodoItem
  },

  setup(){
    const todoName = ref('')

    const text = '<h1>Hello</h1>'

    const todos = ref([])


    onMounted(()=>{
      getTodos()
    })

    function getTodos(){
      clearFile()
      todoName.value = ''
      api.getTodos().then((response)=>{
        todos.value = response.data.data// [{id},{id}]
      })
    }

    function addTodo(event){
      event.preventDefault()
      if(!todoName.value) { return }

      const data = {};
      const formData = new FormData();

      const elements = [...event.target.elements]

      elements.forEach(({ name, type, value, files }) => {
        if (!['submit', 'file'].includes(type)) {
          data[name] = value;
        } else if (type === 'file' && files.length) {
            formData.append(`files.${name}`, files[0], files[0].name);
        }
      });


      formData.append('data', JSON.stringify(data));

      api.addTodo(formData).then(getTodos)

    }

    function completeItem(value, id) {
      api.updateTodo(id,  { completed: value }).then(getTodos)
    }

    function saveEditedItem(name, todo) {
      todo.name = name
      api.updateTodo(todo.id, { message: name }).then(getTodos)
    }

    function deleteItem(id) {
      api.deleteTodo(id).then(getTodos)
    }

    function clearFile(){
      const input = document.getElementById('file')

      input.value = ''
    }

    return {
      todoName,
      addTodo,
      todos,
      completeItem,
      saveEditedItem,
      deleteItem,
      text,
      clearFile

    }

  }

})
</script>

<style scoped>
.todo-input{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
  column-gap: 10px;
}

.btn:disabled,
.btn[disabled]{
  background-color: lightgray;
  border-color: lightgray;
  border-color: lightgray;
  color: gray;
}
.wrap{
  max-width: 900px;
  margin: 0 auto;
}
</style>
