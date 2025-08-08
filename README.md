# MasihMeeting

Turn every meeting into meaning.

MasihMeeting transforms long meetings into sharp insights, summaries, and smart quizzes—so you learn more, in less time.

## Features

- **AI-Powered Transcription:** Get instant transcriptions with 99.9% accuracy for live meetings, conferences, and customer calls.
- **Concise Summaries:** Condenses hours of content into easy-to-read summaries, saving you time without missing key points.
- **Smart Quizzes:** Automatically generates quizzes to help you reinforce and test your understanding.
- **Secure & Reliable:** Built with enterprise-grade security and reliability in mind.
- **Modern UI:** Responsive, dark-mode friendly interface.

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **State Management:** React Context API
- **API Calls:** Axios
- **Authentication:** JWT, Google OAuth
- **Markdown Support:** react-markdown, remark-gfm

## Repositories

- **Frontend:** [https://github.com/septiandwica/masihmeeting.git](https://github.com/septiandwica/masihmeeting.git)
- **Backend Express:** [https://github.com/septiandwica/masihmeeting_be.git](https://github.com/septiandwica/masihmeeting_be.git)
- **Backend Python:** [https://github.com/MDAnandaB35/MasihMikir_AI_Backend](https://github.com/MDAnandaB35/MasihMikir_AI_Backend)

## Deployment

- **Live Application:** [http://masihmeeting.ddns.net/](http://masihmeeting.ddns.net/)

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/septiandwica/masihmeeting.git
   cd MasihMeeting
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) to view the app in your browser.

### Build for Production

```bash
npm run build
# or
yarn build
```

### Linting

```bash
npm run lint
# or
yarn lint
```

## Project Structure

- `src/` — Main source code
  - `components/` — Reusable UI components
  - `contexts/` — React context providers (Auth, Theme)
  - `pages/` — Route-based pages (landing, auth, user, admin, error)
  - `services/` — API service modules
  - `index.css` — Global styles
  - `App.tsx` — Main app and routing

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

## License

[MIT](LICENSE)

---

_MasihMeeting — Transforming meetings into actionable insights._
