# Themed Passphrase Generator

A Next.js web application that generates secure, memorable passphrases based on themes of your choice using Google's Gemini AI.

## Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd passphrase-generator
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Get your Gemini API key**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy the key to your `.env.local` file

## Usage

1. **Start the development server**

   ```bash
   npm run dev
   ```

2. **Open your browser**

   Navigate to `http://localhost:3000`

3. **Generate passphrases**
   - Enter a theme in the input field
   - Click "Generate Passphrase" or press Enter
   - Copy the generated passphrase using the copy button
