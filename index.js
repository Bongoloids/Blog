import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var saveContent = {};
var blogArr = [];
var txtArea = [];


function textArea(req, res, next) {
    txtArea = req.body["content"];  
    saveContent = {title: req.body["title"], content: txtArea};
    next();
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(textArea);

app.get("/", (req, res) => {
    res.render("index.ejs", {post: blogArr});
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.get("/contact", (req, res) => {
    res.render("contact.ejs");
});

app.get("/compose", (req, res) => {
    res.render("compose.ejs");
});

app.post("/submit", (req, res) => {
    blogArr.push(saveContent); 
    res.redirect("/compose");
});

app.post("/update", (req, res) => {  
    var indexNumber = req.body["indNum"];
    blogArr[indexNumber].title = req.body["title"];
    blogArr[indexNumber].content = req.body["content"];
    res.redirect("/");
});

app.get("/read/:postTitle", (req, res) => {
    var lookup = req.params.postTitle;
    var indexCount = lookup.substr(lookup.length - 1);
    let content = blogArr[indexCount];
    res.render("read.ejs", {index: content, indNum: indexCount});
});

app.get("/edit/:postIndex", (req, res) => {
    var lookup = req.params.postIndex;
    var indexCount = lookup.substr(lookup.length - 1);
    let content = blogArr[indexCount];
    res.render("edit.ejs", {index: content, indNum: indexCount});
});

app.get("/delete/:postIndex", (req, res) => {
    var indNum = req.params.postIndex;
    if (indNum == 0) {
        blogArr.shift();
    } else {
        blogArr.splice(indNum, indNum);
    }
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server connected on ${3000}.`);
});