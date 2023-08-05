<template>
    Limit: <input type="number" min="0" v-model="vlimit" name="limit" autocomplete="off"> <br>
    Name: <input type="text" v-model="vname" name="name" autocomplete="off"> | Age: <input type="number" v-model="vage" name="age" autocomplete="off">

    <h1>{{title}}</h1>
    <p class="comment"><slot name="comment">default</slot></p>

    <DB v-for="item in DBs" :key="item.title+item.refresh+vlimit+vname+vage" :title="item.title" :_id="item._id" :fake="item.fake" :uri="item.uri"
                                    @mountGet="(bucket)=>{fget(getUri(item.uri), bucket);}" 
                                    @mountGetw="async(bucket)=>{bucket.s = await fgetw(getUri(item.uri));}" 
                                        @clickPost="(body, bucket)=>{this.fpost(item.uri, body, bucket, vlimit);}" 
                                        @clickPut="(id, body)=>{this.fput(item.uri + id, body);}"
                                        @clickDelete="(id)=>{this.fdelete(item.uri + id); item.refresh *= -1;}"
    ></DB>
</template>

<script>
export default{
    props: {title:{type:String}, fpost:{type:Function},
            fput:{type:Function}, fdelete:{type:Function},
            fget:{type:Function}, fgetw:{type:Function}
            },

    data(){return{
                vname:'', vage:'', vlimit:10,
                DBs:[
                    {title:'Mysql', uri:'http://localhost:5020/', _id:'id', fake:false, refresh:1},
                    {title:'Mongoose', uri:'http://localhost:5030/', _id:'_id', fake:false, refresh:1},
                    {title:'PostgreSQL', uri:'http://localhost:5040/', _id:'id', fake:false, refresh:1},
                    {title:'JSON Server', uri:'http://localhost:3000/Resource1/', _id:'id', fake:false, refresh:1},
                    {title:'jsonplaceholder.typicode.com', uri:'https://jsonplaceholder.typicode.com/users/', _id:'id', fake:true, refresh:1},
                    //{title:'Simple File', uri:'http://localhost:8080/j.json' /*(or just [uri:'j.json']) */, _id:'id', fake:false, refresh:1}//in the public folder
                    ]
                }
            },

    methods:{
        getUri(uri){
                uri += '?_limit='+((Number.isInteger(this.vlimit)&&this.vlimit>=0)?this.vlimit:0);//fake/jsonServer use _limit
                uri += '&_name='+this.vname; //named _name not(name) for not to clash with fake/jsonServer
                uri += '&name_like='+this.vname; //fake/jsonServer
                if (Number.isInteger(this.vage) && this.vage!=="e")
                {
                    uri += '&_age='+this.vage;//named _age not(age) for not to clash with fake/jsonServer
                    uri += '&age_gte='+this.vage; //jsonServer (no like)
                    uri += '&age_lte='+this.vage; //jsonServer (no like)
                }
                uri += '&_sort=id&_order=desc'; //fake/jsonServer use _sort and _order
                
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
