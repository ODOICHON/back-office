<script setup lang="ts">
import router from '@/router';
import { authComputed } from '@/store/helper';
import { RecordCreateReq } from '@/types/RecordType';
import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { defineComponent, onMounted, ref } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
  modelValue: {
    type: String,
    required: false,
    default: '',
  },
});
const store = useStore(); // store 객체 사용을 위해 선언
const emit = defineEmits(['update:modelValue']);
const editor = ref();
onMounted(() => {
  const e = new Editor({
    el: editor.value,
    height: '500px',
    initialEditType: 'markdown',
    previewStyle: 'vertical',
    events: {
      change: () => emit('update:modelValue', e.getMarkdown()),
    },

  });
});
const title = ref('');
const parts = [
  { id: 'web', name: 'WEB' },
  { id: 'server', name: 'SERVER' },
  { id: 'infra', name: 'INFRA' },
  { id: 'all', name: 'ALL' },
];
const selectedPart = ref(parts.find(part => part.name === 'WEB').id);
const types = [
  { id: 'odori', name: 'odori' },
  { id: 'retro', name: 'retro' },
  { id: 'tech', name: 'tech' },
];
const selectedType = ref(types.find(type => type.name === 'tech').id);

const categories = [
  { id: 'disaster', name: 'disaster' },
  { id: 'issue', name: 'issue' },
  { id: 'new_tech', name: 'new_tech' },
  { id: 'architecture', name: 'architecture' },
];
const selectedCategory = ref(categories.find(category => category.name === 'disaster').id);

const handleSubmit = (event) => {
  event.preventDefault();
  // Perform form submission logic here

  const result = confirm('리뷰 신청하시겠습니까?');
  if (result) {
    console.log('editor', editor.value); // Check the editor ref
    const contentElement = editor.value?.querySelector('.toastui-editor');
    console.log('contentElement', contentElement); // Check the content element
    const markdownContent = contentElement?.innerHTML;
    console.log('markdownContent', markdownContent); // Check the markdown content
    const createBoard: RecordCreateReq = {
      title: title.value,
      content: markdownContent,
      part: selectedPart.value,
      category: selectedCategory.value,
      type: selectedType.value,
    }
    store.dispatch('createBoard', createBoard).then(
      () => {
        const boardId = store.state.boards.boardId;
        router.push({ name: 'BoardDetail', params: { id: boardId } });
      }
    );
  } else {
    alert('리뷰 신청을 취소하셨습니다.');
  }
};

</script>

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
          <option v-for="type in types" :key="type.id" :value="type.name">{{ type.name }}</option>
        </select>
      </div>
      <div class="col" v-if="selectedType === 'tech'">
        <label for="category" class="form-label">CATEGORY 선택:</label>
        <select id="category" class="form-select" v-model="selectedCategory">
          <option v-for="category in categories" :key="category.id" :value="category.name">{{ category.name }}</option>
        </select>
      </div>
    </div>
    <div ref="editor" class="row"></div>
    <div class="col text-end" id="btn-container">
      <button type="submit" class="btn btn-outline-primary me-2">리뷰 신청</button>
    </div>
  </form>
</template>
<style scoped>
form {
  padding-left: 70px;
  padding-right: 70px;
}

form div {
  margin-bottom: 20px;
}
</style>