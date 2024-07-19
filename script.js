document.addEventListener("DOMContentLoaded", function() {
    var video = document.getElementById('myVideo');
    video.playbackRate = 0.35; // Change the value to slow down the video (0.5 is half speed)
});

document.getElementById('myIframe').onload = function() {
    var iframe = document.getElementById('myIframe');
    var innerDoc = iframe.contentDocument || iframe.contentWindow.document;

    // Aggiungi un nuovo stile al documento dell'iframe
    var style = innerDoc.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
      
        * {
            color: #ffffff !important;
        }
    `;
    innerDoc.head.appendChild(style);
};






const token = 'YOUR_ACCESS_TOKEN';
const userId = 'smalldetails.it';
const numPhotos = 12; // Number of photos to display

fetch(`https://graph.instagram.com/${userId}/media?fields=id,caption,media_url,permalink&access_token=${token}`)
    .then(response => response.json())
    .then(data => {
        const feedContainer = document.getElementById('instagram-feed');
        data.data.slice(0, numPhotos).forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('instagram-post');
            postElement.innerHTML = `
                <a href="${post.permalink}" target="_blank">
                    <img src="${post.media_url}" alt="${post.caption || ''}">
                </a>
            `;
            feedContainer.appendChild(postElement);
        });
    })
    .catch(error => console.error('Error fetching Instagram feed:', error));
