<template >

    <nav>
        <ul class="pagination">
            <li class="page-item"><a class="page-link" href="#"><span>&laquo;</span></a></li>
            <li v-for="i in pages.pages" :key="i" class="page-item" :class="{currentStyle: current==i}" @click="changeCurrent(i)"><span class="page-link">{{i}}</span></li>
            <li class="page-item"><a class="page-link" href="#"><span>&raquo;</span></a></li>
        </ul>
    </nav>

</template>

<script>
export default{
    emits:['changepage'],
    props: { pages:{type:Object}, currentPage:{type:Number} },
    data(){return{
                current:1, 
            }
        },
    methods:{
        changeCurrent(i){
            this.current=i;
            this.$emit('changepage', i); 
        },
    }
}
</script> 

<style scoped>



@font-face {
    font-family: Rajdhani-Regular;
    src: url('C:\Users\MED\Desktop\AJAX Paradise\public\fonts\Rajdhani-Regular.ttf');
}

.pagination{
    list-style-type:none;
    /* background-color: white;
    border: solid 1px black;
    border-radius: 5px;*/
    margin: auto;
    width:50%; /* remove in mobile */
    max-width: 500px; /* remove in mobile */
    display:flex;
    justify-content:space-between;
}

.page-item{
    min-width:16px;
}
.page-item:hover{
    cursor: pointer;
}

.page-link{
    font-family: Rajdhani-Regular, sans-serif;
    font-size: 1.2rem;
    text-decoration: none;
}

.currentStyle{
    background-color: blue;
}
</style>