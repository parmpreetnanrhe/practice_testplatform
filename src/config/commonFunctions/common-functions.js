    // Function to change the src of the image
    export const updateImageSrcInString = (html) => {
        const baseUrl = process.env.REACT_APP_CDN_CRACK; // Base URL for images
        
        // Use regex to find all img tags and update the src attribute
        const updatedHtml = html.replace(/<img[^>]+src="([^">]+)"/g, (match, src) => {
          const newSrc = `${baseUrl}${src}`; // Construct new src
          return match.replace(src, newSrc); // Replace the src in the original tag
        });
      
        return updatedHtml; // Return the modified HTML as a string
      };