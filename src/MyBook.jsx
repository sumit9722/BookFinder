import "./MyBook.css"

export default function MyBook(params){
return(
    <div className="book">
        <div className="BookCover">
            <img src={params.imgurl} alt="" className="bookcoverimg"/>
        </div>
        <div className="booktitle">{params.title}</div>
    </div>
)
}