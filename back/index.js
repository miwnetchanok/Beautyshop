const express = require("express")
const cors = require("cors")
const con = require("./connection")
const { commit } = require("./connection")
const path = require("path")
const multer = require("multer")
const { createConnection } = require("mysql")
const app = express()

app.use(cors())
app.use(express.json());

app.use("/static", express.static(path.join(__dirname, "public")));

let storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./public/images");
    },

    filename: (req, file, cb) => {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});
let upload = multer({ storage: storage });

app.post("/upload-product", upload.single("image"), function (req, res, next) {
    const filename = req.file.filename;
    const imagePath = `http://localhost:${port}/static/images/${filename}`;
    const { userId, productName, productPrice, productDetails } = req.body;
    console.log(userId, productName, productPrice, imagePath, productDetails);
    const sql = "insert into products (userId, productName, productPrice, priductDetails, url) values(?, ?, ?, ?, ?) " ;
    const data = [userId, productName, productPrice, productDetails, imagePath];
    const values = Object.values(data);
    con.query(sql, values, (err, result) => {
        if (err) throw err;
        
        return res.send({ status: true, msg: "result" });
    });
});

app.post("/signin", (req, res) => {
    const { username, password } = req.body;
    const sql = "Select * from users where username=? and password=?"
    const data = [username, password]
    const values = Object.values(data)
    con.query(sql, values, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            return res.send({ status: true, msg: "Login sucessful", userId: result[0].id });
        }
        return res.send({ status: false, msg: "Login is invalid" });
    });

});

app.post("/signup", (req, res) => {
    const { username, password } = req.body;
    const sql = "insert into users (username,password) values (?,?)";
    const data = [username, password];
    const values = Object.values(data);
    con.query(sql, values, (err, result) => {
        if (err) throw err;
        res.send({ status: true, msg: result });
    });
});



app.post("/cart", (req, res) => {
    const { userId, productId } = req.body;
    const sql = "insert into carts (userId,productId) values (?,?)";
    const data = [userId, productId];
    const values = Object.values(data);
    con.query(sql, values, (err, result) => {
        if (err) throw err;
        res.send({ status: true, msg: result });
    });
});


app.get("/all-product", (req, res) => {
    const sql = "select * from products";
    con.query(sql, (err, result) => {
        if (err) throw err;
        return res.send({ status: true, msg: result });
    })
})

app.get("/product/:id", (req, res) => {
    const { id } = req.params;
    const sql = `select * from products where id=?`;
    const data = [id];
    const values = Object.values(data);
    con.query(sql, values, (err, result) => {
        if (err) throw err;
        res.send({ status: true, msg: result });
    })
})



app.get("/cart", (req, res) => {
    const { userId } = req.query;
    const sql = "select * from carts inner join products on carts.productId=products.id where carts.userId=?";
    const data = [userId];
    const values = Object.values(data);
    con.query(sql, values, (err, result) => {
        if (err) throw err;
        return res.send({ status: true, msg: result });
    });
});


app.post("/checkout", (req, res) => {
    const { userId, price } = req.body;
    const sql = "insert into orders (userId,totalPrice)values (?,?)";
    const data = [userId, price];
    const values = Object.values(data);
    con.query(sql, values, (err, result) => {
        if (err) throw err;
        if (result) {
            const sql2 = "delete from carts where userId=?";
            const data2 = [userId];
            const values2 = Object.values(data);
            con.query(sql2, values2, (err2, result2) => {
                if (err2) throw err2;
                return res.send({ status: true, msg: result2 });
            });
        }
    });
});

const port = 4000;

app.listen(port, () => console.log(`Server is running on ${port}`));