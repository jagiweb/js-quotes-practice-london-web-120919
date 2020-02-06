// // It might be a good idea to add event listener to make sure this file 
// // only runs after the DOM has finshed loading. 
const quotesURL = "http://localhost:3000/quotes?_embed=likes"
// const quoteCreate = "http://localhost:3000/quotes/"
const likeURL = "http://localhost:3000/likes"
addEventListener("DOMContentLoaded", function(){
    function fetchQuotes(){
        return fetch(quotesURL)
            .then(response => response.json())
            .then(function(quotes){
                renderQuotes(quotes)
            })
    }

    function renderQuotes(quotes){
        for (let i = 0; i < quotes.length; i++) {
            renderQuote(quotes[i])     
        }
    }
    

    function renderQuote(quote){
        const ulTag = document.querySelector('ul')
        const liTag = document.createElement('li')
        liTag.classList.add('quote-card')
        const blockTag = document.createElement('blockquote')
        blockTag.classList.add('blockquote')
        let pTag = document.createElement('p')
        pTag.classList.add('mb-0')
        pTag.innerText = quote.quote
        let footTag = document.createElement('footer')
        footTag.classList.add('blockquote-footer')
        footTag.innerText = quote.author
        const brTag = document.createElement('br')
        const buttonLike = document.createElement('button')
        buttonLike.classList.add('btn-success')
        buttonLike.innerText = "Like: "
        const spanTag = document.createElement('span')
        // debugger
        spanTag.innerText = quote.likes.length
        buttonLike.append(spanTag)
        const buttonDelete = document.createElement('button')
        buttonDelete.classList.add('btn-danger')
        buttonDelete.innerText = "X Delete"
        liTag.append(blockTag)
        blockTag.append(pTag, footTag, brTag, buttonLike, buttonDelete)
        ulTag.append(liTag)

        buttonDelete.addEventListener('click', function(e){
            e.target.parentNode.remove()
            configurationObject ={
                method: "DELETE"
            }
            fetch(QuoteCreate + quote.id, configurationObject)
                .then(response => response.json())
        })

        buttonLike.addEventListener('click', function(e){
            // quote.likes.push(1)
            // buttonLike.innerText = "Like quote.likes"
            configurationObject = {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                    "Accept":"application/json"
                },
                body: JSON.stringify({
                    quoteId: quote.id
                })
            }
            fetch(likeURL, configurationObject)
            //     .then(resp => resp.json())
            //     .then(data => console.log(data))
            // debugger
            spanTag.innerText++
        })
        
    }
        const form = document.querySelector('#new-quote-form')
        form.addEventListener('submit', function(e){
            e.preventDefault()
            const newQuote = document.querySelector('#new-quote').value
            const author = document.querySelector('#author').value
            const newObj = {
                quote: newQuote,
                author: author
            }
            e.target.reset()
            let configurationObject = {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                    "Accept":"application/json"
                },
                body: JSON.stringify(newObj)
            }
            const url = "http://localhost:3000/quotes?_embed=likes"
            fetch(url, configurationObject)
                .then(response => response.json())
                .then(quote => renderQuote(quote))
        })



    fetchQuotes()
})

// Submitting the form creates a new quote and adds it to the list of quotes without having to refresh the page. 
// Pessimistic rendering is reccommended.
// Clicking the delete button should delete the respective quote from the API and remove it from the page without having to refresh.
// Clicking the like button will create a like for this particular quote in the API and update the number of likes 
// displayed on the page without having to refresh.
// Use a POST request to http://localhost:3000/likes
// The body of the request should be a JSON object containing a key of quoteId, with an integer value. 
// Use the ID of the quote you're creating the like for — e.g. { quoteId: 5 } to create a like for quote 5. 
// IMPORTANT: if the quoteID is a string for some reason (for example, if you've pulled the ID from a dataset) 
// the index page will not include the like you create on any quote.
// Bonus (not required): add a createdAt key to your object to track when the like was created. 
// Use UNIX time (the number of seconds since January 1, 1970). The documentation for the JS Date class may be helpful here!
