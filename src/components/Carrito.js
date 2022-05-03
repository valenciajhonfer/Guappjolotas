import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Column,
  DivCart2,
  Row,
  AddToCartBtn,
  BtnAddToCartContainer,
  RowPay,
} from "../styles/ProductStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Card, Img, Price, ProdName } from "../styles/CardStyles";
import { CartContext } from "./CarritoCont";

let total1 = 0;

const Carrito = () => {
  const { contextCart, setContextCart } = useContext(CartContext);

  const [cartArrayInc, setCartArrayInc] = useState([]);

  useEffect(() => {
    setCartArrayInc(contextCart);
    console.log(cartArrayInc);
  }, []);

  const cardClick = (id, category) => {
    console.log(id, category);
  };

  const calcTotal = (cart) =>{
    return cart.map(item => item.price).reduce((prev, curr) => prev + curr, 0)
  }
  

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <DivCart2>
          <Link to="/product">
            <FontAwesomeIcon
              link
              icon={faArrowLeft}
              style={{ color: "grey" }}
            />
          </Link>
        </DivCart2>
        <div style={{ display: "flex", margin: "auto" }}>
          <h2 className="hcart">Carrito</h2>
        </div>
      </div>

      <div
        style={{
          marginBottom: "90px",
        }}
      >
        {cartArrayInc.map((prod) => (
          <Card key={prod.id}>
            <Link
              to="/product"
              onClick={(e) => {
                cardClick(prod.id, prod.category);
              }}
              style={{ textDecoration: "none" }}
            >
              <Row>
                <Column>
                  <Img src={prod.img} alt={prod.type} />
                </Column>
                <Column>
                  <ProdName>{prod.type}</ProdName>
                  <p>x {prod.amount}</p>
                  <Price>${prod.price} MXN</Price>
                </Column>
              </Row>
            </Link>
          </Card>
        ))}
      </div>

      <div
        style={{
          marginBottom: "90px",
        }}
      >
        <Card>
          <RowPay>
            <Column>
              <h3 style={{ flexDirection: "start" }}>Total</h3>
            </Column>
            <Column>
              <h3 style={{ color: "#FA4A0C" }}>
                ${calcTotal(cartArrayInc)}
                MXN
              </h3>
            </Column>
          </RowPay>
        </Card>
      </div>

      <BtnAddToCartContainer>
        <AddToCartBtn>
          <span
            onClick={() => {
              axios.post(
                "https://guappjolotas-jsonserver.herokuapp.com/allproducts/?type_like=",
                cartArrayInc
              );
            }}
          >
            Pagar
          </span>
        </AddToCartBtn>
      </BtnAddToCartContainer>
    </div>
  );
};

export default Carrito;
