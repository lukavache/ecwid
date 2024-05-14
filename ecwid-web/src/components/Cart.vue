<template>
  <div class="cart">
    <div class="product-grid">
        <ProductWidget @add-to-cart="addToCart" :showCheckboxes="false"/>
      </div>
		<div class="wrapper">
      <div class="a-card a-card--compact">
        <div class="a-card__paddings">
          <div>
            <h3>Current Order Total: ${{ cart.total.toFixed(2) }}</h3>
            <div>
              <div class="expandable-area text-default expandable-area--expanded">
                <div class="expandable-area__collapsed-data spacing--mr1 spacing--mb1">
                  <div class="limited-list">
                    <div v-for="item in cart.items" :key="item.id" class="limited-list__item spacing--mr1">
                      <div><img :src="item.imageUrl" class="gwt-Image"></div>
                      <span class="limited-list__item-overlay"></span>
                    </div>
                  </div>
                </div>
                <div class="expandable-area__expanded-data spacing--mb1">
                  <div>
                    <div v-for="item in cart.items" :key="item.id" class="list-element list-element--inline-mode list-element--compact">
                      <div class="list-element__image" style=""><img :src="item.imageUrl" class="gwt-Image"></div>
                      <div class="list-element__content">
                        <div class="list-element__info">
                          <div class="list-element__header">
                            <div class="list-element__main-info">
                              <div class="list-element__title" style=""><span class="gwt-InlineHTML">{{ getProductName(item.name) }}</span></div>
                            </div>
                            <div class="list-element__price" style="">{{ item.quantity }} × ${{ item.price.toFixed(2) }}</div>
                          </div>
                          <div class="list-element__data-row">
                            <div><span class="spacing--mr1">ID: {{ item.id }}</span></div>
                          </div>
                        </div>
                        <div class="list-element__actions">
                          <div class="list-element__price" style=""><span class="list-element__price-prefix"></span> <span class="list-element__price-value nowrap">{{ item.quantity }} × ${{ item.price.toFixed(2) }}</span></div>
                        </div>
                      </div>
                    </div>
                    <div v-if="cart.items.length > 0" class="totals-card__action spacing--mb2">
                      <div><button @click="clearCart"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 70 60"><path d="M45 14.68c-.83 0-1.5-.67-1.5-1.5V9.69c0-.38-.36-.69-.8-.69H27.5c-.44 0-.8.31-.8.69v3.49c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5V9.69C23.7 7.66 25.41 6 27.5 6h15.2c2.09 0 3.8 1.66 3.8 3.69v3.49c0 .82-.67 1.5-1.5 1.5zM47.5 63H24.37c-4.34 0-7.87-3.68-7.87-8.2l-2-35.21c-.05-.83.58-1.54 1.41-1.58.84-.06 1.54.58 1.58 1.41l2 35.3c0 2.95 2.19 5.29 4.87 5.29H47.5c2.68 0 4.87-2.33 4.87-5.2l2.13-35.39c.05-.83.73-1.46 1.58-1.41.83.05 1.46.76 1.41 1.58l-2.13 35.3c.01 4.43-3.52 8.11-7.86 8.11z"/><path d="M58.5 15h-46c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5h46c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5zM36 52c-.83 0-1.5-.67-1.5-1.5v-27c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v27c0 .83-.67 1.5-1.5 1.5zm-9 0c-.83 0-1.5-.67-1.5-1.5v-27c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v27c0 .83-.67 1.5-1.5 1.5zm18 0c-.83 0-1.5-.67-1.5-1.5v-27c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v27c0 .83-.67 1.5-1.5 1.5z"/></svg></button><button type="button" class="btn btn-responsive btn-success btn-large" style="margin-left: 20px; background-color: #42b883;">Checkout</button></div>
                    </div>
                  </div>
                </div>
                <div class="expandable-area__info">
                  <div class="spacing--mb-half">
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import ProductWidget from '../views/ProductWidget.vue';
import {getProductName} from '../utils/getCorrectData';

interface Product {
  id: number;
  name: string;
  defaultDisplayedPriceFormatted: string;
  quantity?: number;
}

interface CartItem extends Product {
  quantity: number;
  price: number;
}

interface Cart {
  items: CartItem[];
  total: number;
}


const cart = reactive<Cart>({
  items: [],
  total: 0
});

const clearCart = () => {
  cart.items = [];
  cart.total = 0;
}

const addToCart = (product: Product) => {
  const price = parseFloat(product.defaultDisplayedPriceFormatted.replace(/[^\d.]/g, ""));
  let existingItem = cart.items.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    existingItem = { ...product, quantity: 1, price: price };
    cart.items.push(existingItem);
  }
  cart.total += price;
};

</script>

<style scoped>

.totals-card__action {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: -5px;
}

.wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px;
  margin: 0;
}
</style>