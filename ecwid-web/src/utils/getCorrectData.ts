export const getProductName = (name: any) => {
    return name.replace(/^SAMPLE\. /, '');
};

export const getDescription = (description: any) => {
    const tempDivElement = document.createElement("div");
    tempDivElement.innerHTML = description;
    return tempDivElement.textContent || "";
};