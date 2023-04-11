import * as React from 'react';
const  LogoutIcon = ({
  size = 14.4, // or any default size of your choice
  color = "black" // or any color of your choice
}) =>{
  return ( 
    <svg width={size} height={size} viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.6668 8.00004H6.75016M13.0002 10.5L15.5002 8.00004L13.0002 5.50004M8.8335 3.83337V3.00004C8.8335 2.55801 8.6579 2.13409 8.34534 1.82153C8.03278 1.50897 7.60886 1.33337 7.16683 1.33337H3.00016C2.55814 1.33337 2.13421 1.50897 1.82165 1.82153C1.50909 2.13409 1.3335 2.55801 1.3335 3.00004V13C1.3335 13.4421 1.50909 13.866 1.82165 14.1786C2.13421 14.4911 2.55814 14.6667 3.00016 14.6667H7.16683C7.60886 14.6667 8.03278 14.4911 8.34534 14.1786C8.6579 13.866 8.8335 13.4421 8.8335 13V12.1667" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg> 
  );
}
export default LogoutIcon;