//const form = document.getElementById('formona');
const Event = (event) => {
    const checkbox = document.corona.symptom;
      for (let i = 0; i < checkbox.length;i++) {
        if(checkbox[i].checked == true) {
            return true;
        }
      }
      document.getElementById('error-symptoms').innerHTML = "Please select an option for question one *";
      return false;
      
  event.preventDefault();
}
//form.addEventListener('submit', Event);