# Deploy to GitHub Repository

Now that https://github.com/ZephrFish/mp-lookup exists, follow these steps:

## 1. Initialize and Push Code

```bash
# Navigate to project directory
cd /Users/zephr/tools/mp-email

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: MP Email Tool with privacy-first design"

# Add remote repository
git remote add origin https://github.com/ZephrFish/mp-lookup.git

# Push to main branch
git branch -M main
git push -u origin main
```

## 2. Enable GitHub Pages

1. Go to https://github.com/ZephrFish/mp-lookup/settings/pages
2. Under "Source", select "Deploy from a branch"
3. Choose "main" branch and "/ (root)" folder
4. Click "Save"

## 3. Configure DNS for mplookup.yxz.red

### Option A: Manual DNS Configuration
Add these records to your yxz.red DNS:

```
Type: CNAME
Name: mplookup
Value: zephrfish.github.io
TTL: 3600
```

### Option B: Use AWS Lambda (if deployed)
```bash
# Run the deployment script
cd deploy
./deploy.sh
# Select option 5 (Configure DNS only)
```

## 4. Verify Deployment

1. Check GitHub Pages status: https://github.com/ZephrFish/mp-lookup/settings/pages
2. Test the direct GitHub Pages URL: https://zephrfish.github.io/mp-lookup/
3. Once DNS propagates, test: https://mplookup.yxz.red

## 5. Quick Commands

### Update and deploy changes:
```bash
git add .
git commit -m "Update: [description of changes]"
git push
```

### Check deployment status:
```bash
# Check GitHub Actions (if configured)
gh workflow view

# Check DNS propagation
dig mplookup.yxz.red
```

## Notes

- DNS propagation can take 10 minutes to 48 hours
- GitHub Pages SSL certificate generation can take up to 24 hours
- The CNAME file in the repository enables custom domain support
- All processing happens client-side - no server infrastructure needed