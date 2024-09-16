import "./ModalBookList.css" 
import { useContext, useState, useEffect } from "react"
import { MyBookListContext } from "./MyBookListContext"

export default function ModalBookList(param){
    const myBook = useContext(MyBookListContext);
    const [status, setStatus] = useState("0");
    function addtoyourbook(e){
        e.preventDefault();
        if (((myBook.myBookList).filter((ele)=>ele.isbn===param.result.canonical_isbn)).length > 0)
        {
            window.alert("You already have that in you list");
            return;
        }
        myBook.setMyBookList(b => [...b, {
            url: param.result.published_works[0].cover_art_url,
            title : param.result.title,
            status : status,
            series : param.result.series_name,
            author : param.result.authors[0],
            summary : param.result.summary,
            isbn : param.result.canonical_isbn,
            fav : false,
            categories : param.result.categories,
            subcategories: param.result.subcategories
        }]);
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
        localStorage.setItem("booklist", JSON.stringify(myBook.myBookList));
    },[myBook.myBookList]
    )

    return(
        <div className="modalsection" id={"apifetch" + param.id}>
            <div className="modalbookcoverdiv">
                <img src={param.result.published_works[0].cover_art_url} alt="" className="modalbookcover"/>
            </div>
            <div className="modalbookdetails">
                <div className="modalbooklisttitle">{param.result.title}</div>
                <div className="modalbooklistseriesname">{param.result.series_name}</div>
                <div className="modalbooklistauthor">Author : {param.result.authors[0]}</div>
            </div>
            <div className="yourbookentry">
                <form action="" onSubmit={addtoyourbook} className="modalbooklistform">
                    <select name="statusofbook" id="statusofbook" className="statusofbook" onChange={(e)=>{
                        const {name, value} = e.target;
                        setStatus(value);
                        }} required>
                        <option disabled selected value="">Select a Option</option>
                        <option value="1">Reading</option>
                        <option value="2">Finish Reading</option>
                        <option value="3">Plan To Read</option>
                    </select>
                    <button type="submit" className="addonmylistbutton">Add</button>
                </form>
            </div>
        </div>
    )
}
