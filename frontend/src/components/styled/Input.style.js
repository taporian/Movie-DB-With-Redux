import styled from 'styled-components';



export const Input = styled.input`
 font-size: 16px;
 text-align: center;
  display:${(props)=>props.display};;
  padding: 1px;
  margin: 1px;
  border: none;
  border-radius: 8px;
  color:${(props)=>props.color};

`
export const InputSearch = styled.input`
font-size:20px;
color:black;
width: 20%;
margin-left:10px;
  padding: 5px;
  border: 3px solid #3d3737;
  border-radius: 4px;
  resize: vertical;
  ::placeholder {  
              color:"black";
                opacity: 200; 
                  padding-left: 12em; 
              } 

`