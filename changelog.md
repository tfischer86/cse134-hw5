# Changelog
## Site Changes
I mostly made changes to the style since the previous version. I kept getting recommended interesting CSS videos on YouTube so I tried out the ideas on my site.

 1. Made the links in the navigation header have a different background color when hovered over.
 2. Changed the footer so that it sticks to the bottom of the page even if there's not much content on a page. This required figuring out how to get the body to have the correct height, while avoiding some pitfalls on mobile.
 3. Fixed the hero images so that they resize correctly (if they have the hero-resize class), but also take up the correct space initially to prevent layout shift.
 4. Refactored the CSS so that there are more CSS variables.

## 3rd Party JavaScript
For the 3rd party script, I added Google Analytics. I created a Google Analytics account, then manually added a `<script>` tag to every page in the site. I chose analytics because I thought it would be useful to be able to track the amount of visitors I get on the site. For example, if I put my site on LinkedIn, I could see how many employers might have looked at it.