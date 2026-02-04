<script lang="ts">
    import type { PageProps } from './$types';
    let { data } : PageProps = $props();
    
    let price = $state(1000);
    
    let finalPrice = $derived(data.calculateFinalPrice(price));
</script>

<h1>ระบบคำนวณราคาพิเศษ</h1>
<input type="number" bind:value={price} />
<p>ราคาหลังหักส่วนลด: {finalPrice}</p>