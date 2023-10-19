import Example from "./scripts/example"

document.addEventListener("DOMContentLoaded", () => {
    console.log('Hello from index.js')
    const main = documentElementByID("main");
    new Example(main);
})