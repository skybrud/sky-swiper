import SkySwiperNavigation from './SkySwiperNavigation.vue';

const defaults = {
	controls: {
		next: true,
		previous: true,
		cursor: false,
	},
	navigation: {
		location: 'before-caption', // can be either 'before-caption' or 'after-caption'
		indicator: 'none', // can be either 'none', 'pagination' or 'bullets'
		next: false,
		previous: false,
	},
	animation: {
		content: 'default',
		caption: 'default',
	},
};

export default {
	name: 'SkySwiper',
	components: {
		SkySwiperNavigation,
	},
	props: {
		items: {
			type: Array,
			required: true,
		},
		controls: {
			type: Object,
			default: () => defaults.controls,
		},
		navigation: {
			type: Object,
			default: () => defaults.navigation,
		},
		animation: {
			type: [String, Object],
			default: () => defaults.animation,
		},
	},
	data() {
		return {
			direction: 'forwards',
			currentIndex: 0,
			scroll: {
				x: 0,
				y: 0,
			},
			touch: {
				startX: 0,
				dragX: 0,
				active: false,
				touching: false,
			},
		};
	},
	mounted() {
		this.addListeners();
	},
	beforeDestroy() {
		this.removeListeners();
	},
	computed: {
		api() {
			return {
				touch: {
					start: this.onTouchstart,
					move: this.onTouchmove,
					end: this.onTouchend,
					cancel: this.onTouchend,
				},
				goto: {
					previous: this.goToPrevious,
					next: this.goToNext,
					index: this.goTo,
				},
				states: {
					currentIndex: this.currentIndex,
					direction: this.direction,
					touch: this.touch,
				},
			}
		},
		config() {
			return {
				controls: Object.assign({}, defaults.controls, this.controls),
				navigation: Object.assign({}, defaults.navigation, this.navigation),
				animation: (typeof this.animation === 'object')
					? Object.assign({}, defaults.animation, this.animation)
					: { content: this.animation, caption: this.animation },
			};
		},
	},
	methods: {
		addListeners() {
			window.addEventListener('resize', this.onResize);
			window.addEventListener('scroll', this.onScroll);

			this.$nextTick(this.onResize);
		},
		removeListeners() {
			window.removeEventListener('resize', this.onResize);
			window.removeEventListener('scroll', this.onScroll);
		},
		goTo(index) {
			const itemsLength = this.items.length;
			const to = (itemsLength + index) % itemsLength;
			const distanceForwards = (to - this.currentIndex + itemsLength) % itemsLength;
			const distanceBackwards = Math.abs(distanceForwards - itemsLength);
			this.direction = (distanceBackwards < distanceForwards) ? 'backwards' : 'forwards';
			this.currentIndex = to;
			console.log('index', index);
			this.$emit('change', index);
		},
		goToNext() {
			this.goTo(this.currentIndex + 1);
			this.$emit('next', this.currentIndex + 1);
		},
		goToPrevious() {
			this.goTo(this.currentIndex - 1);
			this.$emit('previous', this.currentIndex - 1);
		},
		onResize() {
			this.onScroll();
		},
		onScroll() {
			this.scroll.y = window.pageYOffset;
			this.scroll.x = window.pageXOffset;
		},
		onTouchstart(event) {
			if (!this.touch.active) {
				this.touch.active = true;
			}
			this.touch.startX = event.touches[0].clientX;
		},
		onTouchmove(event) {
			this.touch.dragX = event.touches[0].clientX - this.touch.startX;
		},
		onTouchend() {
			if (Math.abs(this.touch.dragX) > 30) {
				if (this.touch.dragX < 0) {
					this.goToNext();
				} else {
					this.goToPrevious();
				}
			}
			this.touch.dragX = 0;
		},
	},
};
