<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<style lang="scss">
$Greenery:#88B04B;
$Serenity:#92A8D1;
$RadiandOrchid: #B565A7;


#app {
	font-family: 'Montserrat', sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;

	margin-bottom: 9vw;
}

* {
	margin: 0;
}

.inline {
	display: inline;
}

.button {
	display: inline-block;
	padding: 1vw 1.2vw;
	border: 1px solid $Serenity;
	cursor: pointer;
}

.card {
	padding: 3vw 5vw;
	border: 1px solid $Greenery;

	&.selected {
		background: $RadiandOrchid;
		color: white;
		.clickable {
			border: 1px solid white;
		}

	} 
}

.center-items {
	display: flex;
	justify-content: center;
	flex-wrap: wrap;

	> div {
		margin: 0 2vw;
	}
}

.pointer {
	cursor: pointer;
}

.clickable {
	user-select: none;
	cursor: pointer;
	display: inline-block;
	padding: .4vw .5vw;
	margin: .3vw .6vw;
	border: 1px solid black;
	
	&:hover {
		transform: scale(1.2);
	};
}




</style>
