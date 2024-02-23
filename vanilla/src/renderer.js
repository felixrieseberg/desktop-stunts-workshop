document.addEventListener("DOMContentLoaded", () => {
  const editor = document.getElementById("editor");

  __stunts.onLoadFile((contents) => {
    const cleanedContents = contents.replace(/\n/g, "<br>");
    editor.innerHTML = cleanedContents;
  });

  __stunts.onSaveFile((filePath) => {
    // Clean up the text
    const clone = editor.cloneNode(true);
    clone.querySelectorAll("div, p, br").forEach((element) => {
      element.replaceWith(`\n${element.textContent}`);
    });

    const contents = clone.textContent.trim();

    __stunts.saveFile(filePath, contents);
  });
});
