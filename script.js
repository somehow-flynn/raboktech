// Function to handle the Read More button click
function handleReadMore(postTitle) {
    alert(`Navigating to the full post: ${postTitle}`);
    // Here, redirect to the actual blog post page, e.g.,
    // window.location.href = `blog/${postTitle.toLowerCase().replace(/\s+/g, '-')}.html`;
}

// Function to load more blog posts dynamically
async function loadMorePosts() {
    const blogContainer = document.querySelector('.blog-container');
    const loadingSpinner = document.getElementById('loadingSpinner');
    loadingSpinner.style.display = 'block'; // Show loading spinner

    // Simulate fetching new posts
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

    // Sample new blog posts data
    const newPosts = [
        {
            title: "The Future of Libraries",
            image: "images/blog3.jpg",
            text: "As technology advances, libraries continue to adapt. This post discusses future trends in libraries, including virtual reality and AI.",
            audio: "audio/future-libraries.mp3",
        },
        {
            title: "The Role of Libraries in Education",
            image: "images/blog4.jpg",
            text: "Libraries play a crucial role in supporting education at all levels. In this article, we explore their impact on learning.",
            audio: "audio/libraries-education.mp3",
        },
    ];

    // Append each new post to the blog container
    newPosts.forEach(post => {
        const blogPost = document.createElement('div');
        blogPost.classList.add('blog-post');

        blogPost.innerHTML = `
            <div class="blog-image">
                <img src="${post.image}" alt="${post.title}" class="blog-img">
            </div>
            <div class="blog-content">
                <h3 class="blog-heading">${post.title}</h3>
                <p class="blog-text">${post.text}</p>
                <audio controls class="blog-audio">
                    <source src="${post.audio}" type="audio/mp3">
                    Your browser does not support the audio element.
                </audio>
                <a href="#" class="read-more-btn" onclick="handleReadMore('${post.title}')">Read More</a>
            </div>
        `;

        blogContainer.appendChild(blogPost);
    });

    loadingSpinner.style.display = 'none'; // Hide loading spinner
}

// Add an event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    const loadMoreButton = document.createElement('button');
    loadMoreButton.innerText = 'Load More Posts';
    loadMoreButton.classList.add('load-more-btn');
    loadMoreButton.onclick = loadMorePosts;

    // Append the Load More button at the end of the blog container
    document.querySelector('.blog-container').appendChild(loadMoreButton);
});
