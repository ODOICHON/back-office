<template>
    <div class="col-md-4" id="profile">
        <div class="position-sticky" style="top: 2rem;">
            <div class="p-4">
                <img src="@/assets/default.png" style="width:100%;" class="rounded-circle"/>
            </div>
            <div class="p-4">
                <h4 class="fst-bold">{{ currentUser.nick_name }} | SERVER</h4>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, onMounted } from 'vue'
import store from '@/store'
export default {
    setup () {
        const currentUser = computed(() => store.state.auth.userInfo);

        const getNickName = () => {
            store.dispatch('getUserInfo');
        };
        
        onMounted(() => {
            getNickName();
        });

        
        return {
            getNickName,
            currentUser
        };
    }
}
</script>

<style scoped>
#profile {
    margin-left: 100px;
}
</style>