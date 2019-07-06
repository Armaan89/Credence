<template>
 <div class="hello">
 <div>
    <div class="example1">
    <h3>Find the detials of Movies, TV Shows and more... </h3>
    </div>
    <div class="jumbotron">
    <h2>Movie detials</h2>

 <div class="row">
  <div class="col-sm-4" v-for="(item, index) in infos" :key="index">
    <div class="card">
      <div class="card-body">
          <div class="card-header"> 
          <!-- <img :src="item.Poster" class="card-img-top img-thumbnail" alt="image" @click="openSummary(index, item)" /> -->
          <div class="card-text">  {{item.Title}} | {{item.Year}}</div>
          <button class="btn btn-danger btn-sm btn-space" @click="deleteRecord(item.id)">Delete</button> 
          <button class="btn btn-success btn-sm"  @click="openUpdateForm(item.id, item)">Update</button>
          <br>
          <button class="btn btn-info btn-sm"  @click="openSummary(index, item)">View Summary</button>
          </div>
     </div>
    </div>
  </div>
 </div>
  <hr>


    <label> Title:</label> <input type="text" class="btn-space"  v-model="newData.Title" placeholder="Enter movie title"/>
    <label> Year:</label><input type="text"  v-model="newData.Year" placeholder="Enter release year" />
<br>


<!-- <div id="app1">
  <div v-if="!image">
    <h2>Select an image</h2>
    <input type="file" @change="onFileChange">
  </div>
  <div v-else>
    <img :src="image" />
    <button @click="removeImage">Remove image</button>
  </div>
</div> -->

<br>
<!-- Add & Reset buttons -->
<button id="btn" class="btn btn-primary btn-sm btn-space" v-bind:class="{disabled:isDisabled}"  @click="addRecord()">Add New Movie</button>
<button class="btn btn-danger btn-sm" @click="resetForm()">Reset</button>
<!-- Update Button -->
<b-modal ref="updateModal" title="Movie Info" class="fade "  @ok="updateRecord()">  
  <form>
   <label> Title:</label>  <input type="text" v-model="updatedData.Title"/>
   <label> Year:</label> <input type="text" v-model="updatedData.Year"/>
  </form>
</b-modal>
 <!-- Update Modal -->
<b-modal ref="summaryModal" title="Movie Info" class="fade " >  
  {{summary_data.Title}}
</b-modal>
  </div>
<br>
</div>
</div>
</template>

<script>
import axios from "axios";
import MoviesREST from "@/rest/moviesREST";
export default {
  name: 'MovieWorld',
  components:{
  },
  data(){
    return{
        infos:[],   
        terms:false,   
        summary_data:{},
        isDisabled:true,
      selectedFile: null,    
 newData:
        {
  "Title": "",
  "Year": "",
  "Rated": "",
  "Released":"",
  "Runtime": "",
  "Genre": "",
  "Director": "",
  "Writer": "",
  "Actors": "",
  "Plot": "",
  "Language": "",
  "Country": "",
  "Awards": "",
  "Poster": "",
  "Ratings": [
    {
      "Source": "",
      "Value": ""
    },
    {
      "Source": "",
      "Value": ""
    },
    {
      "Source": "",
      "Value": ""
    }
  ],
  "Metascore": "",
  "imdbRating": "",
  "imdbVotes": "",
  "imdbID": "",
  "Type": "",
  "DVD": "",
  "BoxOffice": "",
  "Production": "",
  "Website": "",
  "Response": ""
},
updatedData:{}
        }
  },
  created(){
   this.fetchData()
   // this.fetchMovieData()
  },
  computed:{

  },
methods: {
resetForm(){
console.log("clearing form data");
this.newData.Title='';
this.newData.Year='';
},
fetchData(){
        var self = this;   
        MoviesREST.getRecords().then(response => {
          if (response.message !== undefined) {
            console.log(response.message);
          } 
          else{
            self.infos = response
          }
          });
      },
addRecord(){
  var self= this;
  MoviesREST.addRecord('', {data:this.newData}).then(response => {
  if (response.message !== undefined) {
  console.log(response.message);
  } 
  else{
  self.newData.Title="";
  self.newData.Year="";
  self.fetchData()
  self.infos.push(self.newData)
  }
  });
},
deleteRecord(id){
  var self = this;
  MoviesREST.deleteRecord(id).then(response => {
  if (response.message !== undefined) {
  console.log(response.message);
  } 
  else{
  self.fetchData()
  }
  });
},
openUpdateForm(id, item){
  this.$refs['updateModal'].show()
  this.updatedData = item
},
openSummary(id, item){
  console.log(item)
  this.summary_data = item
  this.$refs['summaryModal'].show()
},
updateRecord(){
    var self = this;
    MoviesREST.updateRecords(this.updatedData.id, {data:this.updatedData}).then(response => {
    if (response.message !== undefined) {
      console.log(response.message);
    } 
    else{
      self.fetchData()
    }
    });
},
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn-space { margin-right: 5px;}
.btn-info{margin-top:5px;}
h3 {  margin: 40px 0 0;}
ul {  list-style-type: none;  padding: 0;}
li {  display: inline-block;  margin: 0 10px;}
a {  color: #42b983;}
img{width: 150px;  height: 200px;}
.example1 {
 height: 50px;	
 overflow: hidden;
 position: relative;
 
}
.example1 h3 {
 
 font-size: 2em;
 color:#dc3545;
 position: absolute;
 width: 100%;
 height: 100%;
 margin: 0;
 line-height: 50px;
 text-align: center;
 /* Starting position */
 -moz-transform:translateX(100%);
 -webkit-transform:translateX(100%);	
 transform:translateX(100%);
 /* Apply animation to this element */	
 -moz-animation: example1 12s linear infinite;
 -webkit-animation: example1 12s linear infinite;
 animation: example1 12s linear infinite;
}
/* Move it (define the animation) */
@-moz-keyframes example1 {
 0%   { -moz-transform: translateX(100%); }
 100% { -moz-transform: translateX(-100%); }
}
@-webkit-keyframes example1 {
 0%   { -webkit-transform: translateX(100%); }
 100% { -webkit-transform: translateX(-100%); }
}
@keyframes example1 {
 0%   { 
 -moz-transform: translateX(100%); /* Firefox bug fix */
 -webkit-transform: translateX(100%); /* Firefox bug fix */
 transform: translateX(100%); 		
 }
 100% { 
 -moz-transform: translateX(-100%); /* Firefox bug fix */
 -webkit-transform: translateX(-100%); /* Firefox bug fix */
 transform: translateX(-100%); 
 }
}
</style>
