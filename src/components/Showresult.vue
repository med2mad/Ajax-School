<template>
    <header>
        <select name="vback" v-model="vback" id=""><option>Js - Express</option><option>PHP - Laravel</option></select>

        <p><router-link to="/">Testing using :</router-link></p>
        <nav>
            <router-link to="/sub"> <div class="btn">subscribe</div> </router-link>
            <router-link to="/xhr"> <div class="btn">XHR</div> </router-link>
            <router-link to="/jquery"> <div class="btn">JQuery</div> </router-link>
            <router-link to="/fetch"> <div class="btn">Fetch</div> </router-link>
            <router-link to="/axios"> <div class="btn">Axios</div> </router-link>
        </nav>
    </header>

    <div class="side">
        <div class="logo"><router-link to="/"><img src="logo.png" alt="logo"></router-link></div> 
        <hr>

        <h2>Filter :</h2>
        Name <br> <input type="text" v-model="vname" name="name" autocomplete="off" spellcheck="false"><br>
        Age <br> <input type="number" v-model="vage" name="age" autocomplete="off" onkeydown="javascript: return ['Backspace','Delete','ArrowLeft','ArrowRight'].includes(event.code) ? true : !isNaN(Number(event.key)) && event.code!=='Space'" >
        <div class="limit"></div>

        <h2>Limit :</h2>
        <input type="number" min="0" v-model="vlimit" name="limit" autocomplete="off"><br>
        <div class="limit"></div>

        <h2>Legend :</h2>
        <div class="legend">
            <div><div class="green"></div></div><div>Under 100 ms</div>
            <div><div class="orange"></div></div><div>Between 100 <br> and 200 ms</div>
            <div><div class="red"></div></div><div>Above 200 ms</div>
        </div>
    </div>

    <main>
        <DB v-for="item in DBs" :key="item._db+vback+vlimit+vname+vage" :_dblogofile="item._dblogofile" :_idClmn="item._idClmn" :_db="item._db" 
                            @mountGet="(bucket)=>{fget(getUri(item._url[vback]), bucket);}" 
                            @mountGetw="async(bucket)=>{bucket.s = await fgetw(getUri(item._url[vback]));}" 
                            @clickPost="(body, bucket)=>{this.fpost(item._url[vback], body, bucket, vlimit);}" 
                            @clickPut="(selectedId, body, i, bucket)=>{this.fput(item._url[vback]+selectedId, body, i, bucket);}"
                            @clickDelete="(selectedId, lastTableId, bucket)=>{this.fdelete(item._url[vback]+selectedId, lastTableId, bucket);}"
        ></DB>
    </main>

    <footer>
        <div class="footer1">
            <div class="span">Filter :</div>
            <div class="flex2">
            Name : <input type="text" v-model="vname" name="name" autocomplete="off" spellcheck="false"><br>
            Age : <input type="number" v-model="vage" name="age" autocomplete="off" onkeydown="javascript: return ['Backspace','Delete','ArrowLeft','ArrowRight'].includes(event.code) ? true : !isNaN(Number(event.key)) && event.code!=='Space'" >
            </div>
        </div>
        <div class="footer2">
            <span class="span">Limit : </span>
            <input type="number" min="0" v-model="vlimit" name="limit" autocomplete="off">
        </div>
    </footer>
    
</template>

<script>
export default{
    props: {fpost:{type:Function},sub:{type:String},
            fput:{type:Function}, fdelete:{type:Function},
            fget:{type:Function}, fgetw:{type:Function},
            },

    data(){return{
                vback:'Js - Express', vname:'', vage:'', vlimit:10,
                DBs:[
                    {_db:'mysql', _dblogofile:'mysql.png', _url:{'Js - Express':'http://localhost:5010/', 'js':'http://localhost:1010/', 'php':'http://localhost:80/mysql.php/'}, _idClmn:'id'}, //CORS shit ("http://localhost/mysql.php" and not just "mysql.php")
                    {_db:'mongoose', _dblogofile:'mongodb.png', _url:{'Js - Express':'http://localhost:5020/', 'js':'http://localhost:1020/','php':'http://localhost:80/phpmongoback/mongodb.php/'}, _idClmn:'_id'},
                    {_db:'postgresql', _dblogofile:'postgresql.png', _url:{'Js - Express':'http://localhost:5030/', 'js':'http://localhost:1030/','php':'http://localhost:80/postgress.php/'}, _idClmn:'id'},
                    // {_db:'jsonserver', _dblogofile:'jsonserver.png', _url:{'Js - Express':'http://localhost:3000/Resource1/', 'js':'http://localhost:3000/Resource1/','php':'http://localhost:3000/Resource1/'}, _idClmn:'id'}, //is not compatible with FormData (need json body)
                    // {_db:'fake', _dblogofile:'fake', _url:{'Js - Express':'https://jsonplaceholder.typicode.com/users/','js':'https://jsonplaceholder.typicode.com/users/','php':'https://jsonplaceholder.typicode.com/users/'}, _idClmn:'id'},
                    // {_db:'file', _dblogofile:'Simple File', _url:'http://localhost:8080/j.json' /*(or [_url:'j.json'] because served links will add the current _url) */, _idClmn:'id'} //in the public folder. ( use: var o = JSON.parse(fs.readFileSync(filePath)); + fs.writeFileSync(path, JSON.stringify(o)) / var o = require(filePath); )
                    ]
                }
            },

    methods:{
        getUri(url){
                url += '?_limit='+((Number.isInteger(this.vlimit)&&this.vlimit>=0)?this.vlimit:0);//fake/jsonServer use _limit
                url += '&_name='+this.vname; //named _name not(name) for not to clash with fake/jsonServer
                url += '&name_like='+this.vname; //fake/jsonServer
                if (Number.isInteger(this.vage) && this.vage!=="e")
                {
                    url += '&_age='+this.vage;//named _age not(age) for not to clash with fake/jsonServer
                    url += '&age_gte='+this.vage;    url += '&age_lte='+this.vage;    //jsonServer (no like)
                }
                url += '&_sort=id&_order=desc'; //fake/jsonServer use _sort and _order
                
                return url;
            },
        getVback(){return this.vback;}
    }
}
</script>

