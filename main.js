var eventBus = new Vue();

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

Vue.component('product-review', {
  template: `
    <div>
      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </p>
      <form class="review-form" @submit.prevent="onSubmit">
        <p>
          <label for="name">Name:</label>
          <input id="name" v-model="name" placeholder="name">
        </p>

        <p>
          <label for="review">Review:</label>
          <textarea id="review" v-model="review"></textarea>
        </p>

        <p>
          <label for="rating">Rating:</label>
          <select id="rating" v-model.number="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
          </select>
        </p>

        <p>Would you recommend this product?"</p>
        <label>
          Yes
          <input type="radio" value="Yes" v-model="recommend">
        </label>
        <label>
          No
          <input type="radio" value="No" v-model="recommend">
        </label>

        <p>
          <input type="submit" value="Submit">
        </p>

      </form>
    </div>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      recommend: null,
      errors: []
    }
  },
  methods: {
    onSubmit() {
      this.errors = [];
      if (this.name && this.review && this.rating && this.recommend) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          recommend: this.recommend
        };
        eventBus.$emit('review-submitted', productReview);
        this.name = null;
        this.review = null;
        this.rating = null;
        this.recommend = null;
      } else {
        if (!this.name) this.errors.push("Name required.");
        if (!this.review) this.errors.push("Review required.");
        if (!this.rating) this.errors.push("Rating required.");
        if (!this.recommend) this.errors.push("Recommendation required.");
      }
    }
  }
})

Vue.component('product-tabs', {
  props: {
    reviews: {
      type: Array,
      required: true
    }
  },
  template: `
    <div>
      <div>
        <span v-for="(tab, index) in tabs"
              :key="tab"
              class="tab"
              :class="{ activeTab: selectedTab === tab }"
              @click="selectedTab = tab"
              >
              {{ tab }}
        </span>
      </div>

      <div v-show="selectedTab === 'Reviews'">
        <p v-if="!reviews.length">There are no reviews yet.</p>
        <ul v-else>
          <li v-for="(review, index) in reviews" :key="index">
            <p>{{ review.name }}</p>
            <p>Rating: {{ review.rating }}</p>
            <p>{{ review.review }}</p>
            <p>Recommendation: {{ review.recommend }}</p>
          </li>
        </ul>
      </div>

      <div v-show="selectedTab === 'Make a Review'">
        <product-review></product-review>
      </div>
    </div>
  `,
  data() {
    return {
      tabs: ['Reviews', 'Make a Review'],
      selectedTab: 'Reviews', // set from @click
    }
  }
})

Vue.component('info-tabs', {
  props: {
    shipping: {
      required: true
    },
    details: {
      type: Array,
      required: true
    }
  },
  template: `
    <div>
      <div>
        <span v-for="(tab, index) in tabs"
              :key="tab"
              class="tab"
              :class="{ activeTab: selectedTab === tab }"
              @click="selectedTab = tab"
              >
              {{ tab }}
        </span>
      </div>

      <div v-show="selectedTab === 'Shipping'">
        <p>Shipping: {{ shipping }}</p>
      </div>

      <div v-show="selectedTab === 'Details'">
        <product-details :details="details"></product-details>
      </div>
    </div>
  `,
  data() {
    return {
      tabs: ['Shipping', 'Details'],
      selectedTab: 'Shipping' // set from @click

    }
  }
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

        <p>
          <info-tabs :shipping="shipping" :details="details"></info-tabs>
        </p>

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

        <p>
          <product-tabs :reviews="reviews"></product-tabs>
        </p>

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
      reviews: []
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
        return "Free";
      } else {
        return 2.99;
      }
    }
  },
  mounted() {
    eventBus.$on('review-submitted', productReview => {
      this.reviews.push(productReview);
    })
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
