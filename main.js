document.addEventListener('DOMContentLoaded', (e) => {
    const apiKey = '7faa108fc7ec4cb3bcf3b5aa7e0c4ec8'

    const selectCountry = document.querySelector('#top-stories-countries');
    const topStories = document.querySelector('#top-stories');
    const searchInput = document.getElementById('search');
    const loadingAnimation = document.getElementById('loading')
    let likeButtons;


    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    function retrieveTopStories({ category, query, country }) {
        removeAllChildNodes(topStories);
        loadingAnimation.style.display = 'inline-block';

        category = category || document.querySelector('.category-button.active').textContent;
        query = query || searchInput.value;
        country = country || selectCountry.value;
        let proxy = 'https://api.allorigins.win/get?url='
        let url = `https://newsapi.org/v2/top-headlines?
                    q=${query}&
                    apiKey=${apiKey}&
                    country=${country}&
                    category=${category}&
                    limit=11`;
        url = proxy + encodeURIComponent(url.replace(/\s/g, ''));

        
                        return `
                        <div class="card my-3" style="width: 16rem;">
                            <div style="height: 150;">
                                <a href="${article.url}" target='_blank'>
                                    <img src="${article.urlToImage}" class="card-img-top" style="width: 100%;">
                                </a>
                            </div>
                            <div class="card-body d-flex flex-column justify-content-between">
                                <a href="${article.url}" target='_blank'><h5 class="card-title">${article.title}</h5></a>
                                <p class="card-text">${stripHtml(article.content)}</p>
                                
                            </div>
                        </div>
                        `
                    })
                loadingAnimation.style.display = 'none';
                topStories.innerHTML = cards.join('')
                likeButtons = document.getElementsByClassName('like')
                for (let likeButton of likeButtons) {
                    likeButton.addEventListener('click', (e) => {
                        likeButton.classList.toggle('red');
                    });
                }
            }).catch((error) => {
                console.log(error);
            })
    }
    // event listeners

    selectCountry.addEventListener('change', (e) => {
        e.preventDefault();
        const country = e.target.value;
        retrieveTopStories({ country });
    });

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.target.value.length > 0) {
            e.preventDefault();
            const query = e.target.value;
            retrieveTopStories({ query })
        }

    });

    document.querySelectorAll('.category-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            let category = e.target.textContent;
            category = category === 'World' ? 'general' : category;
            retrieveTopStories({ category: category.toLowerCase() });

            const current = document.querySelector('.active');
            current.classList.remove('active');
            button.classList.add('active');
        })
    })

    retrieveTopStories({})
})

function stripHtml(html) {
    let doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
}



