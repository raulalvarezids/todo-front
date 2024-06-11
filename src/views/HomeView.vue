<template>
    <NavBar></NavBar>

    <h1 class="tittle">Tasks</h1>

    
    <div class="tasks__container">
        <AddTask @handleNewTask="addNewTaskLocal" @handleNewUserTask="addNewTaskUser"></AddTask>

        <TransitionGroup name="lista" tag="ul" >            
             <task  v-if="store.token==null" v-for="(x) in localTasks" :text=x.descripcion  :status="x.status"  :id="x._id" :key="x._id" @handledeleted="handleDeleteLocal" ></task>
             <task  v-else v-for="(x) in userTask" :text=x.descripcion  :status=x.status  :id="x._id" :key="x._id+x.descripcion" @deleting="deleteTaskHome" ></task>
        </TransitionGroup>        

        <h1 v-if="checkTasks" class="without">without tasks</h1>
    </div>

</template>

<script lang="ts" setup>

import { useUserStore } from '../store/user';

import NavBar from '../components/NavBar.vue'
import task from '../components/task.vue';
import { Ref, computed, onMounted, ref } from 'vue';
import { Tasks } from '../interfaces/task';
import AddTask from '../components/AddTask.vue'
import { addTask, deleteTask, getTasks } from '../utils/FetchingTasks';
import { ResponseErrores } from '../interfaces/response';


const store = useUserStore()

let localTasks : Ref<Tasks[]> = ref([])

let userTask :  Ref<Tasks[]> = ref([])


const handleDeleteLocal = (id:string) => {    
    localTasks.value = localTasks.value.filter((x) => x._id !== id)    
}


const addNewTaskLocal = (task : Tasks) => {            
    localTasks.value.push(task)
}

const addNewTaskUser = async (task:Tasks) => {   
    
    if(store.token !== null){        
        const status : ResponseErrores = await addTask(task,store.token.toString())          
    
        if(status.NoError){
            await manageGetTasks()
        }else{

            if(status.AuthError){
                manageLogOut()
            }else{
                alert('Please Try Later')
            }

        }

    }     
    
}


onMounted(async () => {
    await manageGetTasks()
})

const checkTasks = computed(() => {
    
    if(store.token === null){
        if (localTasks.value.length <= 0 ){
            return true
        }
    }else{
        if(userTask.value.length <= 0){
            return true
        }
    }
    return false
})


const deleteTaskHome = async (id:string) => {
    
    if(store.token !== null){      
        const status : ResponseErrores = await deleteTask(store.token.toString(),id)

        if(status.NoError){
            await manageGetTasks()
        }else{


            if(status.AuthError){
                manageLogOut()
            }else{
                alert('Error when deleting')
            }
        }
    }
    

}


const manageGetTasks = async () => {

    if(store.token !== null){
        const tasks = await getTasks(store.token)
        if(tasks.error){
            alert('session ended')
            store.deleteData()
        }else{
            userTask.value=tasks.data
        }        
    }
}


const manageLogOut = () => {
    alert('session ended')
    store.deleteData()
}
</script>



<style scoped>

.tasks__container{
    width: 85%;
    margin: 0 auto;
}
.tittle{
    width: 85%;
    margin-inline: auto;
    margin-block: 20px;
}

.lista-enter-active, .lista-leave-active {
    transition: all 0.5s ease;
}

.lista-enter-from, .lista-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

.without{
    text-align: center;
    font-size: 20px;    
}

@media(min-width:1100px) {
    .tittle{
        width: 65%;    
        font-size: 35px
    }

    .tasks__container{
        width: 65%;        
    }
    .without{        
        font-size: 28px;    
    }
}



</style>