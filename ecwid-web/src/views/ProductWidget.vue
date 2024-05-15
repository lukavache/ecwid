<template>
  <div class="header">
    <h2>Recently Updated Products</h2>
    <RouterLink v-if="!props.showCheckboxes" :to="{ name: 'settings'}" class="link"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 20 20"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 5.5a2.489 2.489 0 0 0-.5089-1.512c1.0017-1.0012 2.252-1.7536 3.6505-2.1566C7.9842 2.8034 8.9108 3.5 10 3.5s2.0157-.6966 2.3584-1.6686c1.3984.403 2.6488 1.1554 3.6505 2.1566A2.4885 2.4885 0 0 0 15.5 5.5C15.5 6.8807 16.6193 8 18 8c.0878 0 .1746-.0046.2601-.0134A8.5197 8.5197 0 0 1 18.5 10c0 .6936-.0831 1.3679-.2399 2.0133A2.5403 2.5403 0 0 0 18 12c-1.3807 0-2.5 1.1193-2.5 2.5 0 .5682.1895 1.0921.5089 1.5119-1.0017 1.0012-2.2521 1.7536-3.6505 2.1566C12.0157 17.1965 11.0892 16.5 10 16.5s-2.0157.6965-2.3584 1.6685c-1.3984-.403-2.6488-1.1554-3.6505-2.1566A2.4887 2.4887 0 0 0 4.5 14.5C4.5 13.1193 3.3807 12 2 12c-.0878 0-.1746.0045-.2601.0133A8.5204 8.5204 0 0 1 1.5 10c0-.6937.083-1.368.2399-2.0134A2.529 2.529 0 0 0 2 8c1.3807 0 2.5-1.1193 2.5-2.5zm5.5 7c1.3807 0 2.5-1.1193 2.5-2.5S11.3807 7.5 10 7.5 7.5 8.6193 7.5 10s1.1193 2.5 2.5 2.5z"/></svg></RouterLink>
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
  justify-content: space-between;
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
  