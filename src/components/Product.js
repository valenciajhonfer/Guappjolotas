import React, { useEffect, useState, useContext } from "react";
import {
  URL_BEBIDAS,
  URL_GUAJOLOTAS,
  URL_SABORES,
  URL_SABORES_BEBIDAS,
  URL_TAMALES,
} from "../helpers/URL";
import axios from "axios";
import {
  CardBtn,
  QtyBtn,
  Price,
  Price2,
  ProdName,
  Img,
  FlavorGrid,
  FlavorItem,
  FlavorImg,
  AddToCartBtn,
  BtnAddToCartContainer,
  ProductMain,
  Row,
  Column,
  DivCart,
  H4,
} from "../styles/ProductStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { CartContext } from "./CarritoCont";

let recoProdCost = 0;
let recoProdAmt = 0;
let totalCost = 0;

let currArr = [];
let currProd = {};
// Capturo id y lo envio al localStorage
export const Product = () => {
  let prodId = JSON.parse(localStorage.getItem("idKeeper"));
  
  // CONTEXTO GLOBAL DESESTRUCTURACIÓN
  const { contextCart, setContextCart } = useContext(CartContext); 
  console.log(contextCart);

  const [currentCart, setCurrentCart] = useState([
    {
      type: "",
      amount: 1,
      img: "",
      price: 0,
      id: 0,
    },
  ]);
  console.log(currentCart);
//PRODUCTO PRINCIPAL PORTA COCHE
  const [cartHolder, setCartHolder] = useState([
    
    {
      type: "",
      amount: 1,
      img: "",
      price: 25,
      id: 0,
    },
  ]);
// Recojo producto
  const [cartHolder2, setCartHolder2] = useState([
   
    {
      type: "",
      amount: 0,
      img: "",
      price: 0,
      id: 0,
    },
  ]);
  // Agrego cantidad al carrito
  const cartHolderHandlerMainAdd = (p) => {
   
    let cont = cartHolder[0].amount;
    if (cartHolder[0].amount === 1) {
      setCartHolder(
        (cartHolder[0] = [
          {
            type: p.type,
            amount: cont + 1,
            img: p.img,
            price: p.price,
            id: p.id,
          },
        ])
      );
      console.log(cartHolder);
    } else if (cartHolder[0].amount > 1) {
      setCartHolder(
        (cartHolder[0] = [
          {
            type: p.type,
            amount: cont + 1,
            img: p.img,
            price: p.price,
            id: p.id,
          },
        ])
      );
    }
  };
//manejando el producto principal del carrito restando sin dejar -1
  const cartHolderHandlerMainMin = (p) => {
    
    let cont = cartHolder[0].amount;
    if (cartHolder[0].amount > 1) {
      setCartHolder(
        (cartHolder[0] = [
          {
            type: p.type,
            amount: cont - 1,
            img: p.img,
            price: p.price,
            id: p.id,
          },
        ])
      );
      console.log(cartHolder);
    } else {
      return;
    }
  };
// Sumo cantidad del carrito
  const cartHolderRecoAdd = (evt, p) => {
   
    let cont = cartHolder2[0].amount;
    if (evt.target.checked === true) {
      setCartHolder2(
        (cartHolder2[0] = [
          {
            type: p.type,
            amount: cont + 1,
            img: p.img,
            price: p.price,
            id: p.id,
          },
        ])
      );
    } else if (evt.target.checked === false) {
      setCartHolder2(
        (cartHolder2[0] = [
          {
            type: p.type,
            amount: cont - 1,
            img: p.img,
            price: p.price,
            id: p.id,
          },
        ])
      );
    }
  };

  const handleAddBtn = (prod, type) => {
    console.log(type);
    console.log(prod);
    if (type === "main") {
      setCurrentCart([
        {
          type: prod.type,
          amount: productAmount,
          img: prod.img,
          id: prod.id,
          price: prod.price,
        },
      ]);
    } else if (type === "combo") {
      setCurrentCart(currentCart => [
        ...currentCart,
        {
          type: prod.type,
          amount: 1,
          img: prod.img,
          id: prod.id,
          price: prod.price
        },
      ]);
    }

    setContextCart(currentCart);
  };
//array producto recomendado
  const [recomendedProduct, setRecomendedProduct] = useState([]); 
  const [flavors, setFlavors] = useState([]); //VARIEDAD DE SABORES
  const [currentProduct, setCurrentProduct] = useState({});
  const [productAmount, setProductAmount] = useState(1);
  const [mainProductCost, setMainProductCost] = useState(currentProduct.price);
  const [totalUnits, setTotalUnits] = useState(1);

  useEffect(() => {
    getCurrProduct(prodId);
    getRecomend(prodId.category);
    getFlavors(prodId.category);
    console.log(currentProduct); // NO LOGEA EL VALOR Y YA EXISTE EN LA FUNCION? YA ESTÁ SETEADO EL VALUE TOCA QUEMARLO
  }, [totalCost]);

  const getCurrProduct = async (prod) => {
    
    if (prod.category === "guajolotas") {
      await axios.get(URL_GUAJOLOTAS).then((res) => (currArr = res.data));
    } else if (prod.category === "bebidas") {
      await axios.get(URL_BEBIDAS).then((res) => (currArr = res.data));
    } else if (prod.category === "tamales") {
      await axios.get(URL_TAMALES).then((res) => (currArr = res.data));
    }

    currProd = currArr.find((element) => element.id === prod.id);
    console.log(currArr);
    console.log(currProd);
    setCurrentProduct(currProd);
  };

  const getRecomend = async (category) => {
    if (category === "guajolotas" || category === "tamales") {
      await axios
        .get(URL_BEBIDAS)
        .then((res) => setRecomendedProduct(res.data));
    } else if (category === "bebidas") {
      await axios
        .get(URL_GUAJOLOTAS)
        .then((res) => setRecomendedProduct(res.data));
    }
  };

  const getFlavors = async (category) => {
    if (category === "guajolotas" || category === "tamales") {
      await axios.get(URL_SABORES).then((res) => setFlavors(res.data));
    } else if (category === "bebidas") {
      await axios.get(URL_SABORES_BEBIDAS).then((res) => setFlavors(res.data));
    }
  };
  // sabor
  const handleFlavor = async (flavor) => {
    await getCurrProduct(prodId);
    console.log(flavor);
    console.log(currArr);
    let foundFlavor = currArr.find(
      (product) => product.flavor === flavor.sabor
    );
    setCurrentProduct(foundFlavor);
    console.log(currentProduct)
  };

  const handleAddProduct = () => {
    setProductAmount(productAmount + 1);
    setMainProductCost(productAmount * currentProduct.price);
    setTotalUnits(totalUnits + 1);
    totalCost = totalCost + currentProduct.price;
  };
  const handleSubProduct = () => {
    if (productAmount > 1) {
      setProductAmount(productAmount - 1);
      setMainProductCost(productAmount * currentProduct.price);
      setTotalUnits(totalUnits - 1);
      totalCost = totalCost - currentProduct.price;
    } else if (productAmount === 1) {
      return;
    }
  };

  const handleRecoAdd = (evt, prod) => {
    if (evt.target.checked === true) {
      recoProdCost += prod.price;
      recoProdAmt += 1;
      setTotalUnits(totalUnits + 1);
      totalCost = totalCost + prod.price;
    } else {
      recoProdCost -= prod.price;
      recoProdAmt -= 1;
      setTotalUnits(totalUnits - 1);
      totalCost = totalCost - prod.price;
    }
    console.log(recoProdCost);
    console.log(recoProdAmt);
  };

  return (
    <div>
      <div className="header">
        <DivCart>
          <Link to="/">
            <FontAwesomeIcon
              link
              icon={faArrowLeft}
              style={{ color: "grey" }}
            />
          </Link>
          <Link to="/cart">
            <FontAwesomeIcon icon={faShoppingCart} style={{ color: "grey" }} />
          </Link>
        </DivCart>
      </div>
      <ProductMain>
        <section>
          <div>
            <Img
              src={currentProduct.img}
              style={{ height: "200px", width: "200px" }}
              alt=""
            />
            <ProdName>{currentProduct.type}</ProdName>
            <Price>${currentProduct.price} MXN</Price>
          </div>

          <CardBtn>
            <QtyBtn>
              <img
                onClick={() => {
                  handleSubProduct();
                  cartHolderHandlerMainMin(currentProduct);
                }}
                src="https://res.cloudinary.com/diqhctpcx/image/upload/v1636994750/guappjolotas/interface/minus-circle_xyliah.svg"
                alt=""
              />
            </QtyBtn>
            <h2>{productAmount}</h2>
            <QtyBtn>
              <img
                onClick={() => {
                  handleAddProduct();
                  cartHolderHandlerMainAdd(currentProduct);
                }}
                src="https://res.cloudinary.com/diqhctpcx/image/upload/v1636989826/guappjolotas/interface/plus-circle_zfrpde.svg"
                alt=""
              />
            </QtyBtn>
          </CardBtn>
        </section>

        <section>
          <h3>Sabor</h3>
          <div>
            <FlavorGrid>
              {flavors.map((flavor) => (
                <div key={flavor.id}>
                  <FlavorItem>
                    <FlavorImg
                      onClick={() => {
                        handleFlavor(flavor);
                      }}
                      src={flavor.img}
                    />
                  </FlavorItem>
                </div>
              ))}
            </FlavorGrid>
          </div>
        </section>

        {/* GUAJOLOCOMBO */}

        <h2>Gualolocombo</h2>
        <h5>
          Selecciona la bebida que más te guste y disfruta de tu desayuno.
        </h5>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "90px",
          }}
        >
          {recomendedProduct.map((prod) => (
            <div
              key={prod.id}
              style={{
                width: "10rem",
                height: "12rem",
                backgroundColor: "white",
                borderRadius: "15px",
                margin: "5px",
              }}
            >
              <Row>
                <input
                  onClick={(evt) => {
                    handleRecoAdd(evt, prod);
                    if (evt.target.checked === true) {
                      handleAddBtn(prod, "combo");
                    }
                  }}
                  type="checkbox"
                />
              </Row>
              <Column>
                <img
                  style={{ width: "5rem", height: "5rem" }}
                  src={prod.img}
                  alt="bebida"
                />
                <H4 style={{ fontSize: "13px", fontWeight: "bold" }}>
                  {prod.type}
                </H4>
                <p
                  style={{
                    color: "#FA4A0C",
                    fontSize: "13px",
                    fontWeight: "bold",
                    margin: "0",
                  }}
                >
                  + ${prod.price} MXN
                </p>
              </Column>
            </div>
          ))}
        </div>
      </ProductMain>
      <div style={{ display: "flex" }}>
        <BtnAddToCartContainer>
          <AddToCartBtn
            onClick={() => {
              handleAddBtn(currentProduct, "main");
            }}
          >
            Agregar {totalUnits} al carrito:
            <span>
              {" "}
              ${" "}
              {totalCost === 1
                ? currentProduct.price
                : recoProdCost + currentProduct.price * productAmount}{" "}
              Pesos Mexicanos
            </span>
          </AddToCartBtn>
        </BtnAddToCartContainer>
      </div>
    </div>
  );
};
