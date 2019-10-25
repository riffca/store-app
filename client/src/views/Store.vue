<template>
	<div class="products">
		<h1>Select products to see your total <span class="clickable" @click="getProducts">change</span></h1>
		<div class="center-items">
			<div 
				v-for="item in products" @click="select(item)"
				:class="['card pointer', item.selected ? 'selected' : '' ]" :key="item.id">
				<div>
					<span class="inline product-name">{{ item.name }} </span>
					<span class="inline product-quantity">{{ item.quantity > 1 ? item.quantity : ''}}</span>
				</div>
				<div>{{ item.price }} {{ item.currency }}</div>
				<div class="inc-quantity">
					<div  class="clickable" @click.stop="incQuantity(false, item)"> - </div>
					<div  class="clickable" @click.stop="incQuantity(true, item)"> + </div>
				</div>
			</div>
		</div>
		<div class="center-items" v-if="selected.length">
			<div v-for="item in caclulated" :key="item.currency" class="current-viewer">
				<div class="text-currency">{{ item.valute }}</div>
				<div class="text-total">{{ item.total.toFixed(2) }}</div>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	data(){
		return {
			products: [],
			caclulated: []
		}
	},
	async created(){
		this.getProducts()
	},

	computed:{
		selected(){
			return this.products.filter(item=>item.selected)
		}
	},
	methods: {
		async getProducts(){
			let res =  await this.$request('products/get')
			if(res) {
				this.products = res.products.slice().map(item=>{
					item.selected = false
					return item
				})
			}
		},
		incQuantity(incUp, item){
			incUp && item.quantity++
			!incUp && item.quantity--
			this.calculate()
		},
		select(item){
			item.selected = !item.selected
			this.calculate()
		},	
		async calculate(){
			let res =  await this.$request('products/calculate', { items: this.selected })
			if(res) {
				this.caclulated = res.calculations
			}
		}
	}
}
</script>

<style lang="scss">


$CeruleanBlue:#98B4D4;

h1 {


	margin: 2vw 2vw;

}

.product-quantity {
	transform: translateY(10%);
}

.product-name {
	font-size: 2.6vw;
}

.product-name {
	font-size: 2.6vw;
}


.inc-quantity {
	.clickable {
		width: 2vw;
	}
}

.center-items {
	.current-viewer {
		display: none;
		margin: 2vw 8vw;
		display: inline-block;
		width: 5vw;
		height: 5vw;
	}

	.text-currency {
		font-weight: 700;
		font-size: 3.2vw;
	}	

	.text-total {
		font-weight: 300;
		font-size: 3.2vw;
		color: $CeruleanBlue;
	}
}
</style>

