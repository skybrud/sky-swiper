<template>
	<div :class="['sky-swiper', `sky-swiper--${direction}`]">
		<slot
			:items="items"
			:touchStart="onTouchstart"
			:touchMove="onTouchmove"
			:touchEnd="onTouchend"
			:touchCancel="onTouchend"
			:gotoNext="goToNext"
			:gotoPrevious="goToPrevious"
			:gotoIndex="goTo"
			:currentIndex="currentIndex"
			:direction="direction"
			:touch="touch"
		/>
	</div>
</template>
<script src="./SkySwiper.js" />
<style lang="scss" src="./SkySwiper.scss" />
