<template>
    <div class="container">
        <form @submit.prevent="handleSubmit">
            <div>
                <label for="email">로그인 ID</label>
                <input type="text" id="email" v-model="email" class="form-control" @keypress.enter.prevent>
            </div>
            <div>
                <label for="password">비밀번호</label>
                <input type="password" id="password" v-model="password" class="form-control">
            </div>
            <br>
            <div class="row">
                <div class="col">
                    <button class="w-100 btn btn-primary btn-lg" type="submit">로그인</button>
                </div>
            </div>
        </form>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import store from '@/store';
import { authComputed } from '@/store/helper';
import { useRouter } from 'vue-router';

interface FormValues {
    email: string;
    password: string;
}

export default defineComponent({
    data() {
        return {
            email: '',
            password: '',
        };
    },
    computed: {
        ...authComputed,
    },
    methods: {
        async handleSubmit(event: Event) {
            event.preventDefault();

            const loginReq: FormValues = {
                email: this.email,
                password: this.password,
            };

            store.dispatch('login', loginReq).then(() => {
                store.dispatch('getUserInfo').then(() => {
                    this.$router.go(-1);
                })
            }
            ).catch(() => {
                this.email = '';
                this.password = '';
            });

        },
    },
    setup() {
        const router = useRouter();
        return {
            router
        }
    }
});
</script>
  
<style lang="scss" scoped></style>
  