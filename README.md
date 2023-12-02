# Personal Portfolio Website Project 

This project aims to empower students and aspiring developers by offering a comprehensive platform to create and showcase their skills, projects, and accomplishments. The primary goal is to build a personal portfolio website using Git and GitHub, providing an opportunity not just to hone version control skills but also to establish a professional online presence.

## Key Features:
 - **User Authentication:** Seamlessly sign up, log in, and manage user profiles. Includes password recovery/reset functionalities.
 - **Project Showcase:** Users can highlight their projects with details like project name, description, technologies used, and a link to the respective GitHub repository.Version 
- **Control Integration:** Each project will have its dedicated GitHub repository, demonstrating Git functionalities such as branching, merging, and commit history.
- **Portfolio Customization:** Users can personalize their portfolios with themes, color schemes, and sections for skills, education, work experience, and contact information.
- **GitHub Activity Feed:** Showcase the user's GitHub activity (e.g., recent commits, pull requests) through integration with the GitHub API.
- **Responsive Design:** Ensuring the website is responsive and aesthetically pleasing across various devices.Git Workflow: Encourage the use of feature branches and a pull request workflow for implementing new features into the portfolio.
- **Continuous Deployment:** Implement continuous deployment using platforms like Netlify or GitHub Pages for instant reflection of any changes made to the live website.

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
   - Use these deatils in your `.env` file for Firebase configurations.

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
