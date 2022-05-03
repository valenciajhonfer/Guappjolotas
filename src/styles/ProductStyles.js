import styled from 'styled-components'

export const Img = styled.img`
    display: block;
    margin-left: auto;
    margin-right: auto;
    height: 200px;
`

export const CardBtn = styled.div`
    justify-content: space-around;
    display: flex;
    border-radius : 25px;
    background-color: white;
    padding: 1px;
    margin-inline: 75px;
`

export const QtyBtn = styled.button`
    padding: 0;
    border: none;
    background: none;
    &:hover:active{
        transform: scale(.90)
    }
`

export const FlavorImg = styled.img`
    &:hover:active{
        transform: scale(.90)
    }
`

export const ProdName = styled.h3`
    text-align: center;
    color: black;
    font-size: 28px;
`

export const Price = styled.h3`
    text-align: center;
    color: #FA4A0C;
    font-size: 22px;
`
export const Price2 = styled.h3`
    text-align: center;
    color: #FA4A0C;
    font-size: 12px;
`

export const FlavorGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    
`

export const FlavorItem = styled.div`
     justify-content: center;
     margin-bottom: 5px;
`

export const AddToCartBtn = styled.button`
    background-color: #F6F6F9;
    justify-content: center;
    background-color: #FA4A0C;
    border-radius: 40px;
    height: 70px;
    width: 320px;
    color: white;
    padding: 25px;
    text-align: center;
    font-size: 18px;
    border: none;
    &:hover:active{
        transform: scale(.98)
    }
`

export const BtnAddToCartContainer = styled.div`
justify-content: center;
    width: 100%;
    position: relative;
    backdrop-filter: blur(48px);
    background-color:#F2F2F2;
    display: flex;
    flex-direction: row;
    padding: 15px 5px;
    position: fixed;
    bottom: 0px;
    margin-top: auto;
`

export const ProductMain = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    bottom: 70px;
`

export const Row = styled.div`
   display: flex;
   justify-content: flex-end;
`
export const RowPay = styled.div`
   display: flex;
   justify-content: space-between;
`

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
`

export const DivCart = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
`
export const DivCart2 = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
    padding-left: 10px;
`

export const H4 = styled.h4`
    margin: 0;
`
