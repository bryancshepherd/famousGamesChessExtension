chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "fetchData") {
      fetch("https://en.wikipedia.org/wiki/List_of_chess_games")
        .then((response) => response.text())
        .then((data) => {
          sendResponse({ data });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
      return true;
    }
  });