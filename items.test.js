process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("./app");
let items = require("./fakeDb");

let cottoncandy = {"name":"cottoncandy","price":2.50};
let candycane = {"name":"candycane","price":3.00};
let jollyrancher = {"name":"jollyrancher","price":0.50};

beforeEach(function() {
    items.push(cottoncandy);
    items.push(candycane);
    items.push(jollyrancher);
});

afterEach(function() {
    items.length = 0;
})

describe("GET /items", function(){
    test("Get all items", async function(){
        const res = await request(app).get("/items");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([cottoncandy,candycane,jollyrancher])
    })
    test("Get specific item", async function(){
        const res = await request(app).get("/items/jollyrancher")
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(jollyrancher)
    })
})

describe("POST /items", function(){
    test("Creating an item", async function(){
        const res = await  request(app).post('/items').send({"name":"hersheys", "price":1})
        expect(res.statusCode).toBe(201)
        expect(res.body).toEqual({"added":{"name":"hersheys", "price":1}})
        const res2 = await request(app).get('/items');
        expect(res2.statusCode).toBe(200);
        expect(res2.body).toEqual([cottoncandy,candycane,jollyrancher,{"name":"hersheys", "price":1}])
    })
})

describe("PATCH /items", function(){
    test("Editing an item", async function(){
        const res = await  request(app).patch('/items/candycane').send({"name":"candy_cane", "price":1.25})
        expect(res.statusCode).toBe(201)
        expect(res.body).toEqual({"updated":{"name":"candy_cane", "price":1.25}})
        const res2 = await request(app).get('/items');
        expect(res2.statusCode).toBe(200);
        expect(res2.body).toEqual([cottoncandy,{"name":"candy_cane", "price":1.25},jollyrancher])
    })
})

describe("Delete /items", function(){
    test("Deleting an item", async function(){
        const res = await  request(app).delete('/items/cottoncandy')
        expect(res.statusCode).toBe(201)
        expect(res.body).toEqual({"msg":"Deleted"})
        const res2 = await request(app).get('/items');
        expect(res2.statusCode).toBe(200);
        expect(res2.body).toEqual([candycane,jollyrancher])
    })
})
