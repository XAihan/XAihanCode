/*
 * 图片压缩
 * img   原始图片
 * width  压缩后的宽度
 * height  压缩后的高度
 * ratio  压缩比率
 */
export function compress(img, width, height, ratio) {
	let canvas, ctx, img64;
	canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;
	ctx = canvas.getContext('2d');
	ctx.drawImage(img, 0, 0, width, height);
	img64 = canvas.toDataURL('image/jpeg', ratio);
	return img64;
}
