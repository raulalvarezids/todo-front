<template>
    <div>
        <input type="text" v-model="taskText">
        <button @click="handleAddNewTask">Add</button>
    </div>

</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useUserStore } from '../store/user';

const store = useUserStore()

let taskText = ref('')
const emits = defineEmits(['handleNewTask','handleNewUserTask'])

const handleAddNewTask = () => {

    if(store.token === null){
        const id = generarIdAleatorio()
        emits('handleNewTask',{descripcion:taskText.value,status:false,_id:id})       
    }else{
        emits('handleNewUserTask', { descripcion: taskText.value, status: false })               
    }    



    taskText.value=''    
}

function generarIdAleatorio() {
    return 'id-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now().toString(36);
}


</script>

<style scoped>


div{
    display: flex;
    gap: 10px;
    margin-bottom: 30px
}
input{
    width: 80%;    
    border-radius: 5px;
    padding: 5px;    
    outline: none;
}

button{
    width: 20%;
    background-color: #3B82F6;
    color: white;
    border: none;
    border-radius: 5px;  
    cursor: pointer;  
}

@media(min-width:1100px) {
    
    input{
        font-size: 18px
    }

    button{
        font-size: 17px
    }
}


</style>