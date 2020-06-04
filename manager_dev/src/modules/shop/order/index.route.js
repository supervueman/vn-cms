export default [{
  path: '/shop/orders',
  name: 'orders',
  component: 'Orders',
  meta: {
    layout: 'layout-shop'
  }
}, {
  path: '/shop/orders/:id',
  name: 'order',
  component: 'Order',
  meta: {
    layout: 'layout-shop'
  }
}, {
  path: '/shop/order-create',
  name: 'order-create',
  component: 'OrderCreate',
  meta: {
    layout: 'layout-shop'
  }
}];
