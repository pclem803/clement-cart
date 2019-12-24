import React, { useEffect, useState } from "react";
import {
  Image,
  Box,
  Column,
  Button,
  Container,
  Title,
  Notification,
  Content,
  Modal,
  Card,
  Heading
} from "rbx";
import "rbx/index.css";

const App = () => {
  const [data, setData] = useState({});
  const [cart, setCart] = useState([]);
  const [open, openCart] = useState(false);

  const products = Object.values(data);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("./data/products.json");
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);
  console.log(products)
  return (
    <Container>
      <br></br>
      <Banner cartState={{ open, openCart }} />
      <Inventory products={products} addState={{ cart, setCart }} />
      <ShowCart cartState={{ open, openCart }} addState={{ cart, setCart }} />
    </Container>
  );
};

const ShowCart = ({ cartState, addState }) => {
  if (cartState.open === true) {
    return (
      <Modal active>
        <Modal.Background onClick={() => cartState.openCart(false)} />
        <Modal.Content>
          <LoadCart items={addState} />
        </Modal.Content>
        <Modal.Close onClick={() => cartState.openCart(false)} />
      </Modal>
    );
  } else {
    return <Modal></Modal>;
  }
};

const LoadCart = ({ items }) => {

  if (items.cart.length === 0) {
    return (
      <Content>
        <Notification color="dark">
          <Notification color="primary" textAlign="centered">
            Your Cart
          </Notification>
          <Notification color="dark" textAlign="centered">
            Add items to your cart to get started!
          </Notification>
        </Notification>
      </Content>
    );
  }
  return (
    <Content>
      <Notification color="dark">
        <Notification color="primary" textAlign="centered">
          Your Cart
        </Notification>
        <Notification color="dark" textAlign="centered">
          {items.cart.map(item => (
            <CartProduct item={item} />
          ))}
          <Button size="large" color="primary" fullwidth>
            Checkout
          </Button>
        </Notification>
      </Notification>
    </Content>
  );
};

const CartProduct = ({ item }) => {
  return (
    <Notification color="dark">
      <Column.Group>
        <Column size={1}>
          <Image.Container size={64}>
            <GetImage code={item.sku}></GetImage>
          </Image.Container>
        </Column>
        <Column size={8}>
          <Content>
            <p>{item.title}<br></br>{item.size}</p>
          </Content>
        </Column>
      </Column.Group>
    </Notification>
  );
};


const Banner = ({ cartState }) => (
  <React.Fragment>
    <Notification textAlign="centered" color="primary">
      <Title>Welcome to Clement Cart!</Title>
    </Notification>
    <Button.Group align="centered">
      <Button
        size="large"
        color="dark"
        onClick={() => cartState.openCart(true)}
      >
        View Cart
      </Button>
    </Button.Group>
  </React.Fragment>
);

const Inventory = ({ products, addState }) => {
  return (
    <React.Fragment>
      <Column.Group breakpoint="desktop" multiline gapSize={6}>
        {products.map(this_product => (
          <Column size={3} textAlign="centered">
            <Box color="primary" textAlign="center" size={20}>
              <Content>{this_product.title}</Content>
              <GetImage code={this_product.sku} />
              <MakeDesc code={this_product} addState={addState} />
            </Box>
          </Column>
        ))}
      </Column.Group>
    </React.Fragment>
  );
};

const MakeDesc = ({ code, addState }) => {
  let code_string = code.price.toString();
  if (!code_string.includes(".")) {
    code_string += ".";
  }
  let dec_point = code_string.indexOf(".");
  let cents = code_string.substr(dec_point);
  let dollar_price = Math.floor(code.price);
  while (cents.length < 3) {
    cents = cents + "0";
  }
  return (
    <Content size="large">
      $<strong>{dollar_price}</strong>
      {cents}
      <MakeSize product={code} state={addState} />
    </Content>
  );
};

const MakeSize = ({ product, state }) => {
  let temp= {}
  let temp_product = Object.assign(product, temp)
  console.log(temp_product)

  let array = state.cart;
  return (
    <Button.Group size="medium" hasAddons align="centered">
      <Button
        onClick={() => {
          temp_product.size="S"
          array.push(temp_product)
          state.setCart(array)
        }}
      >
        S
      </Button>
      <Button
        onClick={() => {
          temp_product.size="M"
          array.push(temp_product)
          state.setCart(array)
        }}
      >
        M
      </Button>
      <Button
        onClick={() => {
          temp_product.size="L"
          array.push(temp_product)
          state.setCart(array)
        }}
      >
        L
      </Button>
      <Button
        onClick={() => {
          temp_product.size="XL"
          array.push(temp_product)
          state.setCart(array)
        }}
      >
        XL
      </Button>
    </Button.Group>
  );
};

const GetImage = ({ code }) => {
  const url = "/data/products/" + code + "_1.jpg";
  return <Image src={url} />;
};

export default App;
