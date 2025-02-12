import styled from "styled-components"

const StyledContainer = styled.div`
    margin: 5px;

    display: flex;
    flex-direction: column;
    justify-content: center;

    label{
        font-size: 15px;
    }
    input{
        padding: 10px;

        border: 0;
        background-color: transparent;
        border-bottom: 1px solid ${props => props.$error ? '#ff0000' : '#ccc'};
        outline: none;

        transition: all ease 0.3s;
    }
`
export default function Input({ label, placeholder, value, onChange, error }){

    return(
        <StyledContainer $error = {error}>
          <label> { label }</label>
          <input 
            type = 'text' 
            placeholder = {placeholder}
            value = {value}
            onChange = {onChange}
          />
        </StyledContainer>
    )
}