<template>
  <tr>
    <th scope="row">
      <input
        class="form-check-input"
        :checked="oneTaskData.attributes.completed"
        type="checkbox"
        @change="$emit('complete', $event.target.checked)"
      >
      <slot name="input"></slot>
    </th>
    <td class="text-start">
      <input
        v-if="editMode"
        v-model="itemName"
        type="text"
        class="form-control"
        @blur="saveEditedItem"
      >
      <h4
        v-else
        :class="{'text-decoration-line-through text-secondary': oneTaskData.attributes.completed}"
      >
        {{ oneTaskData.attributes.message }}
      </h4>
    </td>
    <td class="text-start">
      <img
        class="image"
        v-if="oneTaskData.attributes.image.data"
        :src="'https://task-manager-devhouse.herokuapp.com'+ oneTaskData.attributes.image.data.attributes.url"
        alt="image"
      >
    </td>
    <td>
      <span v-if="oneTaskData.attributes.completed" class="badge bg-success">Success</span>
    </td>
    <td class="text-end">
      <slot name="buttons"></slot>
      <button
        v-if="editMode"
        @click="saveEditedItem"
        class="btn btn-primary"
      >
        Save
      </button>
      <div v-else class="d-flex justify-content-end">
        <button
            v-if="!oneTaskData.attributes.completed"
            @click="editMode = true"
            class="btn btn-primary"
        >
          Edit
        </button>
        <button @click="$emit('delete')" class="btn btn-danger">Delete</button>
      </div>

    </td>
  </tr>
</template>

<script>
import {defineComponent, onMounted, ref} from "vue";

export default defineComponent({
  name: "oneTaskDataItem",
  props: {
    oneTaskData: Object
  },
  setup(props, { emit }){
    const editMode = ref( false)

    const itemName = ref('')

    onMounted(()=>{
      itemName.value = props.oneTaskData.attributes.message
    })

    function saveEditedItem() {
      if(itemName.value !== props.oneTaskData.attributes.message){
        emit('save', itemName.value)
      }
      editMode.value = false
    }

    return{
      editMode,
      itemName,
      saveEditedItem
    }
  }
})
</script>

<style scoped>

.image{
  width: 50px;
}

</style>
