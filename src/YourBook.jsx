import './YourBook.css'
import MyBook from "./MyBook"
import { useState, useContext, useEffect} from 'react'
import { MyBookListContext } from './MyBookListContext'
import { SearchContext } from './SearchContext'
import { FilterContext } from './FilterContext'

export default function YourBook(){
    let [tab, setTab] = useState(0);
    const myBook = useContext(MyBookListContext);
    const searchterm = useContext(SearchContext);
    const filterset = useContext(FilterContext);
    let [books, setBooks] = useState(booklist(myBook.myBookList));

    function searchedBookList(kitab){
        let regex = new RegExp(searchterm.search, "i");
        return kitab.filter((ele) => (regex.test(ele.title) || regex.test(ele.series) || regex.test(ele.author)))
    }

    function filterdBookList(kitab){
        let retValue = kitab;
        if(filterset.filter.fav)
        {
            retValue = retValue.filter((ele)=>(ele.fav))
        }
        if(filterset.filter.categories.length > 0)
        {
            retValue = retValue.filter((ele)=>(ele.categories.some(category => filterset.filter.categories.includes(category))))
        }
        if(filterset.filter.subcategories.length > 0)
        {
            retValue = retValue.filter((ele)=>(ele.subcategories.some(subcategory => filterset.filter.subcategories.includes(subcategory))))
        }
        return retValue;
    }

    function booklist(mbl){
        let kitab ={};
        if(tab === 0)
        {
            kitab = mbl;
        }
        else if(tab === 1)
        {
            kitab = mbl.filter((ele)=> ele.status == "1");
        }
        else if(tab === 2)
        {
            kitab = mbl.filter((ele)=> ele.status == "2");
        }
        else if(tab === 3)
        {
            kitab = mbl.filter((ele)=> ele.status == "3");
        }
        kitab = searchedBookList(kitab);
        kitab = filterdBookList(kitab);
        let b;
        if(kitab.length > 0)
        {
            b = kitab.map((book, index) => (
                <MyBook key={index} imgurl={book.url} title={book.title} series={book.series} author={book.author} summary={book.summary} isbn={book.isbn} fav ={book.fav} status={book.status}/>
            ))
        }
        else
        {
            b = <div className="deftext">No Book in Your Collection Match the Criteria</div>
        }

        return b;
}
        
    useEffect(()=>{
        const data = localStorage.getItem("booklist");
        if(data)
        {
            myBook.setMyBookList(JSON.parse(data));
        }
    },[]
    )
    useEffect(()=>{
        let fbooklist;
        if(myBook.myBookList.length >= 1){
           fbooklist = booklist(myBook.myBookList);
        }
        else{
            fbooklist = <div className="deftext">Click on the 'Add a Book' on the Navbar To Add a Book</div>;
        }
        setBooks(fbooklist);
    },[myBook.myBookList, tab, searchterm.search, filterset.filter])
    
        
    function tabchange(e){
        const tab1 = document.querySelector(".tab1");
        let leftoftab;
        leftoftab = (e.target.offsetLeft - tab1.offsetLeft);
        const tabline = document.querySelector(".tabline");
        tabline.style.left = leftoftab.toString() + "px";
        tabline.style.width = e.target.offsetWidth.toString() + "px";

        if(e.target.className == "yourbooktab tab1")
        {
            setTab(0);
        }
        else if(e.target.className == "yourbooktab tab2")
        {
            setTab(1);
        }
        else if(e.target.className == "yourbooktab tab3")
        {
            setTab(2);
        }
        else if(e.target.className == "yourbooktab tab4")
        {
            setTab(3);
        }
    }

    return (
        <div className="yourbookbody">
            <div className="topheads"> 
                <h1 className="headingwebsite">My Book</h1>
                <div className="yourbooktabsdiv">
                    <div className="yourbooktabs">
                        <div className="yourbooktab tab1" onClick={tabchange}>ALL</div>
                        <div className="yourbooktab tab2" onClick={tabchange}>Reading</div>
                        <div className="yourbooktab tab3" onClick={tabchange}>Finished Reading</div>
                        <div className="yourbooktab tab4" onClick={tabchange}>Plan to Read</div>
                    </div>
                    <div className='tabline'></div>
                </div>
                <select className="statusofbook tabselect" onChange={(e)=>{
                    const {name, value} = e.target;
                    setTab(parseInt(value));
                }}>
                        <option value={0}>All</option>
                        <option value={1}>Reading</option>
                        <option value={2}>Finish Reading</option>
                        <option value={3}>Plan To Read</option>
                </select>
            </div>
            <div className="yourbooks"><div className='books'>{books}</div></div>
        </div>
    )
}