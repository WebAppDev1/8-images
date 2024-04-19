console.log("Hello from the Web App Dev lab!");


document.querySelectorAll(".delsong").forEach(element => {
    element.addEventListener("click", (evt) => {
      if  (!confirm('Really delete this song?')) {
         evt.preventDefault()
      }
    })        
});


document.querySelectorAll(".delplaylist").forEach(element => {
    element.addEventListener("click", (evt) => {
      if  (!confirm('Really delete this Playlist?')) {
         evt.preventDefault()
      }
    })        
});