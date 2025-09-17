# JaiMaReawReawQrPayment

A Next.js web application for generating and displaying PromptPay QR codes for payment processing. This application is designed for shops, businesses, and individuals who want to accept payments through Thailand's PromptPay system.

## Live Demo

Visit the live application at: [https://jmrr.jrkitt.com/](https://jmrr.jrkitt.com/)

## Features

- Generate PromptPay QR codes for payment
- Responsive web design
- Easy-to-use interface
- Support for various payment amounts
- Cross-platform compatibility

## Prerequisites

Before running this project, make sure you have the following installed on your system:

- **Node.js** (version 14.0 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### Installation Instructions by Operating System

#### Windows
1. Download and install Node.js from [nodejs.org](https://nodejs.org/)
2. Download and install Git from [git-scm.com](https://git-scm.com/)
3. Open Command Prompt or PowerShell as administrator

#### macOS
```bash
# Using Homebrew (recommended)
brew install node
brew install git

# Or download from official websites
# Node.js: https://nodejs.org/
# Git: https://git-scm.com/
```

#### Linux (Ubuntu/Debian)
```bash
# Update package index
sudo apt update

# Install Node.js and npm
sudo apt install nodejs npm

# Install Git
sudo apt install git

# Verify installations
node --version
npm --version
git --version
```

#### Linux (CentOS/RHEL/Fedora)
```bash
# For CentOS/RHEL
sudo yum install nodejs npm git

# For Fedora
sudo dnf install nodejs npm git

# Verify installations
node --version
npm --version
git --version
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/jrKitt/JaiMaReawReawQrPayment.git
cd JaiMaReawReawQrPayment
```

### 2. Install Dependencies

Choose one of the following methods:

```bash
# Using npm
npm install

# Using yarn
yarn install
```

### 3. Start the Development Server

```bash
# Using npm
npm run dev

# Using yarn
yarn dev
```

### 4. Access the Application

Open your web browser and navigate to:
```
http://localhost:3000
```

## Project Structure

```
JaiMaReawReawQrPayment/
├── public/                 # Static assets
├── src/                    # Source code
│   ├── components/         # React components
│   ├── pages/             # Next.js pages
│   ├── styles/            # CSS/styling files
│   └── utils/             # Utility functions
├── package.json           # Project dependencies
├── next.config.js         # Next.js configuration
└── README.md             # Project documentation
```

## Available Scripts

In the project directory, you can run:

- `npm run dev` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm run start` - Runs the built app in production mode
- `npm run lint` - Runs the linter to check code quality

## Development Guidelines

### Setting Up Your Development Environment

1. **Code Editor**: Use VS Code, WebStorm, or any preferred editor
2. **Extensions** (for VS Code):
   - ES7+ React/Redux/React-Native snippets
   - Prettier - Code formatter
   - ESLint

### Contributing to the Project

1. **Fork the repository** on GitHub
2. **Create a new branch** for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** and commit them:
   ```bash
   git add .
   git commit -m "Add your commit message"
   ```
4. **Push to your branch**:
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Create a Pull Request** on GitHub

### Code Style Guidelines

- Use consistent indentation (2 spaces)
- Follow JavaScript/React best practices
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes before submitting

## Deployment

### Building for Production

```bash
# Create production build
npm run build

# Start production server
npm run start
```

### Deployment Platforms

This Next.js application can be deployed on:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **Heroku**
- **DigitalOcean**
- **AWS**
- **Google Cloud Platform**

### Environment Variables

Create a `.env.local` file in the root directory for environment-specific variables:

```env
NEXT_PUBLIC_API_URL=your_api_url_here
# Add other environment variables as needed
```

## Troubleshooting

### Common Issues

1. **Port 3000 already in use**:
   ```bash
   # Kill the process using port 3000
   # Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID_NUMBER> /F
   
   # macOS/Linux
   lsof -ti:3000 | xargs kill -9
   ```

2. **Node modules issues**:
   ```bash
   # Delete node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Permission errors on Linux/macOS**:
   ```bash
   # Fix npm permissions
   sudo chown -R $(whoami) ~/.npm
   ```

## Technology Stack

- **Frontend**: Next.js, React
- **Styling**: CSS/SCSS
- **Package Manager**: npm/yarn
- **Version Control**: Git

## Future Development

### Planned Features

- User authentication system
- Payment history tracking
- Multi-language support
- Advanced QR code customization
- API integration for payment verification
- Mobile app version

### Development Roadmap

1. **Phase 1**: Core functionality improvements
2. **Phase 2**: User management system
3. **Phase 3**: Payment analytics dashboard
4. **Phase 4**: Mobile application development

## Contributing

We welcome contributions from the community. Please read the contributing guidelines above and feel free to submit issues, feature requests, or pull requests.

## License

This project is open source. Please check the LICENSE file for more details.

## Support

For support and questions:

- Create an issue on GitHub
- Check existing issues for similar problems
- Review the documentation thoroughly

## Acknowledgments

- Built with Next.js framework
- Uses PromptPay QR code generation
- Inspired by the need for simple payment solutions

---

**Note**: This is a development project. Please ensure you comply with local regulations and PromptPay terms of service when using this application for commercial purposes.
<img src="https://img2.pic.in.th/pic/Screenshot-2568-08-08-at-00.30.59.png" alt="Screenshot 2568 08 08 at 00.30.59" border="0">
