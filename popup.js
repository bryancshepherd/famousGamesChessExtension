function getRandomElement(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }

function fetchData() {
  
    const targetUrl = "https://en.wikipedia.org/wiki/List_of_chess_games";
    const regex = /<li><b>\d+:<\/b>.*?<\/li>/;

    fetch(targetUrl)
    .then((response) => response.text())
    .then((data) => {
        const parser = new DOMParser();
        const htmlDocument = parser.parseFromString(data, "text/html");
        const targetElements = htmlDocument.querySelectorAll("li");
        const targetElementsArray = Array.from(targetElements);

        const filteredElements = targetElementsArray.filter((element) => {
            const outerHTML = element.outerHTML;
            return regex.test(outerHTML);
        });

        const randomElement = getRandomElement(filteredElements);
        let textContent = randomElement.textContent;
        textContent = textContent.replace(/\[\d+\]/g, ""); // Remove numbers in brackets at the end  

        const boldText = textContent.match(/^\d+:/)[0]; // Match the text before the colon
        const remainingText = textContent.replace(/^\d+:/, ""); // Remove the text before the colon
        
        document.getElementById("content").innerHTML = `<strong>${boldText}</strong>${remainingText}`; // Display the text before the colon in bold
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });

}

document.addEventListener("DOMContentLoaded", () => {
    fetchData();
    const refreshButton = document.getElementById("refresh");
    refreshButton.addEventListener("click", fetchData);
  });