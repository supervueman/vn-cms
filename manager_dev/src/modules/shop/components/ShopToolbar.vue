<template lang="pug">
  v-toolbar(flat color="primary" dark)
    v-toolbar-items
      v-btn(text to="/shop") {{d.orders || 'Заказы'}}
      v-btn(text to="/shop/order-statuses") {{d.order_statuses || 'Статусы заказа'}}
      v-btn(text to="/shop/deliveries") {{d.deliveries || 'Варианты доставки'}}
      v-btn(text to="/shop/products") {{d.products || 'Товары'}}
</template>
