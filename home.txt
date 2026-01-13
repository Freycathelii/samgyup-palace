var navimenu = document.getElementById("navimenu");
navimenu.style.maxHeight = "0px";

function menuShake() {
  if(navimenu.style.maxHeight === "0px") {
    navimenu.style.maxHeight = "200px";
  } else {
    navimenu.style.maxHeight = "0px";
  }
}
