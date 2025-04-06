function test1(event) {
    console.log('Page loaded2!');
    alert('Welcome to the Dash App2!');
}

// test1();

// document.addEventListener('DOMContentLoaded', test1, false);

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
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            // Check if 'react-app-container' is now in the DOM
            const reactAppContainer = document.getElementById('react-app-container');
            if (reactAppContainer) {
                // Stop observing once the element is found
                observer.disconnect();
                onReactAppContainerRendered();
            }
        }
    }
});

// Start observing the body for changes
observer.observe(document.body, { childList: true, subtree: true });