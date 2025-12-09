// src/lib/blocksToHtml.js

export function TransformarHTML(blocks) {
  if (!blocks || !Array.isArray(blocks)) return "";

  return blocks
    .map((block) => {
      const contentHtml = block.children
        ?.map((child) => {
          let text = child.text || "";
          if (child.bold) text = `<strong>${text}</strong>`;
          if (child.italic) text = `<em>${text}</em>`;
          if (child.underline) text = `<u>${text}</u>`;
          if (child.strikethrough) text = `<s>${text}</s>`;
          if (child.code) text = `<code>${text}</code>`;
          if (child.type === "link") {
            return `<a href="${child.url}" class="text-blue-600 underline">${child.children[0].text}</a>`;
          }
          return text;
        })
        .join("");

      switch (block.type) {
        case "heading":
          const level = block.level || 1;
          const sizes = { 1: "text-4xl", 2: "text-3xl", 3: "text-2xl", 4: "text-xl" };
          const sizeClass = sizes[level] || "text-lg";
          return `<h${level} class="font-bold ${sizeClass} mb-4 mt-6 text-gray-900">${contentHtml}</h${level}>`;

        case "paragraph":
          if (!contentHtml) return '<br/>';
          return `<p class="mb-4 text-gray-700 leading-relaxed">${contentHtml}</p>`;

        case "list":
          const tag = block.format === "ordered" ? "ol" : "ul";
          const listStyle = block.format === "ordered" ? "list-decimal" : "list-disc";
          
          const listItems = block.children
            .map((item) => `<li>${item.children[0].text}</li>`)
            .join("");
            
          return `<${tag} class="${listStyle} ml-6 mb-4 space-y-2">${listItems}</${tag}>`;

        case "quote":
          return `<blockquote class="border-l-4 border-black pl-4 italic text-gray-700 my-6">${contentHtml}</blockquote>`;

        case "image":
          return `<img src="${block.image.url}" alt="${block.image.alternativeText || ''}" class="rounded-xl my-6 w-full h-auto" />`;
        default:
          return "";
      }
    })
    .join("");
}