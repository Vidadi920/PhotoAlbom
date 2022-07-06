<template>
  <div class="home">
    <div>
      <button class="btn-primary" @click.prevent="getUsers">
        Показать количество зарегистрированных пользователей
      </button>
      <button class="btn-primary" @click.prevent="deleteUsers">
        Cкрыть количество зарегистрированных пользователей
      </button>
      <ul v-for="user of users" :key="user">
        <li>Эмаил: {{ user.email }} ,Имя пользователя:{{ user.username }}</li>
      </ul>
    </div>
    <form>
      <input v-model="findText" placeholder="Поиск по титлу " />
      <button class="btn-info" @click.prevent="search">Поиск</button>
    </form>
    <form id="uploadForm " class=""></form>
    <div class="">
      <ul class="row row-cols-1 row-cols-md-5 g-4">
        <li lass="list-group-item " v-for="image in photos" :key="image.url">
          <div
            class="сard col order-last"
            style="width: 18rem"
            @click="sel = image"
            :class="sel == image ? ' border border-danger' : ''"
          >
            <img
              :src="
                'http://localhost:1337' +
                image.attributes.image.data.attributes.url
              "
              class="card-img-top"
              alt=""
            />
            <div class="card-body">
              <ul class="card-title">
                <li>Описание : {{ image.attributes.message }}</li>
              </ul>
              <p class="card-text" @click="sel = null"></p>
              <TodoComp :coments1="coments1" :movie="coments1.id" />
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from "../lib/axios";

import TodoComp from "@/components/TodoComp.vue";
export default {
  name: "HomeView",
  props: ["id"],
  components: {
    TodoComp,
  },
  data() {
    return {
      myInfo: "",
      findText: "",
      users: "",
      photos: "",
      sel: null,
      coments: "",
      coments1: "",
      count: 0,
     
    };
  },

  methods: {
    historyPhoto() {
      api.getImages().then((response) => {
        this.photos = response.data.data;
        console.log(this.photos);
      });
    },

   addcount(value){    
   this.count += value;
   return this
   },

    async addMessage() {
      return await api.addComents(this.coments).then((response) => {
        console.log(response);
      });
    },
    getComents() {
      return api.getComments().then((response) => {
        this.coments = response.data.data;
        this.coments1 = this.coments.map((el) => el.attributes);
        console.log(this.coments1);
      });
    },
    responseAdapter(response) {
     
      return response.map((entry) => ({
        name: entry.username,
        userEmail: entry.email,
      }));
    },
    getUsers() {
      return api.getUsers().then((res) => {
        this.users = res.data;
        let adapterUsers = this.responseAdapter(this.users); 
        console.log(adapterUsers); 
      });
    },
    deleteUsers() {
      return (this.users = "");
    },

    search() {
      this.photos = this.photos.filter(
        (el) => el.attributes.message == this.findText
      );
    },
  },

  beforeMount() {
    this.historyPhoto();
    this.getComents();
    this.addcount(10).addcount(5)
  },
};
</script>
<style>
.cardForm {
}
</style>
