echo "Switching to branch main"
git checkout main

echo "Building app..."
npm run build

echo "Deploying files to server..."
scp -r dist/* root@62.217.179.24:/var/www/solar-admin/

echo "Done!"
