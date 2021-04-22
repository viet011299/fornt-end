import { Button, CircularProgress, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import styled from 'styled-components'
import userApi from '../../api/userApi'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from "../../store/user"
function Login(props) {
  const { user } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const history = useHistory()
  const handleValue = (e, setValue) => {
    setValue(e.target.value)
  }
  const setDefaultError = () => {
    setIsError(false)
    setError("")
  }
  const handleLogin = async (e) => {
    setIsLoading(true)
    setDefaultError()
    e.preventDefault();
    try {
      const response = await userApi.login(
        {
          email: email,
          password: password
        }
      )
      const dataSave = response.data
      sessionStorage.setItem("id", dataSave.id)
      sessionStorage.setItem("name", dataSave.name)
      const dataUser = loginSuccess(dataSave)
      dispatch(dataUser)
      setIsLoading(false)
      history.push("/")
    } catch (error) {
      if (error.response) {
        // Request made and server responded
        const errorMessage = error.response.data.message
        console.log(error.response.data);
        setIsLoading(false)
        setIsError(true)
        setError(errorMessage)
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        setIsLoading(false)
        setIsError(true)
        setError(error.message)
      }
    }
  }
  return (
    <div>
      <StyledHeading>Login</StyledHeading>
      <StyledGroupTextField>
        <StyledTextField
          required
          InputLabelProps={{
            shrink: true,
          }}
          id="standard-full-required"
          label="Username"
          variant="standard"
          placeholder="Username"
          value={email}
          onChange={(e) => handleValue(e, setEmail)}
        />
        <StyledTextField
          required
          InputLabelProps={{
            shrink: true,
          }}
          id="standard-full-required"
          label="Password"
          variant="standard"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => handleValue(e, setPassword)}
        />
        {
          isLoading &&
          <CircularProgress style={{ marginBottom: "10px" }} />
        }

        {isError && (
          <StyledError>
            {error}
          </StyledError>
        )}
        <StyledButton type="submit" variant="contained" color="primary" onClick={handleLogin}>Login</StyledButton>
      </StyledGroupTextField>

    </div>
  )
}
const StyledTextField = styled(TextField)`
  width: 50%;
  margin: 20px auto !important;
`
const StyledHeading = styled.h1`
  text-align:center;
`
const StyledGroupTextField = styled.form`
  display:flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
`
const StyledButton = styled(Button)`
  width: 15%;
`
const StyledError = styled.div`
margin-bottom:10px;
font-size:18px;
color:red;
`

export default Login

