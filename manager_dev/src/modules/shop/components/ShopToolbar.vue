<template lang="pug">
  v-toolbar(flat color="primary" dark)
    v-toolbar-items
      v-btn(text to="/shop/orders") {{d.orders || 'Orders'}}
      v-btn(text to="/shop/order-statuses") {{d.order_statuses || 'Order statuses'}}
      v-btn(text to="/shop/deliveries") {{d.deliveries || 'Deliveries'}}
      v-btn(text to="/shop/order-modificators") {{d.order_modificators || 'Order modificators'}}
      v-btn(text to="/shop/product-modificators") {{d.product_modificators || 'Product modificators'}}
</template>
