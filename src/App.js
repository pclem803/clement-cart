import React, { useEffect, useState } from "react";
import {
  Image,
  Box,
  Column,
  Button,
  Container,
  Title,
  Message,
  Notification,
  Content,
  Modal
} from "rbx";
import "rbx/index.css";

const App = () => {
  const [data, setData] = useState({});
  const [cart, setCart] = useState({});
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

  return (
    <Container>
      <br></br>
      <Banner cartState = {{open, openCart}}/>
      <Inventory products={products} />
      <ShowCart cartState = {{open, openCart}}/>
    </Container>
  );
};

const ShowCart = ({cartState}) => {
  if (cartState.open==true){
    return(<Modal active>
      <Modal.Background onClick = {() => (
        cartState.openCart(false)
      )}/>
      <Modal.Content>
        <LoadCart/>
      </Modal.Content>
      <Modal.Close onClick = {() => (
        cartState.openCart(false)
      )}/>
    </Modal>)
  }
  else {
    return(<Modal>
      <Modal.Background />
      <Modal.Content>
        This your cart!
      </Modal.Content>
      <Modal.Close/>
    </Modal>)
  }
}

const LoadCart = () =>{
  return(
    <Box>
      This is the cart
    </Box>
  )
}

const Banner = ({cartState}) => (
  <React.Fragment>
    <Notification textAlign="centered" color="primary">
      <Title>Welcome to Clement Cart!</Title>
    </Notification>
    <Button.Group align="centered">
      <Button size="large"
      color="dark"
      onClick = {()=>cartState.openCart(true)}>View Cart</Button>
    </Button.Group>
  </React.Fragment>
);

const Inventory = ({ products }) => {
  return (
    <React.Fragment>
      <Column.Group breakpoint="desktop" multiline gapSize={6}>
        {products.map(this_product => (
          <Column size={3} textAlign="centered">
            <Box color="primary" textAlign="center" size={20}>
              <Content>{this_product.title}</Content>
              <GetImage code={this_product.sku} />
              <MakeDesc code={this_product} />
            </Box>
          </Column> 
        ))}
      </Column.Group>
    </React.Fragment>
  );
};

const MakeDesc = ({ code }) => {
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
      <MakeSize />
    </Content>
  );
};

const MakeSize = () => {
  return (
    <Button.Group size="medium" hasAddons align="centered">
      <Button>S</Button>
      <Button>M</Button>
      <Button>L</Button>
      <Button>XL</Button>
    </Button.Group>
  );
};

const GetImage = ({ code }) => {
  const url = "/data/products/" + code + "_1.jpg";
  console.log(url);
  return (
    <Image.Container>
      <Image src={url} />
    </Image.Container>
  );
};

export default App;
