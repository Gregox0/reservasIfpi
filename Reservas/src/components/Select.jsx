
import { useState } from "react"
import styled from "styled-components"

const StyledContainer = styled.div`
    position: relative;

    margin: 5px;

    display: flex;
    flex-direction: column;

    label{
        font-size: 15px;
    }
`
const StyledInput = styled.input`
    padding: 10px;

    width: ${props => props.$width || '100%'};

    border: 0;
    background-color: transparent;
    border-bottom: 1px solid ${props => props.$error ? '#ff0000' : '#ccc'};
    outline: none;
    transition: all ease 0.3s;
`

const Infos = styled.div`
    position: absolute;

    padding: 10px;
    margin-top: 5px;

    width: ${props => props.$width || '100%'};
    top: 100%; 

    display: ${(props) => (props.$isFocused ? 'block' : 'none')};
    z-index: 10;

    background: white;
    box-shadow: 0 15px 30px rgba(0,0,0,0.1);
    border-radius: 3px;

    p{
        margin: 5px;
        padding: 5px;

        border-radius: 3px;
        cursor: pointer;

        transition: all ease 0.3s;

        &:hover{
            background-color: #ccc;
        }
    }
`
export default function Input({ label, placeholder, value, onChange, width, options, error }){

    const [isFocused, setIsFocused] = useState(false) 

    const filteredOptions = options.filter(option =>
        option.toLowerCase().startsWith(value.toLowerCase())
    )

    const handleOptionClick = (selectedValue) => {
        onChange({ target: { value: selectedValue } })
        setIsFocused(false)
    }

    const handleKeyDown = (e) => {
        if(e.key == 'Enter' && filteredOptions.length > 0){
            handleOptionClick(filteredOptions[0])
            e.preventDefault()
        }
    }

    const handleChange = (e) => {
        onChange(e)
        setIsFocused(true)
    };

    return(
        <StyledContainer>
          <label> { label }</label>
          <StyledInput
            $error = {error}
            type = 'text' 
            placeholder = {placeholder}
            value = {value}
            onChange = {handleChange}
            onKeyDown = {handleKeyDown}
            $width = {width}
            onFocus = {() => setIsFocused(true)}
            onBlur = {() => setTimeout(() => setIsFocused(false), 100)}
          />
        <Infos $isFocused={isFocused} $width = {width}>
            {filteredOptions.length > 0 ? (
                filteredOptions.map((type, index) => (
                    <p key={index} onClick={() => handleOptionClick(type)}>
                        {type}
                    </p>
                ))) : (
                    <p>Inválido</p>
                )
            }
        </Infos>
        </StyledContainer>
    )
}
