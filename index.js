// Capitalize first letter in string
const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s[0].toUpperCase() + s.slice(1)
}
  
// funkcja konwertujaca K na C
 function calculate(kelvin) {
    // zaokraglaj wynik w gore
    return Math.ceil(kelvin - 272.15);
}

// wybieram przycisk z drzewa DOM
var button = document.querySelector('button');

button.addEventListener("click", function(){
    console.log("ckick");
  }); 