# As root

apt update
apt upgrade
apt-get install fail2ban

ufw allow 22
ufw allow 80
ufw allow 443
ufw enable

useradd rockyj
mkdir /home/rockyj
mkdir /home/rockyj/.ssh
chmod 700 /home/rockyj/.ssh/
cp .ssh/authorized_keys /home/rockyj/.ssh/
chown -R rockyj /home/rockyj/

mkdir -p /opt/app
chown -R rockyj /opt/app

adduser rockyj sudo
passwd rockyj

# As user
chsh -s /bin/bash

# docker
sudo apt-get install apt-transport-https ca-certificates curl software-properties-common
sudo apt-get install openjdk-21-jdk
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo usermod -aG docker rockyj

docker ps
docker-compose -v
docker run hello-world

# caddy
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https curl
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install caddy

# app
git clone https://github.com/rocky-jaiswal/todo-pro.git
cd todo-pro/
rm -rf .env
rm -rf auth-service/.env
rm -rf todo-pro-web/.env
chmod u+x ./setup.sh

docker-compose -f docker-compose-prod.yml up --build
docker ps -aq | xargs docker stop | xargs docker rm
docker-compose -f docker-compose-prod.yml up --detach
sudo caddy stop
sudo caddy start
