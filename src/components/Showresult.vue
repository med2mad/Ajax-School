<template>
    <Popup v-if="showpopup" @close="closepopup"/>
    name: <input type="text" v-model="vname"> | age: <input type="number" v-model="vage">

    <h1>{{title}}</h1>
    <p class="comment"><slot name="comment">default</slot></p>

    <DB v-for="item in this.DBs" :key="item._id" :title="item.title" :_id="item._id" 
                                    @mountGet="(bucket)=>{fget(item.uri, bucket);}" 
                                    @mountGetw="async(bucket)=>{bucket.w = await this.fgetw(item.uri);}" 
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
                vname:'', vage:'', showpopup:false,
                DBs:[
                    {title:'Mysql DB', uri:'http://localhost:5020/', _id:'id'},
                    {title:'Mongoose', uri:'http://localhost:5030/', _id:'_id'},
                    {title:'PostgreSQL', uri:'http://localhost:5040/', _id:'id'},
                    {title:'JSON Server', uri:'http://localhost:3000/users?_limit=1', _id:'id'},
                    {title:'JSON File', uri:'j.json', _id:'id'}//in the public folder
                    ]
                }
            },

    methods:{
        PostClick(uri){ 
            if(this.vname==="" || this.vage===""){this.showpopup = true}
            else{this.fpost(uri, {"name":this.vname, "age":this.vage});}
            } ,

        PutClick(uri, p){ 
            if(this.vname==="" || this.vage===""){this.showpopup = true}
            else{this.fput(uri + p, {"name":this.vname, "age":this.vage});}
            } ,
            
        DeleteClick(uri, p){this.fdelete(uri + p);} ,

        closepopup(){this.showpopup = false}
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
