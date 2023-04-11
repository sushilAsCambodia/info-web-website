import * as React from 'react';
const  CustomerServiceIcon = ({
  size = 14.4, // or any default size of your choice
  color = "black" // or any color of your choice
}) =>{
  return (
    <svg width={size} height={size} fill={color} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 0.5C3.85742 0.5 0.5 3.85742 0.5 8V15.0312C0.5 15.291 0.708984 15.5 0.96875 15.5H4.5625C5.25195 15.5 5.8125 14.9395 5.8125 14.25V10.1875C5.8125 9.49805 5.25195 8.9375 4.5625 8.9375H1.90625V8C1.90625 4.63477 4.63477 1.90625 8 1.90625C11.3652 1.90625 14.0938 4.63477 14.0938 8V8.9375H11.4375C10.748 8.9375 10.1875 9.49805 10.1875 10.1875V14.25C10.1875 14.9395 10.748 15.5 11.4375 15.5H15.0312C15.291 15.5 15.5 15.291 15.5 15.0312V8C15.5 3.85742 12.1426 0.5 8 0.5Z" fill={color}/>
    </svg> 
  );
}
export default CustomerServiceIcon;