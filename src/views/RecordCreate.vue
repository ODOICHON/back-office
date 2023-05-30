<template>
  <form @submit.prevent="handleSubmit">
    <div class="row">
      <input type="text" id="title" name="title" placeholder="제목을 입력해주세요." class="form-control" v-model="title">
    </div>
    <div class="row">
      <div class="col">
        <label for="part" class="form-label">PART 선택:</label>
        <select id="part" class="form-select" v-model="selectedPart">
          <option v-for="part in parts" :key="part.id" :value="part.id">{{ part.name }}</option>
        </select>
      </div>
      <div class="col">
        <label for="type" class="form-label">TYPE 선택:</label>
        <select id="type" class="form-select" v-model="selectedType">
          <option v-for="t in types" :key="t.id" :value="t.id">{{ t.name }}</option>
        </select>
      </div>
      <div class="col" v-if="selectedType === 'tech'">
        <label for="category" class="form-label">CATEGORY 선택:</label>
        <select id="category" class="form-select" v-model="selectedCategory">
          <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
        </select>
      </div>
    </div>
    <div id="editor" ref="editor" class="row"></div>
    <div class="col text-end" id="btn-container">
      <button type="submit" class="btn btn-outline-primary me-2" v-if="fetchData==0">리뷰 신청</button>
      <button type="submit" class="btn btn-outline-primary me-2" v-if="fetchData.record_id > 1">저장</button>

    </div>
  </form>
</template>

<script lang="ts">
import router from '@/router';
import { authComputed } from '@/store/helper';
import { RecordCreateReq, RecordUpdateReq } from '@/types/RecordType';
import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { defineComponent, onMounted, ref, defineEmits, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import {categories, parts, types} from '@/constants/selectBox';

export default defineComponent({
  name: 'RecordCreate',
  props: {
    modelValue: {
      type: String,
      required: false,
      default: '',
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const router = useRouter();
    const editor = ref<Editor>();
    const fetchData = computed(() => store.state.records.records);
    
    const title = ref('');
    const selectedPart = ref(parts.find((part) => part.name === 'WEB')?.id);
    const selectedType = ref(types.find((type) => type.name === '기술적용')?.id);
    const selectedCategory = ref(categories.find((category) => category.name === '장애관리')?.id);

    onMounted(() => {
      if(fetchData.value.record_id > 1) {
        title.value = fetchData.value.title;
        selectedPart.value = fetchData.value.part;
        selectedCategory.value = fetchData.value.category;
        selectedType.value = fetchData.value.type;
      }
      editor.value = new Editor({
        el: document.querySelector('#editor') as HTMLElement,
        height: '500px',
        initialEditType: 'markdown',
        previewStyle: 'vertical',
        initialValue: fetchData.value.content as string,
        events: {
          change: () => {
            emit('update:modelValue', editor.value?.getMarkdown());
          },
        },
      });
    });

    const handleSubmit = (event: Event) => {
      event.preventDefault();

      if(fetchData.value.record_id > 1) {
       const result = confirm('게시글 수정사항을 저장하시겠습니까?');
       if(result) {
        const markdownContent = editor.value?.getMarkdown();

        const updateRecord: RecordUpdateReq = {
          title: title.value,
          content: markdownContent!,
        };
        store.dispatch('updateRecord', updateRecord).then(() => {
          const recordId = store.state.records.recordId;
          router.push({ name: 'RecordDetail', params: { id: recordId } });
        });
       }
      } else {
        const result = confirm('리뷰 신청하시겠습니까?');
      if (result) {
        const markdownContent = editor.value?.getMarkdown();
        // console.log('markdownContent', markdownContent);

        const createRecord: RecordCreateReq = {
          title: title.value,
          content: markdownContent!,
          part: selectedPart.value!,
          category: selectedCategory.value!,
          type: selectedType.value!,
        };
        store.dispatch('createRecord', createRecord).then(() => {
          const recordId = store.state.records.recordId;
          router.push({ name: 'RecordDetail', params: { id: recordId } });
        });
      } else {
        alert('리뷰 신청을 취소하셨습니다.');
      }
      }
    };

    return {
      title,
      parts,
      selectedPart,
      types,
      selectedType,
      categories,
      selectedCategory,
      handleSubmit,
      fetchData,
    };
  },
});
</script>

<style scoped>
form {
  padding-left: 70px;
  padding-right: 70px;
}

form div {
  margin-bottom: 20px;
}
</style>
