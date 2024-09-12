import './YourBook.css'
import MyBook from "./MyBook"
import { useState, useContext } from 'react'
import { MyBookListContext } from './MyBookListContext'

export default function YourBook(){
    const myBook = useContext(MyBookListContext);
    let books;
    console.log(myBook.myBookList)
    if(myBook.myBookList.length >= 1)
    {
        books = myBook.myBookList.map((book, index) => (
            <MyBook key={index} imgurl={book.url} title={book.title} />
          ))
    }
    else{
        books = "'Click on the 'Add a Book' on the Navbar To Add a Book'";
    }
    return (
        <div className="yourbookbody">
            <h1 className="headingwebsite">My Book</h1>
            <div className="yourbooktabs">
                <div className="yourbooktab1">ALL</div>
                <div className="yourbooktab1">Reading</div>
                <div className="yourbooktab1">Finished Reading</div>
                <div className="yourbooktab1">Plan to Read</div>
            </div>
            <div className="yourbooks"><div className='books'>{books}</div></div>
        </div>
    )
}