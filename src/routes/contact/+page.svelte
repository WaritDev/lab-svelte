<script lang="ts">
	import { fly, fade } from 'svelte/transition';

	let isModalOpen = $state(false);

	let email = $state('');
	let message = $state('');

	let maxChars = 200;
	let remainingChars = $derived(maxChars - message.length);

	let counterColor = $derived(remainingChars < 20 ? 'text-red-500' : 'text-gray-400');

	function handleSubmit(e: Event) {
		e.preventDefault();
		console.log(`Sending to ${email}: ${message}`);

		isModalOpen = true;
	}

	function closeModal() {
		isModalOpen = false;
		message = '';
		email = '';
	}

	$effect(() => {
		if (message.length > 0) {
			document.title = 'กำลังพิมพ์ข้อความ...';
		} else {
			document.title = 'ติดต่อเรา';
		}
	});
</script>

<div class="min-h-screen bg-slate-50 px-4 py-12 font-sans sm:px-6 lg:px-8">
	<div
		class="mx-auto max-w-md overflow-hidden rounded-xl border border-slate-100 bg-white p-8 shadow-md md:max-w-2xl"
	>
		<div class="mb-8 text-center">
			<h1 class="text-3xl font-bold text-slate-800">ติดต่อเรา 📩</h1>
			<p class="mt-2 text-slate-500">มีอะไรอยากบอกเราไหม? ส่งข้อความมาได้เลย</p>
		</div>

		<form onsubmit={handleSubmit} class="space-y-6">
			<div>
				<label for="email" class="block font-medium text-slate-700">อีเมลของคุณ</label>
				<input
					type="email"
					id="email"
					required
					bind:value={email}
					class="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm
                        focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
					placeholder="you@example.com"
				/>
			</div>

			<div>
				<label for="message" class="block font-medium text-slate-700">ข้อความ</label>
				<span class={`${counterColor} text-sm`}>
					เหลือ {remainingChars} ตัวอักษร
				</span>
				<textarea
					id="message"
					rows="4"
					required
					bind:value={message}
					class="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm
                        focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
					placeholder="พิมพ์ข้อความที่นี่..."
				></textarea>
			</div>

			<button
				type="submit"
				class="flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
			>
				ส่งข้อความ
			</button>
		</form>
	</div>

	{#if isModalOpen}
		<div
			transition:fade={{ duration: 200 }}
			class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
			onclick={closeModal}
			role="button"
			tabindex="0"
			onkeydown={(e) => e.key === 'Escape' && closeModal()}
		>
			<div
				transition:fly={{ y: 20, duration: 300 }}
				class="relative w-full max-w-sm overflow-hidden rounded-2xl bg-white p-6 text-center shadow-2xl"
				onclick={(e) => e.stopPropagation()}
				role="document"
			>
				<div
					class="absolute top-0 left-0 h-2 w-full bg-gradient-to-r from-green-400 to-emerald-500"
				></div>

				<div
					class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100"
				>
					<svg class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5 13l4 4L19 7"
						/>
					</svg>
				</div>

				<h3 class="mb-2 text-xl font-bold text-slate-900">ส่งสำเร็จ!</h3>
				<p class="mb-6 text-slate-500">
					ขอบคุณที่ติดต่อเรา เราได้รับข้อความของคุณแล้วและจะรีบตอบกลับโดยเร็วที่สุด
				</p>

				<button
					onclick={closeModal}
					class="inline-flex w-full justify-center rounded-lg border border-transparent bg-emerald-600 px-4 py-2 text-base font-medium text-white shadow-sm transition-colors hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none sm:text-sm"
				>
					ตกลง, เข้าใจแล้ว
				</button>
			</div>
		</div>
	{/if}
</div>