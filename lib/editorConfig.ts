// TinyMCE editor configuration
export const editorConfig = {
  //     content_style: `
  //     body { background-color: #f9fafb; color: #1a202c; font-family: sans-serif; line-height: 1.6; }
  //     h1 { font-size: 2.25rem; font-weight: bold; color: #111827; margin-bottom: 1.5rem; }
  //     h2 { font-size: 1.875rem; font-weight: 600; color: #1f2937; margin-bottom: 1.25rem; }
  //     h3 { font-size: 1.5rem; font-weight: 500; color: #374151; margin-bottom: 1rem; }
  //     p { font-size: 1rem; color: #4b5563; margin-bottom: 1rem; }
  //     a { color: #2563eb; text-decoration: underline; }
  //     ul { list-style-type: disc; margin-left: 1.5rem; margin-bottom: 1rem; }
  //     ol { list-style-type: decimal; margin-left: 1.5rem; margin-bottom: 1rem; }
  //     blockquote { font-style: italic; border-left: 4px solid #d1d5db; padding-left: 1rem; margin-bottom: 1rem; color: #6b7280; }
  //     code { background-color: #f3f4f6; padding: 2px 4px; border-radius: 4px; }
  //     pre { background-color: #1f2937; color: #f9fafb; padding: 1rem; border-radius: 4px; overflow: auto; }
  //     table { width: 100%; border-collapse: collapse; margin-bottom: 1.5rem; }
  //     th, td { border: 1px solid #d1d5db; padding: 0.75rem; text-align: left; }
  //     img { max-width: 100%; height: auto; margin-bottom: 1rem; border-radius: 8px; }
  //   `,

  height: 500,
  menubar: false,
  plugins: [
    "codesample",
    "codesample code",
    "image",
    "advlist",
    "autolink",
    "lists",
    "link",
    "charmap",
    "preview",
    "anchor",
    "searchreplace",
    "visualblocks",
    "fullscreen",
    "insertdatetime",
    "media",
    "table",
    "help",
    "wordcount",
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
    "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
  content_style:
    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
};
