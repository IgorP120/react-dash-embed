// Flag to ensure the function is only called once
let isReactAppContainerRendered = false;

// Function to execute when the 'react-app-container' is rendered
function onReactAppContainerRendered() {
    console.log("'react-app-container' has been rendered!");
    alert("React App Container is ready!");
    setTimeout(() => {
        const reactRootElement = dash_clientside.react_app.render();
        // console.log('htmlEl=', htmlEl);
        const appContainer = document.getElementById('react-app-container');
        appContainer.appendChild(reactRootElement);
    }, 100);
}

// Create a MutationObserver to watch for changes in the DOM
const observer = new MutationObserver((mutationsList, observer) => {
    if (isReactAppContainerRendered) {
        return; // Exit early if the function has already been called
    }
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            // Check if 'react-app-container' is now in the DOM
            const reactAppContainer = document.getElementById('react-app-container');
            if (reactAppContainer) {
                // Stop observing once the element is found
                observer.disconnect();
                isReactAppContainerRendered = true; // Set the flag to true
                onReactAppContainerRendered();
                break; // Exit the loop
            }
        }
    }
});

// Start observing the body for changes
observer.observe(document.body, { childList: true, subtree: true });