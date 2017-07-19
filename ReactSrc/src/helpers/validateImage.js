function validateImage(url, timeoutT) {
    return new Promise(function(resolve, reject) {
      var timeout = timeoutT || 5000;
      var timer, img = new Image();
      img.onerror = img.onabort = function() {
          clearTimeout(timer);
      	  reject("error");
      };
      img.onload = function() {
           clearTimeout(timer);
           resolve("success");
      };
      timer = setTimeout(function() {
          // reset .src to invalid URL so it stops previous
          // loading, but doens't trigger new load
          img.src = "//!!!!/noexist.jpg";
          reject("timeout");
      }, timeout); 
      img.src = url;
    });
}
/*
function validateImage(result){
    if(result){
        return true
    } else {
        return false
    }
}

function runImage(url) {
	  validateImage(url).then(validateImage(true), validateImage(false));
}*/
export default validateImage;
