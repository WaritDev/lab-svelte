class ThemeStore {
	isDark = $state(false);
	
	toggle() {
		this.isDark = !this.isDark;
	}
	
	set(value: boolean) {
		this.isDark = value;
	}
}

export const theme = new ThemeStore();