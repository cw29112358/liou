# old deploy method on firebase
# npm run build && aws s3 sync build/ s3://beta.lendingcar.com
# aws cloudfront create-invalidation --distribution-id E384YH80RLYN8C --paths /\*

# new deploy method #1(build) on aws
npm run build
sudo rm -rf /var/www/html/beta.lendingcar.com/*
sudo cp -rf ~/git/www.lendingcar.com/build/* /var/www/html/beta.lendingcar.com/
sudo service httpd reload

# new deploy method #2(run localhost:9000) on aws
# pm2 restart lendingcar-beta
