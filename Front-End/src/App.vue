<template>
  <div id="app">
    <header>
      <nav class="navbar fixed-top navbar navbar-light" style="background-color:#11263f;">
        <div class="container-fluid">
          <a class="navbar-brand" href="#" style="font-size:25px; color: aliceblue;">Project III</a>
        </div>
      </nav>
    </header>
    <main>
        <div class="card" style="width: 92%; font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; background-color: #1a212b;">
          <div class="card-body">
            <h5 class="card-title" style="color: white;">List Student</h5>
            <p class="card-text" style="color: white;">Below is a list of students POLBAN taking project 3 courses. The project currently being built is to create a web-based application.</p>
          </div>
        </div>
        <div class="table-content">
          <table class="table table-dark table-striped">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Nama</th>
                <th scope="col">Role</th>
                <th scope="col">NIM</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody v-for="student in students" v-bind:key="student.id">
              <tr>
                <!-- <th scope="row">1</th> -->
                <td>{{ student.id }}</td>
                <td>{{ student.namestudent }}</td>
                <td>{{ student.role }}</td>
                <td>{{ student.nim }}</td>
                <td><button v-on:click="DeleteApi(student.id)">Delete</button></td>
              </tr>
            </tbody>
          </table>
        </div>
    </main>
  <footer>
    <div class="card-content">
      <div class="card" style=" background-color:#11263f;">
        <div class="card-body">
          <p style="text-align:center; font-size:25px; font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; color:white;">Creator</p> 
        </div>
        <div class="row">
          <div class="col-sm-6">
            <div class="card">
              <div class="card-body">
                <!-- <img src="./assets/img/Arief.jpeg" alt=""> -->
                <h5 class="card-title">Arief Rahman</h5>
                <p class="card-text">Back-End Developer</p>
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="card">
              <div class="card-body">
                <!-- <img src="./assets/img/Rofi.jpg" alt=""> -->
                <h5 class="card-title">Rofi Fauzan</h5>
                <p class="card-text">Front-End</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</div>
</template>

<script>
import axios from "axios";
const baseUrl = "http://localhost:3000/students";

export default {
  name: 'App',
  data(){
    return{
      students:[],
      no:'',
      roleis:'',
      nimis:''
    }
  },
  methods: {
      async GetApi() {
        await axios
          .get(baseUrl)
          .then((resp) => {
            this.students = resp.data;
          })
          .catch((err) => {
            console.log(err);
          });
      },
      async PostApi() {
        await axios
          .post(baseUrl,{name:this.nameis})
          .then((resp) => {
            console.log(resp);
            this.nameis='';
            this.GetApi();
          })
          .catch((err) => {
            console.log(err);
          });
      },
      async DeleteApi(id) {
        await axios
          .delete(baseUrl+id)
          .then((resp) => {
            console.log(resp);
            this.GetApi();
          })
          .catch((err) => {
            console.log(err);
          });
      },
      async PutApi(id,name) {
        await axios
          .put(baseUrl+id,{name:name})
          .then((resp) => {
            console.log(resp);
            this.GetApi();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  mounted(){
    this.GetApi();
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #1a212b;
  margin-top: 10px;
}

.table-content{
  margin: 25px;
  padding: 10px;
}

.card{
  margin-left: 3%;
  margin-top: 6%;
}

footer{
  width: 97%;
}

.card img{
  width: 300px;
  height: 300px;
  align-content: center;
}

.card-content{
  padding: 10px;
}

.col-sm-6{
  width: 40%;
  margin-left: 5%;
  margin-bottom: 3%;
}

</style>
