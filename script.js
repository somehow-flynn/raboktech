// Function to handle the Read More button click
function handleReadMore(postTitle) {
    // Format the title for the URL by converting to lowercase and replacing spaces with hyphens
    const formattedTitle = postTitle.toLowerCase().replace(/\s+/g, '-');
    // Redirect to the corresponding blog post page in the "blog" folder
    window.location.href = `blog/${formattedTitle}.html`;
}

// Function to load more blog posts dynamically
async function loadMorePosts() {
    const blogContainer = document.querySelector('.blog-container');
    const loadingSpinner = document.getElementById('loadingSpinner');
    loadingSpinner.style.display = 'block'; // Show loading spinner

    // Clear previous error messages
    const errorMessage = document.getElementById('errorMessage');
    if (errorMessage) {
        errorMessage.remove();
    }

    try {
        // Fetch blog posts from the backend
        const response = await fetch('http://localhost:3000/api/blogs');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const posts = await response.json(); // Parse the JSON response

        // Append each post to the blog container
        posts.forEach(post => {
            const blogPost = document.createElement('div');
            blogPost.classList.add('blog-post');

            blogPost.innerHTML = `
                <div class="blog-image">
                    <img src="${post.image || 'default-image.jpg'}" alt="${post.title}" class="blog-img"> <!-- Fallback image -->
                </div>
                <div class="blog-content">
                    <h3 class="blog-heading">${post.title}</h3>
                    <p class="blog-text">${post.content}</p>
                    ${post.audio ? `<audio controls class="blog-audio">
                        <source src="${post.audio}" type="audio/mp3">
                        Your browser does not support the audio element.
                    </audio>` : ''}
                    <a href="#" class="read-more-btn" onclick="handleReadMore('${post.title}')">Read More</a>
                </div>
            `;

            blogContainer.appendChild(blogPost);
        });
    } catch (error) {
        console.error('Error loading blog posts:', error);
        const errorDiv = document.createElement('div');
        errorDiv.id = 'errorMessage';
        errorDiv.innerText = 'Unable to load blog posts. Please try again later.';
        errorDiv.style.color = 'red'; // Style the error message
        blogContainer.appendChild(errorDiv);
    } finally {
        loadingSpinner.style.display = 'none'; // Hide loading spinner
    }
}

// Add an event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    const loadMoreButton = document.createElement('button');
    loadMoreButton.innerText = 'Load More Posts';
    loadMoreButton.classList.add('load-more-btn');
    loadMoreButton.onclick = loadMorePosts;

    // Append the Load More button at the end of the blog container
    document.querySelector('.blog-container').appendChild(loadMoreButton);

    // Optionally load initial posts on page load
    loadMorePosts(); // Load initial blog posts
});
