import styled from 'styled-components';
import Button from '../Button'


export const StyledButton = styled(Button)`
width: 40px;
height: 40px;
font-weight:bold;
border-radius: 50%;
background-color:${(props)=>props.backgroundColor};
	
	
&:hover {
    background-color:#f73838;
    background-color:${(props)=>props.backgroundColorOnHover};
    label {
        color:black
    }
}
`
export const Buttonlaybel = styled.label`
font-size:50px;
color:#64bb5d;


`
export const ButtonSearch = styled.label`
width: 40px;
height: 40px;
font-weight:bold;
border-radius: 50%;
background-color:${(props)=>props.backgroundColor};



`