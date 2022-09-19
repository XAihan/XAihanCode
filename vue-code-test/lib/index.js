import compress from './image-compression';
import {
  canvasToFile,
  drawFileInCanvas,
  drawImageInCanvas,
  getDataUrlFromFile,
  getFilefromDataUrl,
  loadImage,
  getExifOrientation,
  handleMaxWidthOrHeight,
  followExifOrientation,
  CustomFile,
  cleanupCanvasMemory,
  isAutoOrientationInBrowser,
  approximateBelowMaximumCanvasSizeOfBrowser,
  getBrowserName,
} from './utils';
// eslint-disable-next-line import/no-cycle
import compressOnWebWorker from './web-worker';

/**
 * Compress an image file.
 *
 * @param {File} file
 * @param {Object} options - { maxSizeMB=Number.POSITIVE_INFINITY, maxWidthOrHeight, useWebWorker=false, maxIteration = 10, exifOrientation, fileType }
 * @param {number} [options.maxSizeMB=Number.POSITIVE_INFINITY]
 * @param {number} [options.maxWidthOrHeight=undefined]
 * @param {boolean} [options.useWebWorker=true]
 * @param {number} [options.maxIteration=10]
 * @param {number} [options.exifOrientation] - default to be the exif orientation from the image file
 * @param {Function} [options.onProgress] - a function takes one progress argument (progress from 0 to 100)
 * @param {string} [options.fileType] - default to be the original mime type from the image file
 * @param {number} [options.initialQuality=1.0]
 * @param {boolean} [options.alwaysKeepResolution=false]
 * @param {AbortSignal} [options.signal]
 * @returns {Promise<File | Blob>}
 */
async function imageCompression(file, options) {
  const opts = { ...options };

  let compressedFile;
  let progress = 0;
  const { onProgress } = opts;
  opts.maxSizeMB = opts.maxSizeMB || Number.POSITIVE_INFINITY;
  const useWebWorker = typeof opts.useWebWorker === 'boolean' ? opts.useWebWorker : true;
  delete opts.useWebWorker;
  opts.onProgress = (aProgress) => {
    progress = aProgress;
    if (typeof onProgress === 'function') {
      onProgress(progress);
    }
  };

  if (!(file instanceof Blob || file instanceof CustomFile)) {
    throw new Error('The file given is not an instance of Blob or File');
  } else if (!/^image/.test(file.type)) {
    throw new Error('The file given is not an image');
  }


  compressedFile = await compress(file, opts);

  return compressedFile;
}

imageCompression.getDataUrlFromFile = getDataUrlFromFile;
imageCompression.getFilefromDataUrl = getFilefromDataUrl;
imageCompression.loadImage = loadImage;
imageCompression.drawImageInCanvas = drawImageInCanvas;
imageCompression.drawFileInCanvas = drawFileInCanvas;
imageCompression.canvasToFile = canvasToFile;
imageCompression.getExifOrientation = getExifOrientation;

imageCompression.handleMaxWidthOrHeight = handleMaxWidthOrHeight;
imageCompression.followExifOrientation = followExifOrientation;
imageCompression.cleanupCanvasMemory = cleanupCanvasMemory;
imageCompression.isAutoOrientationInBrowser = isAutoOrientationInBrowser;
imageCompression.approximateBelowMaximumCanvasSizeOfBrowser = approximateBelowMaximumCanvasSizeOfBrowser;
imageCompression.getBrowserName = getBrowserName;
imageCompression.version =  '1.1.1';

export default imageCompression;