<style>
@font-face {
    font-family: Roboto-Light;
    src: url('C:\Users\MED\Desktop\AJAX Paradise\public\fonts\Roboto-Light.ttf');
}
@font-face {
    font-family: Rajdhani-Light;
    src: url('C:\Users\MED\Desktop\AJAX Paradise\public\fonts\Rajdhani-Light.ttf');
}

header{
    background-image: linear-gradient(180deg, rgb(85, 85, 85), rgb(36, 35, 35));
    border-bottom: solid 4px gray;
    width: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    height: 70px;
    z-index: 200;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
header p{
    margin-left:auto;
    margin-right:20px;
}
header p a{
    font-family: Rajdhani-Light, sans-serif;
    font-style: italic;
    text-shadow: 0px 0px 9px blue;
    color: white;
    font-size: clamp( 0.2rem , 4vw + 0.2rem , 2rem );
    font-weight: bold;
}

header nav{
    width: 400px;
    height: 100%;
    display: flex; /* align links */
}
header nav a{
    color: white;
    font-family: Rajdhani-Light, sans-serif;
    font-size: 1.4rem;font-weight: bold;
    text-decoration: none;
    border-left: solid 1px gray;
    border-right: solid 1px gray;
    flex:1;
    position: relative;
}
header nav a .btn{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}

header nav a:hover{
    background-image: linear-gradient(180deg, rgb(133, 133, 133), rgb(59, 59, 59)) ;
}
header nav a.router-link-exact-active{
    text-shadow: 0px 0px 9px blue;
    background-image: linear-gradient(180deg, rgb(182, 182, 182), rgb(59, 59, 59));
    cursor: default;
    font-size: 2.1rem;
    font-weight: bolder;
}

main{
    margin-top: 70px;
    margin-left: 182px;
}

.side{
    font-family: Rajdhani-Light, sans-serif;
    font-weight: bold;
    border-right: solid 3px ;
    border-bottom: solid 1px ;
    background-image: linear-gradient(90deg,#787878 0%,
                                            #b5b5b5 25%,
                                            #e3e3e3 50%,
                                            #b5b5b5 75%,
                                            #787878 100%
                                        ) ;
    position: fixed;
    overflow-y: auto ;
    overflow-x: hidden;
    height: 100vh;
    width:180px;
}
.side .logo{
    background-color: black;
    border: solid 4px #2c3e50; 
    border-radius: 10px;
    padding: 7px 10px;
    text-align: center;
}
.side img{
    width: 100%;
}
.side h2{
    font-family: Roboto-Light, sans-serif;
    color:brown;
    margin: 1vh auto; /* not to have to change "marging-bottom" */
    margin-top: 2vh;
}
.side input{
    border-radius: 20px;
    text-align: center;
}

.side hr{margin: 1vh auto; width:80%;}

.side .limit{
    border-bottom: solid 1px brown;
    width : 75%;
    margin: auto;
    padding: 1.5vh 0px;
}

.side .legend{
    display: grid;
    grid-template-columns: 1fr 7fr;
    align-items: center;
    text-align: left;
    grid-gap: 6px 10px;
    margin-left:10px;
}
.side .legend div div{ /* colored blocks */
    width:20px;
    height:20px;
    border:solid 1px;
}

footer{
    display: none;
    background-image: linear-gradient(180deg,#787878 0%,
                                            #b5b5b5 25%,
                                            #e3e3e3 50%,
                                            #b5b5b5 75%,
                                            #787878 100%
                                        ) ;
    border-top: solid 2px black;
    border-radius: 20px 20px 0px 0px ;
}
footer .span{
    color:brown;font-weight: bold;
}
footer input{
    border-radius: 20px;
    text-align: center;
}

footer .footer1{
    padding-bottom:2px; border-radius: 20px 20px 0px 0px ;
    display: flex; justify-content: center; align-items:center; gap:10px;
    background-image: linear-gradient(180deg,#787878 0%,
                                            #b5b5b5 25%,
                                            #e3e3e3 50%,
                                            #b5b5b5 75%,
                                            #787878 100%
                                        ) ;
}
footer .footer1 .flex2{
    text-align: right;
}

footer .footer2{ 
    height:20px; padding-top:6px; border-top: solid 1px;
    background-image: linear-gradient(180deg,#787878 0%,
                                            #b5b5b5 25%,
                                            #e3e3e3 50%,
                                            #b5b5b5 75%,
                                            #787878 100%
                                        ) ;
}

/*---------------------media query------------------------------------------*/

@media only screen and (max-width: 650px){
    .side{
        display: none;
    }

    main{
        margin:auto;
        padding-top: 70px;
        padding-bottom: 50px;
    }

    footer{
        display:block;
        width: 100%;
        position:fixed;
        height:72px;
        bottom: -4px;
    }

    header p{
        display:none;
    }
    header nav{
        width:100%;
    }
    header nav a{
        flex:1;
    }
}
</style>
