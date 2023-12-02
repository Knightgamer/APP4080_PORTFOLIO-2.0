# APP4080_PORTFOLIO-2.0

This React application features Tailwind CSS, Firebase integration, GitHub OAuth2 authentication, and is deployed on Vercel.

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)
- Firebase account
- GitHub account

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Knightgamer/APP4080_PORTFOLIO-2.0.git
   ```
2. **Navigate to the project directory:**
   ```sh
   cd APP4080_PORTFOLIO-2.0
   ```
3. **Install dependencies:**
   ```sh
   npm install
   ```

### Setting Up Environment Variables

Create a `.env` file in the root of your project and add the following keys with your Firebase and GitHub token details:

```plaintext
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
REACT_APP_GITHUB_TOKEN=your_github_token
```

### Firebase Setup

1. **Create a Firebase project** in your Firebase console.
2. **Register your app** with Firebase.
3. **Add Firebase SDK** to your project:
   - Use the Firebase config details from the `.env` file.

### GitHub OAuth2 Setup

1. **Register a new OAuth application** in GitHub (Settings > Developer settings > OAuth Apps).
2. **Set the 'Authorization callback URL'** as provided by Firebase.
3. **Get the Client ID and Client Secret** from GitHub and add them to your Firebase project's authentication method.

### Running the Application

1. **Start the development server:**
   ```sh
   npm start
   ```
   - View the app on [http://localhost:3000](http://localhost:3000).

2. **New User Setup:**
   - After logging in, set up your GitHub username using the 'Edit Profile' functionality.

### Deployment

- The application is deployed on Vercel: [app-4080-portfolio-2-0.vercel.app](https://app-4080-portfolio-2-0.vercel.app).


## Authors
[Shivam Patel](https://github.com/Knightgamer/) - 
[Nayana Das](https://github.com/noyonaa/) - 
[Arsen](https://github.com/arsenhh-byte)

## Acknowledgements

- [Create React App](https://reactjs.org/docs/create-a-new-react-app.html)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase](https://firebase.google.com/)
- [Vercel](https://vercel.com/)
```

Be sure to replace the placeholders in the `.env` file with your actual Firebase and GitHub token details.
