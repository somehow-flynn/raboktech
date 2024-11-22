// Function to dynamically populate the "About Me" section
function populateAboutMe() {
    const aboutMeContainer = document.querySelector('#aboutMeContent');

    // Your details
    const aboutMeData = {
        name: "Your Name",
        title: "Visionary and Founder of Rabok Library",
        description: `
            Welcome to Rabok Library! My name is [Your Name], and I am passionate about creating spaces 
            where knowledge thrives and people come together to learn and grow. 
            <br><br>
            My vision for Rabok Library is to bridge the gap between tradition and innovation, offering not only 
            books but also ideas, connections, and a supportive community for dreamers, doers, and thinkers alike. 
            I hope this library serves as a cornerstone for your personal and professional growth.
        `,
        image: "images/about-me.jpg", // Replace with your image
        fallbackImage: "images/default-profile.jpg" // Fallback if image is unavailable
    };

    // Construct the HTML
    const aboutMeHTML = `
        <div class="row align-items-center animated-section">
            <div class="col-md-6">
                <img 
                    src="${aboutMeData.image}" 
                    alt="${aboutMeData.name}" 
                    class="img-fluid rounded shadow"
                    onerror="this.onerror=null; this.src='${aboutMeData.fallbackImage}';"
                >
            </div>
            <div class="col-md-6">
                <h2 class="text-warning">${aboutMeData.name}</h2>
                <h4 class="text-light">${aboutMeData.title}</h4>
                <p>${aboutMeData.description}</p>
            </div>
        </div>
    `;

    // Populate the container
    aboutMeContainer.innerHTML = aboutMeHTML;

    // Trigger animation when the section is in the viewport
    revealOnScroll();
}

// Function to reveal animations when in viewport
function revealOnScroll() {
    const animatedSections = document.querySelectorAll('.animated-section');
    const windowHeight = window.innerHeight;

    animatedSections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;

        if (sectionTop < windowHeight - 50) {
            section.classList.add('visible');
        }
    });
}

// Add event listeners
document.addEventListener('DOMContentLoaded', () => {
    populateAboutMe();

    // Add scroll listener for animations
    window.addEventListener('scroll', revealOnScroll);
});
