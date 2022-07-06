import Axios from "axios";

class API {
  adapter;
  constructor() {
    this.adapter = Axios.create();
    this.token = localStorage.getItem("token");

    if (this.token) {
      this.adapter.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${this.token}`;
        return config;
      });
    }
  }

  getTodos() {
    return this.adapter.get(
        "http://localhost:1337api/populate=like&populate=comments&populate=users_permissions_user&populate=image"
    );
  }

  addTodo(data) {
    return this.adapter.post(
        "http://localhost:1337/api/posts",
      data
    );
  }
  

  getComments(){
    return  this.adapter.get("http://localhost:1337/api/comments?populate=*")
  }
 
  getUsers(){
  return this.adapter.get("http://localhost:1337/api/users")
  }
 login(data) {
     return this.adapter
       .post("http://localhost:1337/api/auth/local", data)
       .then((response) => {
         localStorage.setItem("token", response.data.jwt);
         console.log(localStorage.getItem("token"));
       });
   }
 
   register(data) {
     return this.adapter.post(
       "http://localhost:1337/api/auth/local/register",
       data
     );
   }
   photos(){
     return this.adapter.get("http://localhost:1337/api/posts?populate=image")
   }
   getImages() {
     return this.adapter.get("http://localhost:1337/api/posts?populate=image");
   }
   getInfoForMe(){
     return this.adapter.get("http://localhost:1337/api/users/me")
   }
   addComents(data){
   return this.adapter.post("http://localhost:1337/api/comments?populate=*",{
     body:data,
     headers: {
       "Content-Type": "application / json; charset = UTF-8",
     }
   
   })
   }
   
 }
export default new API();
