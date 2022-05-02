const selectedShirts = new Set();
const compressedElement = document.getElementById("compressed");

function createCardContainerElement() {
    const cardContainerElement = document.createElement("div");
    cardContainerElement.id = "card-container";

    shirts.map(createCardElement).forEach(cardElement => cardContainerElement.append(cardElement));

    return cardContainerElement;
}

function createCardElement(shirt) {
    const cardElement = document.createElement("div");
    cardElement.className = "card";

    const imageElement = document.createElement("img");

    const color = Object.keys(shirt.colors)[0];
    const side = Object.keys(shirt.colors[color])[0];

    imageElement.src = shirt.colors[color][side];
    imageElement.alt = "T-Shirt";

    const cardDescriptionElement = createCardDescriptionElement(shirt);
    const buttonContainerElement = createButtonContainerElement(shirt);

    cardElement.append(imageElement, cardDescriptionElement, buttonContainerElement);

    return cardElement;
}

function createCardDescriptionElement(shirt) {
    const cardDescriptionElement = document.createElement("div");
    cardDescriptionElement.className = "card-description";

    const nameElement = document.createElement("h2");
    nameElement.textContent = shirt.name;

    const descriptionElement = document.createElement("span");

    const colors = Object.keys(shirt.colors).length;

    descriptionElement.textContent = `Available in ${colors} color`;
    if (colors > 1) {
        descriptionElement.textContent += "s";
    }

    cardDescriptionElement.append(nameElement, descriptionElement);

    return cardDescriptionElement;
}

function createButtonContainerElement(shirt) {
    const buttonContainerElement = document.createElement("div");
    buttonContainerElement.className = "button-container";

    const quickViewButtonElement = document.createElement("button");
    quickViewButtonElement.textContent = "Quick View";

    quickViewButtonElement.addEventListener("click", () => {
        if (selectedShirts.size === 0) {
            document.getElementById("content").append(createQuickViewContainerElement());
        }
        if (!selectedShirts.has(shirt.name)) {
            const quickViewContainerElement = document.getElementById("quick-view-container");

            selectedShirts.add(shirt.name);

            const cardShortElement = createCardShirtElement(shirt);
            cardShortElement.className = "card-shirt";

            quickViewContainerElement.append(cardShortElement);
        }
    });

    const seePageButtonElement = document.createElement("button");
    seePageButtonElement.textContent = "See Page";

    seePageButtonElement.addEventListener("click", () => {
        localStorage.setItem("selected_shirt", JSON.stringify(shirt));

        const anchorElement = document.createElement("a");
        anchorElement.href = "./details.html";
        anchorElement.click();
    });

    buttonContainerElement.append(quickViewButtonElement, seePageButtonElement);

    return buttonContainerElement;
}

function createQuickViewContainerElement() {
    const quickViewContainerElement = document.createElement("div");
    quickViewContainerElement.id = "quick-view-container";
    return quickViewContainerElement;
}

function createCardShirtElement(shirt) {
    const cardShortElement = document.createElement("div");

    const color = Object.keys(shirt.colors)[0];
    for (const side in shirt.colors[color]) {
        const imageElement = document.createElement("img");
        imageElement.src = shirt.colors[color][side];
        cardShortElement.append(imageElement);
    }

    const wrapperElement = createWrapperElement(shirt, cardShortElement);

    cardShortElement.append(wrapperElement);

    return cardShortElement;
}

function createWrapperElement(shirt, cardShortElement) {
    const wrapperElement = document.createElement("div");
    wrapperElement.id = "wrapper";

    const cardDescriptionShirtElement = createCardDescriptionShirtElement(shirt);
    const controlElement = createControlElement(shirt.name, cardShortElement);

    wrapperElement.append(cardDescriptionShirtElement, controlElement);

    return wrapperElement;
}

function createCardDescriptionShirtElement(shirt) {
    const cardDescriptionShirtElement = document.createElement("div");
    cardDescriptionShirtElement.id = "card-description-shirt";

    const nameElement = document.createElement("span");
    nameElement.textContent = shirt.name;

    const priceElement = document.createElement("span");
    priceElement.textContent = shirt.price;

    cardDescriptionShirtElement.append(nameElement, priceElement);

    return cardDescriptionShirtElement;
}

function createControlElement(shirtName, cardShortElement) {
    const controlElement = document.createElement("div");
    controlElement.id = "control";

    const closeButtonElement = document.createElement("button");
    closeButtonElement.textContent = "Close";

    closeButtonElement.addEventListener("click", () => {
        selectedShirts.delete(shirtName);
        if (selectedShirts.size === 0) {
            document.getElementById("quick-view-container").remove();
        } else {
            cardShortElement.remove();
        }
    });

    controlElement.append(closeButtonElement);

    return controlElement;
}

compressedElement.append(createCardContainerElement());