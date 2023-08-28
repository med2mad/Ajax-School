<template>
    <header>
        <p><router-link to="/">Test DataBase Speed using:</router-link></p>
        
            <nav>
                <router-link to="/xhr">XHR</router-link>|
                <router-link to="/jquery">JQuery</router-link>|
                <router-link to="/fetch">Fetch</router-link>|
                <router-link to="/axios">Axios</router-link>
            </nav>
    </header>

    <div class="side">
        <div class="logo"><router-link to="/"><img src="logo.png" alt="logo"></router-link></div>
        
<hr>

        <h2 class="h2">Filter :</h2>
        Name <br> <input type="text" v-model="vname" name="name" autocomplete="off" spellcheck="false"><br>
        Age <br> <input type="number" v-model="vage" name="age" autocomplete="off" onkeydown="javascript: return ['Backspace','Delete','ArrowLeft','ArrowRight'].includes(event.code) ? true : !isNaN(Number(event.key)) && event.code!=='Space'" >
    
        <div class="limit">
         </div>

           <h2>Limit :</h2>
            <input type="number" min="0" v-model="vlimit" name="limit" autocomplete="off"><br>


        <div class="limit">
         </div>

        <h2>Legend :</h2>
        <table class="legend" cellspacing="6">
            <tr><td><div class="green"></div></td><td>Under <br> 100 ms</td></tr>
            <tr><td><div class="orange"></div></td><td>Between 100 <br> and 200 ms</td></tr>
            <tr><td ><div class="red"></div></td><td>Above <br> 200 ms</td></tr>
        </table>
    </div>

        <main>
            <DB v-for="item in DBs" :key="item.dblogofile+item.deleteRefresh+vlimit+vname+vage" :dblogofile="item.dblogofile" :_id="item._id" :fake="item.fake" :uri="item.uri" 
                                @mountGet="(bucket)=>{fget(getUri(item.uri), bucket);}" 
                                @mountGetw="async(bucket)=>{bucket.s = await fgetw(getUri(item.uri));}" 
                                    @clickPost="(body, bucket)=>{this.fpost(item.uri, body, bucket, vlimit);}" 
                                    @clickPut="(id, body)=>{this.fput(item.uri+id, body);}"
                                    @clickDelete="(id)=>{this.fdelete(item.uri+id); item.deleteRefresh *= -1;}"
            ></DB>
        </main>


    <footer>
        <div class="footer1">
            <span>Filter :</span><br>
            Name : <input type="text" v-model="vname" name="name" autocomplete="off" spellcheck="false">
            | Age : <input type="number" v-model="vage" name="age" autocomplete="off" onkeydown="javascript: return ['Backspace','Delete','ArrowLeft','ArrowRight'].includes(event.code) ? true : !isNaN(Number(event.key)) && event.code!=='Space'" >
        </div>
        <div class="footer2">
            <span>Limit : </span>
            <input type="number" min="0" v-model="vlimit" name="limit" autocomplete="off">
            <!-- <p>Created by "Mohammad LEGHDAICH" in 2023, for portfolio purpose only</p> -->
        </div>
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
                    {dblogofile:'mysql.png', uri:'http://localhost:5010/', _id:'id', fake:false, deleteRefresh:1},
                    {dblogofile:'postgresql.png', uri:'http://localhost:5030/', _id:'id', fake:false, deleteRefresh:1},
                    {dblogofile:'jsonserver.png', uri:'http://localhost:3000/Resource1/', _id:'id', fake:false, deleteRefresh:1},
                    {dblogofile:'Fake API', uri:'https://jsonplaceholder.typicode.com/users/', _id:'id', fake:true, deleteRefresh:1},
                    {dblogofile:'mongodb.png', uri:'http://localhost:5020/', _id:'_id', fake:false, deleteRefresh:1},
                    //{dblogofile:'Simple File', uri:'http://localhost:8080/j.json' /*(or just [uri:'j.json']) */, _id:'id', fake:false, deleteRefresh:1}//in the public folder
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
@font-face {
    font-family: JlsspacegothicRnc-n2zY;
    src: url('C:\Users\MED\Desktop\AJAX Paradise\public\fonts\JlsspacegothicRnc-n2zY.otf');
}
@font-face {
    font-family: Roboto-Light;
    src: url('C:\Users\MED\Desktop\AJAX Paradise\public\fonts\Roboto-Light.ttf');
}  
.side h2{font-family:  Roboto-Light;
    margin-bottom: 0px;
    color:brown;
}

