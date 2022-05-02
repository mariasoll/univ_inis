const selectedShirt = JSON.parse(localStorage.getItem("selected_shirt"));
let selectedColor = selectedShirt.colors[Object.keys(selectedShirt.colors)[0]];
let selectedSide = Object.keys(selectedColor)[0];

const contentElement = document.getElementById("content");

function createDataBlockWrapperElement() {
    const dataBlockWrapperElement = document.createElement("div");
    dataBlockWrapperElement.id = "data-block-wrapper";

    const nameElement = document.createElement("h2");
    nameElement.textContent = selectedShirt.name;

    const dataBlockElement = createDataBlockElement();

    dataBlockWrapperElement.append(nameElement, dataBlockElement);

    return dataBlockWrapperElement;
}

function createDataBlockElement() {
    const dataBlockElement = document.createElement("div");
    dataBlockElement.id = "data-block";

    const imageElement = document.createElement("img");
    imageElement.src = selectedColor[selectedSide];

    const infoElement = createInfoElement();

    dataBlockElement.append(imageElement, infoElement);

    return dataBlockElement;
}

function createInfoElement() {
    const infoElement = document.createElement("div");
    infoElement.id = "info";

    const priceElement = document.createElement("span");
    priceElement.textContent = selectedShirt.price;

    const descriptionElement = document.createElement("span");
    descriptionElement.textContent = selectedShirt.description;

    const dataBlockSideElement = createDataBlockElementFromTemplate("side", createButtonContainerSideElement);/*createDataBlockSideElement();*/
    const dataBlockColorElement = createDataBlockElementFromTemplate("color", createButtonContainerColorElement);/*createDataBlockColorElement();*/

    infoElement.append(priceElement, descriptionElement, dataBlockSideElement, dataBlockColorElement);

    return infoElement;
}

function createDataBlockElementFromTemplate(name, buttonContainerElementCreator) {
    const dataBlockElement = document.createElement("div");
    dataBlockElement.id = "data-block-" + name;

    const typeElement = document.createElement("span");
    typeElement.textContent = name.replace(name[0], name[0].toUpperCase()) + ":";

    const buttonContainerElement = buttonContainerElementCreator();

    dataBlockElement.append(typeElement, buttonContainerElement);

    return dataBlockElement;
}

/*function createDataBlockSideElement() {
    const dataBlockSideElement = document.createElement("div");
    dataBlockSideElement.id = "data-block-side";

    const sideElement = document.createElement("span");
    sideElement.textContent = "Side:";

    const buttonContainerSideElement = createButtonContainerSideElement();

    dataBlockSideElement.append(sideElement, buttonContainerSideElement);

    return dataBlockSideElement;
}*/

function createButtonContainerSideElement() {
    const buttonContainerSideElement = document.createElement("div");
    buttonContainerSideElement.id = "button-container-side";

    for (const side in selectedColor) {
        const buttonElement = document.createElement("button");
        buttonElement.textContent = side.replace(side[0], side[0].toUpperCase());

        buttonElement.addEventListener("click", () => {
            selectedSide = side;
            contentElement.querySelector("img").src = selectedColor[selectedSide];
        });

        buttonContainerSideElement.append(buttonElement);
    }

    return buttonContainerSideElement;
}

/*function createDataBlockColorElement() {
    const dataBlockColorElement = document.createElement("div");
    dataBlockColorElement.id = "data-block-color";

    const colorElement = document.createElement("span");
    colorElement.textContent = "Color:";

    const buttonContainerColorElement = createButtonContainerColorElement();

    dataBlockColorElement.append(colorElement, buttonContainerColorElement);

    return dataBlockColorElement;
}*/

function createButtonContainerColorElement() {
    const buttonContainerColorElement = document.createElement("div");
    buttonContainerColorElement.id = "button-container-color";

    for (const color in selectedShirt.colors) {
        const buttonElement = document.createElement("button");
        buttonElement.textContent = color.replace(color[0], color[0].toUpperCase());
        if (color !== "white") {
            buttonElement.className = "active";
        }

        buttonElement.addEventListener("click", () => {
            selectedColor = selectedShirt.colors[color];
            contentElement.querySelector("img").src = selectedColor[selectedSide];
        });

        buttonElement.style.backgroundColor = color;

        buttonContainerColorElement.append(buttonElement);
    }

    return buttonContainerColorElement;
}

contentElement.append(createDataBlockWrapperElement());