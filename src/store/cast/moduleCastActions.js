export default {
  compressImage({ commit }, { data, maxWidth, maxHeight, quality }) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = data;
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        let width = image.width;
        let height = image.height;

        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }

        canvas.width = width;
        canvas.height = height;

        context.drawImage(image, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          },
          'image/jpeg',
          quality
        );
      };
      image.onerror = reject;
    });
  },
};
