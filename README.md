# messagetolink

Turn your message into a shareable link. No servers. No databases. Just a URL.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

<!-- screenshot -->

## Features

- ✍️ Markdown message writing support
- 🔗 All data encoded in the URL (zero server storage)
- 🔐 Optional password-based encryption (AES-256-GCM)
- 🚫 No sign-up required

## How It Works

When you write a message on messagetolink, here's what happens behind the scenes:

**Plain message flow:**
1. Your markdown message is converted to JSON
2. Compressed using lz-string (typically 50-70% reduction)
3. Encoded to base64url format
4. Placed in the URL hash fragment: `https://messageto.link/#v1p:...`

**Encrypted message flow:**
1. Your password derives a key using PBKDF2 (100,000 iterations, 16-byte salt)
2. The compressed message is encrypted with AES-256-GCM
3. Salt, IV, and ciphertext are base64url-encoded and joined with colons
4. Final URL: `https://messageto.link/#v1e:salt:iv:ciphertext`

The critical detail: **hash fragments (everything after `#`) are never sent to the server**. Your browser keeps them local. This is a web standard, not a clever trick. You can verify this by opening your network inspector — no `messageto.link` requests will ever include your message data.

## Why Open Source

The core promise of messagetolink is simple: "nothing is stored on any server."

Words alone aren't enough. Anyone could claim that while secretly logging everything. So we open the source.

You can read the code yourself. You can see there are no external API calls, no tracking, no sneaky transmissions. You can run it locally. You can audit it. You can verify our promise isn't just marketing — it's built into the architecture.

**Don't trust us. Verify.**

## Privacy

messagetolink is built on a fundamental principle: your data never leaves your browser.

**Why it's safe:**

- **Hash fragments are local-only**: The `#` part of a URL is never sent in HTTP requests. It stays entirely in your browser.
- **No API routes**: There are no `/api/messages`, `/api/decrypt`, or any server endpoints that touch your message data. Open the source — you won't find any.
- **No external calls**: No fetch, axios, or WebSocket calls that transmit your message to any server, service, or third party.
- **No analytics or tracking**: No Google Analytics, Mixpanel, or any telemetry. No cookies that identify you.
- **Browser-native encryption**: Uses the Web Crypto API — the same crypto primitives used by your bank and every HTTPS connection.

If you're still skeptical, that's healthy. Check the source code. Run it locally. Open your browser's network tab and watch for requests. You'll see nothing leaves your machine.

## Tech Stack

- **Framework**: Next.js 15 (App Router), React 19, TypeScript 5.x
- **Styling**: Tailwind CSS 4
- **Editor**: Tiptap (markdown editor with live preview)
- **Compression**: lz-string
- **Encryption**: Web Crypto API (AES-256-GCM)
- **Rendering**: react-markdown with remark-gfm (GitHub Flavored Markdown support)

## Built With AI

This project was built with help from AI coding assistants. All code was reviewed and verified by humans.

Nothing to hide — transparency is what this project is about.

## Found a Bug?

If you find a bug, please [open an issue](https://github.com/mochaive/messagetolink/issues).

## License

MIT — see [LICENSE](LICENSE) for details.

## Support

If you find this useful, consider buying me a coffee ☕

[Ko-fi](https://ko-fi.com/mochafreddo)
