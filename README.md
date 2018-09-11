# sky-swiper
> A versatile slot-based Vue swiper component

## Installation
```bash
npm install sky-swiper
```
or
```bash
yarn add sky-swiper
```


## Usage
Begin by importing and installing the SkySwiper Vue plugin
```js
import Vue from 'vue';
import SkySwiper from 'sky-swiper';

// If you want to use the baseline scss add the following line
import '${YOUR-PROJECT-ROOT-PATH}/node_modules/sky-swiper/src/SkySwiper.scss';

Vue.use(SkySwiper);

```
The `<SkySwiper />` component registers globally. It uses the `items` prop in conjunction with slots to allow you to render any kind of data inside the swiper.

### Basic markup
Just content:
```html
<SkySwiper
	:items="[
		{ imageSrc: '/link-to-image.jpg' },
		{ imageSrc: '/link-to-image-2.jpg' },
	]"
>
	<div slot="content" slot-scope="{ item }">
		<!-- Template for rendering an item here, ie: -->
		<img :src="item.imageSrc" />
	</div>
</SkySwiper>
```

Content and caption:
```html
<SkySwiper
	:items="[
		{ imageSrc: '/link-to-image.jpg', description: 'Description text 1' },
		{ imageSrc: '/link-to-image-2.jpg', description: 'Description text 2' },
	]"
>
	<div slot="content" slot-scope="{ item }">
		<!-- Template for rendering an item here, ie: -->
		<img :src="item.imageSrc" />
	</div>

	<div slot="caption" slot-scope="{ item }">
		<!-- Template for captions, ie: -->
		<p v-text="item.description" />
	</div>
</SkySwiper>
```

### Props
The component receives 4 props:
- `items`: An array (required). Functions as the data layer of the swiper. The array can contain whichever kind of items you need since the content-slot functions as a template for rendering the data as well.
- `controls`: Configure UI-elements to show inside the swiper content
	```js
	<SkySwiper :controls="{
		// show/hide next button on top of swiper content
		next: true || false,
		// show/hide previous button on top of swiper content
		previous: true || false,
		// show/hide custom cursor control on top of swiper content
		cursor: true || false,
	}">
	```
- `navigation`: Configure UI-elements to display outside the swiper content
	```js
	<SkySwiper :navigation="{
		// The navigation element can either appear above the figcaption ('before-caption') or below ('after-caption')
		location: 'before-caption' || 'after-caption',
		// 'none': show no indicators, 'pagination': show slide number (eg. "2/10"), 'bullets': show list of clickable bullets
		indicator: 'none' || 'pagination' || 'bullets',
		// show/hide next button in navigation
		next: true || false,
		// show/hide previous button in navigation
		previous: true || false,
	}">
	```

### Slots
The component provides these basic slots:
- `"content"` - **Required.**. Uses data from the items prop. Scoped slot with these bindings: `{ item, index }`
- `"caption"` - Uses data from the items prop. Scoped slot with these bindings: `{ item, index }`

Apart fron these there are more advanced slots for customizing the look in detail (more documentation needed):
- `"cursor"` - Custom cursor icon. Scoped slot with these bindings: `{ direction, active, pressed }`
- `"controls-next"` - Custom next icon
- `"controls-previous"` - Custom previous icon
- `"navigation-next"` - Custom next icon (in the navigation)
- `"navigation-previous"` - Custom previous icon (in the navigation)
- `"bullets"` - Custom icon of the bullets in the navigation. Scoped slot with these bindings: `{ active, index }`


## Example
This basic concept can be expanded upon by using all available slots and configuration props to completely customize the swiper.
```html
<SkySwiper
	:items="[
		{ imageSrc: '/link-to-image.jpg', description: 'Description text 1' },
		{ imageSrc: '/link-to-image-2.jpg', description: 'Description text 2' },
	]"
	:controls="{
		next: true,
		previous: false,
		cursor: true
	}"
	:navigation="{
		next: true,
		previous: false,
		location: 'above-caption'
		indicator: 'bullets'
	}"
>
	<div slot="content" slot-scope="{ item }">
		<img :src="item.imageSrc" />
	</div>

	<div slot="caption" slot-scope="{ item }">
		<p v-text="item.description" />
	</div>

	<div slot="cursor" slot-scope="{ direction }">
		<img v-if="direction === 'next'" src="'/arrow-right.png'" />
		<img v-if="direction === 'previous'" src="'/arrow-left.png'" />
	</div>

	<div slot="controls-next">
		<img src="'/arrow-right.png'" />
	</div>

	<div slot="navigation-next">
		<img src="'/arrow-small-right.png'" />
	</div>

	<div slot="bullet" slot-scope="{ active }">
		<img v-if="active" src="'/bullet-active.png'" />
		<img v-else src="'/bullet.png'" />
	</div>
</SkySwiper>
```


## Credits

This module is made by the front-end team at [Skybrud.dk](http://www.skybrud.dk/).
Feel free to use it in any way you want. Feedback, questions and bug reports should be posted as issues. Pull-requests appreciated!
