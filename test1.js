const request_data = require("supertest")("http://barru.pythonanywhere.com"); //url atau endpoint yang dituju
const assert = require("chai").expect; //import library chai untuk validasi
describe("POST User Info", function () { //deskripsikan function untuk test scenario
    it("Success Login with valid email and password", async function () { //test case
        var user = {
            email: "bimo12@gmail.com",
            password: "bimo123" };
        const response = await request_data //await untuk menunggu request endpoint hingga sukses
            .post("/login") //tipe http request
            .send(user);
        //data yang dikirim

        //expect untuk validasi respon
        assert(response.body.status).to.eql('SUCCESS_LOGIN');
        assert(response.body.data).to.eql('Welcome nama');
        assert(response.body.message).to.eql('Anda Berhasil Login');
        assert(response.body).to.include.keys("data", "message", "status");
    });

    it("verify failed with wrong email", async function(){
        const response = await request_data 
            .post("/login")
            .send({ email: "bimo@gmail.com", password: "bimo123"});

        assert(response.body.status).to.eql('FAILED_LOGIN');
        assert(response.body.message).to.eql("Email atau Password Anda Salah");
        assert(response.body.data).to.eql("User's not found");
    });

    it("verify failed with wrong format email", async function() {
       const response = await request_data
            .post("/login")
            .send({email: "bimo@", password: "bimo123"})

        assert(response.body.status).to.eql("FAILED_LOGIN");
        assert(response.body.data).to.eql("Email tidak valid");
        assert(response.body.message).to.eql("Cek kembali email anda");
    });

    it("verify failed with password char length > 20", async function() {
        const response = await request_data
             .post("/login")
             .send({email: "bimo@gmail.com", password: "bimobimobimobimobimo123"})
 
         assert(response.body.status).to.eql("FAILED_LOGIN");
         assert(response.body.data).to.eql("Email/Password melebihin maksimal karakter");
         assert(response.body.message).to.eql("Gagal Login");
     });

     it("verify failed with Email char length > 50", async function() {
        const response = await request_data
             .post("/login")
             .send({email: "bimobimobimobimobimobimobimobimobimobimobimobimo123@gmail.com", password: "bimo123"})
 
         assert(response.body.status).to.eql("FAILED_LOGIN");
         assert(response.body.data).to.eql("Email/Password melebihin maksimal karakter");
         assert(response.body.message).to.eql("Gagal Login");
     });

     it("verify failed with empty email", async function() {
        const response = await request_data
             .post("/login")
             .send({email: "", password: "bimo123"})
 
         assert(response.body.status).to.eql("FAILED_LOGIN");
         assert(response.body.data).to.eql("Email tidak valid");
         assert(response.body.message).to.eql("Cek kembali email anda");
     });

});