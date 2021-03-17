# Full-Stack Application Demo

## Intro

This app is a MERN (MongoDB, Express, React and Node) app.

## Server

The server is an express server (mainly an API server, except in production where it serves files from the client folder)

### API Routes

Routes begin with `/api/v1/` and then the model they are manipulating. There are `products` routes set up. The model for a product is:

```javascript
{
  title: String,
  price: Number.
}
```

sent as `application/json`

* GET `/api/v1/products` - gets all products
* GET `/api/v1/products/1234` - gets the product with an id of `1234`
* POST `/api/v1/products` - adds a product (you need to send data in the request body, as shown above)
* PUT `/api/v1/products/1234` - updates the product with an id of `1234` with the data you send in the request body (only updated fields required) (404 if not found)
* DELETE `api/v1/products/1234`deletes the product with an id of`1234` (404 if not found)
