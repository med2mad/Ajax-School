<template>
    <Vbackpopup v-if="backpopup" @close="(popV)=>{vback=popV; backpopup=false;}"/>
    <header>
        <img src="hamburger-button.png" alt="hamburger-button back-end" class="hamburger-button" @click="backpopup=true;">

        <div class="logo"><router-link to="/"><img src="usetest.png" alt="logo"></router-link></div> 

        <p>Testing using :</p>
        <nav>
            <!-- <router-link to="/sub"> <div class="btn">subscribe</div> </router-link> -->
            <router-link to="/xhr"> <div class="btn">XHR</div> </router-link>
            <router-link to="/jquery"> <div class="btn">JQuery</div> </router-link>
            <router-link to="/fetch"> <div class="btn">Fetch</div> </router-link>
            <router-link to="/axios"> <div class="btn">Axios</div> </router-link>
        </nav>
    </header>

    <div class="side">
        <h2>Back-end :</h2>
        <div ref="back">
            <select name="vback" v-model="vback" id="">
                <option value="js">Js-Express</option><option value="php">PHP-Laravel</option>
            </select>
        </div>
        
        <div class="limit"></div>

        <h2>Filter :</h2>
        <input type="text" v-model="vname" name="name" placeholder="Name" autocomplete="off" spellcheck="false"><br>
        <input type="number" v-model="vage" name="age" placeholder="Age" autocomplete="off" onkeydown="javascript: return ['Backspace','Delete','ArrowLeft','ArrowRight'].includes(event.code) ? true : !isNaN(Number(event.key)) && event.code!=='Space'" >
        
        <div class="limit"></div>

        <h2>Limit :</h2>
        <input type="number" min="0" v-model="vlimit" name="limit" autocomplete="off"><br>
        
        <div class="limit"></div>

        <h2>Legend :</h2>
        <div class="legend">
            <div><div class="green"></div></div><div>Under 100 ms</div>
            <div><div class="orange"></div></div><div>100 ms to 200 ms</div>
            <div><div class="red"></div></div><div>Above 200 ms</div>
        </div>
    </div>

    <main>
        <DB v-for="item in DBs" :key="item._db+vback+vlimit+vname+vage" :back="vback" :_dblogofile="item._dblogofile" :_db="item._db" 
                            @mountGet="(bucket)=>{fget(getUri(item._url[vback]), bucket);}" 
                            @mountGetw="async(bucket)=>{bucket.a = await fgetw(getUri(item._url[vback]));}" 
                            @clickPost="(body, bucket)=>{this.fpost(item._url[vback], body, bucket, vlimit);}" 
                            @clickPut="(method, selectedId, body, i, bucket)=>{this.fput(method, item._url[vback]+selectedId, body, i, bucket);}"
                            @clickDelete="(method, selectedId, lastTableId, bucket)=>{this.fdelete(method, getUri(item._url[vback]+selectedId)+lastTableId, bucket);}"
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
                vback:'js', vname:'', vage:'', vlimit:10,
                backpopup:false, 
                DBs:[
                    {_db:'mysql', _dblogofile:'mysql.png', _url:{'js':'http://localhost:5010/', 'php':'http://127.0.0.1:8000/MysqlModel/'} }, //CORS shit ("http://localhost/mysql.php" and not just "mysql.php")
                    {_db:'mongoose', _dblogofile:'mongodb.png', _url:{'js':'http://localhost:5020/','php':'http://127.0.0.1:8000/MongoModel/'} },
                    {_db:'postgresql', _dblogofile:'postgresql.png', _url:{'js':'http://localhost:5030/', 'php':'http://127.0.0.1:8000/PostgreSQLModel/'} },
                    // {_db:'jsonserver', _dblogofile:'jsonserver.png', _url:{'js':'http://localhost:3000/Resource1/', 'js':'http://localhost:3000/Resource1/','php':'http://localhost:3000/Resource1/'}, _idClmn:'id'}, //is not compatible with FormData (need json body)
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
        getVback(){return this.vback;},
        // burgerButton(){
        //     const bs = this.$refs.back.style;
        //     if (bs.display=="none") {
        //         bs.display="block";
        //         bs.position="absolute";
        //         bs.top="50px";
        //         bs.left="5px";
        //         bs.zIndex=100;
        //     }
        //     else{
        //         bs.display="none";
        //     }
        // }
    }
}
</script>

<style>
    @import 'C:\Users\MED\Desktop\AJAX Paradise\public\styles\showresult.css';
</style>
