function searchSongs() {
    const query = document.getElementById('searchInput').value;
    if (!query) return;

    fetch(`https://itunes.apple.com/search?term=${query}&entity=song`)
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '';
            data.results.forEach(song => {
                const songDiv = document.createElement('div');
                songDiv.classList.add('song');
                songDiv.innerHTML = `
                    <img src="${song.artworkUrl100}" alt="${song.trackName}">
                    <div>
                        <h3>${song.trackName}</h3>
                        <p>${song.artistName}</p>
                        <audio controls>
                            <source src="${song.previewUrl}" type="audio/mpeg">
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                `;
                resultsDiv.appendChild(songDiv);
            });
        })
        .catch(error => console.error('Error fetching songs:', error));
}
