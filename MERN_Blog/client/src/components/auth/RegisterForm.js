import {useContext, useState,} from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link,useHistory } from "react-router-dom";
import {AuthContext} from "../../contexts/AuthContext";
import AlertMessage from '../layout/AlertMessage';

function RegisterForm() {
 const {registerUser} = useContext(AuthContext);
 
 const [resgisterForm,setResgisterForm] = useState({
     username:'',
     password : '',
     confirmPassword : ''
 });

const history = useHistory();

const [alert, setAlert] = useState(null);




 const {username,password,confirmPassword}= resgisterForm
 const onChangeRegister = event=>{
    setResgisterForm({...resgisterForm, [event.target.name] : event.target.value })
 }
const register = async (event)=>
{
    event.preventDefault();

    if(password !== confirmPassword){
        setAlert({
            type : 'danger',
            message : 'password do not match'
        });
        setTimeout(()=>setAlert(null),4000);
        return
    }
    try {
        const registerData = await registerUser(resgisterForm);
        console.log(registerData);
        if(!registerData.success){
            setAlert({
                type : 'danger',
                message : registerData.message
            });
            setTimeout(()=>setAlert(null),4000);
          }
    } catch (e){
        console.log(e);
    }
}



  return (
    <>
      <Form className="my-4" onSubmit={register} >
          <AlertMessage info={alert}/>
        <Form.Group>
            <Form.Control
                type="text"
                placeholder='Username'
                name = 'username'
                required
                value={username}
                onChange={onChangeRegister}                             
           />
        </Form.Group>
        <Form.Group>
            <Form.Control
                type ='password'
                placeholder='Password'
                name = 'password'
                required
                value ={password}
                onChange={onChangeRegister}
            />
        </Form.Group>
        <Form.Group>
            <Form.Control
                type ='password'
                placeholder='Confirm Password'
                name = 'confirmPassword'
                required
                value={confirmPassword}
            onChange={onChangeRegister}
            />
        </Form.Group>
        <Button variant='success' type='submit'>
            register
        </Button>
      </Form>
      <p>
          Don't have an account?
          <Link to="/login">
                <Button variant='info' size='sm' className='ml-2'> 
                    login
                </Button>
          </Link>
      </p>

    
    </>
  );
}

export default RegisterForm;
