<template>
    <NavBar></NavBar>
    

    <div class="main__container">
        <h1>Login</h1>
        
        <form   class="inputs__container">
            <div class="data__container">
                <label>Email</label>
                <input type="email" v-model="email">         
                <span v-if="errorEmail">email cant be empty</span>       
                <span v-if="invalidEmail">Please enter a valid email address</span>          
            </div>

            <div class="data__container">
                <label>Password</label>
                <input type="password" v-model="password">
                <span v-if="errorPassword">Password cant be empty</span>
            </div>

            <button @click.prevent="handleLogin">Log in</button>
        </form>
        
    </div>


</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    import NavBar from '../components/NavBar.vue';
    import { useUserStore } from '../store/user';
    import { useRouter } from 'vue-router';


    let email = ref('')
    let password = ref('')        
    let errorPassword = ref(false)
    let errorEmail = ref(false)
    let invalidEmail = ref(false)

    const store = useUserStore()
    const router = useRouter()


    const handleLogin = async () => {
        let errores = false


        if(password.value == ''){
            errorPassword.value=true            
            errores = true
        }else{
            errorPassword.value=false            
        }

        if(email.value == ''){
            errorEmail.value=true
            errores = true
        }else if (!validateEmail(email.value)) {
            invalidEmail.value = true
            errores = true
        }else{
            invalidEmail.value = false
        }

        if(!errores){
            errorPassword.value=false
            errorEmail.value=false     
            invalidEmail.value=false       
            await store.login({"email":email.value,"password":password.value})
            
            if(store.error !== null){
                alert(store.error)
            }else{
                router.push({name:'home'})    

            }
        }        
    }



    const validateEmail = (email: string): boolean => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return re.test(email)
    }


</script>

<style scoped>

.main__container{
    width: 80%;
    margin: 0 auto;
    margin-top: 50px;
    border: 1px solid rgba(0, 0, 0, 0.164);
    border-radius: 5px;
    height: 330px;
    display: flex;
    flex-direction: column;
    align-content: center;  
    gap: 30px ; 
}

h1{
    text-align: center
}
.data__container{
    display: flex;
    flex-direction: column;
    width: 80%;
    align-items: center;
    margin: 0 auto;    
    gap: 5px;
}

label{
    text-align: start;
    width: 100%;
}

input{
    width: 100%;    
    padding: 5px;
    border-radius: 5px;
    outline: none;
    border: 1px solid rgba(0, 0, 0, 0.196);

}

.inputs__container{
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
}

button{
    background-color: #18181B;
    color: white;
    padding: 10px 60px;
    border-radius: 5px;
    margin-top: 20px;
    width: 80%;
    cursor: pointer;
}

span{
    color: red;
}


@media(min-width:1100px) {
    .main__container{
        width: 30%; 
    }

}


</style>