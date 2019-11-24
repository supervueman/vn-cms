module.exports = {
  routes: [{
      base_route_name: 'products',
      route_dir_path: 'shop/components/product/routes'
    }, {
      base_route_name: 'productfields',
      route_dir_path: 'shop/components/productfield/routes'
    }, {
      base_route_name: 'carts',
      route_dir_path: 'shop/components/cart/routes'
    },
    {
      base_route_name: 'orderstatuses',
      route_dir_path: 'shop/components/orderstatus/routes'
    },
    {
      base_route_name: 'orders',
      route_dir_path: 'shop/components/order/routes'
    },
    {
      base_route_name: 'deliveries',
      route_dir_path: 'shop/components/delivery/routes'
    }
  ],
  associations: [{
    association_dir_path: 'shop/components/product/association'
  }, {
    association_dir_path: 'shop/components/productfield/association'
  }, {
    association_dir_path: 'shop/components/cart/association'
  }, {
    association_dir_path: 'shop/components/orderstatus/association'
  }, {
    association_dir_path: 'shop/components/order/association'
  }, {
    association_dir_path: 'shop/components/delivery/association'
  }]
};
