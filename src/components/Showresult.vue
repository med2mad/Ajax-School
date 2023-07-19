<template>
    <Popup v-if="showpopup" @close="closepopup" :text="popuptext"/>
        limit: <input type="number" v-model="vlimit"> <br>
        name: <input type="text" v-model="vname"> | age: <input type="number" v-model="vage">

    <h1>{{title}}</h1>
    <p class="comment"><slot name="comment">default</slot></p>

    <DB v-for="item in DBs" :key="item.title+vlimit" :title="item.title" :_id="item._id" :fake="item.fake"
                                    @mountGet="(bucket)=>{fget(item.uri+'?_limit='+vlimit, bucket);}" 
                                    @mountGetw="async(bucket)=>{bucket.s = await fgetw(item.uri+'?_limit='+vlimit);}" 
                                        @clickPost="PostClick(item.uri)" 
                                        @clickPut="(id)=>{PutClick(item.uri, id);}" 
                                        @clickDelete="(id)=>{DeleteClick(item.uri, id);}" 
    />
    
</template>

<script>
export default{
    props: {title:{type:String}, fpost:{type:Function},
            fput:{type:Function}, fdelete:{type:Function},
            fget:{type:Function}, fgetw:{type:Function}
            },

    data(){return{
                vname:'', vage:'', vlimit:1, showpopup:false, popuptext:'', render:true,
                DBs:[
                    {title:'Mysql DB', uri:'http://localhost:5020/', _id:'id', fake:false},
                    {title:'Mongoose', uri:'http://localhost:5030/', _id:'_id', fake:false},
                    {title:'PostgreSQL', uri:'http://localhost:5040/', _id:'id', fake:false},
                    {title:'JSON Server', uri:'http://localhost:3000/Resource1/', _id:'id', fake:false},
                    {title:'jsonplaceholder.typicode.com', uri:'https://jsonplaceholder.typicode.com/albums/69' , _id:'id', fake:true},
                    //{title:'Simple File', uri:'http://localhost:8080/j.json' /*(or just [uri:'j.json']) */, _id:'id'}//in the public folder
                    ]
                }
            },

    methods:{
        PostClick(uri){ 
            if(this.popuptext){this.showpopup = true}
            else{this.fpost(uri, {"name":this.vname, "age":this.vage});}
            } ,

        PutClick(uri, p){ 
            if(this.dataCheck()){this.showpopup = true}
            else{this.fput(uri + p, {"name":this.vname, "age":this.vage});}
            } ,
            
        DeleteClick(uri, p){this.fdelete(uri + p);} ,

        closepopup(){this.showpopup = false} ,

        dataCheck(){
            if (this.vname==="" || this.vage===""){this.popuptext='Insert Data !'; return true;}
            else if(!Number.isInteger(this.vage)){this.popuptext='Insert Integer Age !'; return true;}
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
