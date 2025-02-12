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
        border-bottom: 1px solid #ccc;
        outline: none;
    }
`
export default function Input({ label, placeholder, value, onChange }){

    return(
        <StyledContainer>
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