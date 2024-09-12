import './YourBook.css'
import { useState, useContext } from 'react'
import { MyBookListContext } from './MyBookListContext'

export default function YourBook(){
    const myBook = useContext(MyBookListContext);
    return (
        <div className="yourbookbody">
            <h1 className="headingwebsite">My Book</h1>
            <div className="yourbooktabs">
                <div className="yourbooktab1">ALL</div>
                <div className="yourbooktab1">Reading</div>
                <div className="yourbooktab1">Finished Reading</div>
                <div className="yourbooktab1">Plan to Read</div>
            </div>
            <div className="yourbooks"><div className='books'>{myBook.myBookList}</div></div>
        </div>
    )
}