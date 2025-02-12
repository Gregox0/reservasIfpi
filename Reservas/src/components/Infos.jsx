
import styled from "styled-components"

const StyledContainer = styled.div`
  margin-bottom: 30px;
  padding: 10px;

  width: 360px;
  
  background-color: #fff;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  border-top: 15px solid #2f9e41;
  border-radius: 5px;
  p{
    font-size: 15px;
  }
`
const PContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`
export default function Infos({ max, msg }){
  return(
    <StyledContainer>
      {
        max ? (
          <>
            <h4>Reserva restaurante institucional campus Paulistana</h4>
            
            <PContainer>
              <p>{ msg }</p>
            </PContainer>
          </>
        ) : (
          <>
            <h4>Reserva restaurante institucional campus Paulistana</h4>
            <PContainer>
              <p>Cardápio segunda 10/08/2025:</p>
            <p>Salada/ Frango com batata / Baião / Farofa / Melancia</p>
            </PContainer>
            <p>Cardápio sujeito a mudanças conforme a disponibilidade de alimentos.</p>
            <p>Atenção para o horário de funcionamento: 11:40 as 13:00 </p>
            <PContainer>
              <p>Pedimos a consciência de que caso NÃO VÁ comparecer após ter feito a reserva, favor comunicar ao restaurante para ceder a vaga para outro aluno</p>
            </PContainer>
          </>
        )
      }
    </StyledContainer>
  )
}
