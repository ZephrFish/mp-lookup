import json
import boto3
import os
import requests
from botocore.exceptions import ClientError

def get_cloudflare_credentials():
    """Retrieve Cloudflare API credentials from AWS Secrets Manager"""
    secret_name = os.environ.get('CLOUDFLARE_SECRET_NAME', 'cloudflare-api-credentials')
    region_name = os.environ.get('AWS_REGION', 'eu-west-1')
    
    # Create a Secrets Manager client
    session = boto3.session.Session()
    client = session.client(
        service_name='secretsmanager',
        region_name=region_name
    )
    
    try:
        get_secret_value_response = client.get_secret_value(
            SecretId=secret_name
        )
        secret = json.loads(get_secret_value_response['SecretString'])
        return {
            'api_token': secret.get('api_token'),
            'zone_id': secret.get('zone_id'),
            'account_id': secret.get('account_id')
        }
    except ClientError as e:
        raise Exception(f"Error retrieving Cloudflare credentials: {str(e)}")

def update_cloudflare_dns(credentials, subdomain='mplookup', target='zephrfish.github.io'):
    """Update Cloudflare DNS records for the subdomain"""
    headers = {
        'Authorization': f'Bearer {credentials["api_token"]}',
        'Content-Type': 'application/json'
    }
    
    zone_id = credentials['zone_id']
    
    # Check if record exists
    list_url = f'https://api.cloudflare.com/client/v4/zones/{zone_id}/dns_records'
    params = {
        'type': 'CNAME',
        'name': f'{subdomain}.yxz.red'
    }
    
    response = requests.get(list_url, headers=headers, params=params)
    records = response.json()
    
    if records['success'] and records['result']:
        # Update existing record
        record_id = records['result'][0]['id']
        update_url = f'{list_url}/{record_id}'
        data = {
            'type': 'CNAME',
            'name': subdomain,
            'content': target,
            'ttl': 3600,
            'proxied': False  # GitHub Pages requires proxied to be false
        }
        result = requests.put(update_url, headers=headers, json=data)
    else:
        # Create new record
        data = {
            'type': 'CNAME',
            'name': subdomain,
            'content': target,
            'ttl': 3600,
            'proxied': False
        }
        result = requests.post(list_url, headers=headers, json=data)
    
    return result.json()

def lambda_handler(event, context):
    """Main Lambda handler for DNS deployment"""
    try:
        # Get Cloudflare credentials from Secrets Manager
        credentials = get_cloudflare_credentials()
        
        # Get parameters from event
        body = json.loads(event.get('body', '{}')) if event.get('body') else {}
        subdomain = body.get('subdomain', 'mplookup')
        github_username = body.get('github_username', os.environ.get('GITHUB_USERNAME'))
        
        if not github_username:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'GitHub username is required'})
            }
        
        target = f'{github_username}.github.io'
        
        # Update Cloudflare DNS
        result = update_cloudflare_dns(credentials, subdomain, target)
        
        if result['success']:
            return {
                'statusCode': 200,
                'body': json.dumps({
                    'message': f'Successfully configured {subdomain}.yxz.red to point to {target}',
                    'dns_record': result.get('result', {})
                })
            }
        else:
            return {
                'statusCode': 400,
                'body': json.dumps({
                    'error': 'Failed to update DNS',
                    'details': result.get('errors', [])
                })
            }
            
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({
                'error': 'Internal server error',
                'message': str(e)
            })
        }