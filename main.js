Vue.component('product-details', {
  props: {
    details: {
      type: Array,
      required: true
    }
  },
  template: `
    <ul>
      <li v-for="detail in details">{{ detail }}</li>
    </ul>
  `
})

Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    },
    cart: {
      type: Array,
      required: true
    }
  },
  template: `
    <div class="product">
      <div class="product-image">
        <img :src="image" :alt="altText" />
      </div>

      <div class="product-info">
        <h1>{{ title }}</h1>
        <p>{{ description }}</p>
        <p v-if="inStock">In Stock</p>
        <p v-else :class="{ 'out-of-stock': !inStock}">Out of Stock</p>
        <p>{{ sale }}</p>
        <p>Shipping: {{ shipping }}</p>

        <h2>Details:</h2>
        <product-details :details="details"></product-details>

        <h3>Colors:</h3>
        <div v-for="(variant, index) in variants" :key="variant.variantId">
          <div class="color-box" :style="{ backgroundColor: variant.variantColor }"
            @mouseover="updateProduct(index)"></div>
        </div>

        <p>Sizes:</p>
        <ul>
          <li v-for="size in sizes">{{ size }}</li>
        </ul>

        <button v-on:click="addToCart"
          :disabled="!inStock"
          :class="{ disabledButton: !inStock }"
          >
          Add to cart
        </button>
        <button v-on:click="removeFromCart"
          :disabled="!inStock || this.cart.length == 0"
          :class="{ disabledButton: !inStock || this.cart.length == 0 }"
          >
          Remove from Cart
        </button>

        <p><a :href="vmLink">Based on: Introduction to Vue.js</a></p>
      </div>
  </div>
  `,
  data() {
    return {
      product: "socks",
      brand: "Vue Mastery",
      description: "A pair of warm, fuzzy socks",
      selectedVariant: 0,
      altText: "A pair of socks",
      vmLink: "https://www.vuemastery.com/courses/intro-to-vue-js/vue-instance",
      onSale: true,
      details: ["80% cotton", "20% polyester", "Gender-neutral"],
      variants: [
        {
          variantId: 2234,
          variantColor: "green",
          variantImage: "./assets/vmSocks-green.jpg",
          variantQuantity: 10
        },
        {
          variantId: 2235,
          variantColor: "blue",
          variantImage: "./assets/vmSocks-blue.jpg",
          variantQuantity: 3
        }
      ],
      sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
    }
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
    },
    removeFromCart() {
      if (this.inStock && this.cart.length > 0) {
        this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId);
      }
    },
    updateProduct(index) {
      this.selectedVariant = index;
    }
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity;
    },
    sale() {
      var saleText;
      if (this.onSale) {
        saleText = 'are on sale!';
      } else {
        saleText = 'are not on sale'
      }
      return this.brand + ' ' + this.product + ' ' + saleText;
    },
    shipping() {
      if (this.premium) {
        return "Free"
      } else {
        return 2.99
      }
    }
  }
});

var app = new Vue({
  el: "#app",
  data: {
    premium: false,
    cart: []
  },
  methods: {
    updateCart(id) {
      this.cart.push(id);
    },
    removeItem(id) {
      this.cart.splice(this.cart.lastIndexOf(id), 1);
    }
  }
});
