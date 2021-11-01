import styled from 'styled-components';

export const StyledTable = styled.table`
 border: 1px solid #ccc;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;
   caption{
    font-size: 1.5em;
  margin: .5em 0 .75em;
   }
    tr{
    background-color: #f8f8f8;
  border: 2px solid black;
  padding: .35em;
   }
   th{
    border: 3px solid #ccc; 
  }
    th,td{
    padding: .625em;
  text-align: center;
   }
    th{
    font-size: .90em;
  letter-spacing: .2em;
  text-transform: uppercase;
  
   }
   @media screen and (max-width: 600px) {
   
    border: 0;
  

  caption {
    font-size: 1.3em;
  }
  
  thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    /* position: absolute; */
    width: 1px;
  }
  
  tr {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: .625em;
  }
  
   td {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: .8em;
    text-align: right;
  }
  
  td &::before {
  
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }
  
  td:last-child {
    border-bottom: 0;
  }
  th{
    border: 1px solid #ccc; 
  }
}
`;

export const THead = styled.thead`
  border: 4px solid grey; 
`;

export const TFoot = styled.tfoot`
  border: 4px solid grey; 
`;

export const TBody = styled.tbody`
 border: 4px solid grey; 
`;

export const TR = styled.tr`
  :nth-of-type(odd){
    background: #ddd; 
  }
`;

export const TH = styled.th`  
 
  border: 3px solid #ccc; 
`;

export const TD = styled.td`
  padding: 6px; 
  border: 1px solid #ccc; 
  text-align: left; 

`;