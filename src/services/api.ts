import axios from 'axios'
import type { ApiResponse, LoginFormData, ContactFormData, Product, User } from '../types'

// Configuración base de Axios
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para agregar token de autenticación
api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('baby-cash-user')
    if (user) {
      const userData = JSON.parse(user)
      config.headers.Authorization = `Bearer ${userData.token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Interceptor para manejar respuestas y errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('baby-cash-user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Interceptor para manejar respuestas y errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem('baby-cash-user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Servicios de autenticación
export const authService = {
  async login(credentials: LoginFormData): Promise<ApiResponse<User & { token: string }>> {
    const response = await api.post('/auth/login', credentials)
    return response.data
  },

  async register(userData: any): Promise<ApiResponse<User & { token: string }>> {
    const response = await api.post('/auth/register', userData)
    return response.data
  },

  async getProfile(): Promise<ApiResponse<User>> {
    const response = await api.get('/auth/profile')
    return response.data
  },

  async updateProfile(userData: Partial<User>): Promise<ApiResponse<User>> {
    const response = await api.put('/auth/profile', userData)
    return response.data
  }
}

// Servicios de productos
export const productService = {
  async getAll(): Promise<ApiResponse<Product[]>> {
    const response = await api.get('/products')
    return response.data
  },

  async getById(id: string): Promise<ApiResponse<Product>> {
    const response = await api.get(`/products/${id}`)
    return response.data
  },

  async getByCategory(category: string): Promise<ApiResponse<Product[]>> {
    const response = await api.get(`/products/category/${category}`)
    return response.data
  },

  async search(query: string): Promise<ApiResponse<Product[]>> {
    const response = await api.get(`/products/search?q=${encodeURIComponent(query)}`)
    return response.data
  }
}

// Servicios de carrito
export const cartService = {
  async getCart(): Promise<ApiResponse<any>> {
    const response = await api.get('/cart')
    return response.data
  },

  async addToCart(productId: string, quantity: number): Promise<ApiResponse<any>> {
    const response = await api.post('/cart/add', { productId, quantity })
    return response.data
  },

  async updateCartItem(productId: string, quantity: number): Promise<ApiResponse<any>> {
    const response = await api.put('/cart/update', { productId, quantity })
    return response.data
  },

  async removeFromCart(productId: string): Promise<ApiResponse<any>> {
    const response = await api.delete(`/cart/remove/${productId}`)
    return response.data
  },

  async clearCart(): Promise<ApiResponse<any>> {
    const response = await api.delete('/cart/clear')
    return response.data
  }
}

// Servicios de contacto
export const contactService = {
  async sendMessage(data: ContactFormData): Promise<ApiResponse<any>> {
    const response = await api.post('/contact', data)
    return response.data
  }
}

// Servicios de órdenes
export const orderService = {
  async createOrder(orderData: any): Promise<ApiResponse<any>> {
    const response = await api.post('/orders', orderData)
    return response.data
  },

  async getOrders(): Promise<ApiResponse<any[]>> {
    const response = await api.get('/orders')
    return response.data
  },

  async getOrderById(id: string): Promise<ApiResponse<any>> {
    const response = await api.get(`/orders/${id}`)
    return response.data
  }
}

// Servicios de blog
export const blogService = {
  async getPosts(): Promise<ApiResponse<any[]>> {
    const response = await api.get('/blog/posts')
    return response.data
  },

  async getPostById(id: string): Promise<ApiResponse<any>> {
    const response = await api.get(`/blog/posts/${id}`)
    return response.data
  }
}

export default api