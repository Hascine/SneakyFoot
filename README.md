[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=14983310&assignment_repo_type=AssignmentRepo)

# P2-Challenge-2 (Client Side)

> Tuliskan API Docs kamu di sini

CMS
[sneakyfoot-cms.hascine.xyz](https://sneakyfoot-cms.hascine.xyz/)

nb: untuk link cms yang udah dideploynya gatau kenapa error gitu tapi di local aman aman aja

Client
[sneakyfoot.hascine.xyz](https://sneakyfoot.hascine.xyz/)

Account

```js
Email: admin@shoes.com
Password: test123
```

```js
Email: staff1@shoes.com
Password: test123
```

```js
Email: staff2@shoes.com
Password: test123
```

```js
Email: staff3@shoes.com
Password: test123
```

```js
Email: staff4@shoes.com
Password: test123
```

```js
Email: nala@shoes.com
Password: test123
```

Test Add Product for CMS

```js
name: 'SEPATU NMD_R1 PRIMEBLUE';
desc: 'SEPATU SNEAKER PROGRESIF YANG TERINSPIRASI RUNNING.';
stock: 'bebas';
price: 'bebas';
imgUrl: 'https://www.adidas.co.id/media/catalog/product/g/z/gz9261_sl_ecom.jpg';
category: 'Adidas';
```

```js
name: 'ISPA Link Axis - Multi-Colour';
desc: 'Step into the ISPA Link Axis, a continuation of our journey to push the needle of footwear design.';
stock: 'bebas';
price: 'bebas';
imgUrl: 'https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/aed7e5a1-d01e-4c24-9bbb-21a9f35fff3e/ispa-link-axis-multi-colour-fz3507-001-release-date.jpg';
category: 'Nike';
```

CMS Endpoints

```js
'/';

'/login';

'/products';

'/products/add';

'/products/edit/:id';

'/products/img/:id';

'/categories';

'/user/add';
```

Client

```js
'/';

'/detail/:id';
```
