var ithangu=0;
  function arrayPlay(){
  var initial="A".charCodeAt(0);
  var colors=[];
  for (var x=0;x<10;x++)
  {
  colors[x]="#"+String.fromCharCode(initial+(x%6))+x+String.fromCharCode(initial+2)+x+String.fromCharCode(initial+5)+x;
  }
  return colors;
  }
  var colorsThangu=arrayPlay();
  
  function cssThangu(i){
  colorsThangu=arrayPlay();
  document.getElementById("thanguText").style.backgroundColor=colorsThangu[i];
  document.getElementById("thanguText").style.border="thick solid black";
  document.getElementById("thanguText").style.borderRadius="25px";
  document.getElementById("thanguText").style.padding="50px";
  document.getElementById("thanguText").innerHTML+="<b>Item "+i+"</br/></b>";
  }
  
  function animateThangu(){
  
  //alert(colorsThangu[ithangu]);
  cssThangu(ithangu);
  ithangu=ithangu+1;
  if(ithangu<colorsThangu.length){
  setTimeout(animateThangu,2000);
  }
  }