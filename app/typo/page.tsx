// TestTypography.tsx
export default function TestTypography() {
    return (
      <div className="prose mx-auto my-12 max-w-4xl px-4">
        <h1>Exploring Tailwind Typography for Blog Websites</h1>
        <p>
          Tailwind CSS provides a typography plugin that can make text-heavy content, like blog posts, much more readable and visually appealing.
        </p>
        <h2>The Importance of Good Typography</h2>
        <p>
          Good typography helps make content easy to read and understand, guiding users through the text with a clear visual hierarchy.
        </p>
        <ul>
          <li>Enhanced readability with proper line height</li>
          <li>Improved structure with consistent padding and margins</li>
          <li>Better focus on key information, such as headers</li>
        </ul>
        <blockquote>
          "Typography is the craft of endowing human language with a durable visual form."
          — Robert Bringhurst
        </blockquote>
        <p>
          Using Tailwind CSS typography, we can easily implement these practices in our blog design.
        </p>
        <pre>
          <code>
            {`const typographyConfig = {
              theme: {
                extend: {
                  typography: {
                    DEFAULT: {
                      css: {
                        color: '#333',
                        lineHeight: '1.75',
                      },
                    },
                  },
                },
              },
            };`}
          </code>
        </pre>
      </div>
    );
  }
  