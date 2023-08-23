<template>
    <header>
            <div class=".logo"><router-link to="/"><img src="logo.png" alt="logo"></router-link></div>
            <nav>
                <router-link to="/xhr">XHR</router-link> | 
                <router-link to="/jquery">JQuery</router-link> |
                <router-link to="/fetch">Fetch</router-link> |
                <router-link to="/axios">Axios</router-link>
            </nav>
    </header>

    <div class="fliter">
        Limit: <input type="number" min="0" v-model="vlimit" name="limit" autocomplete="off"><br>
        Name: <input type="text" v-model="vname" name="name" autocomplete="off" spellcheck="false"><br>
        Age: <input type="number" v-model="vage" name="age" autocomplete="off" onkeydown="javascript: return ['Backspace','Delete','ArrowLeft','ArrowRight'].includes(event.code) ? true : !isNaN(Number(event.key)) && event.code!=='Space'" >
    </div>

        <main>
            <DB v-for="item in DBs" :key="item.title+item.deleteRefresh+vlimit+vname+vage" :title="item.title" :_id="item._id" :fake="item.fake" :uri="item.uri" :color="item.color"
                                @mountGet="(bucket)=>{fget(getUri(item.uri), bucket);}" 
                                @mountGetw="async(bucket)=>{bucket.s = await fgetw(getUri(item.uri));}" 
                                    @clickPost="(body, bucket)=>{this.fpost(item.uri, body, bucket, vlimit);}" 
                                    @clickPut="(id, body)=>{this.fput(item.uri+id, body);}"
                                    @clickDelete="(id)=>{this.fdelete(item.uri+id); item.deleteRefresh *= -1;}"
            ></DB>
        </main>


    <footer>
        footer
    </footer>
</template>

<script>
export default{
    props: {fpost:{type:Function},
            fput:{type:Function}, fdelete:{type:Function},
            fget:{type:Function}, fgetw:{type:Function}
            },

    data(){return{
                vname:'', vage:'', vlimit:10,
                DBs:[
                    {title:'mysql.png', uri:'http://localhost:5010/', _id:'id', fake:false, deleteRefresh:1, color:'blue'},
                    {title:'postgresql.png', uri:'http://localhost:5030/', _id:'id', fake:false, deleteRefresh:1, color:'green'},
                    {title:'jsonserver.png', uri:'http://localhost:3000/Resource1/', _id:'id', fake:false, deleteRefresh:1, color:'black'},
                    {title:'Fake API', uri:'https://jsonplaceholder.typicode.com/users/', _id:'id', fake:true, deleteRefresh:1, color:'white'},
                    {title:'mongodb.png', uri:'http://localhost:5020/', _id:'_id', fake:false, deleteRefresh:1, color:'pink'},
                    //{title:'Simple File', uri:'http://localhost:8080/j.json' /*(or just [uri:'j.json']) */, _id:'id', fake:false, deleteRefresh:1, color:'black'}//in the public folder
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

    main{
margin-top: 75px;
        margin-left: 200px;
        
        overflow: hidden;
    }

    .fliter{
        position: fixed;
      
        font-weight: bold;
        top:75px;
        left:0;
        text-align: center;

height: 100%;
        width:200px;
        
        border-right: solid 3px ;

/* background-color: black; */
        color:black;
        background-image: linear-gradient(90deg,#787878 0%,
                                                #b5b5b5 25%,
                                                #e3e3e3 50%,
                                                #b5b5b5 75%,
                                                #787878 100%
                                            ) ;

    }
.fliter input{
    border-radius: 20px;
}
    header{
        display:flex;
        justify-content: space-between;

        width: 100%;
        position: fixed;
 height: 75px;
        top:0px;
        left:0;
        /* background-color: #eaf2fb; */
        background-color: white;
        z-index: 100;
        border-bottom: solid 4px;
    }

    header .logo{
margin: auto 0;
    }

    header img{
       height: 60px;
        justify-items: center ;
        vertical-align: middle;
         margin: auto 0;

         position:relative;
        top:10%;
        left:0;
z-index: 1;

    }


    nav {
        padding: 30px;
        margin: auto 0;
    }
    nav a {
        background-color: #f44336;

        color: white;
        text-decoration: none;
        cursor: hand;
        padding: 15px;
        border-radius: 10px;
    }
    nav a:hover {
        background-color: #d32f2f;
    }
    nav a.router-link-exact-active {
        background-color: #42b983;
        color: white;
        cursor: default;
                font-weight: bold;
                padding: 20px;
    }
</style>
