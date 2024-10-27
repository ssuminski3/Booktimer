const fetchBookDetails = async (code, isAlert=false) => {
    console.log("Isbg: ", code)
    try {
        const response = await fetch(`http://openlibrary.org/api/books?bibkeys=ISBN:${code}&jscmd=details&format=json`);
        console.log(`http://openlibrary.org/api/books?bibkeys=ISBN:${code}&jscmd=details&format=json`)
        const data = await response.json();
        const bookDetails = data[`ISBN:${code}`];
        if (bookDetails) {
            return {
                title: bookDetails.details.title,
                image: bookDetails.thumbnail_url.replace("S", "L"),
                pages: bookDetails.details.number_of_pages
            };
        }
    } catch (error) {
        console.error(error);
    }

    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${code}`);
        console.log(`https://www.googleapis.com/books/v1/volumes?q=isbn:${code}`)
        const data = await response.json();
        console.log(data)
        const bookInfo = data.items[0]?.volumeInfo;
        if (bookInfo) {
            return {
                title: `${bookInfo.title} ${bookInfo.subtitle || ""}`,
                image: bookInfo.imageLinks?.thumbnail
            };
        }
    } catch (error) {
        if(isAlert)
            alert("There is no such book");
        console.error(error);
    }
    
    // Return null or default values if no book details are found
    return {
        title: "",
        image: ""
    };
};

export default fetchBookDetails;