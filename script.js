// Your Blogger API Key and Blog ID
const API_KEY = 'YOUR_API_KEY_HERE';
const BLOG_ID = 'YOUR_BLOG_ID_HERE';

// Function to fetch posts from Blogger
async function fetchBloggerPosts() {
    const blogContainer = document.querySelector('#blogPosts');
    const loadMoreButton = document.getElementById('loadMoreButton');
    const loadingSpinner = document.createElement('div');
    loadingSpinner.className = 'loading-spinner';
    loadingSpinner.innerText = 'Loading...';
    blogContainer.appendChild(loadingSpinner);

    try {
        const response = await fetch(
            `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}`
        );
        if (!response.ok) {
            throw new Error('Failed to fetch blog posts');
        }

        const data = await response.json();
        const posts = data.items;

        // Append posts to the blog container
        posts.forEach(post => {
            const blogPost = document.createElement('div');
            blogPost.className = 'blog-post';

            blogPost.innerHTML = `
                <div class="blog-image">
                    <img src="${extractImage(post.content)}" alt="${post.title}" class="blog-img">
                </div>
                <div class="blog-content">
                    <h3>${post.title}</h3>
                    <p>${truncateText(stripHTML(post.content), 100)}</p>
                    <a href="${post.url}" class="read-more-btn" target="_blank">Read More</a>
                </div>
            `;

            blogContainer.appendChild(blogPost);
        });
    } catch (error) {
        console.error('Error loading blog posts:', error);
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.innerText = 'Unable to load blog posts. Please try again later.';
        blogContainer.appendChild(errorMessage);
    } finally {
        loadingSpinner.remove();
    }
}

// Helper function to extract the first image from post content
function extractImage(content) {
    const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
    return imgMatch ? imgMatch[1] : 'images/default-image.jpg';
}

// Helper function to strip HTML tags
function stripHTML(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
}

// Helper function to truncate text
function truncateText(text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

// Load posts when the page is ready
document.addEventListener('DOMContentLoaded', fetchBloggerPosts);


// Hamburger Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
});
