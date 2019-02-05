var app = new Vue({
  el: "#app",
  data: {
    product: "Socks",
    description: "A pair of warm, fuzzy socks",
    image: "./assets/vmSocks-blue.png",
    altText: "A pair of socks",
    vmLink: "https://www.vuemastery.com/courses/intro-to-vue-js/vue-instance",
    inStock: false,
    onSale: true,
    details: ["80% cotton", "20% polyester", "Gender-neutral"],
    variants: [
      {
        variantId: 2234,
        variantColor: "green",
        variantImage: "./assets/vmSocks-green.png"
      },
      {
        variantId: 2235,
        variantColor: "blue",
        variantImage: "./assets/vmSocks-blue.png"
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
      if (this.cart > 0) {
        this.cart -= 1;
      }
    },
    updateProduct(variantImage) {
      this.image = variantImage;
    }
  }
});
