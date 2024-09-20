import axios from 'axios';

export default async function fetchingData(bookParametersObject) {
    let titl="";
    let ser ="";
    let aut = "";
    let btyp = "";

    bookParametersObject.title.replaceAll(" ", "%20");
    bookParametersObject.author.replaceAll(" ", "%20");
    bookParametersObject.series.replaceAll(" ", "%20");

    if (bookParametersObject.title != "")
    {
        titl = 'title='+bookParametersObject.title;
    }
    if (bookParametersObject.author != "")
    {
        aut = '&author='+bookParametersObject.author;
    }
    if (bookParametersObject.series != "")
    {
        ser = '&series='+bookParametersObject.series;
    }
    if (bookParametersObject.book_type  != "")
    {
        btyp ='&book_type='+bookParametersObject.book_type;
    }
    const url = 'https://book-finder1.p.rapidapi.com/api/search?'+titl+aut+ser+btyp+'&results_per_page=100&page=1';    
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '998d74b152msh2918a57284edac0p14b823jsne20ebe1c7d0c',
            'x-rapidapi-host': 'book-finder1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if(!response.ok)
        {
            return {
                isFetchingsuccessfull : false,
                errorCode : response.status
            }
        }
        const result = await response.json();
        return  {
            isFetchingsuccessfull : true,
            bookArray : result.results
        };
    } catch (error) {
        return {
            isFetchingsuccessfull : false,
            errorCode : error
        };
    }
}