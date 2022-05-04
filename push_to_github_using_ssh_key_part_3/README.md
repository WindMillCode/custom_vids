# Push to Github Using SSH Key part 3 - push your code to github

open git bash

```sh
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

open etc\ssh\ssh_config

* the IdentityFile entry is meant to be only one entry the 5 there are examples
* provide an entry with the value as the path to the private key
* yes your  IdentityFile is your private key

```sh
IdentityFile ~/.ssh/id_ed25519
```

* create a repo and grab the repo git url
* in terminal
```vb
mkdir [Your folder]
cd [your folder]
git init
git remote add origin [GIT URL]
<!-- git remote add origin git@github.com:windmillcode0/My_ssh_repo.git -->
New-Item files3.txt;git add .;git commit -m"[UPDATE]";git push origin master
```