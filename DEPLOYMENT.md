# 🚀 Deploy Your Portfolio to GitHub Pages (FREE!)

Follow these steps to make your portfolio available online for recruiters to see.

## 📋 Prerequisites

- GitHub account (free)
- Git installed on your Mac
- Terminal/Command Line access

## 🔧 Step-by-Step Deployment

### 1. Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** button in the top right corner
3. Select **"New repository"**
4. Repository name: `Gaurika-portfolio` (or your preferred name)
5. Description: `Personal portfolio website showcasing my skills and projects`
6. Make sure it's **Public** (required for free GitHub Pages)
7. **Don't** initialize with README, .gitignore, or license (we already have files)
8. Click **"Create repository"**

### 2. Initialize Git and Push to GitHub

Open Terminal and run these commands:

```bash
# Navigate to your portfolio folder
cd /Users/gaurika/Desktop/Gaurika-portfolio

# Initialize git repository
git init

# Add all files to git
git add .

# Create first commit
git commit -m "Initial portfolio website commit"

# Add your GitHub repository as origin (replace with your username)
git remote add origin https://github.com/gaurika-g/Gaurika-portfolio.git

# Push to GitHub
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/gaurika-g/Gaurika-portfolio`
2. Click on **"Settings"** tab (top right of repository page)
3. Scroll down to **"Pages"** section in the left sidebar
4. Under **"Source"**, select **"Deploy from a branch"**
5. Select **"main"** branch and **"/ (root)"** folder
6. Click **"Save"**
7. Wait 1-2 minutes for deployment

### 4. Access Your Live Website

Your portfolio will be available at:
**`https://gaurika-g.github.io/Gaurika-portfolio`**

## 🔄 Updating Your Website

Whenever you make changes to your portfolio:

```bash
# Navigate to your portfolio folder
cd /Users/gaurika/Desktop/Gaurika-portfolio

# Add all changes
git add .

# Commit changes with a descriptive message
git commit -m "Updated portfolio with new projects and experience"

# Push changes to GitHub
git push origin main
```

GitHub Pages will automatically update your website (takes 1-2 minutes).

## 🎯 Share with Recruiters

Once deployed, you can share your portfolio using:

- **Direct URL:** `https://gaurika-g.github.io/Gaurika-portfolio`
- **Add to LinkedIn:** Include the URL in your LinkedIn profile
- **Resume:** Add the URL to your resume
- **Email signatures:** Include the link in your email signature

## 🛠️ Troubleshooting

### If you get "Repository not found" error:
- Make sure you're using the correct GitHub username
- Check that the repository is public
- Verify the repository name matches exactly

### If GitHub Pages doesn't work:
- Make sure your repository is public
- Check that you selected "main" branch and "/ (root)" folder
- Wait a few minutes for the deployment to complete
- Check the "Actions" tab in your repository for any errors

### If changes don't appear:
- Wait 1-2 minutes for GitHub Pages to update
- Clear your browser cache
- Check that you pushed to the "main" branch

## 📱 Testing Your Website

1. **Test locally first:**
   ```bash
   python3 server.py
   # Open http://localhost:8080
   ```

2. **Test the live version:**
   - Open `https://gaurika-g.github.io/Gaurika-portfolio`
   - Test on different devices (phone, tablet, desktop)
   - Check all links and functionality

## 🎉 Success!

Your portfolio is now live and accessible to recruiters worldwide! 

**Next steps:**
- Add the URL to your resume
- Update your LinkedIn profile
- Share with potential employers
- Keep it updated with new projects and experience

---

*Need help? Check the README.md file for more details about the website features and customization.*
