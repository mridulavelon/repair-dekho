import { NextResponse } from "next/server";


export default function middleware(req){
    // const verify = req.cookies;
    const url = req.url;
    if(url.includes("/Login")){
        return NextResponse.redirect("http://localhost:3000/") 
    }
}