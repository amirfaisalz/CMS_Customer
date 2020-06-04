<template>
  <div class="cartPage">
    <h1>Cart</h1>
    <button @click.prevent="backToProduct" class="back">Back to product</button>
    <Notif class="notif"/>
    <div class="cart">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Notes</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody v-for="cart in carts" :key="cart.id">
          <tr>
            <td @click.prevent="removeItem(cart.id)" class="delete">
              delete
            </td>
            <td>
              <img :src="cart.Product.image_url" alt="" />
            </td>
            <td>{{ cart.Product.name }}</td>
            <td>{{ priceFormat(cart.Product.price) }}</td>
            <td>{{ cart.total }}</td>
            <td>{{ cart.notes }}</td>
            <td>{{ priceFormat(countGrandTotal(cart)) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import server from "../api";
import Notif from "../components/Notif"
export default {
  name: "Cart",
  components: {
    Notif
  },
  methods: {
    backToProduct() {
      this.$router.push("/dashboard/detail");
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
    countGrandTotal(cart) {
      let grandtotal = 0;
      grandtotal += cart.total * cart.Product.price;
      return grandtotal;
    },
    removeItem(id) {
      server({
        method: "delete",
        url: `/cart/${id}`,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.$store.dispatch("fetchCart");
          this.$store.commit("CHANGE_MYNOTIF", data.msg);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  },
  computed: {
    carts() {
      return this.$store.state.carts;
    }
  },
  created() {
    if (!localStorage.token) {
      this.$store.commit("SET_LOGIN", false);
      this.$router.push("/");
    } else {
      this.$store.dispatch("fetchCart");
    }
  }
};
</script>

<style scoped>
.cartPage {
  padding: 0 30px;
  height: 100vh;
}
h1 {
  margin-top: 20px;
  text-align: left;
  margin-bottom: -20px;
}
.back {
  margin-bottom: 2vh;
  margin-left: 84vw;
  background: royalblue;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 20px;
  cursor: pointer;
}
.back:focus {
  border: none;
  outline: none;
}
.cart {
  background: white;
  border-radius: 20px;
}
table {
  border-collapse: collapse;
  width: 100%;
  overflow: hidden;
  z-index: -99;
}
th,
td {
  padding: 20px;
  text-align: left;
}
th {
  color: #909090;
  border-bottom: 1px solid #f1f1f1;
  padding-bottom: 30px;
}
td {
  vertical-align: center;
  font-size: 16px;
  color: #909090;
}
img {
  width: 5vw;
}
.delete {
  cursor: pointer;
}
.notif {
  margin-bottom: 20px;
}
</style>
