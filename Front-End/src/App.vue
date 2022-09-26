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
                <!-- <th scope="col">No</th> -->
                <th scope="col">Nama</th>
                <th scope="col">Role</th>
                <th scope="col">NIM</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="student in students" v-bind:key="student._id">
                <!-- <th scope="row">1</th> -->
                <!-- <td>{{ student.id }}</td> -->
                <td>{{ student.namestudent }}</td>
                <td>{{ student.role }}</td>
                <td>{{ student.nim }}</td>
                <td><button v-on:click="DeleteApi(student._id)">Delete</button></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="input-data" style="background:rgb(26, 33, 43);">
          <h2 style="color:white; font-size: 20px;">Add New Data</h2>
          <form class="row g-3">
            <div class="col-md-3">
              <label for="validationDefault01" class="form-label">Nama</label>
              <input type="text" class="form-control" id="validationDefault01" name="studentname" v-model="namestudentis" required>
            </div>
            <div class="col-md-3">
              <label for="validationDefault02" class="form-label">Role</label>
              <input type="text" class="form-control" id="validationDefault02" name="role" v-model="roleis" required>
            </div>
            <div class="col-md-3">
              <label for="validationDefault03" class="form-label">NIM</label>
              <input type="text" class="form-control" id="validationDefault03" name="nim" v-model="nimis" required>
            </div>
            <div class="col-12">
              <button class="btn btn-primary" type="submit" v-on:click="PostApi()">Submit</button>
            </div>
          </form>
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
// const baseUrl = "http://localhost:3000/students";
const baseUrl = "http://10.10.130.156:3000/api/mahasiswa";

export default {
  name: 'App',
  data(){
    return{
      students:[],
      namestudentis:'',
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
        // await axios
        //   .post(baseUrl,{namestudent:this.namestudentis, role:this.roleis, nim:this.nimis})
        //   .then((resp) => {
        //     console.log(resp);

        //     this.students.push({
        //       namestudent:this.namestudentis,
        //       role:this.roleis, 
        //       nim:this.nimis
        //     })
        //     this.namestudentis=''
        //     this.roleis=''
        //     this.nimis=''
        //     // this.nameis='';
        //     this.GetApi();
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
        const payload = {
          nim: this.nimis,
          namestudent : this.namestudentis,
          role: this.roleis
        }

        const response = await axios.post(baseUrl, payload)

        console.log(response)
        this.students.push({
          namestudent : this.namestudentis,
          role: this.roleis,
          nim: this.nimis
        })

        this.namestudentis = ''
        this.roleis=''
        this.nimis=''
        this.GetApi()
      },
      async DeleteApi(_id) {
        await axios
          .delete(baseUrl+'/'+_id)
          .then((resp) => {
            console.log(resp);
            this.GetApi();
          })
          .catch((err) => {
            console.log(err);
          });
      },
      async PutApi(nim,name) {
        await axios
          .put(baseUrl+nim,{name:name})
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

.input-data{
  margin-left: 3%;
  padding: 5px;
  justify-content: space-between;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  border-radius: 5px;
  width: 1400px;
  padding: 10px;
}

.form-control{
  width: 300px;
}

.form-label{
  color: white;
}


</style>
