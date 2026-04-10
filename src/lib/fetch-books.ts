import { BookData } from "@/types";

export default async function fetchBooks(q?:string) : Promise<BookData[]>{
    let url = `https://onebite-books-server-five-lime.vercel.app//book`

    if(q){
        url = `https://onebite-books-server-five-lime.vercel.app//book/search`
    }

    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error();   
        }
        return await response.json();
    }catch(err){
        console.error(err);
        return[];
    
    }
}