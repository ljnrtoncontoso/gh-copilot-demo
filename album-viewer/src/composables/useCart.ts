import { ref, computed } from 'vue'
import type { Album } from '../types/album'

export interface CartItem extends Album {
  quantity: number
}

const cartItems = ref<CartItem[]>([])

export function useCart() {
  const addToCart = (album: Album): void => {
    const existingItem = cartItems.value.find(item => item.id === album.id)
    
    if (existingItem) {
      existingItem.quantity++
    } else {
      cartItems.value.push({ ...album, quantity: 1 })
    }
  }

  const removeFromCart = (albumId: number): void => {
    const index = cartItems.value.findIndex(item => item.id === albumId)
    if (index !== -1) {
      cartItems.value.splice(index, 1)
    }
  }

  const updateQuantity = (albumId: number, quantity: number): void => {
    const item = cartItems.value.find(item => item.id === albumId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(albumId)
      } else {
        item.quantity = quantity
      }
    }
  }

  const clearCart = (): void => {
    cartItems.value = []
  }

  const cartItemCount = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0)
  })

  const cartTotal = computed(() => {
    return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  })

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartItemCount,
    cartTotal
  }
}
