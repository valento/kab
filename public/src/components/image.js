import React from 'react';
const Img = new Image();
Img.src = 'https://s3.eu-central-1.amazonaws.com/gamstatic/img/home/florence.jpg';
Img.onload = function(e){
  console.log(e.target);
}

export default Img;
