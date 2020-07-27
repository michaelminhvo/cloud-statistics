# cloud-statistics
A website that allows you to upload a csv and get back insights into your data automatically. Using Vercel/Next.js to manage the deploy.

Micro service architecture.
1. Upload a CSV with columns you're interesting in studying
2. Download the correlation matrix instantly

# Public API
Or use the API endpoint directly, 
POST a request to cloud function https://us-central1-shaped-terrain-284522.cloudfunctions.net/correlation2
with a body containing a { file: csv }.

The response is a CSV string.

# GCloud functions
This repo can be cloned and then a cloud function can be created. 