import styled from 'styled-components'

export const Body = styled.body`
    font-family: 'Inter', sans-serif;
`

export const H1 = styled.h1`
    font-family: 'Inter', sans-serif;
`

export const Divbkg = styled.div`
    background-color: #F2F2F2;
    `
export const Sh3 = styled.h3`
    color: gray;
    text-align: center;
    grid-column:1;
    padding: .5rem;

    &.active {
        color: red;
        text-decoration: underline;
    }
    `

export const Categorydiv = styled.div`
    display: flex;
    justify-content:space-between;
    grid-row: 1;
`

export const Input = styled.input`
    border-radius: 35px;
    display: flex;
    text-decoration: none;
    text-align: center;
    
    height: 60px;
    width: 312px;
    background-color: #E7E7E7;
    color: #9A9A9D;
    font-size: 17px;
    line-height: 21px;
`
export const Section = styled.section`
    display: flex;
    justify-content:center;
    margin: auto;
    text-align: center;
    padding: 10px;
    width: 80%;
`
