<template>
    <header>
        <p>Test DataBase Speed using:</p>
        
            <nav>
                <router-link to="/xhr">XHR</router-link>|
                <router-link to="/jquery">JQuery</router-link>|
                <router-link to="/fetch">Fetch</router-link>|
                <router-link to="/axios">Axios</router-link>|
            </nav>
    </header>

    <div class="filter">
        <div class="logo"><router-link to="/"><img src="logo.png" alt="logo"></router-link></div>
        
<hr>

        <h2 class="h2">Filter :</h2>
        Name<input type="text" v-model="vname" name="name" autocomplete="off" spellcheck="false"><br>
        Age<input type="number" v-model="vage" name="age" autocomplete="off" onkeydown="javascript: return ['Backspace','Delete','ArrowLeft','ArrowRight'].includes(event.code) ? true : !isNaN(Number(event.key)) && event.code!=='Space'" >
    
        <div class="limit">
         </div>

           <h2>Limit :</h2>
            <input type="number" min="0" v-model="vlimit" name="limit" autocomplete="off"><br>


        <div class="limit">
         </div>
        <h2>Legend :</h2>
        <table cellspacing="6">
            <tr><td class="green"></td><td>Under <br> 100 ms</td></tr>
            <tr><td class="orange"></td><td>Between 100 ms <br> and 200 ms</td></tr>
            <tr><td class="red"></td><td>Above <br> 200 ms</td></tr>
        </table>
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
        min-width: 425px;
        overflow: hidden;
    }

    header{
    font-family: 'Roboto', sans-serif;
        width: 100%;
        position: fixed;
        gap:0px;
    height: 75px;
        top: 0px;
    left: 0px;
        /* background-color: #eaf2fb; */
        background-color: rgb(36, 36, 36);
          /* background-image: linear-gradient(45deg ,#42b983 0%, white 50%  ) ; */
       /* background-image: linear-gradient(45deg ,white 0%, black 50%  ) ; */

        border-bottom: solid 4px;

        z-index: 200;

        display: flex;
        justify-content: space-between;
        align-items: center;

    }

header p{
    color: white;
    font-size: clamp( 0.2rem , 4vw + 0.2rem , 3rem );
    text-decoration: solid underline;
    margin:0px;
}
    .filter{
        position: fixed;
      font-family: 'Roboto', sans-serif;
        font-weight: bold;
        top:75px;
        left:0;


height: 100%;
        width:200px;
padding-top: 5px;

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
.filter input{
    border-radius: 20px;
}
   
.filter h2{
    margin-bottom: 0px;
    color:brown;
    font-size: 1.5rem;
}


.filter img{
      height: 90px;
    background-color: white;
border-radius: 10px;

}

.filter .logo{
border-bottom: solid 2px black;
padding: 10px 0px;
background-color:black;
border: solid 1px white;
border-radius: 10px;
}

.filter table td{
    text-align: left;
    min-width: 40px;
}

    nav {
white-space: nowrap;
        padding: 30px 0px;
    }
    nav a {
        background-color: white;
 font-weight: bold;
        color: black;
        text-decoration: none;
        cursor: hand;
        padding: 10px;
        border-radius: 10px;
        box-shadow: #787878 4px 4px 1px;
    }
    nav a:hover {
        background-color: #cfcece;
    }
    nav a.router-link-exact-active {
        background-color: #d32f2f;
        color: white;
        cursor: default;
        font-weight: bold;
        padding: 20px;
        border-radius: 50px;
        font-size: 1.2rem;
        box-shadow:none;
    }

    
.limit{
    border-bottom: solid 1px brown;
    width : 75%;
    padding-bottom: 10px;
    margin: auto;
    padding: 10px 0px;
}

hr{
    color: brown;
    width:50%;
}
.h2{
    margin-top:5px;
}
</style>
