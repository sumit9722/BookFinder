import axios from 'axios';

export default async function fetchingData(bookParametersObject) {
    console.log(bookParametersObject);
    let options = {
        method: 'GET',
        url: 'https://book-finder1.p.rapidapi.com/api/search',
        params: {
            author: bookParametersObject.author,
            title: bookParametersObject.title,
            series: bookParametersObject.series,
            book_type: bookParametersObject.bookType,
            results_per_page: '100',
            page: '1'
        },       headers: {
            'x-rapidapi-key': '998d74b152msh2918a57284edac0p14b823jsne20ebe1c7d0c',
            'x-rapidapi-host': 'book-finder1.p.rapidapi.com'
        }
    };
      
    console.log(options.params)
    try {
        const response = await axios.request(options);
        const result =  response.data;
        return  {
            isFetchingsuccessfull : true,
            bookArray : result.results
        };
    } 
    catch (error) {
        return {
            isFetchingsuccessfull : false,
            errorCode : error
        };
    }

    // const url = 'https://book-finder1.p.rapidapi.com/api/search?series=Wings%20of%20fire&book_type=Fiction&lexile_min=600&lexile_max=800&results_per_page=25&page=1';
    // const options = {
    //     method: 'GET',
    //     headers: {
    //         'x-rapidapi-key': '998d74b152msh2918a57284edac0p14b823jsne20ebe1c7d0c',
    //         'x-rapidapi-host': 'book-finder1.p.rapidapi.com'
    //     }
    // };

    // try {
    //     const response = await fetch(url, options);
    //     const result = await response.text();
    //     console.log(result);
    // } catch (error) {
    //     console.error(error);
    // }
}