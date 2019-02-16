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
  const URL = "https://pixabay.com/api/?key=" + API_KEY + "&q=" + encodeURIComponent(searchQuery);
  fetch(URL) //Grabbing something from a server is a long time for a CPU. AJAX = Asychronous JavaScript and XML
    .then(function(response) { //When the response finally comes back, this is the function we want to call.
      return response.json(); //Turn the response from the server into JSON.
    }).then(function(json) { //When we're finished with the also asychronous .json() command, run this.
      let results = '';
      for (let i = 0; i < json.hits.length; i++) {
        results += "<p>";
        results += json.hits[i].comments;
        results += "</p>";
      }
      console.log(json);
      document.getElementById("imageScroll").innerHTML = results; //Gets the weatherResults div, and plops in the result.
    });
  // $.getJSON(URL, function(data) {
  //   if (parseInt(data.totalHits) > 0)
  //     $.each(data.hits, function(i, hit) {
  //       console.log(hit.pageURL);
  //     });
  //   else
  //     console.log('No hits');
  // });
});