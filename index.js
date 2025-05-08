const fs=require("fs")
const http=require("http")
const url=require("url")
const replacePlaceHolders=require("./modules/replacePlaceholder")
const data=fs.readFileSync(`${__dirname}/dev-data/data.json`,"utf-8")
const dataObj=JSON.parse(data)
const cardTemplate=fs.readFileSync(`${__dirname}/templates/card-template.html`,"utf-8")
const productTemplate=fs.readFileSync(`${__dirname}/templates/product-template.html`,"utf-8")
const overviewTemplate=fs.readFileSync(`${__dirname}/templates/overview-template.html`,"utf-8")


const server=http.createServer((req,res)=>{
    const {query,pathname}=url.parse(req.url,true)

    if(pathname==="/"||pathname==="overview"){
        res.writeHead(200,{"content-type":"text/html"})
      const cards=  dataObj.map((product)=>{
            return replacePlaceHolders(cardTemplate,product)
        })
        const overviewTemp=overviewTemplate.replace(/{%PRODUCT_CARDS%}/g,cards.join(""))
        res.end(overviewTemp)
    }
    else if(pathname==="/product"){
        res.writeHead(200,{"content-type":"text/html"})
        const productDetailes=replacePlaceHolders(productTemplate,dataObj[query.id])
        res.end(productDetailes)
        
    }
    else{
        res.writeHead(404,{
            "content-type":"text/html"
        })
        res.end("<h1>Page Not Found</h1>")
    }
})

server.listen(8000,"127.0.0.1",()=>{
    console.log("Listening to requests on port 8000")
})