const getSVG = () => {
    const imgs = document.querySelectorAll("img[src$='.svg']");

    const replaceSVG = /(<svg)/gi;
    const deleteScript = /(<script|<\/script)/gi;

    const patterns = {
        "<script": "<span",
        "</script": "</span"
    };

    imgs.forEach(async (img) => {
        const path = img.getAttribute("src");
        const alt = img.getAttribute("alt");

        const response = await fetch(path);
        const xml = await response.text();

        let svg = xml.replace(deleteScript, function(string) {
            return patterns[string];
        });

        svg = svg.replace(replaceSVG, `<svg aria-label='${alt}'`);


        img.insertAdjacentHTML('afterend', svg);
        img.remove();
    });
};

getSVG();
