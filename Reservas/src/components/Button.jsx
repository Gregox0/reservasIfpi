
import styled from "styled-components"

const StyledButton = styled.button`
    padding: 10px;
    margin: 5px;

    width: 350px;

    border: 0;
    border-radius: 3px;
    outline: none;
    background-color: #2f9e41;
    color: white;
    transition: all ease 0.3s;

    &:hover{
        background-color: #287E36;
    }
`

export default function Button({ value, onClick }){
    return(
        <StyledButton onClick = {onClick}>{ value }</StyledButton>
    )
}
