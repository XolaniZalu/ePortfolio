# ePortfolio - Xolani Jabulani Zalu

A comprehensive, responsive ePortfolio showcasing my expertise in taxation, academic coordination, and technology development.

## Features

- **Responsive Design**: Looks great on all devices (desktop, tablet, mobile)
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Interactive Elements**: Smooth scrolling, hover effects, and form validation
- **Mobile Navigation**: Hamburger menu for mobile devices
- **Contact Form**: Functional contact form with validation
- **Social Media Integration**: Links to your social profiles
- **Skills Showcase**: Visual representation of your technical skills
- **Project Gallery**: Showcase your best work with descriptions and links

## File Structure

```
├── index.html          # Main HTML file
├── styles.css          # All CSS styles and responsive design
├── index.js            # JavaScript functionality and interactions
└── README.md           # This file
```

## Customization Guide

### 1. Personal Information

Edit `index.html` and update the following sections:

- **Hero Section**: Change "Your Name" to your actual name
- **About Section**: Replace the placeholder text with your bio
- **Contact Information**: Update email, phone, and location
- **Social Links**: Add your actual social media profiles

### 2. Projects

In the Projects section, replace the example projects with your own:

```html
<div class="project-card">
    <div class="project-image">
        <!-- Add your project image or icon -->
    </div>
    <div class="project-content">
        <h3>Your Project Name</h3>
        <p>Project description...</p>
        <div class="project-tech">
            <span>Technology1</span>
            <span>Technology2</span>
        </div>
        <div class="project-links">
            <a href="your-demo-link">Live Demo</a>
            <a href="your-github-link">Code</a>
        </div>
    </div>
</div>
```

### 3. Skills

Update the skills section with your actual technical skills. You can:
- Add new skill categories
- Change the icons (using Font Awesome classes)
- Update skill names

### 4. Colors and Styling

To change the color scheme, edit `styles.css`:

- **Primary Color**: Search for `#007BFF` and replace with your preferred color
- **Background Gradient**: Update the hero section gradient
- **Accent Colors**: Modify hover effects and highlights

### 5. Profile Picture

Replace the Font Awesome user icon with your actual photo:

```html
<!-- Replace this: -->
<div class="profile-pic">
    <i class="fas fa-user-circle"></i>
</div>

<!-- With this: -->
<div class="profile-pic">
    <img src="your-photo.jpg" alt="Your Name">
</div>
```

Then add CSS for the image:

```css
.profile-pic img {
    width: 250px;
    height: 250px;
    border-radius: 50%;
    object-fit: cover;
}
```

## Deployment

### Option 1: GitHub Pages
1. Create a GitHub repository
2. Upload all files to the repository
3. Go to Settings → Pages
4. Select source branch (usually `main`)
5. Your site will be available at `username.github.io/repository-name`

### Option 2: Netlify
1. Drag and drop the project folder to [netlify.com](https://netlify.com)
2. Your site will be live instantly with a random URL
3. You can customize the domain name

### Option 3: Vercel
1. Upload to GitHub
2. Connect your repository to [vercel.com](https://vercel.com)
3. Automatic deployment with custom domain options

## Browser Support

This portfolio works in all modern browsers:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Performance Tips

1. **Optimize Images**: Compress images before adding them
2. **Minimize HTTP Requests**: The current setup uses CDN for Font Awesome
3. **Enable Gzip**: Most hosting providers enable this by default
4. **Use WebP Images**: For better performance on supported browsers

## Customization Examples

### Adding a New Section

1. Add the HTML section:
```html
<section id="experience" class="experience">
    <div class="container">
        <h2 class="section-title">Experience</h2>
        <!-- Your content here -->
    </div>
</section>
```

2. Add navigation link:
```html
<a href="#experience" class="nav-link">Experience</a>
```

3. Add CSS styling in `styles.css`

### Contact Form Integration

The contact form currently shows an alert. To make it functional:

1. Use a service like Formspree, EmailJS, or Netlify Forms
2. Update the form action and method
3. Modify the JavaScript form handler

## Font Awesome Icons

This portfolio uses Font Awesome 6.0.0 for icons. You can:
- Browse icons at [fontawesome.com](https://fontawesome.com/icons)
- Replace any icon by changing the class name
- Add new icons anywhere in your HTML

## License

This template is free to use for personal and commercial projects. Attribution is appreciated but not required.

## Support

If you need help customizing your portfolio:
1. Check the browser console for any JavaScript errors
2. Validate your HTML and CSS
3. Test responsiveness using browser developer tools

---

**Happy coding! 🚀**