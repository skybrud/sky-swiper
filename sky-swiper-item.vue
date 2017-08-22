<script>
export default {
	props: {
		lightboxName: {
			type: String,
			required: false,
		},
		index: {
			type: Number,
			required: false,
		},
	},
	mounted() {
		this.$parent.addSlide(this.$el);
	},
	methods: {
		openLightbox() {
			// do this to prevent from having to check if lightboxName is set in template
			// if we should do it in template, we couldn't use <li> because
			// there can only be one root element in a template.
			if (this.lightboxName) {
				// index determines what slide to start on in lightbox
				this.$store.commit('skyLightbox/toggle', {
					name: this.lightboxName,
					activeIndex: this.index,
				});
			}
		},
	},
};
</script>

<template src="./sky-swiper-item.html"></template>
