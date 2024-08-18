# HeadStarter Support Chat

HeadStarter Support Chat is a web application built using Next.js and Material-UI that simulates a customer support chat interface. The application allows users to interact with an AI assistant for interview practice, providing a real-time chat experience.

## Features

- Real-time chat interface with AI assistant.
- Responsive design using Material-UI.
- State management with React hooks.
- Easy-to-extend and customize.

## Installation

Follow these steps to set up and run the project locally.

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Clone the Repository

```bash
git clone https://github.com/your-username/headstarter-support-chat.git
cd headstarter-support-chat
```

### Install Dependencies

```bash
npm install
```

### Running the Application

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000` to see the application in action.

## Usage

To start using the HeadStarter Support Chat application:

1. **Clone the repository and install dependencies** as described in the Installation section.
2. **Run the development server** with `npm run dev`.
3. Open the application in your browser and start interacting with the AI assistant.

## Customization

You can customize the AI assistant's behavior by modifying the `systemPrompt` in `route.js`:

```javascript
const systemPrompt = `
You are the Headstarter Customer Support AI...
...
`;
```

## Contributing

We welcome contributions! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or suggestions, feel free to open an issue or contact me at [samueldagne93@gmail.com].
