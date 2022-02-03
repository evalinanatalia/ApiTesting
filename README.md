Automation APi using mocha chai

1. Install Node.js dan npm (cek version : node -v, npm -v)
2. Install modul npm
    - npm install mocha --save-dev 
    - npm install chai -g (secara global)
3. Mulai buat project
    npm init  
    disini akan diminta data2 utk project, seperti folder name project, dll

test di package json di ubah jadi "test: mocha"
baru bisa nge run pake "npm test"
kalo per file nge run nya "npx mocha nama_file.js"

1. setup environment
    - install dulu dotenv "npm install dotenv"
3. trus tambahkan file .env pas di bawah folder utama
4. trus masukkan nama variable contohnya BASE_URL = https://blabla
5. trus cara manggilnya di file lain pake 
6. process.env.BASE_URL