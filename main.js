var app = new Vue({
  el: "#app",
  data: {
    product: "Socks",
    description: "A pair of warm, fuzzy socks",
    image: "./assets/vmSocks-blue.png",
    altText: "A pair of socks",
    vmLink: "https://www.vuemastery.com/courses/intro-to-vue-js/vue-instance",
    inStock: true,
    onSale: true,
    details: ["80% cotton", "20% polyester", "Gender-neutral"],
    variants: [
      {
        variantId: 2234,
        variantColor: "green"
      },
      {
        variantId: 2235,
        variantColor: "blue"
      }
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"]
  }
});
