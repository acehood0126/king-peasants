const withImages = require('next-images')
const path = require('path')

module.exports = withImages({
  sassOptions: {
      includePaths: [path.join(__dirname, 'assets/styles')],
  },
  images: {
    disableStaticImages: true,
  }
})