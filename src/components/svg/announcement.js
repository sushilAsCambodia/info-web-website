import * as React from 'react';
const  AnnouncementIcon = ({
  size = 14.4, // or any default size of your choice
  color = "black" // or any color of your choice
}) =>{
  return ( 
    <svg width={size} height={size} fill={color} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.3998 4.8C2.3998 3.92 3.1198 3.2 3.9998 3.2H10.3998L13.5998 0H15.1998V12.8H13.5998L10.3998 9.6H3.9998C3.57546 9.6 3.16849 9.43143 2.86843 9.13137C2.56838 8.83131 2.3998 8.42435 2.3998 8H0.799805V4.8H2.3998ZM8.7998 12V16H6.3998L5.0638 12H3.9998V10.4H10.3998V12H8.7998Z" fill={color}/>
    </svg> 
  );
}
export default AnnouncementIcon;