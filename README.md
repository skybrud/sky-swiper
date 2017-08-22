# sky-swiper

A swiper written in Vue

## Dependencies

- [Vue](https://vuejs.org/)
- [loryJS](https://github.com/meandmax/lory/)
- [sky-crop](https://github.com/skybrud/sky-crop/)
- [sky-svg](https://github.com/skybrud/sky-svg/)

## Usage

```
<sky-swiper>
	<sky-swiper-item>
		<sky-crop src="imageURL"></sky-crop>
	</sky-swiper-item>
	<sky-swiper-item>
		<sky-crop src="imageURL"></sky-crop>
	</sky-swiper-item>
	<sky-swiper-item>
		<sky-crop src="imageURL"></sky-crop>
	</sky-swiper-item>
</sky-swiper>
```

The contents of `<sky-swiper-item>` could be just about anything. Here we're adding an image with `<sky-crop>`.

- `src` should be an image URL. Read requirements for url at [sky-crop](https://github.com/skybrud/sky-crop/)

## Credits
 
This module is made by the front-end team at [Skybrud.dk](http://www.skybrud.dk/). 
Feel free to use it in any way you want. Feedback, questions and bug reports should be posted as issues. Pull-requests appreciated!
