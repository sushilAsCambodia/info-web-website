 
import * as React from 'react';
const  StarIcon = ({
  size = 13, // or any default size of your choice
  color = "#DDDDDD" // or any color of your choice
}) =>{
  return ( 
    <svg width={size} height={size} viewBox="0 0 14 13" fill={color} xmlns="http://www.w3.org/2000/svg">
        <path d="M2.88331 12.6667L3.96665 7.98333L0.333313 4.83333L5.13331 4.41667L6.99998 0L8.86665 4.41667L13.6666 4.83333L10.0333 7.98333L11.1166 12.6667L6.99998 10.1833L2.88331 12.6667Z" fill={color}/>
    </svg> 
  );
}
export default StarIcon;