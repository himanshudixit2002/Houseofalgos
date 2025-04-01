# House of Algo's

A modern trading platform website built with Next.js.

## Deployment on Render

### Automatic Deployment

1. Connect your GitHub repository to Render
2. Render will automatically detect the `render.yaml` file and set up the service
3. Your app will be built and deployed automatically

### Manual Deployment

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Use the following settings:
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Node Version**: 18 or later

## Environment Variables

No specific environment variables are required for basic functionality.

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

