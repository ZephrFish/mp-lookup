# Deployment Instructions for mplookup.yxz.red

## Prerequisites
- GitHub account
- Access to DNS settings for yxz.red domain

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository (suggested name: `mplookup` or `mp-email`)
3. Make it public
4. Don't initialize with README (we already have one)

## Step 2: Upload Files

### Option A: Using Git (Command Line)
```bash
cd /Users/zephr/tools/mp-email
git init
git add .
git commit -m "Initial commit - MP Email Tool"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### Option B: Using GitHub Web Interface
1. Click "uploading an existing file" on the new repo page
2. Drag and drop all files:
   - index.html
   - script.js
   - style.css
   - README.md
   - CNAME
   - .nojekyll
3. Commit the files

## Step 3: Enable GitHub Pages

1. Go to repository Settings
2. Scroll to "Pages" section
3. Under "Source", select "Deploy from a branch"
4. Choose "main" branch and "/ (root)" folder
5. Click Save

## Step 4: Configure DNS

Add these DNS records for yxz.red:

### If using a subdomain (mplookup.yxz.red):
```
Type: CNAME
Name: mplookup
Value: YOUR_USERNAME.github.io
TTL: 3600 (or default)
```

### Alternative A Records (if CNAME doesn't work):
```
Type: A
Name: mplookup
Value: 185.199.108.153
TTL: 3600

Type: A
Name: mplookup
Value: 185.199.109.153
TTL: 3600

Type: A
Name: mplookup
Value: 185.199.110.153
TTL: 3600

Type: A
Name: mplookup
Value: 185.199.111.153
TTL: 3600
```

## Step 5: Wait for Propagation

1. DNS changes can take 10 minutes to 48 hours to propagate
2. GitHub Pages with custom domain can take up to 24 hours to activate
3. Check status in Settings → Pages

## Step 6: Verify Deployment

1. Visit https://mplookup.yxz.red
2. Test the MP lookup functionality
3. Ensure HTTPS is working (GitHub Pages provides free SSL)

## Troubleshooting

### Site not loading:
- Check DNS propagation: https://dnschecker.org/#CNAME/mplookup.yxz.red
- Verify CNAME file exists in repo
- Check GitHub Pages settings show custom domain

### MP lookup not working:
- Open browser console for errors
- Ensure HTTPS is being used (Parliament API requires secure connection)
- Test on different browsers

### SSL/HTTPS issues:
- GitHub Pages automatically provisions SSL certificates
- May take up to 24 hours after DNS setup
- Force HTTPS in repository settings once available

## Maintenance

- The Parliament API is public and doesn't require authentication
- Monitor for any API changes at https://members-api.parliament.uk/
- Keep email templates updated with current issues