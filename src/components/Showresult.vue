<template>
    <Popup v-if="showpopup" @close="closepopup" :text="popuptext"/>
        limit: <input type="number" min="0" v-model="vlimit" name="limit"> <br>
        name: <input type="text" v-model="vname" name="name"> | age: <input type="number" v-model="vage" name="age">

    <h1>{{title}}</h1>
    <p class="comment"><slot name="comment">default</slot></p>

    <DB v-for="item in DBs" :key="item.title+item.refresh+vlimit" :title="item.title" :_id="item._id" :fake="item.fake"
                                    @mountGet="(bucket)=>{fget(makeUri(item.uri), bucket);}" 
                                    @mountGetw="async(bucket)=>{bucket.s = await fgetw(makeUri(item.uri));}" 
                                        @clickPost="PostClick(item.uri); item.refresh *= -1;" 
                                        @clickPut="(id)=>{ popuptext=''; if(!id){popuptext='select'} PutClick(item.uri, id); item.refresh *= -1; }"
                                        @clickDelete="(id)=>{ popuptext=''; if(!id){popuptext='select'} DeleteClick(item.uri, id); item.refresh *= -1; }"
    ></DB>
</template>

<script>
export default{
    props: {title:{type:String}, fpost:{type:Function},
            fput:{type:Function}, fdelete:{type:Function},
            fget:{type:Function}, fgetw:{type:Function}
            },

    data(){return{
                vname:'', vage:'', vlimit:1,
                showpopup:false, popuptext:'', 
                DBs:[
                    {title:'Mysql DB', uri:'http://localhost:5020/', _id:'id', fake:false, refresh:1},
                    {title:'Mongoose', uri:'http://localhost:5030/', _id:'_id', fake:false, refresh:1},
                    {title:'PostgreSQL', uri:'http://localhost:5040/', _id:'id', fake:false, refresh:1},
                    {title:'JSON Server', uri:'http://localhost:3000/Resource1/', _id:'id', fake:false, refresh:1},
                    {title:'jsonplaceholder.typicode.com', uri:'https://jsonplaceholder.typicode.com/users/', _id:'id', fake:true, refresh:1},
                    //{title:'Simple File', uri:'http://localhost:8080/j.json' /*(or just [uri:'j.json']) */, _id:'id', fake:false, refresh:1}//in the public folder
                    ]
                }
            },

    methods:{
        PostClick(uri){ 
            if(this.dataCheck()){this.showpopup = true}
            else{this.fpost(uri, {"name":this.vname, "age":this.vage});}
            } ,

        PutClick(uri, id){ 
            if(this.popuptext || this.dataCheck()){this.showpopup = true}
            else{this.fput(uri + id, {"name":this.vname, "age":this.vage});}
            } ,
            
        DeleteClick(uri, id){
            if(this.popuptext){this.showpopup = true}
            else{this.fdelete(uri + id);}
            } ,

        closepopup(){this.showpopup = false} ,

        dataCheck(){
            this.popuptext='';
            if (this.vname==="" || this.vage===""){this.popuptext='Insert Data !'; return true;}
            else if (!Number.isInteger(this.vage) || this.vage==="e" || this.vage<0){this.popuptext='Insert Positive Integer Age !'; return true;}
            },

        makeUri(uri){
                uri += '?_limit='+((Number.isInteger(this.vlimit)&&this.vlimit>=0)?this.vlimit:0);
                uri += '&_sort=id&_order=desc'; //fake and jsonServer
                return uri;
            }
        }
}
</script>

<style>
    h1{
    margin: 10px;
    }

    .comment{
    color: rgba(0, 255, 0, 0.500);
    text-decoration: underline;
    font-style: italic;
    margin: 0;
    }
</style>
