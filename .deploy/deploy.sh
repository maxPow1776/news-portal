cd ~/news-portal
npm run build:prod

rm -rf ~/../var/www/news-portal/html
mv ~/news-portal/build ~/../var/www/news-portal/html