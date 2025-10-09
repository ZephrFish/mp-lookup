#!/bin/bash

# Deploy script for MP Email Tool with AWS Secrets Manager integration

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}MP Email Tool Deployment Script${NC}"
echo "================================"

# Check required tools
check_requirements() {
    echo -e "${YELLOW}Checking requirements...${NC}"
    
    # Check AWS CLI
    if ! command -v aws &> /dev/null; then
        echo -e "${RED}AWS CLI is not installed. Please install it first.${NC}"
        exit 1
    fi
    
    # Check git
    if ! command -v git &> /dev/null; then
        echo -e "${RED}Git is not installed. Please install it first.${NC}"
        exit 1
    fi
    
    # Check serverless (optional)
    if ! command -v serverless &> /dev/null; then
        echo -e "${YELLOW}Serverless Framework not found. Installing...${NC}"
        npm install -g serverless
    fi
    
    echo -e "${GREEN}All requirements satisfied.${NC}"
}

# Setup AWS Secrets Manager
setup_secrets() {
    echo -e "${YELLOW}Setting up Cloudflare credentials in AWS Secrets Manager...${NC}"
    
    read -p "Enter your Cloudflare API Token: " -s cf_token
    echo
    read -p "Enter your Cloudflare Zone ID for yxz.red: " cf_zone_id
    read -p "Enter your Cloudflare Account ID (optional): " cf_account_id
    
    # Create secret in AWS Secrets Manager
    aws secretsmanager create-secret \
        --name cloudflare-api-credentials \
        --description "Cloudflare API credentials for MP Email Tool deployment" \
        --secret-string "{\"api_token\":\"$cf_token\",\"zone_id\":\"$cf_zone_id\",\"account_id\":\"$cf_account_id\"}" \
        2>/dev/null || \
    aws secretsmanager update-secret \
        --secret-id cloudflare-api-credentials \
        --secret-string "{\"api_token\":\"$cf_token\",\"zone_id\":\"$cf_zone_id\",\"account_id\":\"$cf_account_id\"}"
    
    echo -e "${GREEN}Cloudflare credentials stored in AWS Secrets Manager.${NC}"
}

# Deploy Lambda function
deploy_lambda() {
    echo -e "${YELLOW}Deploying Lambda function for DNS management...${NC}"
    
    cd deploy
    
    # Install serverless plugins
    npm init -y > /dev/null 2>&1
    npm install --save-dev serverless-python-requirements > /dev/null 2>&1
    
    # Deploy with serverless
    read -p "Enter your GitHub username: " github_username
    serverless deploy --github-username "$github_username"
    
    cd ..
    echo -e "${GREEN}Lambda function deployed successfully.${NC}"
}

# Deploy to GitHub Pages
deploy_github() {
    echo -e "${YELLOW}Deploying to GitHub Pages...${NC}"
    
    read -p "Enter your GitHub username: " github_username
    read -p "Enter repository name (default: mp-email): " repo_name
    repo_name=${repo_name:-mp-email}
    
    # Initialize git if not already
    if [ ! -d .git ]; then
        git init
        git add .
        git commit -m "Initial commit - MP Email Tool"
    fi
    
    # Add remote and push
    git remote add origin "https://github.com/ZephrFish/mp-lookup.git" 2>/dev/null || true
    git branch -M main
    git push -u origin main
    
    echo -e "${GREEN}Pushed to GitHub successfully.${NC}"
    echo -e "${YELLOW}Please enable GitHub Pages in your repository settings.${NC}"
}

# Configure DNS via Lambda
configure_dns() {
    echo -e "${YELLOW}Configuring DNS...${NC}"
    
    # Get Lambda function URL from serverless output
    lambda_url=$(serverless info -v | grep "POST -" | awk '{print $3}')
    
    if [ -z "$lambda_url" ]; then
        echo -e "${RED}Could not find Lambda URL. Please check serverless deployment.${NC}"
        return 1
    fi
    
    # Call Lambda to configure DNS
    curl -X POST "$lambda_url" \
        -H "Content-Type: application/json" \
        -d '{"subdomain": "mplookup"}'
    
    echo -e "${GREEN}DNS configuration complete.${NC}"
}

# Main deployment flow
main() {
    check_requirements
    
    echo
    echo "Select deployment steps:"
    echo "1. Full deployment (AWS Secrets + Lambda + GitHub + DNS)"
    echo "2. Setup AWS Secrets Manager only"
    echo "3. Deploy Lambda only"
    echo "4. Deploy to GitHub Pages only"
    echo "5. Configure DNS only"
    
    read -p "Enter your choice (1-5): " choice
    
    case $choice in
        1)
            setup_secrets
            deploy_lambda
            deploy_github
            configure_dns
            ;;
        2)
            setup_secrets
            ;;
        3)
            deploy_lambda
            ;;
        4)
            deploy_github
            ;;
        5)
            configure_dns
            ;;
        *)
            echo -e "${RED}Invalid choice. Exiting.${NC}"
            exit 1
            ;;
    esac
    
    echo
    echo -e "${GREEN}Deployment complete!${NC}"
    echo -e "Your site will be available at: ${YELLOW}https://mplookup.yxz.red${NC}"
    echo -e "Note: DNS propagation may take up to 24 hours."
}

# Run main function
main