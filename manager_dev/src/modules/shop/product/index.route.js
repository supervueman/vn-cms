export default [{
  path: '/shop/products',
  name: 'products',
  component: 'Products',
  meta: {
    layout: 'layout-shop'
  }
}, {
  path: '/shop/products/:id',
  name: 'product',
  component: 'Product',
  meta: {
    layout: 'layout-shop'
  }
}, {
  path: '/shop/product-create',
  name: 'product-create',
  component: 'ProductCreate',
  meta: {
    layout: 'layout-shop'
  }
}];
