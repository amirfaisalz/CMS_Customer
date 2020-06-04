<template>
  <div class="detailPage">
    <div class="product">
      <div v-for="product in productList" :key="product.id" class="card">
        <img :src="product.image_url" alt="" />
        <h3 class="title">{{ product.name }}</h3>
        <p class="price">{{ priceFormat(product.price) }}</p>
        <div class="priceGroup">
          <div class="stock">
            <p>stock:</p>
            <p class="number">{{ product.stock }}</p>
          </div>
        </div>
        <button @click.prevent="cartBtn(product)">Add To Cart</button>
      </div>
    </div>
    <div v-if="cartPage == true" class="cartPage">
      <div class="cartContainer">
        <p @click.prevent="cartBtn" class="x">X</p>
        <Error />
        <div class="inputan">
          <input
            v-model="total"
            type="number"
            placeholder="How much?"
            class="howMuch"
          />
          <textarea
            v-model="notes"
            type="textarea"
            placeholder="Please give a notes"
            class="howMuch textarea"
          ></textarea>
          <button @click.prevent="addTocart" class="sendMove deleteModal">
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import server from "../api";
import Error from "../components/Error"
export default {
  name: "Product",
  components: {
    Error
  },
  data() {
    return {
      cartPage: false,
      total: 1,
      notes: "",
      product: {}
    };
  },
  computed: {
    productList() {
      return this.$store.state.productList;
    }
  },
  methods: {
    cartBtn(product) {
      this.product = product;
      this.cartPage = !this.cartPage;
    },
    priceFormat(number) {
      var thousands = "";
      var money = number
        .toString()
        .split("")
        .reverse()
        .join("");
      for (var i = 0; i < money.length; i++) {
        if (i % 3 === 0) {
          thousands += money.substr(i, 3) + ".";
        }
      }
      return (
        "Rp. " +
        thousands
          .split("", thousands.length - 1)
          .reverse()
          .join("")
      );
    },
    addTocart() {
      if (this.total <= 0) {
        this.$store.commit("CHANGE_MYERROR", "Total value is required");
      } else if (this.notes == "") {
        this.$store.commit("CHANGE_MYERROR", "Notes is required");
      } else {
        server({
          method: "post",
          url: "/cart",
          headers: {
            token: localStorage.token
          },
          data: {
            total: this.total,
            notes: this.notes,
            ProductId: this.product.id
          }
        }).then((response) => {
          this.$store.dispatch("fetchCart");
          this.$router.push("/dashboard/cart");
          console.log(response);
        });
      }
    }
  },
  created() {
    if (!localStorage.token) {
      this.$store.commit("SET_LOGIN", false);
      this.$router.push("/");
    } else {
      this.$store.dispatch("fetchProductList");
    }
  }
};
</script>

<style scoped>
.detailPage {
  height: 100vh;
}
.product {
  display: grid;
  grid-template-columns: repeat(4, 19vw [col-start]);
  grid-column-gap: 4.5vw;
  padding: 50px;
}
.card {
  background: white;
  margin-top: 3vh;
  /* width: 20vw; */
  /* height: 56vh; */
  border-radius: 20px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.082);
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.card img {
  width: 12vw;
}
.title {
  margin-top: 3vh;
  font-size: 20px;
  text-align: center;
}
.priceGroup {
  display: flex;
  justify-content: flex-start;
  margin-top: 2vh;
}
.price {
  text-align: left;
  font-size: 12px;
  margin-top: 2vh;
}
.stock {
  display: flex;
  align-items: center;
  font-size: 12px;
}
.number {
  margin-left: 10px;
}
button {
  background: #2096f3;
  border: none;
  margin-top: 3vh;
  height: 5vh;
  width: 16vw;
  border-radius: 20px;
  color: white;
  cursor: pointer;
}
button:hover {
  background: lightpink;
}
button:focus {
  border: none;
  outline: none;
}
.cartPage {
  background: rgba(0, 0, 0, 0.308);
  width: 100vw;
  height: 100vh;
  margin-top: -200vh;
  position: fixed;
  /* flex-direction: column; */
  display: flex;
  align-items: center;
  justify-content: center;
}
.cartContainer {
  background: white;
  padding: 30px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.082);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
}
.inputan {
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 2vh;
}
.howMuch {
  width: 30vw;
  height: 5vh;
  padding: 0 20px;
  margin-top: 1vh;
}
.textarea {
  height: 15vh;
  padding: 10px 20px;
}
.x {
  color: lightcoral;
  font-size: 18px;
  text-align: right;
  cursor: pointer;
}
</style>
