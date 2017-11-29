<script>
import Vue from 'vue';
import { lory } from 'lory.js';
import SkySwiperItem from './sky-swiper-item';

const defaults = {
	slideSpeed: 500,
};

const preferences = {
	classNameFrame: 'sky-swiper-frame',
	classNameSlideContainer: 'sky-swiper-slides',
	classNamePrevCtrl: 'sky-swiper-prev',
	classNameNextCtrl: 'sky-swiper-next',
	ease: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
};

export default {
	name: 'sky-swiper',
	data() {
		return {
			slides: [],
			currentSlide: 0,
		};
	},
	props: {
		options: {
			type: Object,
		},
	},
	methods: {
		addSlide(slide) {
			return this.slides.push(slide);
		},
		changeSlide(index) {
			this.lory.slideTo(index);
		},
	},
	mounted() {
		const options = Object.assign(defaults, preferences, this.options);

		this.$el.addEventListener('after.lory.slide', () => {
			this.$set(this, 'currentSlide', this.lory.returnIndex());
		});

		setTimeout(() => {
			this.lory = lory(this.$el, options);
		});
	},
};
</script>

<style src="./sky-swiper.scss"></style>
<template src="./sky-swiper.html"></template>
