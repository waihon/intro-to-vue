var app = new Vue({
  el: "#app",
  data: {
    product: "Socks",
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
        variantImage: "./assets/vmSocks-green.png",
        variantQuantity: 10
      },
      {
        variantId: 2235,
        variantColor: "blue",
        variantImage: "./assets/vmSocks-blue.png",
        variantQuantity: 0
      }
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
    cart: 0
  },
  methods: {
    addToCart() {
      this.cart += 1;
    },
    removeFromCart() {
      if (this.inStock && this.cart > 0) {
        this.cart -= 1;
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
    }
  }
});