header p a{font-family:  JlsspacegothicRnc-n2zY;
    color: white;
    font-size: clamp( 0.2rem , 4vw + 0.2rem , 3rem );
    

    margin:0px;
    font-style: italic;
    font-weight: bold;
    text-shadow: 0px 0px 9px blue;
}
    header{
        width: 100%;
        position: fixed;
        gap:0px;
    height: 75px;
        top: 0px;
    left: 0px;
        /* background-color: black; */
        /* background-color: rgb(36, 36, 36); */
          background-image: linear-gradient(180deg ,rgb(26, 26, 26),white      ) ;
       /* background-image: linear-gradient(45deg ,white 0%, black 50%  ) ; */

box-shadow: 0px 0px 9px blue;
        z-index: 200;

        display: flex;
        justify-content: space-between;
        align-items: center;

border-bottom: solid 4px black;
    }

    main{
        margin-top: 75px;
        margin-left: 185px;
        overflow: hidden;
    }

    .side{
        
        position: fixed;
      font-family: 'Roboto', sans-serif;

        top:75px;
        left:0;

height: 85vh;

       overflow: auto;

border-radius: 0 0 40px 0px;
        width:180px;
padding-top: 0px;

        border-right: solid 3px ;
 border-bottom: solid 1px ;
/* background-color: black; */

        background-image: linear-gradient(90deg,#787878 0%,
                                                #b5b5b5 25%,
                                                #e3e3e3 50%,
                                                #b5b5b5 75%,
                                                #787878 100%
                                            ) ;

    }
.side input{
    border-radius: 20px;
    text-align: center;
}

.side img{
    height: 90px;
    width: 150px;
}

.side .logo{

background-color: black ;
border: solid 1px white;
border-radius: 10px;
}

.side hr{margin: 15px auto;}

.side h2{margin-top: 15px;}

.side .legend td{
    text-align: left;
    min-width: 20px;
}

.side .legend tr td div{
width:20px;
height:20px;
border:solid 1px;
}

    nav {
white-space: nowrap;
        padding: 30px 10px;
    }
    nav a {
        /* background-color: white; */
            background-image: linear-gradient(180deg , white 10% , #949494 50%, white  ) ;
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
         background-image: linear-gradient(180deg , white 10% , #dd6060 50%, white  ) ;
    }
    nav a.router-link-exact-active {
        background-color: #d32f2f;
         background-image: linear-gradient(180deg , white 10% , #ee2727 50%, white  ) ;
        color: white;
        cursor: default;
        font-weight: bold;
        padding: 20px;
        border-radius: 50px;
        font-size: 1.2rem;
        box-shadow:none;
        box-shadow: #787878 4px 4px 1px;
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
footer span{
color:brown;font-weight: bold;
}
footer input{
     border-radius: 20px;
}
footer .footer1{   padding-bottom:2px; border-radius: 20px 20px 0px 0px ;
        background-image: linear-gradient(180deg,#787878 0%,
                                            #b5b5b5 25%,
                                            #e3e3e3 50%,
                                            #b5b5b5 75%,
                                            #787878 100%
                                        ) ;
}
footer .footer2{ height:20px; padding-top:6px; border-top: solid 1px;
        background-image: linear-gradient(180deg,#787878 0%,
                                            #b5b5b5 25%,
                                            #e3e3e3 50%,
                                            #b5b5b5 75%,
                                            #787878 100%
                                        ) ;
}
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
        bottom: 0;
        height:72px;
    }
}
</style>
