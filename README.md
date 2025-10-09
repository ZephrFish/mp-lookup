# Email Your MP - Online Safety Act & Digital IDs

A web app to help UK citizens contact their Member of Parliament about the Online Safety Act and Digital ID proposals.

## Features

- Find your MP using your postcode
- Pre-written email templates for two key issues:
  - Online Safety Act concerns (including recent data breaches)
  - Digital ID system concerns
- Copy email to clipboard or open in email client
- Mobile-responsive design

## How to Use

1. Enter your postcode to find your MP
2. Select a topic (Online Safety Act or Digital IDs)
3. Personalise the email template with your details
4. Copy the email or open it in your email client

## Deployment to GitHub Pages

1. Create a new repository on GitHub
2. Upload these files:
   - `index.html`
   - `script.js`
   - `style.css`
   - `README.md`

3. Enable GitHub Pages:
   - Go to Settings → Pages
   - Set Source to "Deploy from a branch"
   - Select "main" branch and "/ (root)" folder
   - Click Save

4. Your site will be available at: `https://[your-username].github.io/[repository-name]/`

## Local Development

To run locally, simply open `index.html` in a web browser. Note that the MP lookup requires an internet connection.

## API Note

This app uses the Parliament UK Members API to find MP information. The API is public and doesn't require authentication.

## Email Templates

The email templates reference:
- Online Safety Act Petition: https://petition.parliament.uk/petitions/722903
- Digital ID Petition: https://petition.parliament.uk/petitions/730194

Both petitions received inadequate government responses, which is why citizen engagement through MPs is important.