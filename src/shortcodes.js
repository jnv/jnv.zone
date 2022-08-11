const { imageShortcode } = require("./image");

function figure(content, src, alt) {
  const img = imageShortcode.call(this, src, alt);

  const caption =
    content.trim() === "" ? "" : `<figcaption>\n${content}\n</figcaption>`;
  return `<figure>
${img}
${caption}
</figure>`;
}

function codesandbox(
  urlOrId,
  { runonclick = 0, view = "preview", title = "", path, module }
) {
  let id = urlOrId;
  if (urlOrId.startsWith("https://")) {
    const url = new URL(urlOrId);
    const pathParts = url.pathname.split("/");
    id = pathParts[2]; // ['', 's', 'id-1234']
  }

  const iframeUrl = new URL(id, "https://codesandbox.io/embed/");
  // https://codesandbox.io/docs/embedding#embed-options
  const params = {
    codemirror: 1,
    hidenavigation: 1,
    initialpath: path,
    runonclick,
    module,
    view,
  };
  for (const [key, value] of Object.entries(params)) {
    if (value != null) {
      iframeUrl.searchParams.set(key, value);
    }
  }

  return `<div class="embed embed-codesandbox"><iframe class="embed-iframe" src="${iframeUrl.toString()}" title="${title}" loading="lazy" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe></div>`;
}

module.exports = (eleventyConfig) => {
  eleventyConfig.addPairedShortcode("figure", figure);
  eleventyConfig.addShortcode("codesandbox", codesandbox);
};
