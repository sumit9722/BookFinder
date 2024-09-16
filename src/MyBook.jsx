import "./MyBook.css"
import { useState, useContext, useEffect } from 'react'
import { MyBookListContext } from './MyBookListContext'

export default function MyBook(params){
    const myBook = useContext(MyBookListContext);
    const [widthincre, setWidthincre] = useState("")
    function deletebook(){
        myBook.setMyBookList(b => {
            return b.filter((ele) =>  ele.isbn !== params.isbn)
        });
    }

    function widthincrement(){
        if(widthincre == "")
        {
            setWidthincre("bookwidth");
        }
        else{
            setWidthincre("");
        }
    }

    function statuschange(e){
        const {name, value} = e.target;
        
        myBook.setMyBookList(b => {
            return b.map((ele) =>  {
                if(ele.isbn === params.isbn)
                {
                    return {
                        url : ele.url,
                        title : ele.title,
                        status : value,
                        series : ele.series,
                        author : ele.author,
                        summary : ele.summary,
                        isbn : ele.isbn,
                        fav : ele.fav,
                        categories :ele.categories,
                        subcategories: ele.subcategories
                    }
                }
                else{
                    return {
                        url : ele.url,
                        title : ele.title,
                        status : ele.status,
                        series : ele.series,
                        author : ele.author,
                        summary : ele.summary,
                        isbn : ele.isbn,
                        fav : ele.fav,
                        categories :ele.categories,
                        subcategories: ele.subcategories
                    }
                }
            })
        });
    }
    function favchange(){
        myBook.setMyBookList(b => {
            return b.map((ele) =>  {
                if(ele.isbn === params.isbn)
                {
                    return {
                        url : ele.url,
                        title : ele.title,
                        status : ele.status,
                        series : ele.series,
                        author : ele.author,
                        summary : ele.summary,
                        isbn : ele.isbn,
                        fav : ele.fav?false:true,
                        categories :ele.categories,
                        subcategories: ele.subcategories
                    }
                }
                else{
                    return {
                        url : ele.url,
                        title : ele.title,
                        status : ele.status,
                        series : ele.series,
                        author : ele.author,
                        summary : ele.summary,
                        isbn : ele.isbn,
                        fav : ele.fav,
                        categories :ele.categories,
                        subcategories: ele.subcategories
                    }
                }
            })
        });
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
        localStorage.setItem("booklist", JSON.stringify(myBook.myBookList))
    },[myBook.myBookList]
    )

    return(
        <div className={"book " + widthincre}>
            <div className="bookcover">
                <img src={params.imgurl} alt="" className="bookcoverimg" onClick={widthincrement}/>                <div className="favcircle" onClick={favchange}>
                    <img src="./star.svg" alt="fav" className="favstar"/>
                    {params.fav &&
                    <img src="./redstar.svg" alt="fav" className="activefavstar" id={"ac"+params.isbn}/>
                    }
                </div>
            </div>
            <div className="bookdetailsdiv">
                <div className="booktitle">{params.title}</div>
                <div className="bookseries">{params.series}</div>
                <div className="bookauthor">Author : {params.author}</div>
                Summary : 
                <div className="booksummary">{params.summary}</div>
                <div className="bookinput">
                    <select name="status" className="status" onChange={statuschange}>
                        <option value={1} id="1" selected={params.status=="1"?"true":""}>Reading</option>
                        <option value={2} id="2" selected={params.status=="2"?"true":""}>Finsihed Reading</option>
                        <option value={3} id="3" selected={params.status=="3"?"true":""}>Plan To Read</option>
                    </select>
                    <button className="deletebooks"  onClick={deletebook}>
                        <img src="/delete.svg" alt="delete" className="deleteimg"/>
                    </button>
                </div>
            </div>
        </div>
    )
}