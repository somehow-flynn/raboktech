// Your Blogger API Key and Blog ID
const API_KEY = 'YOUR_API_KEY_HERE';
const BLOG_ID = 'YOUR_BLOG_ID_HERE';

// Function to fetch posts from Blogger
async function fetchBloggerPosts() {
    const blogContainer = document.querySelector('#blogPosts');
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

        if (!posts || posts.length === 0) {
            throw new Error('No posts available');
        }

        // Append fetched posts to the blog container
        blogContainer.innerHTML = ''; // Clear the loading spinner
        posts.forEach(post => {
            appendBlogPost(post.title, extractImage(post.content), truncateText(stripHTML(post.content), 100), post.url);
        });
    } catch (error) {
        console.error('Error loading blog posts:', error);

        // Clear loading spinner and show the default post
        blogContainer.innerHTML = '';
        appendDefaultPost();
    }
}

// Function to append a single blog post to the container
function appendBlogPost(title, image, content, url) {
    const blogContainer = document.querySelector('#blogPosts');
    const blogPost = document.createElement('div');
    blogPost.className = 'col-md-4';

    blogPost.innerHTML = `
        <div class="blog-post card bg-secondary text-light">
            <img src="${image}" alt="${title}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${content}</p>
                <a href="${url}" class="btn btn-primary" target="_blank">Read More</a>
            </div>
        </div>
    `;

    blogContainer.appendChild(blogPost);
}

// Function to append the default blog post
function appendDefaultPost() {
    appendBlogPost(
        'The Strange Case of Dr. Jekyll and Mr. Hyde',
        'images/jekyll-hyde.jpg', // Default image
        'A thrilling tale of duality and the human psyche. Explore the dark secrets of Dr. Jekyll and his sinister counterpart, Mr. Hyde.',
        'https://en.wikipedia.org/wiki/Strange_Case_of_Dr_Jekyll_and_Mr_Hyde' // Link to more info
    );
}

// Helper functions
function extractImage(content) {
    const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
    return imgMatch ? imgMatch[1] : 'images/default-image.jpg';
}

function stripHTML(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
}

function truncateText(text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

// Load posts when the page is ready
document.addEventListener('DOMContentLoaded', fetchBloggerPosts);

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

    // Auto-close menu on link click
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
});
