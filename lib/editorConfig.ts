export const editorConfig = {
  height: 500,
  menubar: false,
  plugins: [
    "codesample", // Code snippet plugin
    "code",       // Inline code editing
    "image",      // Image plugin
    "advlist",    // Advanced lists
    "autolink",   // Automatic linking
    "lists",      // Ordered and unordered lists
    "link",       // Hyperlinking
    "charmap",    // Special character map
    "preview",    // Preview plugin
    "anchor",     // Anchor links
    "searchreplace", // Search and replace
    "visualblocks",  // Visual block formatting
    "fullscreen", // Fullscreen editing
    "insertdatetime", // Insert date and time
    "media",      // Embedding media
    "table",      // Table tools
    "help",       // Help documentation
    "wordcount",  // Word count
  ],
  codesample_languages: [
    { text: "HTML/XML", value: "markup" },
    { text: "JavaScript", value: "javascript" },
    { text: "CSS", value: "css" },
    { text: "PHP", value: "php" },
    { text: "Ruby", value: "ruby" },
    { text: "Python", value: "python" },
    { text: "Java", value: "java" },
    { text: "C", value: "c" },
    { text: "C#", value: "csharp" },
    { text: "C++", value: "cpp" },
  ],
  toolbar:
    "undo redo | blocks | image | code | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
  content_style:
    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
};
