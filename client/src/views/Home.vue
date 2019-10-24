<template>
	<div class="home">
		<img alt="Vue logo" src="../assets/logo.png">


	</div>
</template>

<script>
// @ is an alias to /src


export default {
	name: 'home',
	async created(){
		let res = axios.get(`${this.$mainUrl()}/products/get`)
		if(res) {

			this.
		}

	}
}
</script>
