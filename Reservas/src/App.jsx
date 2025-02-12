
import { useEffect, useState } from "react"
import styled, { createGlobalStyle } from "styled-components"
import Input from "./components/Input"
import Select from "./components/Select"
import Button from "./components/Button"
import Infos from "./components/Infos"

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Roboto';
    src: url('/fonts/Roboto_Condensed-Medium.ttf') format('tft');
    font-weight: normal;
    font-style: normal;
  }

  * {
    margin: 0;
  }

  body {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Roboto', sans-serif;
    background-color: #f3f3f3;
  }
`

const StyledImg = styled.img`
  height: 200px;
  width: 350px;
`

const Container = styled.div`
  display: flex;
`

const StyledContainer = styled.div`
  margin-bottom: 50%;
  padding: 10px;

  width: 360px;

  background-color: #fff;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`
const cursos = ["Administração", "Agropecuaria", "ADS", "Informatica", "Mineração", "Quimica", "Zootecnia",]
const periodos = ["1º", "2º", "3º"]
const contraTurno = ["Sim", "Não"]

const fetchReservationData = async (setInfos, setLoading) => {
  try {
    await checkMaxReservations(setInfos)
    await checkReservationStatus(setInfos, setLoading)
  } catch (error) {
    console.error("Erro ao verificar dados de reserva:", error)
  }
}

const checkMaxReservations = async (setInfos) => {
  try {
    const response = await fetch("https://servidor-production-65ab.up.railway.app/checar")
    if (response.status === 400) {
      setInfos({ max: true, msg: 'Número de reservas máximas alcançadas' })
    }
  } catch (error) {
    console.error("Erro ao verificar o limite de reservas:", error)
  }
}

const checkReservationStatus = async (setInfos) => {
  try {
    const response = await fetch("https://servidor-production-65ab.up.railway.app/status")
    const status = await response.text()
    if (status === 'fechado') {
      setInfos({ max: true, msg: 'Sistema fechado' })
    } else {
      setInfos({ max: false, msg: '' })
    }
  } catch (error) {
    console.error("Erro ao verificar o status do sistema:", error)
  } 
}

export default function App() {
  const [nome, setNome] = useState("")
  const [curso, setCurso] = useState("")
  const [periodo, setPeriodo] = useState("")
  const [ct, setCt] = useState("")

  const [nomeError, setNomeError] = useState(false)
  const [cursoError, setCursoError] = useState(false)
  const [periodoError, setPeriodoError] = useState(false)
  const [ctError, setCtError] = useState(false)
  
  const [infos, setInfos] = useState({max: false, msg: ''})

  useEffect(() => {
    fetchReservationData(setInfos)

    const interval = setInterval(() => fetchReservationData(setInfos), 30 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const resetForm = () => {
    setNome("")
    setCurso("")
    setPeriodo("")
    setCt("")
  }

  const handleReservation = async () => {
    if (!isFormValid()) return

    const data = { nome, curso, periodo, ct }
    resetForm()

    try {
      const response = await fetch("https://servidor-production-65ab.up.railway.app/reservar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.status === 400) {
        setInfos({ max: true, msg: 'Número de reservas máximas alcançadas' })
      } else if (response.status === 201) {
        setInfos({ max: true, msg: 'Reserva realizada com sucesso' })
      }
    } catch (error) {
      console.error("Erro ao reservar:", error)
    }
  }

  const isFormValid = () => {
    let valid = true
    if (nome.length === 0) {
      setNomeError(true)
      setTimeout(() => setNomeError(false), 1000)
      valid = false
      return
    }
    if (!cursos.includes(curso)) {
      setCursoError(true)
      setTimeout(() => setCursoError(false), 1000)
      valid = false
      return
    }
    if (!periodos.includes(periodo)) {
      setPeriodoError(true)
      setTimeout(() => setPeriodoError(false), 1000)
      valid = false
      return
    }
    if (!contraTurno.includes(ct)) {
      setCtError(true)
      setTimeout(() => setCtError(false), 1000)
      valid = false
      return
    }
    return valid
  }


  return (
    <>
      <GlobalStyle />
      <StyledImg src="imgs/IFPI.png" alt="IFPI Logo" />
      <Infos max = {infos.max} msg = {infos.msg}/>
      {infos.max ? (
        <></>
      ) : (
        <StyledContainer>
          <Input
            label="Nome"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            error={nomeError}
          />
          <Container>
            <Select
              width="200px"
              label="Curso"
              placeholder="Digite seu curso"
              value={curso}
              onChange={(e) => setCurso(e.target.value)}
              options={cursos}
              error={cursoError}
            />
            <Select
              width="100px"
              label="Período"
              placeholder="Período"
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
              options={periodos}
              error={periodoError}
            />
          </Container>
          <Select
            width="330px"
            label="Contra turno"
            placeholder="Possui contra turno?"
            value={ct}
            onChange={(e) => setCt(e.target.value)}
            options={contraTurno}
            error={ctError}
          />
          <Button
            value = 'Reservar'
            onClick = {handleReservation}
          />
        </StyledContainer>
      )}
    </>
  );
}
