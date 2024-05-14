<template>
  <div class="header">
    <h2>Recently Updated Products</h2>
  </div>
  <div v-if="isLoading" class="loading">
    <Loading/>
  </div>
  <div v-else class="product-widget">
    <h3>Show: <select class="select" v-model="numToShow" @change="updateProductsToShow">
        <option value="3">3</option>
        <option value="6">6</option>
        <option value="9">9</option>
      </select>
    </h3>
    <div class="filtered-list__items long-list">
      <div v-for="product in productsToShow" :key="product.id" class="list-element list-element--compact list-element--has-hover">
        <div class="list-element__toggle">
          <input type="checkbox" v-if="props.showCheckboxes" v-model="selectedProducts" :value="product" :id="'checkbox-' + product.id" tabindex="0" class="list-element__toggle-checkbox">
          <label :for="'checkbox-' + product.id" class="list-element__toggle-label"></label>
        </div>
        <router-link :to="{ name: 'product', params: { id: product.id }}" class="list-element__image">
          <img :src="product.thumbnailUrl" :alt="product.name" />
        </router-link>
        <div class="list-element__content">
          <div class="list-element__info">
            <div class="list-element__header">
              <div class="list-element__main-info">
                <div class="list-element__title">
                  <span>{{ getProductName(product.name) }}</span></div>
                  <div class="list-element__description"><span class="muted">{{product.sku}}</span></div>
                </div>
              </div>
              <div class="list-element__data-row">
                {{ getDescription(product?.description.split('.')[0] + '.') }}
              </div>
            </div>
            <div class="list-element__actions">
              <div class="list-element__price">{{ product.defaultDisplayedPriceFormatted }}</div>
              <button v-if="!props.showCheckboxes" @click="addToCart(product)">Buy Now</button>
            </div>
          </div>
          <router-link :to="{ name: 'product', params: { id: product.id }}" class="list-element__move-forward-arrow">
          </router-link>
        </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import Loading from '../components/common/Loading.vue';
import {getProductName, getDescription} from '../utils/getCorrectData';
import {getProducts} from '../api-urls';

const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

const props = defineProps({
  showCheckboxes: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['add-to-cart', 'onSelect'])

const selectedProducts = ref([]);
let isLoading = ref(true);
let numToShow = ref(3);
const products = ref<Product[]>([]);
const productsToShow = ref<Product[]>([]);

interface Product {
  id: number;
  name: string;
  sku: number;
  defaultDisplayedPriceFormatted: string;
  thumbnailUrl: string;
  description: string
}

const addToCart = (product: Product) => {
  emit('add-to-cart', product);
};

const fetchProducts = async () => {
  try {
    const response = await axios.get(baseApiUrl + getProducts);
    if (response.data && Array.isArray(response.data.items)) {
      const sortedProducts = response.data.items.sort((a: any, b: any) => a.sku - b.sku);
      return sortedProducts;
    }
  } catch (error) {
    console.error('Failed to fetch products:', error);
  } finally {
    isLoading.value = false;
  }
};

const updateProductsToShow = () => {
  productsToShow.value = products.value.slice(0, numToShow.value);
};

watch(selectedProducts, (value: object) => {
  emit('onSelect', value);
});

onMounted(async () => {
  products.value = await fetchProducts();
  updateProductsToShow();
});

</script>
  
<style scoped>

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
}

.product-widget h2 {
  text-align: center;
  width: 100%;
}

.loading {
  margin-top: 25px;
  margin-left: -35px;
}

.select:focus {
  outline: none;
}

.select {
  width: 50px;
  height: 25px;
  border-color: #42b883;
  border-radius: 5px;
  border-width: 1.5px;
}

.list-element {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
}

.list-element__image {
  height: 50px;
  width: 40px;
  border-radius: 7px;
}

.list-element__toggle {
  flex-grow: 0;
  padding: 0 10px;
}

.list-element__content {
  flex-grow: 1;
  padding: 0 10px;
}

.list-element__actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.list-element__move-forward-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
}

button {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #369671;
}
</style>
  