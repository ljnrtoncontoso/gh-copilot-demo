<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="modal-overlay" @click="closeCart">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h2>🛒 Shopping Cart</h2>
            <button class="close-btn" @click="closeCart">&times;</button>
          </div>

          <div v-if="cartItems.length === 0" class="empty-cart">
            <p>Your cart is empty</p>
            <p class="empty-cart-subtitle">Add some albums to get started!</p>
          </div>

          <div v-else class="cart-items">
            <div v-for="item in cartItems" :key="item.id" class="cart-item">
              <img :src="item.image_url" :alt="item.title" class="cart-item-image" />
              <div class="cart-item-details">
                <h3>{{ item.title }}</h3>
                <p class="cart-item-artist">{{ item.artist }}</p>
                <p class="cart-item-price">${{ item.price.toFixed(2) }} each</p>
              </div>
              <div class="cart-item-actions">
                <div class="quantity-control">
                  <button @click="updateQuantity(item.id, item.quantity - 1)" class="qty-btn">-</button>
                  <span class="quantity">{{ item.quantity }}</span>
                  <button @click="updateQuantity(item.id, item.quantity + 1)" class="qty-btn">+</button>
                </div>
                <button @click="removeFromCart(item.id)" class="remove-btn">Remove</button>
              </div>
              <div class="cart-item-total">
                ${{ (item.price * item.quantity).toFixed(2) }}
              </div>
            </div>

            <div class="cart-summary">
              <div class="summary-row">
                <span>Total Items:</span>
                <span>{{ cartItemCount }}</span>
              </div>
              <div class="summary-row total">
                <span>Total:</span>
                <span>${{ cartTotal.toFixed(2) }}</span>
              </div>
              <button class="checkout-btn">Proceed to Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useCart } from '../composables/useCart'

interface Props {
  isOpen: boolean
}

interface Emits {
  (e: 'close'): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const { cartItems, removeFromCart, updateQuantity, cartItemCount, cartTotal } = useCart()

const closeCart = (): void => {
  emit('close')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: white;
  border-radius: 15px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
}

.modal-header h2 {
  margin: 0;
  color: #333;
  font-size: 1.5rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  color: #999;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: #f0f0f0;
  color: #333;
}

.empty-cart {
  padding: 4rem 2rem;
  text-align: center;
  color: #999;
}

.empty-cart p {
  font-size: 1.2rem;
  margin: 0.5rem 0;
}

.empty-cart-subtitle {
  font-size: 1rem;
  color: #bbb;
}

.cart-items {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.cart-item {
  display: grid;
  grid-template-columns: 80px 1fr auto auto;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 10px;
  margin-bottom: 1rem;
  align-items: center;
}

.cart-item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.cart-item-details h3 {
  margin: 0 0 0.25rem 0;
  font-size: 1.1rem;
  color: #333;
}

.cart-item-artist {
  margin: 0 0 0.25rem 0;
  color: #666;
  font-size: 0.9rem;
}

.cart-item-price {
  margin: 0;
  color: #999;
  font-size: 0.85rem;
}

.cart-item-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f5f5f5;
  border-radius: 20px;
  padding: 0.25rem;
}

.qty-btn {
  width: 30px;
  height: 30px;
  border: none;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  font-weight: bold;
  color: #667eea;
  transition: all 0.3s ease;
}

.qty-btn:hover {
  background: #667eea;
  color: white;
}

.quantity {
  min-width: 30px;
  text-align: center;
  font-weight: bold;
  color: #333;
}

.remove-btn {
  background: none;
  border: none;
  color: #e74c3c;
  cursor: pointer;
  font-size: 0.85rem;
  padding: 0.25rem 0.5rem;
  transition: all 0.3s ease;
}

.remove-btn:hover {
  color: #c0392b;
  text-decoration: underline;
}

.cart-item-total {
  font-size: 1.2rem;
  font-weight: bold;
  color: #667eea;
}

.cart-summary {
  margin-top: 1rem;
  padding: 1.5rem;
  background: #f9f9f9;
  border-radius: 10px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  font-size: 1rem;
  color: #666;
}

.summary-row.total {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  padding-top: 0.75rem;
  border-top: 2px solid #ddd;
}

.checkout-btn {
  width: 100%;
  padding: 1rem;
  margin-top: 1rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.checkout-btn:hover {
  background: #5a6fd8;
  transform: translateY(-2px);
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.9);
}

@media (max-width: 768px) {
  .cart-item {
    grid-template-columns: 60px 1fr;
    gap: 0.75rem;
  }

  .cart-item-image {
    width: 60px;
    height: 60px;
  }

  .cart-item-actions {
    grid-column: 1 / -1;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 0.5rem;
  }

  .cart-item-total {
    grid-column: 1 / -1;
    text-align: center;
    padding-top: 0.5rem;
    border-top: 1px solid #eee;
  }
}
</style>
