var API_KEY = '1675257-d40ee19ad572ca41855378884';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


document.getElementById("submitButton").addEventListener("click", function(event) { //Goes to the document, and gets weatherSubmit
  //EventListener is listening for click on that object.
  event.preventDefault(); //Tells the broswer not to send the data to the server and autmoatically reload the page when the form is submitted (this is what normally happens)
  const searchQuery = document.getElementById("imageInput").value; //.value is what comes from that box.
  if (searchQuery === "")
    return;
  //After the ?, we can add parameters to the URL.
  const URL = "https://pixabay.com/api/?key=" + API_KEY + "&q=" + encodeURIComponent(searchQuery) + "&safesearch=true";
  fetch(URL) //Grabbing something from a server is a long time for a CPU. AJAX = Asychronous JavaScript and XML
    .then(function(response) { //When the response finally comes back, this is the function we want to call.
      return response.json(); //Turn the response from the server into JSON.
    }).then(function(json) { //When we're finished with the also asychronous .json() command, run this.
      let results = '<h1>beautiful cc0 images of ' + capitalizeFirstLetter(searchQuery) + '</h1>';
      results += '<h2>Click thumbnail to download 1280p resolution!</h2>';
      for (let i = 0; i < json.hits.length; i++) {
        results += '<div class="imageGroup">';
        results += '<div class="imageHolder">';
        results += '<a href = "' + json.hits[i].largeImageURL + '" download="image" target="_blank">';
        results += '<img width =' + json.hits[i].previewWidth + ' height=' + json.hits[i].previewHeight + ' src="' + json.hits[i].previewURL + '" />';
        results += '</a>';
        results += "</div>"; //Closing imageHolder
        results += '<div class="textInformation">';
        results += '<a class="whiteLink" href="https://pixabay.com/users/' + json.hits[i].user + '-' + json.hits[i].user_id + '" target="_blank">Author: ' + json.hits[i].user + '</a>';
        results += '<a class="whiteLink" href="' + json.hits[i].pageURL + '" target="_blank">' + json.hits[i].imageWidth + 'x' + json.hits[i].imageHeight + '</a>';
        results += '<p> Downloads: ' + json.hits[i].downloads + '</p>';
        results += '<p> Views: ' + json.hits[i].views + '</p>';
        results += "</div>"; //Closing textInformation div
        results += "</div>"; //Closing imageGroup div
        results += "<hr />";
      }
      console.log(json);
      document.getElementById("imageScroll").innerHTML = results; //Gets the weatherResults div, and plops in the result.
    });
});